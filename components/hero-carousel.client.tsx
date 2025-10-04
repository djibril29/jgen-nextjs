"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { urlFor } from "@/sanity/lib/image"
import { useHeroParallax } from "@/hooks/use-hero-parallax"

interface Post {
  _id: string
  title: string
  excerpt?: string
  image?: any
  slug: string
  category?: string
  publishedAt?: string
}

interface HeroCarouselClientProps {
  posts: Post[]
}

export function HeroCarouselClient({ posts }: HeroCarouselClientProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const heroParallax = useHeroParallax({ scale: 1.2, speed: 0.6 })

  // If no posts, show a default message
  if (!posts || posts.length === 0) {
    return (
      <section className="relative pt-20 overflow-hidden">
        <div className="relative h-[600px] lg:h-[700px] bg-gradient-to-br from-primary/20 to-secondary/20">
          <div className="container mx-auto px-4 lg:px-8 h-full flex items-center justify-center">
            <div className="text-center max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Bienvenue sur J-GEN SENEGAL
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Œuvrant pour un Sénégal où les femmes et les filles vivent libres de toute violence et discrimination.
              </p>
              <Button size="lg" asChild>
                <Link href="/about">
                  Découvrir notre action
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % posts.length)
    }, 8000) // Changé de 5000ms (5s) à 8000ms (8s)

    return () => clearInterval(interval)
  }, [isAutoPlaying, posts.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % posts.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + posts.length) % posts.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  return (
    <section className="relative pt-20 overflow-hidden">
      {/* Carousel Container */}
      <div ref={heroParallax.ref} className="relative h-[600px] lg:h-[700px]">
        {/* Slides */}
        {posts.map((post, index) => (
          <div
            key={post._id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 overflow-hidden">
              <img 
                src={post.image ? urlFor(post.image).width(1920).height(1080).url() : "/placeholder.svg"} 
                alt={post.title} 
                className="w-full h-full object-cover object-center"
                style={heroParallax.style}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/80 to-background/50" />
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 lg:px-8 relative z-10 h-full flex items-center">
              <div className="max-w-3xl">
                {post.category && (
                  <div className="inline-block px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full mb-6">
                    <span className="text-primary font-semibold text-sm uppercase tracking-wide">
                      {post.category}
                    </span>
                  </div>
                )}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance leading-tight">
                  {post.title}
                </h1>
                {post.excerpt && (
                  <p className="text-lg md:text-xl text-foreground/90 mb-8 text-pretty leading-relaxed max-w-2xl">
                    {post.excerpt}
                  </p>
                )}
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg h-14 px-8"
                  asChild
                >
                  <Link href={`/blog/${post.slug}`}>
                    Lire l'article
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        {posts.length > 1 && (
          <>
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
              {posts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all ${
                    index === currentSlide 
                      ? "w-12 h-3 bg-primary" 
                      : "w-3 h-3 bg-foreground/30 hover:bg-foreground/50"
                  } rounded-full`}
                  aria-label={`Aller au slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

