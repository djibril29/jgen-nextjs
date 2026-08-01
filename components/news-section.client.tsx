"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { urlFor } from "@/sanity/lib/image"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export interface NewsItem {
  _id: string
  title: string
  excerpt?: string
  image?: any
  tags?: string[]
  publishedAt?: string
  slug: string
}

export function NewsSectionClient({ items }: { items: NewsItem[] }) {
  const titleReveal = useScrollReveal({ threshold: 0.2 })

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
          {items.map((item, index) => (
            <NewsCard key={item._id} item={item} index={index} />
          ))}
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

/**
 * Décalages écrits en toutes lettres : Tailwind ne génère une utilitaire que
 * s'il en lit le nom dans les sources, et une classe composée à l'exécution lui
 * échappe.
 */
const REVEAL_DELAYS = ["delay-100", "delay-200", "delay-300"] as const

/**
 * Une carte par article. Le hook d'apparition vit ici plutôt que dans le parent :
 * un hook ne peut pas être appelé dans une boucle, et la grille n'a plus un
 * nombre d'articles fixe.
 */
function NewsCard({ item, index }: { item: NewsItem; index: number }) {
  const reveal = useScrollReveal({ threshold: 0.1 })

  // Le décalage suit la colonne, pas le rang : la seconde rangée entre dans le
  // champ de vision séparément et reprend donc le même balayage de gauche à
  // droite.
  const delay = REVEAL_DELAYS[index % REVEAL_DELAYS.length]

  return (
    <Link href={`/blog/${item.slug}`} className="group">
      <div
        ref={reveal.ref}
        className={`scroll-reveal ${delay} ${reveal.isVisible ? "is-visible" : ""}`}
      >
        <Card className="h-full border-0 shadow-md hover:shadow-2xl transition-all overflow-hidden">
          <div className="aspect-[16/10] overflow-hidden relative">
            <img
              src={item.image ? urlFor(item.image).width(1200).height(750).url() : "/placeholder.svg"}
              alt={item.title}
              className="w-full h-full object-cover image-zoom group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3 flex flex-wrap gap-2">
              {/* Deux étiquettes au plus : plusieurs des nouveaux articles en
                  portent trois, qui recouvraient le tiers haut de l'image. */}
              {item.tags?.slice(0, 2).map((tag, idx) => (
                <Badge key={idx} variant="secondary" className="bg-background/90 backdrop-blur">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-2 font-medium">
              {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('fr-FR') : ''}
            </p>
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
}
