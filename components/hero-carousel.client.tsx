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
    ? urlFor(slide.image).width(900).height(750).url()
    : "/empowered-african-women-standing-together-in-solid.jpg"

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-700 ${
        current ? "opacity-100 z-10" : "opacity-0 z-0"
      }`}
    >
      <div className="flex flex-col lg:grid lg:grid-cols-2 h-full">

        {/* Image — top on mobile, right on desktop */}
        <div className="relative h-52 sm:h-64 lg:h-full overflow-hidden lg:col-start-2 lg:row-start-1">
          <div className="absolute top-0 left-0 right-0 h-2 bg-[#c61d4d] z-10" />
          <Image
            src={imageUrl}
            alt={slide.title}
            fill
            className="object-cover"
            priority={current}
            quality={85}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Text — below image on mobile, left on desktop */}
        <div className="bg-[#3d1f47] flex-1 flex items-center px-8 py-10 pb-16 lg:px-16 lg:py-32 lg:pb-32 lg:col-start-1 lg:row-start-1">
          <div className="max-w-xl w-full">

            {/* Badge */}
            {slide.badge && (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ffd23f]/10 border border-[#ffd23f]/30 mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffd23f] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ffd23f]" />
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-[#ffd23f]">
                  {slide.badge}
                </span>
              </div>
            )}

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight mb-4 uppercase tracking-tight">
              {slide.title}
            </h1>

            {slide.subtitle && (
              <p className="!text-sm lg:!text-base text-white/75 leading-relaxed mb-7 max-w-lg">
                {slide.subtitle.length > 120
                  ? slide.subtitle.slice(0, 120).trimEnd() + "…"
                  : slide.subtitle}
              </p>
            )}

            {/* CTA */}
            {slide.youtubeUrl ? (
              <>
                <button
                  onClick={() => setVideoOpen(true)}
                  className="inline-flex items-center gap-3 text-[#ffd23f] hover:text-[#ffd23f]/80 transition-colors group"
                >
                  <span className="text-base font-bold uppercase tracking-wide">{slide.ctaLabel}</span>
                  <Play className="h-5 w-5 transition-transform group-hover:scale-110" />
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
                <span className="text-base font-bold uppercase tracking-wide">{slide.ctaLabel}</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
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

  // Empty state fallback
  if (!slides || slides.length === 0) {
    return (
      <section className="relative pt-16 lg:pt-20 overflow-hidden isolate" style={{ zIndex: 1 }}>
        <div className="flex flex-col lg:grid lg:grid-cols-2 min-h-[500px] sm:min-h-[550px] lg:h-[700px] xl:h-[750px]">
          <div className="relative h-52 sm:h-64 lg:h-full overflow-hidden lg:col-start-2 lg:row-start-1">
            <div className="absolute top-0 left-0 right-0 h-2 bg-[#c61d4d] z-10" />
            <Image
              src="/empowered-african-women-standing-together-in-solid.jpg"
              alt="Femmes sénégalaises unies pour leurs droits"
              fill
              className="object-cover"
              priority
              quality={85}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="bg-[#3d1f47] flex-1 flex items-center px-8 py-10 lg:px-16 lg:py-32 lg:col-start-1 lg:row-start-1">
            <div className="max-w-xl w-full">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight mb-4 uppercase tracking-tight">
                Bienvenue sur J-GEN SENEGAL
              </h1>
              <p className="!text-sm lg:!text-base text-white/75 leading-relaxed mb-8">
                Œuvrant pour un Sénégal où les femmes et les filles vivent libres de toute violence et discrimination.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-3 text-[#ffd23f] hover:text-[#ffd23f]/80 transition-colors group"
              >
                <span className="text-base font-bold uppercase tracking-wide">Découvrir notre action</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
              </Link>
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
      <div className="relative w-full min-h-[500px] sm:min-h-[550px] lg:h-[700px] xl:h-[750px]">

        {/* Slides */}
        {slides.map((slide, index) => (
          <Slide
            key={slide._id}
            slide={slide}
            current={current === index}
          />
        ))}

        {/* Navigation bar — sits on the left (purple) half */}
        {slides.length > 1 && (
          <div className="absolute bottom-0 left-0 z-20 w-full lg:w-1/2 border-t border-white/10">
            <div className="px-8 lg:px-16 py-5 flex items-center justify-between">

              {/* Arrows */}
              <div className="flex gap-3">
                <button
                  onClick={handlePrev}
                  aria-label="Slide précédent"
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/40 transition-all"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Slide suivant"
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/40 transition-all"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Next slide preview + progress bars */}
              <div className="flex items-center gap-5">
                <div className="hidden sm:flex flex-col items-end gap-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                    Suivant
                  </span>
                  <span className="text-xs font-bold text-white uppercase tracking-tight max-w-[160px] truncate">
                    {nextSlide.title}
                  </span>
                </div>
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
