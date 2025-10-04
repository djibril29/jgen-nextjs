"use client"

import { urlFor } from "@/sanity/lib/image"
import { useHeroParallax } from "@/hooks/use-hero-parallax"

interface ProgramHeroImageProps {
  image: any
  title: string
  summary?: string
}

export function ProgramHeroImage({ image, title, summary }: ProgramHeroImageProps) {
  const heroParallax = useHeroParallax({ scale: 1.2, speed: 0.5 })

  return (
    <section ref={heroParallax.ref} className="relative h-[400px] overflow-hidden mt-20">
      <img 
        src={image ? urlFor(image).width(1600).height(600).url() : "/placeholder.svg"} 
        alt={title} 
        className="w-full h-full object-cover"
        style={heroParallax.style}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 text-balance">
            {title}
          </h1>
          {summary && (
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {summary}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

