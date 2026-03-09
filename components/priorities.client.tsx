"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import Link from "next/link"
import Autoplay from "embla-carousel-autoplay"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { urlFor } from "@/sanity/lib/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"

export interface ProgramCard {
  _id: string
  title: string
  summary?: string
  slug: string
  featuredImage?: any
}

export function PrioritiesClient({ programs }: { programs: ProgramCard[] }) {
  const titleReveal = useScrollReveal({ threshold: 0.2 })
  const [api, setApi] = useState<CarouselApi>()
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const autoplay = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true })
  )

  // Track which arrows should be enabled
  useEffect(() => {
    if (!api) return
    const onSelect = () => {
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }
    api.on("select", onSelect)
    api.on("reInit", onSelect)
    onSelect()
    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  return (
    <section className="py-100 my-20 lg:py-32 bg-white overflow-hidden ">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Header — title only */}
        <div
          ref={titleReveal.ref}
          className={`mb-12 scroll-reveal-scale ${titleReveal.isVisible ? "is-visible" : ""}`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
            Nos programmes
          </h2>
          <div className="w-24 h-1 bg-primary mt-4" />
        </div>

        {/* Carousel — peek effect via card basis */}
        <Carousel
          setApi={setApi}
          plugins={[autoplay.current]}
          opts={{ align: "start", loop: false }}
        >
          <CarouselContent className="-ml-5">
            {programs.map((program) => (
              <CarouselItem
                key={program._id}
                // Peek: mobile 78%, tablet 44%, desktop 28%
                className="pl-5 basis-[78%] sm:basis-[44%] lg:basis-[28%]"
              >
                <Link href={`/programs/${program.slug}`} className="group block h-full">
                  <div className="relative h-full">
                    {/* Decorative squares */}
                    <div className="absolute -top-3 -left-3 w-14 h-14 bg-[#c61d4d] opacity-80 z-0" />
                    <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-[#ffd23f] opacity-90 z-0 rotate-12" />
                    <div className="absolute top-1/2 -right-2 w-10 h-10 bg-[#8c80f7] opacity-70 z-0" />

                    {/* Card */}
                    <div className="relative z-10 h-full bg-white shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col">
                      {/* Image — 4/3 ratio instead of square to reduce height */}
                      <div className="aspect-[4/3] overflow-hidden flex-shrink-0">
                        <img
                          src={
                            program.featuredImage
                              ? urlFor(program.featuredImage).width(600).height(450).url()
                              : "/placeholder.svg"
                          }
                          alt={program.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-4 flex flex-col flex-grow">
                        <h3 className="text-base md:text-lg font-bold mb-2 leading-tight text-gray-900 group-hover:text-[#c61d4d] transition-colors line-clamp-2">
                          {program.title}
                        </h3>
                        {program.summary && (
                          <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 flex-grow">
                            {program.summary}
                          </p>
                        )}
                        <div className="mt-3 inline-flex items-center gap-2 text-[#c61d4d] font-bold text-xs uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity">
                          <span>En savoir plus</span>
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Bottom bar — arrows left, CTA right */}
        <div className="flex items-center justify-between mt-10">
          <div className="flex gap-3">
            <button
              onClick={() => api?.scrollPrev()}
              disabled={!canScrollPrev}
              aria-label="Programme précédent"
              className="w-11 h-11 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#c61d4d] hover:text-[#c61d4d] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => api?.scrollNext()}
              disabled={!canScrollNext}
              aria-label="Programme suivant"
              className="w-11 h-11 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#c61d4d] hover:text-[#c61d4d] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <Link
            href="/programs"
            className="inline-flex items-center gap-3 bg-[#c61d4d] hover:bg-[#c61d4d]/90 text-white font-bold text-sm px-7 py-3 transition-colors"
          >
            Voir tous nos programmes
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </section>
  )
}
