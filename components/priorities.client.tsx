"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { Button } from "@/components/ui/button"
import { urlFor } from "@/sanity/lib/image"

export interface ProgramCard {
  _id: string
  title: string
  summary?: string
  slug: string
  featuredImage?: any
}

export function PrioritiesClient({ programs }: { programs: ProgramCard[] }) {
  const titleReveal = useScrollReveal({ threshold: 0.2 })
  const card1Reveal = useScrollReveal({ threshold: 0.1 })
  const card2Reveal = useScrollReveal({ threshold: 0.1 })
  const card3Reveal = useScrollReveal({ threshold: 0.1 })
  const card4Reveal = useScrollReveal({ threshold: 0.1 })
  const buttonReveal = useScrollReveal({ threshold: 0.2 })
  const cardReveals = [card1Reveal, card2Reveal, card3Reveal, card4Reveal]

  return (
    <section className="py-20 lg:py-32 bg-[#c61d4d]">
      <div className="container mx-auto px-4 lg:px-8">
        <div
          ref={titleReveal.ref}
          className={`text-center mb-16 scroll-reveal-scale ${titleReveal.isVisible ? "is-visible" : ""}`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance text-white">Nos programmes</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {programs.map((program, index) => {
            const reveal = cardReveals[index]
            return (
              <Link key={program._id} href={`/programs/${program.slug}`} className="group">
                <div
                  ref={reveal.ref}
                  className={`scroll-reveal delay-${(index + 1) * 100} ${reveal.isVisible ? "is-visible" : ""}`}
                
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all overflow-hidden bg-white">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={program.featuredImage ? urlFor(program.featuredImage).width(800).height(600).url() : "/placeholder.svg"}
                        alt={program.title}
                        className="w-full h-full object-cover image-zoom group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl md:text-2xl font-bold mb-3 text-balance group-hover:text-primary transition-colors">
                        {program.title}
                      </h3>
                      {program.summary ? (
                        <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
                          {program.summary}
                        </p>
                      ) : null}
                      <div className="flex items-center text-primary text-base font-medium">
                        En savoir plus
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </Link>
            )
          })}
        </div>

        <div
          ref={buttonReveal.ref}
          className={`text-center mt-12 scroll-reveal ${buttonReveal.isVisible ? "is-visible" : ""}`}
        >
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="bg-white text-[#c61d4d] hover:bg-white/90 font-bold text-lg px-8 py-6"
          >
            <Link href="/programs">
              VOIR TOUS NOS PROGRAMMES
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}


