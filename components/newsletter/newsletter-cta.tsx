import Link from "next/link"

import { TricolorRule } from "@/components/patterns/editorial"
import { EditorialColumn } from "@/components/patterns/layout"
import { Button } from "@/components/ui/button"
import { newsletterSemesterOne2026 as data } from "@/content/newsletter-semestre-1-2026"

export function NewsletterCta() {
  const { conclusion, links, cta } = data

  return (
    <section
      id="agir"
      aria-labelledby="agir-titre"
      className="scroll-mt-32 py-16 lg:py-24 xl:scroll-mt-44"
    >
      <EditorialColumn>
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="agir-titre"
            className="text-3xl font-extrabold tracking-tight text-jgen-plum sm:text-4xl lg:text-5xl"
          >
            Poursuivons ensemble
          </h2>
          <TricolorRule align="center" className="mt-7 mb-8" />

          <p className="mb-10 text-lg leading-relaxed text-pretty text-gray-700">{conclusion}</p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row sm:flex-wrap">
            <Button
              asChild
              size="lg"
              className="h-auto bg-jgen-rose px-8 py-6 text-base font-bold text-white hover:bg-[#b01a45]"
            >
              <Link href={links.programs}>{cta.projects}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-auto border-2 border-jgen-plum px-8 py-6 text-base font-bold text-jgen-plum hover:bg-jgen-plum hover:text-white"
            >
              <Link href={links.contact}>{cta.contact}</Link>
            </Button>
          </div>
        </div>
      </EditorialColumn>
    </section>
  )
}
