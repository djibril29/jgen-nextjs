import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"

import { RichText } from "@/components/patterns/editorial"
import { EditorialColumn } from "@/components/patterns/layout"
import { MagazineChapter } from "@/components/patterns/magazine"
import {
  newsletterSemesterOne2026 as data,
  type NewsletterProject,
} from "@/content/newsletter-semestre-1-2026"

function ProjectCard({ project, priority }: { project: NewsletterProject; priority?: boolean }) {
  // On ne rend un lien que vers une page réellement existante du site.
  // Les `href` en ancre (« #elles-aussi ») désignent cette section elle-même :
  // ils servent aux liens profonds depuis l'e-mail, pas à un lien interne circulaire.
  const externalPageHref = project.href?.startsWith("/") ? project.href : undefined

  // Le premier paragraphe sert d'accroche sur l'ouverture plein ecran ; il
  // n'est donc pas repete dans la prose qui suit.
  const [lead, ...body] = project.narrative ?? []

  return (
    <article>
      <MagazineChapter
        id={project.id}
        image={project.image}
        eyebrow={project.category}
        title={project.name}
        lead={lead}
        priority={priority}
      />

      <EditorialColumn>
        <div className="py-12 lg:py-16">
          <p className="mb-6 text-lg leading-relaxed text-gray-700">{project.summary}</p>

          {project.locations && project.locations.length > 0 && (
            <p className="mb-6 flex items-start gap-2 text-sm text-gray-600">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-jgen-vert" aria-hidden="true" />
              <span>
                <span className="font-semibold">Territoires : </span>
                {project.locations.join(", ")}
              </span>
            </p>
          )}

          {/* Recit en texte suivi, ecrit depuis les deux rapports
              trimestriels. Les chiffres marques entre doubles crochets dans le
              fichier de contenu ressortent en surlignage. Le releve factuel
              d'origine reste dans `project.achievements`, comme reference de
              verification. */}
          {body.map((paragraph, index) => (
            <RichText key={index}>{paragraph}</RichText>
          ))}

          {project.partnerNames && project.partnerNames.length > 0 && (
            <p className="mt-6 border-t border-gray-200 pt-4 text-sm text-gray-600">
              <span className="font-semibold text-jgen-plum">Partenaires : </span>
              {project.partnerNames.join(" · ")}
            </p>
          )}

          {/* Bouton de section : il mène à la page pilier du projet, qui
              présente le programme et agrège ses articles. Un seul appel à
              l'action par section, pour ne pas diluer le clic. */}
          {project.programHref ? (
            <Link
              href={project.programHref}
              className="mt-8 inline-flex items-center gap-2 bg-jgen-plum px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-jgen-rose focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jgen-rose"
            >
              {project.programCta ?? `Découvrir ${project.name}`}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          ) : (
            externalPageHref && (
              <Link
                href={externalPageHref}
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-jgen-rose underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jgen-rose"
              >
                En savoir plus sur {project.name}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            )
          )}
        </div>
      </EditorialColumn>
    </article>
  )
}

export function NewsletterAxes() {
  const { axes, projects, assisesPlannedDates } = data

  // Les ouvertures de chapitre sont pleine largeur : elles ne peuvent pas etre
  // enfermees dans la colonne editoriale. Seuls les intertitres d'axe et la
  // prose le sont.
  let chapterIndex = 0

  return (
    <>
      <section id="axes" aria-labelledby="axes-titre" className="scroll-mt-24">
        <EditorialColumn size="wide">
          <div className="py-10 lg:py-14">
            <h2
              id="axes-titre"
              className="mb-3 text-3xl font-extrabold tracking-tight text-jgen-plum sm:text-4xl"
            >
              Les grands axes d&apos;intervention
            </h2>
            <div className="h-1 w-20 bg-jgen-rose" aria-hidden="true" />
          </div>
        </EditorialColumn>

        <div>
          {axes.map((axis) => {
            const axisProjects = axis.projectIds
              .map((id) => projects.find((project) => project.id === id))
              .filter((project): project is NewsletterProject => Boolean(project))

            return (
              <section
                key={axis.id}
                id={axis.id}
                aria-labelledby={`${axis.id}-titre`}
                className="scroll-mt-24"
              >
                <EditorialColumn>
                  <div className="border-l-4 border-jgen-jaune py-8 pl-5">
                    <p className="eyebrow mb-1 text-jgen-rose">Axe {axis.number}</p>
                    <h3
                      id={`${axis.id}-titre`}
                      className="mb-3 text-2xl font-extrabold tracking-tight text-jgen-plum sm:text-3xl"
                    >
                      {axis.title}
                    </h3>
                    <p className="text-lg leading-relaxed text-gray-700">{axis.intro}</p>
                  </div>
                </EditorialColumn>

                {axisProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    priority={chapterIndex++ === 0}
                  />
                ))}

                {/* Les dates des Assises sont prévisionnelles : mention explicite. */}
                {axis.projectIds.includes("assises") && (
                  <EditorialColumn>
                    <p className="mb-12 border-l-2 border-jgen-jaune py-1 pl-5 text-sm leading-relaxed text-gray-700">
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
        </div>
      </section>
    </>
  )
}
