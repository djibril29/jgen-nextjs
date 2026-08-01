import Link from "next/link"

import { Button } from "@/components/ui/button"
import { newsletterSemesterOne2026 as data } from "@/content/newsletter-semestre-1-2026"

export function NewsletterCta() {
  const { conclusion, links, cta } = data

  return (
    <section id="agir" aria-labelledby="agir-titre" className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2
            id="agir-titre"
            className="mb-3 text-3xl font-black tracking-tight text-jgen-plum sm:text-4xl"
          >
            Poursuivons ensemble
          </h2>
          <div className="mx-auto mb-8 h-1 w-20 bg-jgen-rose" aria-hidden="true" />

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
              className="h-auto bg-jgen-plum px-8 py-6 text-base font-bold text-white hover:bg-[#2d1537]"
            >
              <Link href={links.contact}>{cta.partner}</Link>
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
      </div>
    </section>
  )
}
