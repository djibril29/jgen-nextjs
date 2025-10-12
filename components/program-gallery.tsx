"use client"

import { useState, useEffect, useRef } from "react"
import { urlFor } from "@/sanity/lib/image"
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react"
import Image from "next/image"

interface GalleryImage {
  _key?: string
  asset: any
  alt?: string
  caption?: string
}

interface ProgramGalleryProps {
  images: GalleryImage[]
}

export function ProgramGallery({ images }: ProgramGalleryProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
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

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return

      if (e.key === 'Escape') {
        setSelectedImage(null)
      } else if (e.key === 'ArrowLeft') {
        setSelectedImage((prev) => (prev! > 0 ? prev! - 1 : images.length - 1))
      } else if (e.key === 'ArrowRight') {
        setSelectedImage((prev) => (prev! < images.length - 1 ? prev! + 1 : 0))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage, images.length])

  // Block body scroll when lightbox is open
  useEffect(() => {
    if (selectedImage !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedImage])

  if (!images || images.length === 0) return null

  return (
    <>
      <div ref={ref} className="py-12 border-y border-border">
        <div className="flex items-center gap-3 mb-8">
          <ImageIcon className="h-6 w-6 text-[#ffd23f]" />
          <h2 className="text-2xl md:text-3xl font-bold">Galerie du Programme</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={image._key || index}
              className={`
                group relative aspect-square overflow-hidden rounded-lg cursor-pointer
                transition-all duration-500
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                hover:scale-105
              `}
              style={{ 
                transitionDelay: `${index * 50}ms`,
              }}
              onClick={() => setSelectedImage(index)}
            >
              <Image
                src={urlFor(image.asset).width(600).height(600).url()}
                alt={image.alt || `Image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                {image.caption && (
                  <p className="text-white text-sm font-semibold line-clamp-2">
                    {image.caption}
                  </p>
                )}
              </div>

              {/* Decorative corner */}
              <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#00d4aa] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center">
          {/* Close button */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Fermer"
          >
            <X className="h-6 w-6 text-white" />
          </button>

          {/* Navigation buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={() => setSelectedImage((prev) => (prev! > 0 ? prev! - 1 : images.length - 1))}
                className="absolute left-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Image précédente"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>

              <button
                onClick={() => setSelectedImage((prev) => (prev! < images.length - 1 ? prev! + 1 : 0))}
                className="absolute right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Image suivante"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>
            </>
          )}

          {/* Image counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-semibold">
            {selectedImage + 1} / {images.length}
          </div>

          {/* Main image */}
          <div className="relative w-full h-full max-w-7xl max-h-[90vh] p-4 md:p-8 flex flex-col items-center justify-center">
            <div className="relative w-full h-full">
              <Image
                src={urlFor(images[selectedImage].asset).width(1920).height(1080).url()}
                alt={images[selectedImage].alt || `Image ${selectedImage + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {/* Caption */}
            {images[selectedImage].caption && (
              <div className="mt-4 text-center">
                <p className="text-white text-lg font-medium max-w-3xl mx-auto">
                  {images[selectedImage].caption}
                </p>
              </div>
            )}
          </div>

          {/* Click overlay to close */}
          <div
            className="absolute inset-0 -z-10"
            onClick={() => setSelectedImage(null)}
          />
        </div>
      )}
    </>
  )
}

