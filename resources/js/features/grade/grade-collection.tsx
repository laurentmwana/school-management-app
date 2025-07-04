"use client"

import type { GradeModel } from "@/types/model"
import { GradeCard } from "./grade-card"

interface GradeCardCollectionProps {
  grades: GradeModel[]
  variant?: "admin" | "other"
}

export function GradeCardCollection({ grades, variant = "other" }: GradeCardCollectionProps) {
  if (grades.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground">
          <div className="text-lg font-medium mb-2">Aucune note trouvée</div>
          <p className="text-sm">Il n'y a pas encore de notes enregistrées.</p>
        </div>
      </div>
    )
  }

  // Calcul des statistiques
  const totalGrades = grades.length
  const averageScore = grades.reduce((sum, grade) => sum + grade.score, 0) / totalGrades
  const passedGrades = grades.filter((grade) => grade.score >= 10).length
  const passRate = (passedGrades / totalGrades) * 100

  return (
    <div className="space-y-6">
      {/* Statistiques */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="bg-card p-4 rounded-lg border">
          <div className="text-2xl font-bold text-primary">{totalGrades}</div>
          <div className="text-sm text-muted-foreground">Notes totales</div>
        </div>
        <div className="bg-card p-4 rounded-lg border">
          <div className="text-2xl font-bold text-primary">{averageScore.toFixed(1)}/20</div>
          <div className="text-sm text-muted-foreground">Moyenne générale</div>
        </div>
        <div className="bg-card p-4 rounded-lg border">
          <div className="text-2xl font-bold text-primary">{passedGrades}</div>
          <div className="text-sm text-muted-foreground">Notes ≥ 10</div>
        </div>
        <div className="bg-card p-4 rounded-lg border">
          <div className="text-2xl font-bold text-primary">{passRate.toFixed(1)}%</div>
          <div className="text-sm text-muted-foreground">Taux de réussite</div>
        </div>
      </div>

      {/* Collection des notes */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {grades.map((grade) => (
          <GradeCard key={grade.id} grade={grade} variant={variant} />
        ))}
      </div>
    </div>
  )
}
