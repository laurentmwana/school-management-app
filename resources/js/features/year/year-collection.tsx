"use client"

import type { YearModel } from "@/types/model"
import { YearCard } from "./year-card"

interface YearCardCollectionProps {
  years: YearModel[]
  variant?: "admin" | "other"
}

export function YearCardCollection({ years, variant = "other" }: YearCardCollectionProps) {
  if (years.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground">
          <div className="text-lg font-medium mb-2">Aucune année trouvée</div>
          <p className="text-sm">Il n'y a pas encore d'années enregistrées.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {years.map((year) => (
        <YearCard key={year.id} year={year} variant={variant} />
      ))}
    </div>
  )
}
