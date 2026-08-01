import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { ChapterDivider, RichText, TricolorRule } from "@/components/patterns/editorial"
import { EditorialColumn } from "@/components/patterns/layout"
import { ChapterHeading, MagazineChapter } from "@/components/patterns/magazine"
import { FigurePair, MediaSplit } from "@/components/patterns/media"
import {
  newsletterSemesterOne2026 as data,
  type NewsletterAxis,
  type NewsletterProject,
} from "@/content/newsletter-semestre-1-2026"

/**
 * Fiche de reperes du chapitre : territoires couverts, partenaires de mise en
 * oeuvre.
 *
 * Ces deux informations couraient jusqu'ici en petites lignes grises au fil de
 * la prose, ou elles se lisaient comme des notes de bas de page. Detachees dans
 * une colonne laterale sur aplat, elles occupent la moitie droite de la page
 * restee vide et donnent au chapitre sa seconde colonne.
 */
function ChapterFacts({ project }: { project: NewsletterProject }) {
  const hasLocations = Boolean(project.locations?.length)
  const hasPartners = Boolean(project.partnerNames?.length)

  if (!hasLocations && !hasPartners) return null

  return (
    <aside className="bg-jgen-plum p-6 text-white sm:p-7">
      {hasLocations && (
        <>
          <p className="eyebrow mb-3 text-jgen-jaune">Territoires</p>
          <ul className="list-none">
            {project.locations?.map((location) => (
              <li
                key={location}
                className="border-b border-white/15 py-2 text-base leading-snug text-white/90 first:pt-0 last:border-b-0 last:pb-0"
              >
                {location}
              </li>
            ))}
          </ul>
        </>
      )}

      {hasPartners && (
        <>
          <p className={`eyebrow mb-3 text-jgen-jaune ${hasLocations ? "mt-8" : ""}`}>
            Partenaires
          </p>
          <ul className="list-none">
            {project.partnerNames?.map((partner) => (
              <li
                key={partner}
                className="border-b border-white/15 py-2 text-base leading-snug text-white/90 first:pt-0 last:border-b-0 last:pb-0"
              >
                {partner}
              </li>
            ))}
          </ul>
        </>
      )}
    </aside>
  )
}

function ChapterCta({ project }: { project: NewsletterProject }) {
  // On ne rend un lien que vers une page réellement existante du site.
  // Les `href` en ancre (« #elles-aussi ») désignent cette section elle-même :
  // ils servent aux liens profonds depuis l'e-mail, pas à un lien interne circulaire.
  const externalPageHref = project.href?.startsWith("/") ? project.href : undefined

  // Un seul appel à l'action par chapitre, pour ne pas diluer le clic.
  if (project.programHref) {
    return (
      <Link
        href={project.programHref}
        className="inline-flex items-center gap-2 bg-jgen-plum px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-jgen-rose focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jgen-rose"
      >
        {project.programCta ?? `Découvrir ${project.name}`}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    )
  }

  if (!externalPageHref) return null

  return (
    <Link
      href={externalPageHref}
      className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-jgen-rose underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jgen-rose"
    >
      En savoir plus sur {project.name}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  )
}

/**
 * Chapitre de projet.
 *
 * Deux ouvertures alternent d'un chapitre au suivant, `index` decidant laquelle :
 *
 *  - paire   : bandeau pleine largeur, le titre pose sur la photo ;
 *  - impaire : titre centre, puis photo et accroche cote a cote — la photo
 *              passant d'un cote a l'autre tous les deux chapitres.
 *
 * Sept chapitres batis sur le meme gabarit se lisent comme une seule section
 * interminable ; c'est l'alternance, et non l'espacement, qui donne a chacun sa
 * limite visible.
 */
function ProjectChapter({ project, index }: { project: NewsletterProject; index: number }) {
  const opensOnBanner = index % 2 === 0
  const mirrorsSplit = index % 4 === 3

  // Le premier paragraphe sert d'accroche a l'ouverture ; il n'est donc pas
  // repete dans la prose qui suit.
  const [lead, ...body] = project.narrative ?? []
  const facts = <ChapterFacts project={project} />
  const media = project.media ?? []

  return (
    <article
      id={opensOnBanner ? undefined : project.id}
      aria-labelledby={`${project.id}-titre`}
      className="scroll-mt-32 xl:scroll-mt-44"
    >
      {opensOnBanner ? (
        <MagazineChapter
          id={project.id}
          image={project.image}
          eyebrow={project.category}
          title={project.name}
          lead={lead}
          priority={index === 0}
        />
      ) : (
        <EditorialColumn size="wide" className="pt-12 lg:pt-20">
          <ChapterHeading
            id={`${project.id}-titre`}
            eyebrow={project.category}
            title={project.name}
          />

          <MediaSplit
            image={project.image}
            caption={project.imageCaption}
            reverse={mirrorsSplit}
            className="mt-12 lg:mt-16"
          >
            {lead && <RichText className="text-lg">{lead}</RichText>}
          </MediaSplit>
        </EditorialColumn>
      )}

      <EditorialColumn size="wide">
        <div className="grid gap-10 py-12 lg:grid-cols-12 lg:gap-14 lg:py-16">
          <div className={facts ? "lg:col-span-8" : "lg:col-span-10 lg:col-start-2"}>
            <p className="mb-7 max-w-[46rem] text-xl leading-relaxed font-medium text-jgen-plum">
              {project.summary}
            </p>

            {/* Recit en texte suivi, ecrit depuis les deux rapports
                trimestriels. Les chiffres marques entre doubles crochets dans le
                fichier de contenu ressortent en surlignage. Le releve factuel
                d'origine reste dans `project.achievements`, comme reference de
                verification. */}
            <div className="max-w-[46rem]">
              {body.map((paragraph, paragraphIndex) => (
                <RichText key={paragraphIndex}>{paragraph}</RichText>
              ))}
            </div>
          </div>

          {facts && <div className="lg:col-span-4">{facts}</div>}
        </div>

        {media.length > 0 && <FigurePair items={media} className="pb-12 lg:pb-16" />}

        <div className="pb-4">
          <ChapterCta project={project} />
        </div>
      </EditorialColumn>
    </article>
  )
}

/**
 * Ouverture d'axe, en bande pleine largeur.
 *
 * Le numero d'axe passe en tres grand corps : c'est le seul reperage dont le
 * lecteur dispose pour savoir ou il se trouve dans une page de cette longueur.
 * Le jaune et le vert alternent d'un axe au suivant, tous deux avec du texte
 * plum — 9,79 et 7,40 de contraste, AAA l'un comme l'autre. Le rose et le
 * violet sont exclus : ils n'atteignent pas le seuil avec le plum.
 */
function AxisBand({ axis, index }: { axis: NewsletterAxis; index: number }) {
  const tone = index % 2 === 0 ? "bg-jgen-jaune" : "bg-jgen-vert"

  return (
    <div className={`${tone} py-14 text-jgen-plum lg:py-20`}>
      <EditorialColumn size="wide">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-start lg:gap-14">
          <p
            aria-hidden="true"
            className="font-heading tnum text-7xl leading-none font-extrabold text-jgen-plum/25 lg:text-9xl"
          >
            {String(axis.number).padStart(2, "0")}
          </p>

          <div className="lg:pt-2">
            <p className="eyebrow mb-3">Axe d&apos;intervention {axis.number}</p>
            <h3
              id={`${axis.id}-titre`}
              className="max-w-[34ch] text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl"
            >
              {axis.title}
            </h3>
            <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-pretty text-jgen-plum/85">
              {axis.intro}
            </p>
          </div>
        </div>
      </EditorialColumn>
    </div>
  )
}

export function NewsletterAxes() {
  const { axes, projects, assisesPlannedDates } = data

  // Les ouvertures de chapitre en bandeau sont pleine largeur : elles ne peuvent
  // pas etre enfermees dans la colonne editoriale. L'index court d'un axe a
  // l'autre pour que l'alternance des gabarits ne redemarre pas a chaque axe.
  let chapterIndex = 0

  return (
    <section id="axes" aria-labelledby="axes-titre" className="scroll-mt-32 xl:scroll-mt-44">
      <EditorialColumn size="wide">
        <div className="py-14 text-center lg:py-20">
          <p className="eyebrow mb-4 text-jgen-rose">Janvier – juin 2026</p>
          <h2
            id="axes-titre"
            className="mx-auto max-w-[24ch] text-3xl font-extrabold tracking-tight text-balance text-jgen-plum sm:text-4xl lg:text-5xl"
          >
            Les grands axes d&apos;intervention
          </h2>
          <TricolorRule align="center" className="mt-7" />
        </div>
      </EditorialColumn>

      {axes.map((axis, axisIndex) => {
        const axisProjects = axis.projectIds
          .map((id) => projects.find((project) => project.id === id))
          .filter((project): project is NewsletterProject => Boolean(project))

        return (
          <section
            key={axis.id}
            id={axis.id}
            aria-labelledby={`${axis.id}-titre`}
            className="scroll-mt-32 xl:scroll-mt-44"
          >
            <AxisBand axis={axis} index={axisIndex} />

            {axisProjects.map((project, projectIndex) => (
              <div key={project.id}>
                {/* Deux chapitres d'un meme axe se suivent sans bande de couleur
                    entre eux : le separateur segmente marque la coupure quand le
                    second n'ouvre pas sur un bandeau. */}
                {projectIndex > 0 && chapterIndex % 2 !== 0 && <ChapterDivider />}

                <ProjectChapter project={project} index={chapterIndex++} />
              </div>
            ))}

            {/* Les dates des Assises sont prévisionnelles : mention explicite. */}
            {axis.projectIds.includes("assises") && (
              <EditorialColumn size="wide">
                <p className="mb-12 max-w-[62rem] border-l-2 border-jgen-jaune py-1 pl-5 text-sm leading-relaxed text-gray-700">
                  <span className="font-bold text-jgen-plum">
                    {assisesPlannedDates.label} : {assisesPlannedDates.value}.
                  </span>{" "}
                  {assisesPlannedDates.disclaimer}
                </p>
              </EditorialColumn>
            )}
          </section>
        )
      })}
    </section>
  )
}
