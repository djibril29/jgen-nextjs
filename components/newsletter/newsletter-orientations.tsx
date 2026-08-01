import { newsletterSemesterOne2026 as data } from "@/content/newsletter-semestre-1-2026"

export function NewsletterOrientations() {
  const { intro, orientations } = data

  return (
    <section
      id="orientations"
      aria-labelledby="orientations-titre"
      className="bg-gray-50 py-16 lg:py-24"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <h2
              id="orientations-titre"
              className="mb-3 text-3xl font-black tracking-tight text-[#3d1f47] sm:text-4xl"
            >
              Six mois d&apos;engagement
            </h2>
            <div className="mb-6 h-1 w-20 bg-[#c61d4d]" aria-hidden="true" />
            {intro.web.slice(1).map((paragraph, index) => (
              <p key={index} className="mb-4 text-lg leading-relaxed text-gray-700 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>

          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {orientations.map((orientation) => (
              <li key={orientation.id} className="h-full border-t-4 border-[#00d4aa] bg-white p-6">
                <h3 className="mb-2 text-lg font-bold text-[#3d1f47]">{orientation.title}</h3>
                <p className="text-base leading-relaxed text-gray-700">{orientation.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
