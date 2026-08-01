import {
  LIGGEYAL_ELEG_TARGET,
  newsletterSemesterOne2026 as data,
} from "@/content/newsletter-semestre-1-2026"

export function NewsletterStats() {
  const { statistics } = data

  return (
    <section
      id="chiffres"
      aria-labelledby="chiffres-titre"
      className="border-b border-gray-200 bg-white py-16 lg:py-20"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2
            id="chiffres-titre"
            className="mb-3 text-3xl font-black tracking-tight text-[#3d1f47] sm:text-4xl"
          >
            Les chiffres du semestre
          </h2>
          <div className="mb-10 h-1 w-20 bg-[#c61d4d]" aria-hidden="true" />

          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {statistics.map((stat) => (
              <li
                key={stat.id}
                className="flex h-full flex-col border-l-4 border-[#c61d4d] bg-gray-50 p-6"
              >
                <p className="font-heading text-4xl leading-none text-[#c61d4d] lg:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-3 text-base font-bold text-[#3d1f47]">{stat.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{stat.context}</p>
              </li>
            ))}
          </ul>

          {/* Volontairement présenté à part : il s'agit d'une cible, pas d'un résultat. */}
          <p className="mt-8 border-l-4 border-[#ffd23f] bg-[#fffbee] p-5 text-sm leading-relaxed text-gray-700">
            <span className="font-bold text-[#3d1f47]">
              À noter — {LIGGEYAL_ELEG_TARGET.value} {LIGGEYAL_ELEG_TARGET.label} :
            </span>{" "}
            {LIGGEYAL_ELEG_TARGET.context}
          </p>
        </div>
      </div>
    </section>
  )
}
