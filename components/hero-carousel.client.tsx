"use client"

import { useState, useEffect, useId } from "react"
import { ArrowRight, Play, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"

// ── Types ─────────────────────────────────────────────────────────────────────

export interface HeroSlideData {
  _id:         string
  title:       string
  subtitle?:   string
  image?:      any
  badge?:      string
  ctaLabel:    string
  ctaUrl?:     string
  youtubeUrl?: string
}

interface HeroCarouselClientProps {
  slides: HeroSlideData[]
}

// ── YouTube URL helper ────────────────────────────────────────────────────────

function toYouTubeEmbedUrl(watchUrl: string): string {
  try {
    const url = new URL(watchUrl)
    if (url.hostname === 'youtu.be') {
      return `https://www.youtube.com/embed${url.pathname}`
    }
    const videoId = url.searchParams.get('v')
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`
    }
    return watchUrl
  } catch {
    return watchUrl
  }
}

// ── Slide ─────────────────────────────────────────────────────────────────────

interface SlideProps {
  slide:   HeroSlideData
  current: boolean
}

const Slide = ({ slide, current }: SlideProps) => {
  const [videoOpen, setVideoOpen] = useState(false)
  const imageUrl = slide.image
    ? urlFor(slide.image).width(1400).height(900).url()
    : "/placeholder.svg"

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-700 ${
        current ? "opacity-100 z-10" : "opacity-0 z-0"
      }`}
    >
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={slide.title}
          fill
          className="object-cover"
          priority={current}
          quality={85}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Decorative Squares */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-[#c61d4d] opacity-20 rotate-12 animate-float" />
        <div className="absolute top-32 right-16 w-20 h-20 sm:w-28 sm:h-28 lg:w-36 lg:h-36 bg-[#00d4aa] opacity-25 -rotate-6 animate-float-delayed" />
        <div className="absolute bottom-24 left-20 w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 bg-[#ffd23f] opacity-20 rotate-45 animate-float" />
        <div className="absolute bottom-32 right-10 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-[#8c80f7] opacity-30 -rotate-12 animate-float-delayed" />
        <div className="absolute top-1/2 left-5 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-[#c61d4d] opacity-15 rotate-[30deg] animate-float" />
        <div className="absolute top-1/3 right-5 w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-[#ffd23f] opacity-25 -rotate-[20deg] animate-float-delayed" />
      </div>

      {/* Content — pb-24 leaves room for the navigation bar */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10 h-full flex items-center justify-center pb-24">
        <div className="max-w-5xl text-center">

          {/* Badge with pulsing dot */}
          {slide.badge && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ffd23f]/10 border border-[#ffd23f]/30 mb-5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffd23f] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ffd23f]" />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-[#ffd23f]">
                {slide.badge}
              </span>
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-5 md:mb-6 leading-[1.1] text-[#00d4aa] uppercase tracking-tight">
            {slide.title}
          </h1>

          {slide.subtitle && (
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white mb-6 md:mb-8 leading-relaxed max-w-3xl mx-auto">
              {slide.subtitle}
            </p>
          )}

          {/* CTA */}
          <div className="flex justify-center">
            {slide.youtubeUrl ? (
              <>
                <button
                  onClick={() => setVideoOpen(true)}
                  className="inline-flex items-center gap-3 text-[#ffd23f] hover:text-[#ffd23f]/80 transition-colors group"
                >
                  <span className="text-lg md:text-xl font-bold uppercase tracking-wide">
                    {slide.ctaLabel}
                  </span>
                  <Play className="h-6 w-6 md:h-7 md:w-7 transition-transform group-hover:scale-110" />
                </button>

                <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
                  <DialogContent className="max-w-4xl p-0 border-0 bg-black">
                    <DialogTitle className="sr-only">{slide.title}</DialogTitle>
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                      {videoOpen && (
                        <iframe
                          className="absolute inset-0 w-full h-full"
                          src={toYouTubeEmbedUrl(slide.youtubeUrl)}
                          title={slide.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </>
            ) : slide.ctaUrl ? (
              <Link
                href={slide.ctaUrl}
                className="inline-flex items-center gap-3 text-[#ffd23f] hover:text-[#ffd23f]/80 transition-colors group"
              >
                <span className="text-lg md:text-xl font-bold uppercase tracking-wide">
                  {slide.ctaLabel}
                </span>
                <ArrowRight className="h-6 w-6 md:h-7 md:w-7 transition-transform group-hover:translate-x-2" />
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Carousel ──────────────────────────────────────────────────────────────────

export function HeroCarouselClient({ slides }: HeroCarouselClientProps) {
  const [current, setCurrent] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const id = useId()

  // Auto-play — pauses when the user hovers over the carousel
  useEffect(() => {
    if (isHovered) return
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [isHovered, slides.length])

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }

  // Empty state — fallback welcome screen
  if (!slides || slides.length === 0) {
    return (
      <section className="relative pt-16 lg:pt-20 overflow-hidden isolate" style={{ zIndex: 1 }}>
        <div className="relative min-h-[500px] sm:min-h-[550px] md:min-h-[600px] lg:h-[700px]">
          <div className="absolute inset-0">
            <Image
              src="/empowered-african-women-standing-together-in-solid.jpg"
              alt="Femmes sénégalaises unies pour leurs droits"
              fill
              className="object-cover"
              priority
              quality={85}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-[#c61d4d] opacity-20 rotate-12 animate-float" />
            <div className="absolute top-32 right-16 w-20 h-20 sm:w-28 sm:h-28 lg:w-36 lg:h-36 bg-[#00d4aa] opacity-25 -rotate-6 animate-float-delayed" />
            <div className="absolute bottom-24 left-20 w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 bg-[#ffd23f] opacity-20 rotate-45 animate-float" />
            <div className="absolute bottom-32 right-10 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-[#8c80f7] opacity-30 -rotate-12 animate-float-delayed" />
            <div className="absolute top-1/2 left-5 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-[#c61d4d] opacity-15 rotate-[30deg] animate-float" />
            <div className="absolute top-1/3 right-5 w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-[#ffd23f] opacity-25 -rotate-[20deg] animate-float-delayed" />
          </div>

          <div className="container mx-auto px-4 lg:px-8 h-full flex items-center justify-center relative z-10">
            <div className="text-center max-w-5xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-5 md:mb-6 leading-[1.1] text-[#00d4aa] uppercase tracking-tight">
                Bienvenue sur J-GEN SENEGAL
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white mb-6 md:mb-8 leading-relaxed max-w-3xl mx-auto">
                Œuvrant pour un Sénégal où les femmes et les filles vivent libres de toute violence et discrimination.
              </p>
              <div className="flex justify-center">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-3 text-[#ffd23f] hover:text-[#ffd23f]/80 transition-colors group"
                >
                  <span className="text-lg md:text-xl font-bold uppercase tracking-wide">Découvrir notre action</span>
                  <ArrowRight className="h-6 w-6 md:h-7 md:w-7 transition-transform group-hover:translate-x-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const nextSlide = slides[(current + 1) % slides.length]

  return (
    <section
      className="relative pt-16 lg:pt-20 overflow-hidden isolate"
      style={{ zIndex: 1 }}
      aria-labelledby={`carousel-heading-${id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-[500px] sm:h-[550px] md:h-[600px] lg:h-[700px] xl:h-[750px]">

        {/* Slides */}
        {slides.map((slide, index) => (
          <Slide
            key={slide._id}
            slide={slide}
            current={current === index}
          />
        ))}

        {/* Bottom navigation bar */}
        {slides.length > 1 && (
          <div className="absolute bottom-0 left-0 right-0 z-20">
            {/* Gradient fade so the bar blends into the slide */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

            <div className="relative container mx-auto px-4 lg:px-8 py-5 flex items-center justify-between border-t border-white/10">

              {/* Left — arrow buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handlePrev}
                  aria-label="Slide précédent"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/40 transition-all"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Slide suivant"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/40 transition-all"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Right — next slide preview + progress bars */}
              <div className="flex items-center gap-6">
                {/* Next slide title (hidden on small screens) */}
                <div className="hidden sm:flex flex-col items-end gap-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                    Suivant
                  </span>
                  <span className="text-xs font-bold text-white uppercase tracking-tight max-w-[200px] truncate">
                    {nextSlide.title}
                  </span>
                </div>

                {/* Progress bars */}
                <div className="flex items-center gap-1.5">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrent(index)}
                      aria-label={`Aller au slide ${index + 1}`}
                      className={`h-[3px] rounded-full transition-all duration-300 ${
                        index === current
                          ? "w-10 bg-[#c61d4d]"
                          : "w-5 bg-white/25 hover:bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  )
}
