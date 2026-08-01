import { EditorialColumn } from "@/components/patterns/layout"
import { StatBlock } from "@/components/patterns/editorial"
import {
  LIGGEYAL_ELEG_TARGET,
  newsletterSemesterOne2026 as data,
} from "@/content/newsletter-semestre-1-2026"

export function NewsletterStats() {
  const { statistics } = data

  return (
    <EditorialColumn size="wide">
      <section id="chiffres" aria-labelledby="chiffres-titre" className="scroll-mt-24 py-10 lg:py-14">
        <h2
          id="chiffres-titre"
          className="mb-3 text-3xl font-extrabold tracking-tight text-jgen-plum sm:text-4xl"
        >
          Les chiffres du semestre
        </h2>
        <div className="mb-12 h-1 w-20 bg-jgen-rose" aria-hidden="true" />

        {/* Plus de cartes grises a liseré : le chiffre lui-meme porte le bloc,
            souligne du filet tricolore. Le contexte reste attache a chaque
            valeur — aucune donnee n'est presentee hors de son origine. */}
        <ul className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
          {statistics.map((stat) => (
            <li key={stat.id}>
              <StatBlock value={stat.value} label={stat.label} />
              <p className="mt-4 max-w-[38ch] text-sm leading-relaxed text-gray-600">
                {stat.context}
              </p>
            </li>
          ))}
        </ul>

        {/* Volontairement présenté à part : il s'agit d'une cible, pas d'un résultat. */}
        <p className="mt-12 border-l-2 border-jgen-jaune py-1 pl-5 text-sm leading-relaxed text-gray-700">
          <span className="font-bold text-jgen-plum">
            À noter — {LIGGEYAL_ELEG_TARGET.value} {LIGGEYAL_ELEG_TARGET.label} :
          </span>{" "}
          {LIGGEYAL_ELEG_TARGET.context}
        </p>
      </section>
    </EditorialColumn>
  )
}
