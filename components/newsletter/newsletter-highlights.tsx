import { Calendar, MapPin } from "lucide-react"

import { NewsletterFigure } from "@/components/newsletter/newsletter-figure"
import { newsletterSemesterOne2026 as data } from "@/content/newsletter-semestre-1-2026"

export function NewsletterHighlights() {
  const { highlights } = data

  return (
    <section
      id="temps-forts"
      aria-labelledby="temps-forts-titre"
      className="bg-gray-50 py-16 lg:py-24"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2
            id="temps-forts-titre"
            className="mb-3 text-3xl font-black tracking-tight text-[#3d1f47] sm:text-4xl"
          >
            Les temps forts
          </h2>
          <div className="mb-12 h-1 w-20 bg-[#c61d4d]" aria-hidden="true" />

          <div className="grid gap-8 lg:grid-cols-3">
            {highlights.map((highlight) => (
              <article
                key={highlight.id}
                id={highlight.id}
                aria-labelledby={`${highlight.id}-titre`}
                className="flex h-full scroll-mt-24 flex-col border border-gray-200 bg-white"
              >
                <NewsletterFigure
                  image={highlight.image}
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="aspect-[16/9] w-full"
                />

                <div className="flex flex-1 flex-col p-6">
                  <h3
                    id={`${highlight.id}-titre`}
                    className="mb-3 text-xl font-bold text-[#3d1f47]"
                  >
                    {highlight.title}
                  </h3>

                  {(highlight.date || highlight.place) && (
                    <p className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
                      {highlight.date && (
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="h-4 w-4 text-[#00d4aa]" aria-hidden="true" />
                          {highlight.date}
                        </span>
                      )}
                      {highlight.place && (
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-4 w-4 text-[#00d4aa]" aria-hidden="true" />
                          {highlight.place}
                        </span>
                      )}
                    </p>
                  )}

                  <p className="mb-4 text-base leading-relaxed text-gray-700">{highlight.body}</p>

                  {highlight.details && highlight.details.length > 0 && (
                    <ul className="mt-auto space-y-2 border-t border-gray-200 pt-4">
                      {highlight.details.map((detail, index) => (
                        <li
                          key={index}
                          className="flex gap-3 text-sm leading-relaxed text-gray-700"
                        >
                          <span
                            className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 bg-[#ffd23f]"
                            aria-hidden="true"
                          />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
