'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface Claim {
  tag: string
  title: string
  description: string
  emotion: string
  imageSrc: string
  imageAlt: string
}

const CLAIMS: Claim[] = [
  {
    tag: 'Justice & Égalité',
    title: 'Réforme du Code de la famille',
    description:
      "Mettre fin aux dispositions discriminatoires qui limitent l'autonomie des femmes et renforcent les inégalités au sein du foyer.",
    emotion: 'Parce qu’aucune femme ne devrait choisir entre sa dignité et sa sécurité.',
    imageSrc: '/petition1.jpg',
    imageAlt: 'Femmes réunies dans un mouvement de solidarité pour leurs droits',
  },
  {
    tag: 'Protection & Dignité',
    title: "Fin de l'impunite",
    description:
      'Garantir des poursuites systématiques et des sanctions exemplaires contre les auteurs de violences faites aux femmes et aux filles.',
    emotion: 'Chaque silence protège les agresseurs. Chaque action protège des vies.',
    imageSrc: '/petition2.jpg',
    imageAlt: 'Visage d’une femme exprimant la force et la résilience',
  },
  {
    tag: 'Engagement & Avenir',
    title: 'Application du Protocole de Maputo',
    description:
      'Transformer les engagements pris par le Sénégal en protections concrètes, visibles et durables pour toutes les femmes et les filles.',
    emotion: 'Nos droits ne doivent plus rester des promesses écrites, mais devenir une réalité vécue.',
    imageSrc: '/petition3.png',
    imageAlt: 'Jeunes femmes engagées regardant vers l’avenir avec détermination',
  },
]

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

export function PetitionClaimsParallax() {
  const itemRefs = useRef<Array<HTMLDivElement | null>>([])
  const [progress, setProgress] = useState<number[]>(() => CLAIMS.map(() => 0))

  useEffect(() => {
    let frame = 0

    const updateProgress = () => {
      const nextProgress = itemRefs.current.map((element) => {
        if (!element) return 0

        const rect = element.getBoundingClientRect()
        const travelDistance = window.innerHeight + rect.height * 0.8
        const rawProgress = (window.innerHeight - rect.top) / travelDistance

        return clamp(rawProgress, 0, 1)
      })

      setProgress((current) => {
        if (
          current.length === nextProgress.length &&
          current.every((value, index) => Math.abs(value - nextProgress[index]) < 0.01)
        ) {
          return current
        }

        return nextProgress
      })
    }

    const requestTick = () => {
      cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(updateProgress)
    }

    requestTick()
    window.addEventListener('scroll', requestTick, { passive: true })
    window.addEventListener('resize', requestTick)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', requestTick)
      window.removeEventListener('resize', requestTick)
    }
  }, [])

  return (
    <section
      id="revendications"
      className="overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(198,29,77,0.18),_transparent_32%),linear-gradient(180deg,_#1b1023_0%,_#2a1533_40%,_#3d1f47_100%)] py-20 text-white lg:py-28"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="mb-4 inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-[#ffd23f]">
            Nos revendications
          </span>
          <h2 className="mb-5 text-3xl font-black md:text-4xl">Des droits qui doivent enfin devenir concrets</h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            Faites défiler pour ressentir l’urgence de chaque demande. Chaque image et chaque mot
            rappellent ce que vivent les femmes et les filles quand la justice tarde.
          </p>
        </div>

        <div className="mx-auto max-w-6xl">
          {CLAIMS.map((claim, index) => {
            const itemProgress = progress[index] ?? 0
            const cardTranslateY = 48 - itemProgress * 48
            const imageTranslateY = -24 * itemProgress
            const imageScale = 1.08 - itemProgress * 0.04
            const isReversed = index % 2 === 1

            return (
              <div
                key={claim.title}
                ref={(element) => {
                  itemRefs.current[index] = element
                }}
                className="relative h-[100vh] min-h-[760px] md:h-[115vh]"
              >
                <article
                  className="sticky top-20 overflow-hidden rounded-[2rem] bg-white shadow-[0_24px_64px_rgba(7,3,14,0.22)]"
                  style={{
                    transform: `translate3d(0, ${cardTranslateY}px, 0)`,
                  }}
                >
                  <div className="grid min-h-[75vh] items-stretch lg:grid-cols-2">
                    <div className={`relative min-h-[320px] lg:min-h-[75vh] ${isReversed ? 'lg:order-2' : ''}`}>
                      <Image
                        src={claim.imageSrc}
                        alt={claim.imageAlt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        style={{
                          transform: `translate3d(0, ${imageTranslateY}px, 0) scale(${imageScale})`,
                        }}
                      />
                    </div>

                    <div className="flex items-center bg-[#f8f2f5] px-6 py-10 text-[#3d1f47] md:px-10 lg:px-14">
                      <div className="max-w-xl">
                        <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.24em] text-[#c61d4d]">
                          {claim.tag}
                        </span>
                        <h3 className="mb-4 text-3xl font-black leading-tight md:text-4xl">
                          {claim.title}
                        </h3>
                        <p className="mb-6 text-base leading-relaxed text-[#3d1f47]/80 md:text-lg">
                          {claim.description}
                        </p>
                        <p className="border-l-4 border-[#ffd23f] pl-4 text-sm font-semibold leading-relaxed text-[#3d1f47] md:text-base">
                          {claim.emotion}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
