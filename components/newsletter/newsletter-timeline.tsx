import { newsletterSemesterOne2026 as data } from "@/content/newsletter-semestre-1-2026"

/**
 * Chronologie du semestre.
 * Entièrement en HTML sémantique et CSS : aucun JavaScript n'est requis pour
 * accéder au contenu, qui est intégralement présent dans le DOM initial.
 */
export function NewsletterTimeline() {
  const { timeline } = data

  return (
    <section
      id="chronologie"
      aria-labelledby="chronologie-titre"
      className="bg-white py-16 lg:py-24"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2
            id="chronologie-titre"
            className="mb-3 text-3xl font-black tracking-tight text-jgen-plum sm:text-4xl"
          >
            Chronologie du semestre
          </h2>
          <div className="mb-12 h-1 w-20 bg-jgen-rose" aria-hidden="true" />

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            {timeline.map((block) => (
              <section key={block.id} aria-labelledby={`${block.id}-titre`}>
                <div className="mb-6">
                  <p className="text-xs font-bold uppercase tracking-wide text-jgen-rose">
                    {block.label}
                  </p>
                  <h3
                    id={`${block.id}-titre`}
                    className="text-2xl font-black tracking-tight text-jgen-plum"
                  >
                    {block.period}
                  </h3>
                </div>

                <ol className="border-l-2 border-gray-200">
                  {block.entries.map((entry, index) => (
                    <li key={index} className="relative pb-7 pl-7 last:pb-0">
                      <span
                        className="absolute top-1.5 -left-[7px] h-3 w-3 rounded-full border-2 border-white bg-jgen-rose"
                        aria-hidden="true"
                      />
                      <p className="mb-1 text-base font-bold text-jgen-plum">{entry.label}</p>
                      <p className="text-base leading-relaxed text-gray-700">{entry.text}</p>
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
