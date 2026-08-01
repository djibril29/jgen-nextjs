import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"

import { NewsletterFigure } from "@/components/newsletter/newsletter-figure"
import { EditorialColumn } from "@/components/patterns/layout"
import {
  newsletterSemesterOne2026 as data,
  type NewsletterProject,
} from "@/content/newsletter-semestre-1-2026"

function ProjectCard({ project }: { project: NewsletterProject }) {
  // On ne rend un lien que vers une page réellement existante du site.
  // Les `href` en ancre (« #elles-aussi ») désignent cette section elle-même :
  // ils servent aux liens profonds depuis l'e-mail, pas à un lien interne circulaire.
  const externalPageHref = project.href?.startsWith("/") ? project.href : undefined

  return (
    <article
      id={project.id}
      aria-labelledby={`${project.id}-titre`}
      className="scroll-mt-24"
    >
      <div className="grid gap-6 lg:grid-cols-5 lg:gap-10">
        <NewsletterFigure
          image={project.image}
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="aspect-[16/10] w-full lg:col-span-2 lg:aspect-[4/3]"
        />

        {/* Le contenu coule sur la page : plus de fond blanc ni de liseré
            gris, qui ne faisaient qu'enfermer sans rien apporter. */}
        <div className="lg:col-span-3">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-jgen-rose">
            {project.category}
          </p>

          <h4
            id={`${project.id}-titre`}
            className="mb-4 text-2xl font-black tracking-tight text-jgen-plum sm:text-3xl"
          >
            {project.name}
          </h4>

          <p className="mb-5 text-base leading-relaxed text-gray-700">{project.summary}</p>

          {project.locations && project.locations.length > 0 && (
            <p className="mb-6 flex items-start gap-2 text-sm text-gray-600">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-jgen-vert" aria-hidden="true" />
              <span>
                <span className="font-semibold">Territoires : </span>
                {project.locations.join(", ")}
              </span>
            </p>
          )}

          {project.achievements.map((group) => (
            <div key={group.period} className="mb-6 last:mb-0">
              <h5 className="mb-3 border-b border-gray-200 pb-2 text-sm font-bold uppercase tracking-wide text-jgen-plum">
                {group.periodLabel}
              </h5>
              {/* Glyphes de puce retires, structure de liste conservee pour
                  les lecteurs d'ecran. Chaque realisation respire, separee
                  d'un filet fin au lieu d'un point. La reecriture en texte
                  suivi suivra les rapports trimestriels source. */}
              <ul className="list-none">
                {group.items.map((item, index) => (
                  <li
                    key={index}
                    className="border-b border-gray-200/70 py-2.5 text-base leading-relaxed text-gray-700 last:border-b-0 last:pb-0"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {project.partnerNames && project.partnerNames.length > 0 && (
            <p className="mt-6 border-t border-gray-200 pt-4 text-sm text-gray-600">
              <span className="font-semibold text-jgen-plum">Partenaires : </span>
              {project.partnerNames.join(" · ")}
            </p>
          )}

          {externalPageHref && (
            <Link
              href={externalPageHref}
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-jgen-rose underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jgen-rose"
            >
              En savoir plus sur {project.name}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}

export function NewsletterAxes() {
  const { axes, projects, assisesPlannedDates } = data

  return (
    <EditorialColumn size="wide">
      <section id="axes" aria-labelledby="axes-titre" className="scroll-mt-24 py-10 lg:py-14">
        <div>
          <h2
            id="axes-titre"
            className="mb-3 text-3xl font-extrabold tracking-tight text-jgen-plum sm:text-4xl"
          >
            Les grands axes d&apos;intervention
          </h2>
          <div className="mb-14 h-1 w-20 bg-jgen-rose" aria-hidden="true" />

          <div className="space-y-16 lg:space-y-20">
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
                  <div className="mb-8 border-l-4 border-jgen-jaune pl-5">
                    <p className="mb-1 text-xs font-bold uppercase tracking-wide text-jgen-rose">
                      Axe {axis.number}
                    </p>
                    <h3
                      id={`${axis.id}-titre`}
                      className="mb-3 text-2xl font-black tracking-tight text-jgen-plum sm:text-3xl"
                    >
                      {axis.title}
                    </h3>
                    <p className="max-w-3xl text-lg leading-relaxed text-gray-700">{axis.intro}</p>
                  </div>

                  <div className="space-y-8">
                    {axisProjects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>

                  {/* Les dates des Assises sont prévisionnelles : mention explicite. */}
                  {axis.projectIds.includes("assises") && (
                    <p className="mt-8 border-l-2 border-jgen-jaune py-1 pl-5 text-sm leading-relaxed text-gray-700">
                      <span className="font-bold text-jgen-plum">
                        {assisesPlannedDates.label} : {assisesPlannedDates.value}.
                      </span>{" "}
                      {assisesPlannedDates.disclaimer}
                    </p>
                  )}
                </section>
              )
            })}
          </div>
        </div>
      </section>
    </EditorialColumn>
  )
}
