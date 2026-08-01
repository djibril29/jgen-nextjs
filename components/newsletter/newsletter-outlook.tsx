import { newsletterSemesterOne2026 as data } from "@/content/newsletter-semestre-1-2026"

/** Enseignements tirés du semestre et perspectives pour la suite. */
export function NewsletterOutlook() {
  const { lessons, perspectives, partners } = data

  return (
    <section
      id="enseignements"
      aria-labelledby="enseignements-titre"
      className="bg-gradient-to-br from-[#3d1f47] to-[#2d1537] py-16 lg:py-24"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2
                id="enseignements-titre"
                className="mb-3 text-3xl font-black tracking-tight text-white sm:text-4xl"
              >
                Les enseignements
              </h2>
              <div className="mb-8 h-1 w-20 bg-[#ffd23f]" aria-hidden="true" />
              <ul className="space-y-4">
                {lessons.map((lesson, index) => (
                  <li key={index} className="flex gap-4 text-base leading-relaxed text-white/90">
                    <span
                      className="mt-2 h-1.5 w-1.5 flex-shrink-0 bg-[#ffd23f]"
                      aria-hidden="true"
                    />
                    <span>{lesson}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2
                id="perspectives-titre"
                className="mb-3 text-3xl font-black tracking-tight text-white sm:text-4xl"
              >
                Les perspectives
              </h2>
              <div className="mb-8 h-1 w-20 bg-[#00d4aa]" aria-hidden="true" />
              <ul className="space-y-4" aria-labelledby="perspectives-titre">
                {perspectives.map((perspective, index) => (
                  <li key={index} className="flex gap-4 text-base leading-relaxed text-white/90">
                    <span
                      className="mt-2 h-1.5 w-1.5 flex-shrink-0 bg-[#00d4aa]"
                      aria-hidden="true"
                    />
                    <span>{perspective}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-14 border-t border-white/20 pt-10">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-[#ffd23f]">
              Partenaires cités dans les rapports du semestre
            </h3>
            <ul className="flex flex-wrap gap-3">
              {partners.map((partner) => (
                <li
                  key={partner}
                  className="border border-white/25 px-4 py-2 text-sm text-white/90"
                >
                  {partner}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
