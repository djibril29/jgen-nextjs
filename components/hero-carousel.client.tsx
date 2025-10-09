"use client"

import { useState, useEffect, useRef, useId } from "react"
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
  index: number
  current: number
  handleSlideClick: (index: number) => void
}

const Slide = ({ post, index, current, handleSlideClick }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null)
  const xRef = useRef(0)
  const yRef = useRef(0)
  const frameRef = useRef<number>()

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return

      const x = xRef.current
      const y = yRef.current

      slideRef.current.style.setProperty("--x", `${x}px`)
      slideRef.current.style.setProperty("--y", `${y}px`)

      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [])

  const handleMouseMove = (event: React.MouseEvent) => {
    const el = slideRef.current
    if (!el) return

    const r = el.getBoundingClientRect()
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2))
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2))
  }

  const handleMouseLeave = () => {
    xRef.current = 0
    yRef.current = 0
  }

  const imageLoaded = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.opacity = "1"
  }

  const imageUrl = post.image ? urlFor(post.image).width(1200).height(1200).url() : "/placeholder.svg"

  return (
    <div className="[perspective:1200px] [transform-style:preserve-3d]">
      <li
        ref={slideRef}
        className="flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 transition-all duration-300 ease-in-out w-[70vmin] h-[70vmin] mx-[4vmin] z-10 cursor-pointer"
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform:
            current !== index
              ? "scale(0.98) rotateX(8deg)"
              : "scale(1) rotateX(0deg)",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "bottom",
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full bg-[#1D1F2F] rounded-[1%] overflow-hidden transition-all duration-150 ease-out"
          style={{
            transform:
              current === index
                ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
                : "none",
          }}
        >
          <img
            className="absolute inset-0 w-[120%] h-[120%] object-cover opacity-100 transition-opacity duration-600 ease-in-out"
            style={{
              opacity: current === index ? 1 : 0.5,
            }}
            alt={post.title}
            src={imageUrl}
            onLoad={imageLoaded}
            loading="eager"
            decoding="sync"
          />
          {current === index && (
            <div className="absolute inset-0 bg-black/40 transition-all duration-1000" />
          )}
        </div>

        <article
          className={`relative p-[4vmin] transition-opacity duration-1000 ease-in-out z-10 ${
            current === index ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          {post.category && (
            <div className="inline-block px-4 py-2 bg-primary/30 backdrop-blur-sm rounded-full mb-4">
              <span className="text-white font-semibold text-xs md:text-sm uppercase tracking-wide">
                {post.category}
              </span>
            </div>
          )}
          <h2 className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold relative mb-4 text-balance leading-tight">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="text-sm md:text-base lg:text-lg text-white/90 mb-6 line-clamp-2 max-w-2xl mx-auto">
              {post.excerpt}
            </p>
          )}
          <div className="flex justify-center">
            <Button
              asChild
              className="mt-2 px-6 py-3 w-fit mx-auto text-sm md:text-base text-black bg-white h-12 border border-transparent flex justify-center items-center rounded-2xl hover:shadow-lg transition duration-200 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
            >
              <Link href={`/blog/${post.slug}`}>
                Lire l'article
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </article>
      </li>
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
      className={`w-12 h-12 flex items-center mx-2 justify-center bg-white/90 dark:bg-neutral-800 border-2 border-transparent rounded-full focus:border-primary focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 shadow-lg ${
        type === "previous" ? "rotate-180" : ""
      }`}
      title={title}
      onClick={handleClick}
      aria-label={title}
    >
      <ChevronRight className="text-neutral-800 dark:text-neutral-200 h-6 w-6" />
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
      <section className="relative pt-16 md:pt-20 overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="relative min-h-[500px] sm:min-h-[600px] lg:h-[700px]">
          <div className="container mx-auto px-4 lg:px-8 h-full flex items-center justify-center py-12 md:py-0">
            <div className="text-center max-w-3xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                Bienvenue sur J-GEN SENEGAL
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 px-4">
                Œuvrant pour un Sénégal où les femmes et les filles vivent libres de toute violence et discrimination.
              </p>
              <Button size="lg" asChild className="h-12 md:h-14 text-base md:text-lg px-6 md:px-8">
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

  const handleSlideClick = (index: number) => {
    if (current !== index) {
      setCurrent(index)
      setIsAutoPlaying(false)
      setTimeout(() => setIsAutoPlaying(true), 10000)
    }
  }

  return (
    <section className="relative pt-24 pb-24 md:pt-28 md:pb-28 lg:pt-32 lg:pb-32 overflow-hidden bg-gradient-to-br from-[#c61d4d] to-[#a01640]">
      <div
        className="relative w-full max-w-[90vmin] h-[70vmin] min-h-[500px] max-h-[700px] mx-auto"
        aria-labelledby={`carousel-heading-${id}`}
      >
        <ul
          className="absolute flex mx-[-4vmin] transition-transform duration-1000 ease-in-out"
          style={{
            transform: `translateX(-${current * (100 / posts.length)}%)`,
          }}
        >
          {posts.map((post, index) => (
            <Slide
              key={post._id}
              post={post}
              index={index}
              current={current}
              handleSlideClick={handleSlideClick}
            />
          ))}
        </ul>

        {posts.length > 1 && (
          <div className="absolute flex justify-center w-full top-[calc(100%+1rem)]">
            <CarouselControl
              type="previous"
              title="Aller au slide précédent"
              handleClick={handlePreviousClick}
            />

            <CarouselControl
              type="next"
              title="Aller au slide suivant"
              handleClick={handleNextClick}
            />
          </div>
        )}
      </div>
    </section>
  )
}

