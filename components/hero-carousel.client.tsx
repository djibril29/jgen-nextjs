"use client"

import { useState, useEffect, useId } from "react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
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
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={post.title}
          fill
          className="object-cover"
          priority={current}
          quality={85}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content - Centered */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10 h-full flex items-center justify-center">
        <div className="max-w-5xl text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-5 md:mb-6 leading-[1.1] text-[#00d4aa] uppercase tracking-tight">
            {post.title}
          </h1>
          
          {post.excerpt && (
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white mb-6 md:mb-8 leading-relaxed max-w-3xl mx-auto">
              {post.excerpt}
            </p>
          )}

          <div className="flex justify-center">
            <Link 
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-3 text-[#ffd23f] hover:text-[#ffd23f]/80 transition-colors group"
            >
              <span className="text-lg md:text-xl font-bold uppercase tracking-wide">Lire l'article</span>
              <ArrowRight className="h-6 w-6 md:h-7 md:w-7 transition-transform group-hover:translate-x-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export function HeroCarouselClient({ posts }: HeroCarouselClientProps) {
  const [current, setCurrent] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const id = useId()

  // If no posts, show a default message
  if (!posts || posts.length === 0) {
    return (
      <section className="relative pt-16 lg:pt-20 overflow-hidden isolate" style={{ zIndex: 1 }}>
        <div className="relative min-h-[500px] sm:min-h-[550px] md:min-h-[600px] lg:h-[700px]">
          {/* Background with overlay */}
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
      className="relative pt-16 lg:pt-20 overflow-hidden isolate"
      style={{ zIndex: 1 }}
      aria-labelledby={`carousel-heading-${id}`}
    >
      {/* Carousel Container */}
      <div className="relative w-full h-[500px] sm:h-[550px] md:h-[600px] lg:h-[700px] xl:h-[750px]">
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

