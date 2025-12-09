"use client"

import { useEffect, useRef, useState } from "react"

interface CounterAnimationProps {
  value: string
  duration?: number
  className?: string
}

export function CounterAnimation({ value, duration = 2000, className = "" }: CounterAnimationProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Extract number from string (e.g., "5000+" -> 5000, "15+" -> 15)
  const extractNumber = (str: string | undefined | null): number => {
    if (!str) return 0
    const match = str.match(/\d+/)
    return match ? parseInt(match[0], 10) : 0
  }

  // Get suffix (e.g., "+", "K", "%", etc.)
  const getSuffix = (str: string | undefined | null): string => {
    if (!str) return ""
    return str.replace(/\d+/, "").trim()
  }

  const targetValue = extractNumber(value)
  const suffix = getSuffix(value)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
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
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number | null = null
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      
      setCount(Math.floor(easeOutQuart * targetValue))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isVisible, targetValue, duration])

  return (
    <div ref={ref} className={className}>
      {count.toLocaleString('fr-FR')}{suffix}
    </div>
  )
}

