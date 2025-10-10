"use client"

import { useState, useEffect, useId } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { urlFor } from "@/sanity/lib/image"

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

interface SlideProps {
  post: Post
  current: boolean
}

const Slide = ({ post, current }: SlideProps) => {
  const imageUrl = post.image ? urlFor(post.image).width(1400).height(900).url() : "/placeholder.svg"

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-700 ${
        current ? "opacity-100 z-10" : "opacity-0 z-0"
      }`}
    >
      {/* Mobile: Image as background */}
      <div className="absolute inset-0 lg:hidden">
        <img
          src={imageUrl}
          alt={post.title}
          className="w-full h-full object-cover grayscale"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#3d1f47]/90 via-[#3d1f47]/80 to-[#3d1f47]/90" />
      </div>

      <div className="h-full relative flex flex-col lg:flex-row">
        {/* Left Side - Purple Background with Text */}
        <div className="w-full lg:w-[55%] bg-gradient-to-br from-[#3d1f47] to-[#2d1537] relative overflow-hidden flex items-center">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-[#3d1f47] opacity-80" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#ffd23f] opacity-90 -translate-x-1/3 translate-y-1/3 rotate-12" />
          
          <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-12 lg:py-0 relative z-10">
            <div className="max-w-2xl">
              {post.category && (
                <div className="mb-4 lg:mb-6">
                  <span className="text-[10px] sm:text-xs lg:text-sm font-bold uppercase tracking-widest text-white/80">
                    {post.category}
                  </span>
                </div>
              )}
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-[1.15] text-white mb-4 lg:mb-6">
                {post.title}
              </h1>
              
              {post.excerpt && (
                <p className="text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed mb-6 lg:mb-8 font-normal">
                  {post.excerpt}
                </p>
              )}

              <div className="flex">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#c61d4d] text-white hover:bg-[#c61d4d]/90 font-bold text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 h-auto rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <Link href={`/blog/${post.slug}`} className="flex items-center gap-2">
                    Lire l'article
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Exit Website badge - bottom left corner */}
          <div className="hidden lg:block absolute bottom-8 left-0 bg-[#c61d4d] text-white font-black text-sm px-6 py-3 uppercase tracking-wide">
            J-GEN SENEGAL
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="hidden lg:flex w-full lg:w-[45%] relative overflow-hidden bg-gray-100">
          <img
            src={imageUrl}
            alt={post.title}
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            loading="eager"
          />
          
          {/* Decorative graphic elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <svg width="300" height="300" viewBox="0 0 300 300" className="opacity-30">
              {/* Circular lines pattern */}
              <circle cx="150" cy="150" r="50" fill="none" stroke="#c61d4d" strokeWidth="3" />
              <circle cx="150" cy="150" r="75" fill="none" stroke="#c61d4d" strokeWidth="2" />
              <circle cx="150" cy="150" r="100" fill="none" stroke="#c61d4d" strokeWidth="2" />
              <circle cx="150" cy="150" r="125" fill="none" stroke="#c61d4d" strokeWidth="1" />
              {/* Connection lines */}
              <line x1="150" y1="25" x2="150" y2="275" stroke="#c61d4d" strokeWidth="2" />
              <line x1="25" y1="150" x2="275" y2="150" stroke="#c61d4d" strokeWidth="2" />
            </svg>
          </div>

          {/* Top right label */}
          <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm px-4 py-2 font-bold text-xs text-gray-800 uppercase tracking-wide">
            {new Date(post.publishedAt || new Date()).toLocaleDateString('fr-FR', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

interface CarouselControlProps {
  type: string
  title: string
  handleClick: () => void
}

const CarouselControl = ({ type, title, handleClick }: CarouselControlProps) => {
  return (
    <button
      className={`w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full focus:outline-none focus:ring-2 focus:ring-[#ffd23f] transition-all duration-200 ${
        type === "previous" ? "rotate-180" : ""
      }`}
      title={title}
      onClick={handleClick}
      aria-label={title}
    >
      <ChevronRight className="text-white h-5 w-5" />
    </button>
  )
}

export function HeroCarouselClient({ posts }: HeroCarouselClientProps) {
  const [current, setCurrent] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const id = useId()

  // If no posts, show a default message
  if (!posts || posts.length === 0) {
    return (
      <section className="relative pt-16 lg:pt-20 overflow-hidden bg-gradient-to-br from-[#3d1f47] to-[#2d1537]">
        <div className="relative min-h-[500px] sm:min-h-[600px] lg:h-[700px]">
          <div className="container mx-auto px-4 lg:px-8 h-full flex items-center justify-center py-12 md:py-0">
            <div className="text-center max-w-3xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 leading-tight text-white uppercase">
                Bienvenue sur J-GEN SENEGAL
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/95 mb-6 md:mb-8 px-4 font-medium">
                Œuvrant pour un Sénégal où les femmes et les filles vivent libres de toute violence et discrimination.
              </p>
              <Button size="lg" asChild className="h-12 md:h-14 text-base md:text-lg px-6 md:px-8 bg-[#c61d4d] text-white hover:bg-[#c61d4d]/90 font-black uppercase">
                <Link href="/about">
                  Découvrir notre action
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
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
      setCurrent((prev) => (prev + 1) % posts.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, posts.length])

  const handlePreviousClick = () => {
    const previous = current - 1
    setCurrent(previous < 0 ? posts.length - 1 : previous)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const handleNextClick = () => {
    const next = current + 1
    setCurrent(next === posts.length ? 0 : next)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  return (
    <section 
      className="relative pt-16 lg:pt-20 overflow-hidden"
      aria-labelledby={`carousel-heading-${id}`}
    >
      {/* Carousel Container */}
      <div className="relative w-full h-[600px] sm:h-[650px] lg:h-[700px] xl:h-[750px]">
        {/* Slides */}
        {posts.map((post, index) => (
          <Slide
            key={post._id}
            post={post}
            current={current === index}
          />
        ))}

      {/* Navigation Controls - Dots only */}
      {posts.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
          <div className="flex items-center gap-3">
            {posts.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrent(index)
                  setIsAutoPlaying(false)
                  setTimeout(() => setIsAutoPlaying(true), 10000)
                }}
                className={`transition-all duration-300 rounded-full ${
                  current === index 
                    ? "bg-white w-8 h-3" 
                    : "bg-white/40 hover:bg-white/60 w-3 h-3"
                }`}
                aria-label={`Aller au slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
      </div>
    </section>
  )
}

