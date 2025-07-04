"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { StudentModel } from "@/types/model"
import { MoreHorizontal, Eye, Edit, Trash2, Calendar, GraduationCap, Users, UserCheck } from "lucide-react"
import { Link } from "@inertiajs/react"

interface StudentCardProps {
  student: StudentModel
  variant?: "admin" | "other"
}

export function StudentCard({ student, variant = "other" }: StudentCardProps) {
  const age = Math.floor((Date.now() - new Date(student.birth).getTime()) / (365.25 * 24 * 60 * 60 * 1000))
  const genderIcon = student.gender === "M" ? "👨‍🎓" : student.gender === "F" ? "👩‍🎓" : "🎓"
  const guardiansCount = student.guardians.length

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <CardTitle className="text-lg leading-tight flex items-center gap-2">
              <span>{genderIcon}</span>
              {student.firstname} {student.name}
            </CardTitle>
            <CardDescription className="text-sm flex items-center gap-2">
              <Calendar className="h-3 w-3" />
              {age} ans • Né(e) le {new Date(student.birth).toLocaleDateString()}
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="default" className="text-xs">
              {student.actual_level.level.name}
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
                    <Link href={`/admin/students/${student.id}`}>
                      <Eye className="mr-2 h-4 w-4" />
                      Voir
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/students/${student.id}/edit`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Éditer
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href={`/admin/students/${student.id}/delete`}
                      className="text-destructive focus:text-destructive"
                    >
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
            <UserCheck className="h-4 w-4 shrink-0" />
            <span>
              Genre: {student.gender === "M" ? "Masculin" : student.gender === "F" ? "Féminin" : "Non spécifié"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <GraduationCap className="h-4 w-4 shrink-0" />
            <span>Niveau: {student.actual_level.level.name}</span>
            <Badge variant="outline" className="text-xs">
              {student.actual_level.year.name}
            </Badge>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4 shrink-0" />
            <span>
              {guardiansCount} tuteur{guardiansCount > 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Tuteurs */}
        {student.guardians.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Tuteurs :</h4>
            <div className="space-y-1">
              {student.guardians.slice(0, 2).map((guardian) => (
                <div key={guardian.id} className="text-sm text-muted-foreground flex items-center justify-between">
                  <span>
                    {guardian.firstname} {guardian.name}
                  </span>
                  <span className="text-xs">{guardian.phone}</span>
                </div>
              ))}
              {student.guardians.length > 2 && (
                <div className="text-xs text-muted-foreground">+{student.guardians.length - 2} autres</div>
              )}
            </div>
          </div>
        )}

        {/* Historique des niveaux */}
        {student.historic_levels.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Historique :</h4>
            <div className="text-sm text-muted-foreground">
              {student.historic_levels.length} niveau{student.historic_levels.length > 1 ? "x" : ""} précédent
              {student.historic_levels.length > 1 ? "s" : ""}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <div className="text-xs text-muted-foreground">
            Inscrit le {new Date(student.created_at).toLocaleDateString()}
          </div>

          <Button variant="outline" size="sm" asChild>
            <Link href={variant === "admin" ? `/admin/students/${student.id}` : `/students/${student.id}`}>
              <Eye className="mr-2 h-4 w-4" />
              Voir détails
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
