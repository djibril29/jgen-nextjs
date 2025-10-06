"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useResources } from "@/hooks/use-resources"
import { urlFor } from "@/sanity/lib/image"
import Link from "next/link"

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tous")

  const { resources, loading, error } = useResources({
    category: selectedCategory,
    limit: 20
  })

  const categories = ["Tous", "Publications", "Rapports", "Guides", "Outils", "Vidéos", "Formations"]

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (resource.description && resource.description.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesSearch
  })

  if (loading) {
    return (
      <main className="min-h-screen">
        <Header />
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="w-full bg-muted aspect-[3/4] rounded-xl mb-4"></div>
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-3 bg-muted rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen">
        <Header />
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Erreur de chargement</h2>
              <p className="text-muted-foreground">{error}</p>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-text-light dark:text-text-dark mb-6">
              Ressources
            </h1>
            <p className="text-lg text-text-muted-light dark:text-text-muted-dark max-w-3xl mx-auto leading-relaxed">
              Explorez notre collection de publications, rapports, guides et autres outils pour promouvoir l'égalité des sexes.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 lg:py-12 bg-background border-b border-border-light dark:border-border-dark">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <div className="relative flex-grow max-w-xl">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-text-muted-light dark:text-text-muted-dark">
                  <svg fill="currentColor" height="20" viewBox="0 0 256 256" width="20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Rechercher des ressources"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-input w-full rounded-full h-12 pl-12 pr-4 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-text-muted-light dark:placeholder:text-text-muted-dark text-base"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="border-b border-border-light dark:border-border-dark flex justify-center">
              <div className="flex gap-4 sm:gap-8 -mb-px">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`flex items-center justify-center border-b-2 px-1 py-3 text-sm font-bold transition-colors ${
                      selectedCategory === category
                        ? "border-primary text-primary"
                        : "border-transparent text-text-muted-light dark:text-text-muted-dark hover:text-primary hover:border-primary"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {filteredResources.length > 0 ? (
              <>
                <div className="mb-8">
                  <p className="text-text-muted-light dark:text-text-muted-dark">
                    {filteredResources.length} ressource{filteredResources.length !== 1 ? "s" : ""} trouvée{filteredResources.length !== 1 ? "s" : ""}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
                  {filteredResources.map((resource) => {
                    const slugString = typeof resource.slug === 'string' ? resource.slug : (resource.slug as any)?.current || resource._id
                    const imageUrl = resource.featuredImage 
                      ? urlFor(resource.featuredImage).width(400).height(533).url()
                      : `https://via.placeholder.com/300x400/ec133e/ffffff?text=${encodeURIComponent(resource.title.substring(0, 20))}`
                    
                    return (
                      <Link key={resource._id} href={`/resources/${slugString}`} className="group">
                        <div className="flex flex-col gap-4 group">
                          <div className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-xl overflow-hidden">
                            <div
                              className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                              style={{
                                backgroundImage: `url("${imageUrl}")`
                              }}
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <h3 className="text-base font-bold leading-snug text-text-light dark:text-text-dark line-clamp-2">
                              {resource.title}
                            </h3>
                            <p className="text-sm text-text-muted-light dark:text-text-muted-dark line-clamp-3">
                              {resource.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-lg text-text-muted-light dark:text-text-muted-dark">
                  Aucune ressource trouvée pour cette recherche.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
