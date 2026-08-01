import { Calendar, MapPin } from "lucide-react"

import { NewsletterFigure } from "@/components/newsletter/newsletter-figure"
import { EditorialColumn } from "@/components/patterns/layout"
import { newsletterSemesterOne2026 as data } from "@/content/newsletter-semestre-1-2026"

export function NewsletterHighlights() {
  const { highlights } = data

  return (
    <EditorialColumn size="wide">
      <section
        id="temps-forts"
        aria-labelledby="temps-forts-titre"
        className="scroll-mt-24 py-10 lg:py-14"
      >
        <div>
          <h2
            id="temps-forts-titre"
            className="mb-3 text-3xl font-extrabold tracking-tight text-jgen-plum sm:text-4xl"
          >
            Les temps forts
          </h2>
          <div className="mb-12 h-1 w-20 bg-jgen-rose" aria-hidden="true" />

          {/* Deux colonnes plutot que trois : dans une colonne editoriale, une
              grille de trois cartes redevient une rangee de blocs serres. */}
          <div className="grid gap-6 sm:grid-cols-2">
            {highlights.map((highlight) => (
              <article
                key={highlight.id}
                id={highlight.id}
                aria-labelledby={`${highlight.id}-titre`}
                className="flex h-full scroll-mt-24 flex-col"
              >
                <NewsletterFigure
                  image={highlight.image}
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="aspect-[16/9] w-full"
                />

                {/* Aplat plein plutot que boite blanche cerclee de gris : la
                    couleur porte la carte, aucun liseré n'est necessaire.
                    Blanc sur plum = 14.14 de contraste. */}
                <div className="flex flex-1 flex-col bg-jgen-plum p-6 text-white">
                  <h3 id={`${highlight.id}-titre`} className="mb-3 text-xl font-bold text-white">
                    {highlight.title}
                  </h3>

                  {(highlight.date || highlight.place) && (
                    <p className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/75">
                      {highlight.date && (
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="h-4 w-4 text-jgen-jaune" aria-hidden="true" />
                          {highlight.date}
                        </span>
                      )}
                      {highlight.place && (
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-4 w-4 text-jgen-jaune" aria-hidden="true" />
                          {highlight.place}
                        </span>
                      )}
                    </p>
                  )}

                  <p className="mb-4 text-base leading-relaxed text-white/90">{highlight.body}</p>

                  {/* Puces remplacees par des lignes separees d'un filet fin.
                      La reecriture en texte suivi suivra les rapports source. */}
                  {highlight.details && highlight.details.length > 0 && (
                    <ul className="mt-auto list-none border-t border-white/20 pt-4">
                      {highlight.details.map((detail, index) => (
                        <li
                          key={index}
                          className="border-b border-white/10 py-2 text-sm leading-relaxed text-white/80 last:border-b-0 last:pb-0"
                        >
                          {detail}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </EditorialColumn>
  )
}
