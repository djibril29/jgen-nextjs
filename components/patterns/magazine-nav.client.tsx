"use client"

import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

export type MagazineChapterLink = { id: string; label: string }

/**
 * Barre de chapitres du magazine.
 *
 * Reste faite de liens d'ancrage : la navigation fonctionne meme sans
 * JavaScript et chaque chapitre garde une URL partageable. Le JavaScript
 * n'ajoute que la mise en evidence du chapitre courant et la barre de
 * progression — aucune fonctionnalite n'en depend.
 */
export function MagazineNav({ chapters }: { chapters: MagazineChapterLink[] }) {
  const [active, setActive] = useState<string>(chapters[0]?.id ?? "")
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const sections = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter((node): node is HTMLElement => Boolean(node))

    const observer = new IntersectionObserver(
      (entries) => {
        // On retient la section la plus haute parmi celles visibles, sinon
        // deux sections qui se chevauchent se disputent l'etat actif.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: "-20% 0px -70% 0px" },
    )

    sections.forEach((section) => observer.observe(section))

    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", onScroll)
    }
  }, [chapters])

  return (
    <nav
      aria-label="Chapitres de la newsletter"
      className="sticky top-0 z-40 border-b border-white/10 bg-jgen-plum/95 backdrop-blur"
    >
      <ul className="mx-auto flex max-w-[60rem] list-none gap-1 overflow-x-auto px-3 py-2.5 sm:gap-2 sm:px-6">
        {chapters.map((chapter, index) => {
          const isActive = active === chapter.id
          return (
            <li key={chapter.id} className="shrink-0">
              <a
                href={`#${chapter.id}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "group relative flex items-baseline gap-2 px-3 py-1.5 text-sm whitespace-nowrap transition-colors duration-300",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jgen-jaune",
                  isActive ? "text-jgen-jaune" : "text-white/60 hover:text-white",
                )}
              >
                <span className="font-heading text-xs tabular-nums opacity-60">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-medium">{chapter.label}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-3 -bottom-0.5 h-0.5 origin-left bg-jgen-jaune transition-transform duration-300 ease-out motion-reduce:transition-none",
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  )}
                />
              </a>
            </li>
          )
        })}
      </ul>

      {/* Progression de lecture. Purement indicatif, donc masque aux
          technologies d'assistance. */}
      <div aria-hidden="true" className="h-0.5 w-full bg-white/10">
        <div
          className="h-full bg-jgen-jaune transition-[width] duration-150 ease-out motion-reduce:transition-none"
          style={{ width: `${progress}%` }}
        />
      </div>
    </nav>
  )
}
