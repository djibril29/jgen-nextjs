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
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section - Violet avec carrés décoratifs */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#3d1f47] to-[#2d1537] relative overflow-hidden">
        {/* Decorative squares */}
        <div className="absolute top-20 right-10 w-24 h-24 bg-[#ffd23f] opacity-40 z-0 rotate-12" />
        <div className="absolute bottom-10 left-10 w-28 h-28 bg-[#00d4aa] opacity-30 z-0 -rotate-12" />
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-[#8c80f7] opacity-20 z-0" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6">
              Ressources
            </h1>
            <div className="w-24 h-1 bg-[#ffd23f] mx-auto mb-6" />
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Explorez notre collection de publications, rapports, guides et autres outils pour promouvoir l'égalité des sexes.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters - Blanc avec carrés décoratifs */}
      <section className="py-12 bg-white border-b border-gray-200 relative overflow-hidden">
        {/* Decorative squares */}
        <div className="absolute top-5 left-5 w-16 h-16 bg-[#c61d4d] opacity-20 z-0" />
        <div className="absolute bottom-5 right-5 w-20 h-20 bg-[#8c80f7] opacity-20 z-0 rotate-45" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <div className="relative flex-grow max-w-xl">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                  <svg fill="currentColor" height="20" viewBox="0 0 256 256" width="20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Rechercher des ressources"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full h-12 pl-12 pr-4 bg-white border-2 border-gray-300 focus:ring-2 focus:ring-[#c61d4d] focus:border-[#c61d4d] placeholder:text-gray-400 text-base shadow-sm"
                />
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex justify-center gap-3 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                    selectedCategory === category
                      ? "bg-[#c61d4d] text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid - Blanc avec carrés décoratifs */}
      <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
        {/* Decorative squares */}
        <div className="absolute top-40 right-10 w-24 h-24 bg-[#ffd23f] opacity-30 z-0 rotate-12" />
        <div className="absolute bottom-40 left-10 w-28 h-28 bg-[#a42c64] opacity-25 z-0" />
        <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-[#00d4aa] opacity-20 z-0 -rotate-12" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            {filteredResources.length > 0 ? (
              <>
                <div className="mb-8">
                  <p className="text-gray-600">
                    {filteredResources.length} ressource{filteredResources.length !== 1 ? "s" : ""} trouvée{filteredResources.length !== 1 ? "s" : ""}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
                  {filteredResources.map((resource, index) => {
                    const slugString = typeof resource.slug === 'string' ? resource.slug : (resource.slug as any)?.current || resource._id
                    const imageUrl = resource.featuredImage 
                      ? urlFor(resource.featuredImage).width(400).height(533).url()
                      : `https://via.placeholder.com/300x400/ec133e/ffffff?text=${encodeURIComponent(resource.title.substring(0, 20))}`
                    
                    return (
                      <Link key={resource._id} href={`/resources/${slugString}`} className="group">
                        <div className="flex flex-col gap-4">
                          <div className="relative">
                            {/* Decorative squares around some cards */}
                            {index % 4 === 0 && (
                              <div className="absolute -top-2 -left-2 w-12 h-12 bg-[#c61d4d] opacity-30 z-0" />
                            )}
                            {index % 4 === 1 && (
                              <div className="absolute -bottom-2 -right-2 w-14 h-14 bg-[#ffd23f] opacity-30 z-0 rotate-12" />
                            )}
                            {index % 4 === 2 && (
                              <div className="absolute -top-2 -right-2 w-12 h-12 bg-[#8c80f7] opacity-30 z-0" />
                            )}
                            {index % 4 === 3 && (
                              <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-[#00d4aa] opacity-30 z-0 -rotate-12" />
                            )}
                            
                            <div className="relative w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-all z-10">
                              <div
                                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                                style={{
                                  backgroundImage: `url("${imageUrl}")`
                                }}
                              />
                            </div>
                          </div>
                          <div className="flex flex-col gap-1">
                            <h3 className="text-base font-bold leading-snug text-gray-900 line-clamp-2 group-hover:text-[#c61d4d] transition-colors">
                              {resource.title}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-3">
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
                <p className="text-lg text-gray-600">
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
