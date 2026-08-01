import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"

import { NewsletterFigure } from "@/components/newsletter/newsletter-figure"
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
      className="scroll-mt-24 overflow-hidden border border-gray-200 bg-white shadow-sm"
    >
      <div className="grid lg:grid-cols-5">
        <NewsletterFigure
          image={project.image}
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="aspect-[16/10] w-full lg:col-span-2 lg:aspect-auto lg:min-h-full"
        />

        <div className="p-6 sm:p-8 lg:col-span-3">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#c61d4d]">
            {project.category}
          </p>

          <h4
            id={`${project.id}-titre`}
            className="mb-4 text-2xl font-black tracking-tight text-[#3d1f47] sm:text-3xl"
          >
            {project.name}
          </h4>

          <p className="mb-5 text-base leading-relaxed text-gray-700">{project.summary}</p>

          {project.locations && project.locations.length > 0 && (
            <p className="mb-6 flex items-start gap-2 text-sm text-gray-600">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#00d4aa]" aria-hidden="true" />
              <span>
                <span className="font-semibold">Territoires : </span>
                {project.locations.join(", ")}
              </span>
            </p>
          )}

          {project.achievements.map((group) => (
            <div key={group.period} className="mb-6 last:mb-0">
              <h5 className="mb-3 border-b border-gray-200 pb-2 text-sm font-bold uppercase tracking-wide text-[#3d1f47]">
                {group.periodLabel}
              </h5>
              <ul className="space-y-2">
                {group.items.map((item, index) => (
                  <li key={index} className="flex gap-3 text-base leading-relaxed text-gray-700">
                    <span
                      className="mt-2 h-1.5 w-1.5 flex-shrink-0 bg-[#c61d4d]"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {project.partnerNames && project.partnerNames.length > 0 && (
            <p className="mt-6 border-t border-gray-200 pt-4 text-sm text-gray-600">
              <span className="font-semibold text-[#3d1f47]">Partenaires : </span>
              {project.partnerNames.join(" · ")}
            </p>
          )}

          {externalPageHref && (
            <Link
              href={externalPageHref}
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-[#c61d4d] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c61d4d]"
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
    <section id="axes" aria-labelledby="axes-titre" className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2
            id="axes-titre"
            className="mb-3 text-3xl font-black tracking-tight text-[#3d1f47] sm:text-4xl"
          >
            Les grands axes d&apos;intervention
          </h2>
          <div className="mb-14 h-1 w-20 bg-[#c61d4d]" aria-hidden="true" />

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
                  <div className="mb-8 border-l-4 border-[#ffd23f] pl-5">
                    <p className="mb-1 text-xs font-bold uppercase tracking-wide text-[#c61d4d]">
                      Axe {axis.number}
                    </p>
                    <h3
                      id={`${axis.id}-titre`}
                      className="mb-3 text-2xl font-black tracking-tight text-[#3d1f47] sm:text-3xl"
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
                    <p className="mt-6 border-l-4 border-[#ffd23f] bg-[#fffbee] p-5 text-sm leading-relaxed text-gray-700">
                      <span className="font-bold text-[#3d1f47]">
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
      </div>
    </section>
  )
}
