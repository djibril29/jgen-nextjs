"use client"

import { ArrowRight, CalendarDays, MapPin } from "lucide-react"
import Link from "next/link"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { urlFor } from "@/sanity/lib/image"

export interface ProgramCard {
  _id: string
  title: string
  summary?: string
  slug: string
  featuredImage?: any
  status?: "upcoming" | "ongoing" | "completed"
  executionPeriod?: string
  location?: string
}

/** Libellés du champ `status` du schéma Sanity, repris tels quels. */
const STATUS_LABELS: Record<NonNullable<ProgramCard["status"]>, string> = {
  upcoming: "À venir",
  ongoing: "En cours",
  completed: "Terminé",
}

const REVEAL_DELAYS = ["delay-100", "delay-200"] as const

export function PrioritiesClient({ programs }: { programs: ProgramCard[] }) {
  const titleReveal = useScrollReveal({ threshold: 0.2 })

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8">

        <div
          ref={titleReveal.ref}
          className={`mb-12 scroll-reveal-scale ${titleReveal.isVisible ? "is-visible" : ""}`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
            Nos programmes
          </h2>
          <div className="w-24 h-1 bg-primary mt-4" />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {programs.map((program, index) => (
            <ProgramTile key={program._id} program={program} index={index} />
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/programs"
            className="inline-flex items-center gap-3 bg-jgen-rose hover:bg-jgen-rose/90 text-white font-bold text-sm px-7 py-3 transition-colors"
          >
            Voir tous nos programmes
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </section>
  )
}

/**
 * Carte scindée : le visuel occupe la gauche, un aplat prune porte le texte à
 * droite. Les deux moitiés sont d'égale hauteur — d'où `items-stretch` sur la
 * carte et `h-full` sur l'image, sans quoi une vignette basse laisserait un
 * blanc sous elle.
 */
function ProgramTile({ program, index }: { program: ProgramCard; index: number }) {
  const reveal = useScrollReveal({ threshold: 0.1 })
  const delay = REVEAL_DELAYS[index % REVEAL_DELAYS.length]
  const statusLabel = program.status ? STATUS_LABELS[program.status] : undefined

  return (
    <div
      ref={reveal.ref}
      className={`scroll-reveal ${delay} ${reveal.isVisible ? "is-visible" : ""}`}
    >
      <Link href={`/programs/${program.slug}`} className="group block h-full">
        <article className="flex flex-col sm:flex-row sm:items-stretch h-full overflow-hidden">

          {/* Visuel */}
          <div className="sm:w-2/5 flex-shrink-0 bg-gray-100 overflow-hidden aspect-[4/3] sm:aspect-auto">
            <img
              src={
                program.featuredImage
                  ? urlFor(program.featuredImage).width(700).height(700).url()
                  : "/placeholder.svg"
              }
              alt={program.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Aplat de texte */}
          <div className="sm:w-3/5 bg-jgen-plum text-white p-6 lg:p-8 flex flex-col">
            {statusLabel && (
              <span className="self-start bg-jgen-jaune text-jgen-plum text-xs font-bold uppercase tracking-wide px-3 py-1 mb-4">
                {statusLabel}
              </span>
            )}

            <h3 className="text-xl lg:text-2xl font-bold leading-tight text-balance group-hover:text-jgen-jaune transition-colors line-clamp-3">
              {program.title}
            </h3>

            {program.summary && (
              <p className="mt-3 text-sm lg:text-base text-white/80 leading-relaxed line-clamp-3">
                {program.summary}
              </p>
            )}

            {/* Repoussée en bas pour que toutes les cartes alignent leur méta. */}
            {(program.executionPeriod || program.location) && (
              <div className="mt-auto pt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/70">
                {program.executionPeriod && (
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                    {program.executionPeriod}
                  </span>
                )}
                {program.location && (
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                    {program.location}
                  </span>
                )}
              </div>
            )}
          </div>

        </article>
      </Link>
    </div>
  )
}
