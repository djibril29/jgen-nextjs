"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"
import { urlFor } from "@/sanity/lib/image"

interface BlogPost {
  _id: string
  slug: string
  title: string
  excerpt?: string
  publishedAt?: string
  categories?: string[]
  image?: any
  author?: {
    name: string
  }
}

interface BlogClientProps {
  posts: BlogPost[]
}

export function BlogClient({ posts }: BlogClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tous")

  const categories = ["Tous", "Autonomisation", "Education", "Santé"]

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "Tous" || post.categories?.includes(selectedCategory)
    return matchesSearch && matchesCategory
  })

  return (
    <>
      {/* Hero Section - Violet avec carrés décoratifs */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#3d1f47] to-[#2d1537] relative overflow-hidden">
        {/* Decorative squares */}
        <div className="absolute top-20 right-10 w-24 h-24 bg-[#ffd23f] opacity-40 z-0 rotate-12" />
        <div className="absolute bottom-10 left-10 w-28 h-28 bg-[#00d4aa] opacity-30 z-0 -rotate-12" />
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-[#8c80f7] opacity-20 z-0" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6">
              Notre Blog
            </h1>
            <div className="w-24 h-1 bg-[#ffd23f] mx-auto mb-6" />
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Découvrez nos articles sur l'égalité des sexes, l'autonomisation des femmes
              et nos actions au Sénégal.
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <div className="relative flex-grow max-w-xl">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Rechercher des articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full h-12 pl-12 pr-4 bg-white border-2 border-gray-300 focus:ring-2 focus:ring-[#c61d4d] focus:border-[#c61d4d] text-base shadow-sm"
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

      {/* Blog Posts Grid - Blanc avec carrés décoratifs */}
      <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
        {/* Decorative squares */}
        <div className="absolute top-40 right-10 w-24 h-24 bg-[#ffd23f] opacity-30 z-0 rotate-12" />
        <div className="absolute bottom-40 left-10 w-28 h-28 bg-[#a42c64] opacity-25 z-0" />
        <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-[#00d4aa] opacity-20 z-0 -rotate-12" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            {filteredPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <Link key={post._id} href={`/blog/${post.slug}`} className="group">
                    <div className="relative h-full">
                      {/* Decorative squares around cards (only on first few cards) */}
                      {index % 3 === 0 && (
                        <div className="absolute -top-3 -left-3 w-16 h-16 bg-[#c61d4d] opacity-40 z-0" />
                      )}
                      {index % 3 === 1 && (
                        <div className="absolute -bottom-3 -right-3 w-20 h-20 bg-[#ffd23f] opacity-40 z-0 rotate-12" />
                      )}
                      {index % 3 === 2 && (
                        <div className="absolute -top-3 -right-3 w-16 h-16 bg-[#8c80f7] opacity-40 z-0" />
                      )}
                      
                      <Card className="relative h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden bg-white z-10">
                        <div className="aspect-[4/3] overflow-hidden">
                          <img
                            src={post.image ? urlFor(post.image).width(800).height(600).url() : "/placeholder.svg"}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <CardContent className="p-6">
                          <h3 className="text-xl md:text-2xl font-bold mb-3 leading-tight text-gray-900 group-hover:text-[#c61d4d] transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            Par {post.author?.name || "J-GEN"}, {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : ""}
                          </p>
                          {post.excerpt && (
                            <p className="text-base text-gray-700 leading-relaxed line-clamp-3">
                              {post.excerpt}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun article trouvé</h3>
                  <p className="text-gray-600 mb-6">
                    {searchQuery || selectedCategory !== "Tous" 
                      ? "Aucun article ne correspond à votre recherche." 
                      : "Il n'y a pas encore d'articles publiés. Revenez bientôt !"}
                  </p>
                  {(searchQuery || selectedCategory !== "Tous") && (
                    <button 
                      onClick={() => {
                        setSearchQuery("")
                        setSelectedCategory("Tous")
                      }}
                      className="bg-[#c61d4d] text-white px-6 py-2 rounded-lg hover:bg-[#b01a45] transition-colors"
                    >
                      Effacer les filtres
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

