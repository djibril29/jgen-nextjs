"use client"

import { useState, useEffect } from "react"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

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
    <section className="relative pt-20 overflow-hidden isolate" style={{ zIndex: 1 }}>
      {/* Carousel Container */}
      <div className="relative h-[500px] sm:h-[550px] md:h-[600px] lg:h-[700px]">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Background Image with Dark Overlay */}
            <div className="absolute inset-0">
              <Image 
                src={slide.image || "/placeholder.svg"} 
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
                quality={85}
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Content - Centered */}
            <div className="container mx-auto px-4 lg:px-8 relative z-10 h-full flex items-center justify-center">
              <div className="max-w-5xl text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-5 md:mb-6 leading-[1.1] text-[#00d4aa] uppercase tracking-tight">
                  {slide.title}
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white mb-6 md:mb-8 leading-relaxed max-w-3xl mx-auto">
                  {slide.description}
                </p>
                <div className="flex justify-center">
                  <Link 
                    href={slide.link}
                    className="inline-flex items-center gap-3 text-[#ffd23f] hover:text-[#ffd23f]/80 transition-colors group"
                  >
                    <span className="text-lg md:text-xl font-bold uppercase tracking-wide">{slide.linkText}</span>
                    <ArrowRight className="h-6 w-6 md:h-7 md:w-7 transition-transform group-hover:translate-x-2" />
                  </Link>
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
