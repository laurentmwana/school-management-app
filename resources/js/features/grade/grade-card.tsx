"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { GradeModel } from "@/types/model"
import { MoreHorizontal, Eye, Edit, Trash2, User, BookOpen, Calendar, GraduationCap } from "lucide-react"
import { Link } from "@inertiajs/react"

interface GradeCardProps {
  grade: GradeModel
  variant?: "admin" | "other"
}

export function GradeCard({ grade, variant = "other" }: GradeCardProps) {
  // Fonction pour déterminer la couleur du badge selon la note
  const getScoreBadgeVariant = (score: number) => {
    if (score >= 16) return "default" // Excellent
    if (score >= 14) return "secondary" // Bien
    if (score >= 12) return "outline" // Assez bien
    if (score >= 10) return "outline" // Passable
    return "destructive" // Insuffisant
  }

  const getScoreLabel = (score: number) => {
    if (score >= 16) return "Excellent"
    if (score >= 14) return "Bien"
    if (score >= 12) return "Assez bien"
    if (score >= 10) return "Passable"
    return "Insuffisant"
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <CardTitle className="text-lg leading-tight">{grade.student.name}</CardTitle>
            <CardDescription className="text-sm">
              {grade.course.name} ({grade.course.alias})
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant={getScoreBadgeVariant(grade.score)} className="text-xs font-bold">
              {grade.score}/20
            </Badge>

            {variant === "admin" && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/grades/${grade.id}`}>
                      <Eye className="mr-2 h-4 w-4" />
                      Voir
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/grades/${grade.id}/edit`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Éditer
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/grades/${grade.id}/delete`} className="text-destructive focus:text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Supprimer
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4 shrink-0" />
            <span>Étudiant: {grade.student.name}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BookOpen className="h-4 w-4 shrink-0" />
            <span>Cours: {grade.course.name}</span>
            <Badge variant="outline" className="text-xs">
              {grade.course.credits} crédit{grade.course.credits > 1 ? "s" : ""}
            </Badge>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <GraduationCap className="h-4 w-4 shrink-0" />
            <span>Niveau: {grade.level.name}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 shrink-0" />
            <span>Année: {grade.year.name}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="text-xs text-muted-foreground">
            <div>Note: {getScoreLabel(grade.score)}</div>
            <div>Créé le {new Date(grade.created_at).toLocaleDateString()}</div>
          </div>

          <Button variant="outline" size="sm" asChild>
            <Link href={variant === "admin" ? `/admin/grades/${grade.id}` : `/grades/${grade.id}`}>
              <Eye className="mr-2 h-4 w-4" />
              Voir détails
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
