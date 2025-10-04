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
          {items.map((item, index) => {
            const reveal = cardReveals[index]
            return (
              <Link key={item._id} href={`/blog/${item.slug}`} className="group">
                <div
                  ref={reveal.ref}
                  className={`scroll-reveal delay-${(index + 1) * 100} ${reveal.isVisible ? "is-visible" : ""}`}
                >
                  <Card className="h-full border-0 shadow-md hover:shadow-2xl transition-all overflow-hidden">
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img
                        src={item.image ? urlFor(item.image).width(1200).height(750).url() : "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover image-zoom group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 flex gap-2">
                        {item.tags?.map((tag, idx) => (
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
