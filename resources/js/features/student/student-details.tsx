"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, GraduationCap, Users, Clock, Edit, Trash2, ArrowLeft, Phone, History } from "lucide-react"
import { Link } from "@inertiajs/react"
import { StudentModel } from "@/types/model"

interface StudentCardDetailsProps {
  student: StudentModel
  variant?: "admin" | "other"
}

export function StudentCardDetails({ student, variant = "other" }: StudentCardDetailsProps) {
  const age = Math.floor((Date.now() - new Date(student.birth).getTime()) / (365.25 * 24 * 60 * 60 * 1000))
  const genderIcon = student.gender === "M" ? "👨‍🎓" : student.gender === "F" ? "👩‍🎓" : "🎓"
  const genderLabel = student.gender === "M" ? "Masculin" : student.gender === "F" ? "Féminin" : "Non spécifié"

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href={variant === "admin" ? "/admin/students" : "/students"}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{genderIcon}</span>
            <div>
              <h1 className="text-2xl font-bold">
                {student.firstname} {student.name}
              </h1>
              <p className="text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {age} ans • Né(e) le {new Date(student.birth).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {variant === "admin" && (
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={`/admin/students/${student.id}/edit`}>
                <Edit className="h-4 w-4 mr-2" />
                Éditer
              </Link>
            </Button>
            <Button variant="destructive" asChild>
              <Link href={`/admin/students/${student.id}/delete`}>
                <Trash2 className="h-4 w-4 mr-2" />
                Supprimer
              </Link>
            </Button>
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Informations principales */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informations personnelles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-2">Nom complet</h4>
                  <p className="text-muted-foreground">
                    {student.firstname} {student.name}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Genre</h4>
                  <div className="flex items-center gap-2">
                    <span>{genderIcon}</span>
                    <span className="text-muted-foreground">{genderLabel}</span>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-2">Date de naissance</h4>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{new Date(student.birth).toLocaleDateString()}</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Âge</h4>
                  <p className="text-muted-foreground">{age} ans</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Niveau actuel */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Niveau actuel
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">{student.actual_level.level.name}</div>
                  <Badge variant="default">{student.actual_level.year.name}</Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {student.actual_level.level.alias} • {student.actual_level.level.cycle}
                  {student.actual_level.level.sub_cycle && ` • ${student.actual_level.level.sub_cycle}`}
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  École: {student.actual_level.level.school.name}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Historique des niveaux */}
          {student.historic_levels.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Historique des niveaux ({student.historic_levels.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {student.historic_levels
                    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                    .map((historic) => (
                      <div key={historic.id} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{historic.level.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {historic.level.alias} • {historic.year.name}
                            </div>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {new Date(historic.created_at).getFullYear()}
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tuteurs */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Tuteurs ({student.guardians.length})
                </CardTitle>
                {variant === "admin" && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/students/${student.id}/guardians/add`}>Ajouter tuteur</Link>
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {student.guardians.length > 0 ? (
                <div className="space-y-4">
                  {student.guardians.map((guardian) => (
                    <div key={guardian.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="font-medium flex items-center gap-2">
                            <span>{guardian.gender === "M" ? "👨" : guardian.gender === "F" ? "👩" : "👤"}</span>
                            {guardian.firstname} {guardian.name}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="h-4 w-4" />
                            {guardian.phone}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Tuteur de {guardian.students.length} étudiant{guardian.students.length > 1 ? "s" : ""}
                          </div>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/guardians/${guardian.id}`}>Voir</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Aucun tuteur assigné</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions rapides */}
          {variant === "admin" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                  <Link href={`/admin/students/${student.id}/grades`}>Voir les notes</Link>
                </Button>
                <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                  <Link href={`/admin/students/${student.id}/grades/add`}>Ajouter une note</Link>
                </Button>
                <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                  <Link href={`/admin/students/${student.id}/level/change`}>Changer de niveau</Link>
                </Button>
                <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                  <Link href={`/admin/students/${student.id}/report`}>Bulletin</Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Statistiques */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Statistiques</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{age}</div>
                <div className="text-sm text-muted-foreground">Ans</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{student.historic_levels.length + 1}</div>
                <div className="text-sm text-muted-foreground">Niveaux suivis</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{student.guardians.length}</div>
                <div className="text-sm text-muted-foreground">Tuteurs</div>
              </div>
            </CardContent>
          </Card>

          {/* Métadonnées */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Informations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <div className="text-muted-foreground">Inscrit le</div>
                <div>{new Date(student.created_at).toLocaleDateString()}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Modifié le</div>
                <div>{new Date(student.updated_at).toLocaleDateString()}</div>
              </div>
              <div>
                <div className="text-muted-foreground">ID</div>
                <div className="font-mono">#{student.id}</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
