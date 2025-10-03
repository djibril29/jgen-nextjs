"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const newsItems = [
  {
    title: "Lancement du programme d'autonomisation économique des femmes",
    excerpt: "Un nouveau programme pour soutenir les femmes entrepreneures au Sénégal.",
    image: "/community-education-workshop.jpg",
    tags: ["Programme", "Économie"],
    date: "15 Mars 2025",
  },
  {
    title: "Atelier sur les droits juridiques des femmes à Dakar",
    excerpt: "Formation intensive sur l'accès à la justice pour les survivantes de violence.",
    image: "/legal-rights-justice.jpg",
    tags: ["Atelier", "Justice"],
    date: "8 Mars 2025",
  },
  {
    title: "Campagne de sensibilisation dans les écoles",
    excerpt: "Éducation sur l'égalité des genres et la prévention de la violence.",
    image: "/african-women-empowerment-community.jpg",
    tags: ["Éducation", "Sensibilisation"],
    date: "1 Mars 2025",
  },
]

export function NewsSection() {
  const titleReveal = useScrollReveal({ threshold: 0.2 })
  const card1Reveal = useScrollReveal({ threshold: 0.1 })
  const card2Reveal = useScrollReveal({ threshold: 0.1 })
  const card3Reveal = useScrollReveal({ threshold: 0.1 })

  const cardReveals = [card1Reveal, card2Reveal, card3Reveal]

  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div
          ref={titleReveal.ref}
          className={`flex justify-between items-end mb-12 scroll-reveal ${titleReveal.isVisible ? "is-visible" : ""}`}
        >
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance">Nos activités récentes</h2>
          </div>
          <Link href="/blog" className="text-primary hover:underline font-medium text-lg hidden sm:block">
            Découvrir toutes nos actualités →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {newsItems.map((item, index) => {
            const reveal = cardReveals[index]
            return (
              <Link key={index} href="/blog" className="group">
                <div
                  ref={reveal.ref}
                  className={`scroll-reveal delay-${(index + 1) * 100} ${reveal.isVisible ? "is-visible" : ""}`}
                >
                  <Card className="h-full border-0 shadow-md hover:shadow-2xl transition-all overflow-hidden">
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover image-zoom group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 flex gap-2">
                        {item.tags.map((tag, idx) => (
                          <Badge key={idx} variant="secondary" className="bg-background/90 backdrop-blur">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-sm text-muted-foreground mb-2 font-medium">{item.date}</p>
                      <h3 className="text-xl md:text-2xl font-bold mb-2 text-balance group-hover:text-primary transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-base md:text-lg text-muted-foreground leading-relaxed line-clamp-2">
                        {item.excerpt}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="text-center mt-8 sm:hidden">
          <Link href="/blog" className="text-primary hover:underline font-medium text-lg">
            Découvrir toutes nos actualités →
          </Link>
        </div>
      </div>
    </section>
  )
}
