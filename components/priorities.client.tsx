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

  // Fonction pour limiter le nombre de mots
  const truncateText = (text: string, maxWords: number = 15) => {
    const words = text.split(' ')
    if (words.length <= maxWords) return text
    return words.slice(0, maxWords).join(' ') + '...'
  }

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div
          ref={titleReveal.ref}
          className={`text-center mb-16 scroll-reveal-scale ${titleReveal.isVisible ? "is-visible" : ""}`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900">Nos programmes</h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {programs.map((program, index) => {
            const reveal = cardReveals[index]
            return (
              <Link key={program._id} href={`/programs/${program.slug}`} className="group h-full">
                <div
                  ref={reveal.ref}
                  className={`h-full scroll-reveal delay-${(index + 1) * 100} ${reveal.isVisible ? "is-visible" : ""}`}
                >
                  <div className="relative h-full">
                    {/* Decorative squares - similar to mission section */}
                    <div className="absolute -top-4 -left-4 w-20 h-20 bg-[#c61d4d] opacity-80 z-0" />
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#ffd23f] opacity-90 z-0 rotate-12" />
                    <div className="absolute top-1/2 -right-2 w-16 h-16 bg-[#8c80f7] opacity-70 z-0" />
                    
                    <Card className="relative h-full border-0 shadow-lg hover:shadow-2xl transition-all overflow-hidden bg-white flex flex-col z-10">
                      <div className="aspect-square overflow-hidden flex-shrink-0">
                        <img
                          src={program.featuredImage ? urlFor(program.featuredImage).width(800).height(800).url() : "/placeholder.svg"}
                          alt={program.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <CardContent className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl md:text-2xl font-bold mb-3 leading-tight text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                          {program.title}
                        </h3>
                        {program.summary ? (
                          <p className="text-base text-gray-600 leading-relaxed line-clamp-3">
                            {program.summary}
                          </p>
                        ) : (
                          <div className="flex-grow" />
                        )}
                      </CardContent>
                    </Card>
                  </div>
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
            className="bg-primary hover:bg-primary/90 text-white font-bold text-base px-10 py-6"
          >
            <Link href="/programs">
              Voir tous nos programmes
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}


