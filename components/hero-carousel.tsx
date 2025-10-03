"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

const slides = [
  {
    id: 1,
    image: "/empowered-african-women-standing-together-in-solid.jpg",
    category: "Actualité",
    title: "Renforcer le pouvoir des femmes. Soutenir les communautés.",
    description:
      "J-GEN SENEGAL œuvre pour un Sénégal où les femmes et les filles vivent libres de toute violence et discrimination.",
    link: "/about",
    linkText: "Découvrir notre action",
  },
  {
    id: 2,
    image: "/african-women-in-community-meeting-discussing-righ.jpg",
    category: "Événement",
    title: "Atelier de sensibilisation sur les droits des femmes à Dakar",
    description:
      "Plus de 200 femmes ont participé à notre atelier communautaire sur les droits et l'autonomisation économique.",
    link: "/blog/atelier-sensibilisation-dakar",
    linkText: "Lire l'article",
  },
  {
    id: 3,
    image: "/young-leaders-workshop-senegal.jpg",
    category: "Programme",
    title: "Formation de jeunes leaders féministes",
    description:
      "Lancement de notre programme de mentorat pour former la prochaine génération de leaders féministes au Sénégal.",
    link: "/programs/leadership-feminin",
    linkText: "En savoir plus",
  },
  {
    id: 4,
    image: "/community-awareness-workshop-senegal-women.jpg",
    category: "Impact",
    title: "5000+ femmes accompagnées en 2024",
    description: "Grâce à nos programmes, nous avons touché plus de 5000 femmes à travers le Sénégal cette année.",
    link: "/about",
    linkText: "Voir notre impact",
  },
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  return (
    <section className="relative pt-20 overflow-hidden">
      {/* Carousel Container */}
      <div className="relative h-[600px] lg:h-[700px]">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
              <img src={slide.image || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/60" />
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 lg:px-8 relative z-10 h-full flex items-center">
              <div className="max-w-3xl">
                <div className="inline-block px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full mb-6">
                  <span className="text-primary font-semibold text-sm uppercase tracking-wide">{slide.category}</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance leading-tight">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-foreground/90 mb-8 text-pretty leading-relaxed max-w-2xl">
                  {slide.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg h-14 px-8"
                    asChild
                  >
                    <Link href={slide.link}>
                      {slide.linkText}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg h-14 px-8 border-2 bg-transparent" asChild>
                    <Link href="/contact">Nous soutenir</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-background/80 hover:bg-background p-3 rounded-full transition-colors backdrop-blur-sm"
          aria-label="Slide précédent"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-background/80 hover:bg-background p-3 rounded-full transition-colors backdrop-blur-sm"
          aria-label="Slide suivant"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Dots Navigation */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all ${
                index === currentSlide ? "w-12 h-3 bg-primary" : "w-3 h-3 bg-foreground/30 hover:bg-foreground/50"
              } rounded-full`}
              aria-label={`Aller au slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
