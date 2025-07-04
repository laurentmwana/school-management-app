"use client"

import type { GuardianModel } from "@/types/model"
import { GuardianCard } from "./guardian-card"

interface GuardianCardCollectionProps {
  guardians: GuardianModel[]
  variant?: "admin" | "other"
}

export function GuardianCardCollection({ guardians, variant = "other" }: GuardianCardCollectionProps) {
  if (guardians.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground">
          <div className="text-lg font-medium mb-2">Aucun tuteur trouvé</div>
          <p className="text-sm">Il n'y a pas encore de tuteurs enregistrés.</p>
        </div>
      </div>
    )
  }

  // Statistiques
  const totalStudents = guardians.reduce((sum, guardian) => sum + guardian.students.length, 0)
  const averageStudentsPerGuardian = totalStudents / guardians.length

  return (
    <div className="space-y-6">
      {/* Statistiques */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-card p-4 rounded-lg border">
          <div className="text-2xl font-bold text-primary">{guardians.length}</div>
          <div className="text-sm text-muted-foreground">Tuteurs totaux</div>
        </div>
        <div className="bg-card p-4 rounded-lg border">
          <div className="text-2xl font-bold text-primary">{totalStudents}</div>
          <div className="text-sm text-muted-foreground">Étudiants sous tutelle</div>
        </div>
        <div className="bg-card p-4 rounded-lg border">
          <div className="text-2xl font-bold text-primary">{averageStudentsPerGuardian.toFixed(1)}</div>
          <div className="text-sm text-muted-foreground">Moyenne par tuteur</div>
        </div>
      </div>

      {/* Collection des tuteurs */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {guardians.map((guardian) => (
          <GuardianCard key={guardian.id} guardian={guardian} variant={variant} />
        ))}
      </div>
    </div>
  )
}
