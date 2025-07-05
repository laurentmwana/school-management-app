"use client"

import type { PaginationData } from "@/types/paginate"
import { Button } from "./button"
import { router } from "@inertiajs/react"

export const Pagination = ({
  items,
}: {
  items: PaginationData<any>
}) => {
  if (items.links.length < 4) {
    return null
  }

  const handlePageChange = (url: string | null) => {
    if (url) {
      router.get(url)
    }
  }

  return (
    <nav className="flex items-center justify-between px-4 sm:px-0 mt-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            {items.from && items.to ? (
              <>
                Affichage de <span className="font-medium">{items.from}</span> à{" "}
                <span className="font-medium">{items.to}</span> sur <span className="font-medium">{items.total}</span>{" "}
                résultats
              </>
            ) : (
              <>
                <span className="font-medium">{items.total}</span> résultats au total
              </>
            )}
          </p>
        </div>
        <div>
          <ul className="inline-flex -space-x-px text-sm gap-2">
            {items.links.map((link, index) => (
              <li key={index}>
                <Button
                  onClick={() => handlePageChange(link.url)}
                  size="sm"
                  variant={link.active ? "default" : "secondary"}
                  disabled={!link.url}
                  className={!link.url ? "opacity-50 cursor-not-allowed" : ""}
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: link.label,
                    }}
                  />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Version mobile */}
      <div className="flex flex-1 justify-between sm:hidden">
        <Button
          onClick={() => handlePageChange(items.prev_page_url)}
          size="sm"
          variant="secondary"
          disabled={!items.prev_page_url}
        >
          Précédent
        </Button>
        <div className="flex items-center">
          <p className="text-sm text-muted-foreground">
            Page {items.current_page} sur {items.last_page}
          </p>
        </div>
        <Button
          onClick={() => handlePageChange(items.next_page_url)}
          size="sm"
          variant="secondary"
          disabled={!items.next_page_url}
        >
          Suivant
        </Button>
      </div>
    </nav>
  )
}
