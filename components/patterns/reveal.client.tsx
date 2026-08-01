"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"

/**
 * Apparition au defilement.
 *
 * L'element se declare visible une fois entre dans le viewport, et le reste :
 * on ne rejoue jamais l'animation en sens inverse quand on remonte, ce qui
 * donnerait une page qui clignote a chaque changement de direction.
 *
 * `prefers-reduced-motion` est verifie AVANT tout affichage : si le lecteur a
 * demande moins de mouvement, le contenu est visible d'emblee et aucun
 * observateur n'est installe. Sans cette precaution, un contenu revele au
 * defilement resterait invisible pour qui desactive les animations.
 */
export function Reveal({
  children,
  className,
  variant = "up",
  delay = 0,
}: {
  children: ReactNode
  className?: string
  variant?: "up" | "left" | "right" | "scale"
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      setVisible(true)
      return
    }

    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      // Se declenche quand un cinquieme de l'element est entre, avec une marge
      // negative en bas pour que l'apparition se produise pendant la montee et
      // non une fois l'element deja au centre de l'ecran.
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const variants = {
    up: "translate-y-12",
    left: "-translate-x-12",
    right: "translate-x-12",
    scale: "scale-95",
  } as const

  return (
    <div
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(
        "transition-all duration-700 ease-out motion-reduce:transition-none",
        visible ? "translate-x-0 translate-y-0 scale-100 opacity-100" : `opacity-0 ${variants[variant]}`,
        className,
      )}
    >
      {children}
    </div>
  )
}
