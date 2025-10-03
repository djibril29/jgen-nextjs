"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { Button } from "@/components/ui/button"

const priorities = [
  {
    title: "Droits des femmes et des filles",
    description:
      "J-GEN SENEGAL, avec une approche intersectionnelle basée sur les droits et la diversité, soutient la revendication des femmes et des filles à l'égalité des droits.",
    image: "/african-women-empowerment-community.jpg",
    href: "/programs",
  },
  {
    title: "Renforcement du pouvoir économique",
    description:
      "Nous misons sur la formation, le développement des entreprises, et l'accès aux services financiers innovants pour l'autonomisation économique des femmes.",
    image: "/community-education-workshop.jpg",
    href: "/programs",
  },
  {
    title: "Lutte contre les violences basées sur le genre",
    description:
      "Nous offrons un soutien complet aux survivantes de violence, incluant des services de conseil, d'aide juridique et d'hébergement sécurisé.",
    image: "/legal-rights-justice.jpg",
    href: "/programs",
  },
  {
    title: "Gouvernance inclusive",
    description:
      "J-GEN SENEGAL soutient les efforts de gouvernance inclusive valorisant le rôle des femmes et des jeunes dans la consolidation de la paix.",
    image: "/women-leadership-empowerment.jpg",
    href: "/programs",
  },
]

export function Priorities() {
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
          {priorities.map((priority, index) => {
            const reveal = cardReveals[index]
            return (
              <Link key={index} href={priority.href} className="group">
                <div
                  ref={reveal.ref}
                  className={`scroll-reveal delay-${(index + 1) * 100} ${reveal.isVisible ? "is-visible" : ""}`}
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all overflow-hidden bg-white">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={priority.image || "/placeholder.svg"}
                        alt={priority.title}
                        className="w-full h-full object-cover image-zoom group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl md:text-2xl font-bold mb-3 text-balance group-hover:text-primary transition-colors">
                        {priority.title}
                      </h3>
                      <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
                        {priority.description}
                      </p>
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
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
