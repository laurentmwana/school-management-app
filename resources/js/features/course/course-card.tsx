"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { CourseModel } from "@/types/model"
import { MoreHorizontal, Eye, Edit, Trash2, BookOpen, GraduationCap, Award } from "lucide-react"
import { Link } from "@inertiajs/react"

interface CourseCardProps {
  course: CourseModel
  variant?: "admin" | "other"
}

export function CourseCard({ course, variant = "other" }: CourseCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <CardTitle className="text-lg leading-tight">{course.name}</CardTitle>
            <CardDescription className="text-sm">
              <span className="font-medium">{course.alias}</span>
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {course.credits} crédit{course.credits > 1 ? "s" : ""}
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
                    <Link href={`/admin/courses/${course.id}`}>
                      <Eye className="mr-2 h-4 w-4" />
                      Voir
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/courses/${course.id}/edit`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Éditer
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href={`/admin/courses/${course.id}/delete`}
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
            <GraduationCap className="h-4 w-4 shrink-0" />
            <span>Niveau: {course.level.name}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BookOpen className="h-4 w-4 shrink-0" />
            <span>Cycle: {course.level.cycle}</span>
            {course.level.sub_cycle && (
              <>
                <span>•</span>
                <span>{course.level.sub_cycle}</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Award className="h-4 w-4 shrink-0" />
            <span>École: {course.level.school.name}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="text-xs text-muted-foreground">
            Créé le {new Date(course.created_at).toLocaleDateString()}
          </div>

          <Button variant="outline" size="sm" asChild>
            <Link href={variant === "admin" ? `/admin/courses/${course.id}` : `/courses/${course.id}`}>
              <Eye className="mr-2 h-4 w-4" />
              Voir détails
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
