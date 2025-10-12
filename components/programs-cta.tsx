"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function ProgramsCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Delay the expansion slightly
          setTimeout(() => {
            setIsExpanded(true)
          }, 300)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return (
    <div ref={ref} className="mt-20 -mx-4 lg:-mx-8 flex justify-center">
      <div 
        className={`
          relative overflow-hidden rounded-lg
          transition-all duration-1000 ease-out
          ${isVisible ? 'opacity-100' : 'opacity-0'}
          ${isExpanded 
            ? 'w-full py-20 px-4' 
            : 'w-32 h-32 py-0 px-0'
          }
          bg-[#3d1f47] text-white
        `}
      >
        {/* Decorative elements */}
        <div 
          className={`
            absolute top-0 right-0 w-64 h-64 bg-[#8c80f7] opacity-10 rounded-full 
            -translate-y-1/2 translate-x-1/2
            transition-all duration-1000 delay-300
            ${isExpanded ? 'scale-100' : 'scale-0'}
          `} 
        />
        <div 
          className={`
            absolute bottom-0 left-0 w-48 h-48 bg-[#c61d4d] opacity-10 rounded-full 
            translate-y-1/2 -translate-x-1/2
            transition-all duration-1000 delay-500
            ${isExpanded ? 'scale-100' : 'scale-0'}
          `} 
        />
        
        {/* Content - appears after expansion */}
        <div 
          className={`
            relative z-10 text-center
            transition-all duration-700 delay-700
            ${isExpanded 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-10'
            }
          `}
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Découvrez nos autres programmes
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Explorez l'ensemble de nos initiatives pour l'autonomisation des femmes et des filles
            </p>
            <Link href="/programs">
              <Button 
                size="lg" 
                className="bg-[#00d4aa] hover:bg-[#00d4aa]/90 text-[#3d1f47] font-bold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                Voir tous les programmes
              </Button>
            </Link>
          </div>
        </div>

        {/* Small pulsing dot when collapsed */}
        {!isExpanded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 bg-[#00d4aa] rounded-full animate-pulse" />
          </div>
        )}
      </div>
    </div>
  )
}

