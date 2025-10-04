"use client"

import { urlFor } from "@/sanity/lib/image"
import { useHeroParallax } from "@/hooks/use-hero-parallax"

interface BlogHeroImageProps {
  image: any
  alt: string
}

export function BlogHeroImage({ image, alt }: BlogHeroImageProps) {
  const heroParallax = useHeroParallax({ scale: 1.15, speed: 0.5 })

  return (
    <div ref={heroParallax.ref} className="w-full h-[400px] lg:h-[500px] overflow-hidden mt-20">
      <img 
        src={image ? urlFor(image).width(1600).height(900).url() : "/placeholder.svg"} 
        alt={alt} 
        className="w-full h-full object-cover"
        style={heroParallax.style}
      />
    </div>
  )
}

