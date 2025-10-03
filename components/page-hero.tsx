import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface Breadcrumb {
  label: string
  href: string
}

interface PageHeroProps {
  title: string
  description: string
  breadcrumbs: Breadcrumb[]
  image: string
  imageAlt: string
  category?: string
}

export function PageHero({ title, description, breadcrumbs, image, imageAlt, category }: PageHeroProps) {
  return (
    <section className="pt-20 lg:pt-24">
      <div className="grid lg:grid-cols-5 min-h-[500px]">
        {/* Left side - Text content with crimson background */}
        <div className="lg:col-span-2 bg-[#c61d4d] text-white p-8 lg:pl-24 lg:pr-12 lg:py-12 flex flex-col justify-center">
          <div className="max-w-xl">
            {/* Category Label */}
            {category && (
              <div className="inline-block border-2 border-white px-4 py-2 mb-6">
                <span className="font-bold text-sm tracking-wide uppercase">{category}</span>
              </div>
            )}

            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 mb-6 text-sm">
              {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Link
                    href={crumb.href}
                    className="hover:underline uppercase tracking-wide font-medium transition-opacity hover:opacity-80"
                  >
                    {crumb.label}
                  </Link>
                  {index < breadcrumbs.length - 1 && <ChevronRight className="h-4 w-4" />}
                </div>
              ))}
            </nav>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance leading-tight">{title}</h1>

            {/* Description */}
            <p className="text-lg md:text-xl leading-relaxed text-white/95 text-pretty">{description}</p>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="lg:col-span-3 relative min-h-[300px] lg:min-h-0">
          <img
            src={image || "/placeholder.svg"}
            alt={imageAlt}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
