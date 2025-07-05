"use client"

import type { LevelModel } from "@/types/model"
import { LevelCard } from "./level-card"

interface LevelCardCollectionProps {
  levels: LevelModel[]
  variant?: "admin" | "other"
}

export function LevelCardCollection({ levels, variant = "other" }: LevelCardCollectionProps) {
  if (levels.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground">
          <div className="text-lg font-medium mb-2">Aucune classe trouvée</div>
          <p className="text-sm">Il n'y a pas encore de classes enregistrées.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {levels.map((level) => (
        <LevelCard key={level.id} level={level} variant={variant} />
      ))}
    </div>
  )
}
