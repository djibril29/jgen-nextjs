import { StatBlock, TricolorRule } from "@/components/patterns/editorial"
import { EditorialColumn } from "@/components/patterns/layout"
import {
  LIGGEYAL_ELEG_TARGET,
  newsletterSemesterOne2026 as data,
} from "@/content/newsletter-semestre-1-2026"

export function NewsletterStats() {
  const { statistics } = data

  return (
    // Aplat plum tres clair : le bilan chiffre est la seule section de la page a
    // ne pas etre du recit, et cette bande de couleur le detache sans avoir a
    // l'enfermer dans un cadre.
    <section
      id="chiffres"
      aria-labelledby="chiffres-titre"
      className="scroll-mt-32 bg-jgen-plum/5 py-16 lg:py-24 xl:scroll-mt-44"
    >
      <EditorialColumn size="wide">
        <div className="mb-14 text-center lg:mb-20">
          <p className="eyebrow mb-4 text-jgen-rose">Résultats rapportés</p>
          <h2
            id="chiffres-titre"
            className="mx-auto max-w-[24ch] text-3xl font-extrabold tracking-tight text-balance text-jgen-plum sm:text-4xl lg:text-5xl"
          >
            Les chiffres du semestre
          </h2>
          <TricolorRule align="center" className="mt-7" />
        </div>

        {/* Plus de cartes grises a liseré : le chiffre lui-meme porte le bloc,
            souligne du filet tricolore. Le contexte reste attache a chaque
            valeur — aucune donnee n'est presentee hors de son origine. */}
        <ul className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
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
        <p className="mt-16 max-w-[62rem] border-l-2 border-jgen-jaune py-1 pl-5 text-sm leading-relaxed text-gray-700">
          <span className="font-bold text-jgen-plum">
            À noter — {LIGGEYAL_ELEG_TARGET.value} {LIGGEYAL_ELEG_TARGET.label} :
          </span>{" "}
          {LIGGEYAL_ELEG_TARGET.context}
        </p>
      </EditorialColumn>
    </section>
  )
}
