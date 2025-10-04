"use client"

import { useEffect, useRef, useState } from "react"

interface UseHeroParallaxOptions {
  scale?: number // Facteur de zoom (1.0 à 1.3 recommandé)
  speed?: number // Vitesse du parallaxe (0.1 à 1.0)
}

export function useHeroParallax({ scale = 1.15, speed = 0.5 }: UseHeroParallaxOptions = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState({ scale: 1, translateY: 0 })

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return

      const element = ref.current
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Calculer si l'élément est visible
      if (rect.top > windowHeight || rect.bottom < 0) return

      // Calculer le pourcentage de scroll (0 à 1)
      // 0 = en haut de la page, 1 = complètement scrollé
      const scrollProgress = Math.max(0, Math.min(1, -rect.top / rect.height))

      // Calculer le zoom (commence à 1, augmente avec le scroll)
      const newScale = 1 + (scale - 1) * scrollProgress

      // Calculer le déplacement vertical (effet parallaxe)
      const newTranslateY = scrollProgress * 50 * speed

      setTransform({
        scale: newScale,
        translateY: newTranslateY,
      })
    }

    // Initialiser au chargement
    handleScroll()

    // Écouter le scroll
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [scale, speed])

  return {
    ref,
    style: {
      transform: `scale(${transform.scale}) translateY(${transform.translateY}px)`,
      transition: "transform 0.1s ease-out",
    },
  }
}

