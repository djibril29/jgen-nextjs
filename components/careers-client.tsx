"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { urlFor } from "@/sanity/lib/image"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Career {
  _id: string
  title: string
  slug: string
  description: string
  deadline: string
  type: string
  domain: string
  status: string
  featuredImage?: any
  featured: boolean
}

interface CareersClientProps {
  careers: Career[]
}

export function CareersClient({ careers }: CareersClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedDomain, setSelectedDomain] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  
  const itemsPerPage = 6

  // Filtrage des opportunités
  const filteredOpportunities = useMemo(() => {
    return careers.filter((job) => {
      const matchesSearch = 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesType = selectedType === "all" || job.type === selectedType
      const matchesDomain = selectedDomain === "all" || job.domain === selectedDomain
      
      return matchesSearch && matchesType && matchesDomain
    })
  }, [careers, searchQuery, selectedType, selectedDomain])

  const totalPages = Math.ceil(filteredOpportunities.length / itemsPerPage)

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentOpportunities = filteredOpportunities.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Format deadline
  const formatDeadline = (deadline: string) => {
    return new Date(deadline).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <>
      {/* Hero Section - Violet avec carrés décoratifs */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#3d1f47] to-[#2d1537] relative overflow-hidden">
        {/* Decorative squares */}
        <div className="absolute top-20 right-10 w-24 h-24 bg-[#ffd23f] opacity-40 z-0 rotate-12" />
        <div className="absolute bottom-10 left-10 w-28 h-28 bg-[#00d4aa] opacity-30 z-0 -rotate-12" />
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-[#8c80f7] opacity-20 z-0" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6">
              Opportunités d'emploi
            </h1>
            <div className="w-24 h-1 bg-[#ffd23f] mx-auto mb-6" />
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Rejoignez J-GEN SENEGAL et contribuez à un avenir plus juste et égalitaire.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters Section - Blanc avec carrés décoratifs */}
      <section className="py-12 bg-white border-b border-gray-200 relative overflow-hidden">
        {/* Decorative squares */}
        <div className="absolute top-5 left-5 w-16 h-16 bg-[#c61d4d] opacity-20 z-0" />
        <div className="absolute bottom-5 right-5 w-20 h-20 bg-[#8c80f7] opacity-20 z-0 rotate-45" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Rechercher des opportunités d'emploi"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-base bg-white border-2 border-gray-300 focus:ring-2 focus:ring-[#c61d4d] focus:border-[#c61d4d] shadow-sm rounded-full"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[200px] bg-white">
                  <SelectValue placeholder="Type d'opportunité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="CDI">CDI</SelectItem>
                  <SelectItem value="CDD">CDD</SelectItem>
                  <SelectItem value="Stage">Stage</SelectItem>
                  <SelectItem value="Bénévolat">Bénévolat</SelectItem>
                  <SelectItem value="Consultation">Consultation</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                <SelectTrigger className="w-[200px] bg-white">
                  <SelectValue placeholder="Domaine" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les domaines</SelectItem>
                  <SelectItem value="Gestion de projet">Gestion de projet</SelectItem>
                  <SelectItem value="Communication">Communication</SelectItem>
                  <SelectItem value="Administration">Administration</SelectItem>
                  <SelectItem value="Plaidoyer">Plaidoyer</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Ressources humaines">Ressources humaines</SelectItem>
                  <SelectItem value="Suivi & Évaluation">Suivi & Évaluation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings - Blanc avec carrés décoratifs */}
      <section className="py-16 bg-white relative overflow-hidden">
        {/* Decorative squares */}
        <div className="absolute top-40 right-10 w-24 h-24 bg-[#ffd23f] opacity-30 z-0 rotate-12" />
        <div className="absolute bottom-40 left-10 w-28 h-28 bg-[#a42c64] opacity-25 z-0" />
        <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-[#00d4aa] opacity-20 z-0 -rotate-12" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            {currentOpportunities.length > 0 ? (
              <div className="space-y-8">
                {currentOpportunities.map((job) => (
                  <Card key={job._id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        {/* Image */}
                        <div className="md:w-[280px] lg:w-[320px] bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center p-8 flex-shrink-0">
                          <div className="w-full aspect-square flex items-center justify-center">
                            {job.featuredImage ? (
                              <img
                                src={urlFor(job.featuredImage).width(320).height(320).url()}
                                alt={job.featuredImage.alt || job.title}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <div className="text-white text-6xl">
                                {job.title.toLowerCase().includes("coordinateur") && "👥"}
                                {job.title.toLowerCase().includes("chargé") && "💼"}
                                {job.title.toLowerCase().includes("assistant") && "📋"}
                                {!job.title.toLowerCase().includes("coordinateur") && 
                                 !job.title.toLowerCase().includes("chargé") && 
                                 !job.title.toLowerCase().includes("assistant") && "💼"}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                          <div>
                            <div className="mb-4">
                              <span className="text-sm font-semibold text-primary">
                                Date limite: {formatDeadline(job.deadline)}
                              </span>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold mb-4">
                              {job.title}
                            </h3>
                            <p className="text-base text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                              {job.description}
                            </p>
                          </div>
                          <div>
                            <Button 
                              asChild
                              className="bg-primary hover:bg-primary/90 text-white"
                            >
                              <Link href={`/about/careers/${job.slug}`}>
                                Voir les détails
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground">
                  Aucune opportunité trouvée pour cette recherche.
                </p>
              </div>
            )}

            {/* Pagination */}
            {filteredOpportunities.length > itemsPerPage && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => goToPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="h-10 w-10"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum: number
                  if (totalPages <= 5) {
                    pageNum = i + 1
                  } else if (currentPage <= 3) {
                    pageNum = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = currentPage - 2 + i
                  }

                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="icon"
                      onClick={() => goToPage(pageNum)}
                      className={`h-10 w-10 ${
                        currentPage === pageNum
                          ? "bg-primary text-white hover:bg-primary/90"
                          : ""
                      }`}
                    >
                      {pageNum}
                    </Button>
                  )
                })}

                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <>
                    <span className="px-2">...</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => goToPage(totalPages)}
                      className="h-10 w-10"
                    >
                      {totalPages}
                    </Button>
                  </>
                )}

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="h-10 w-10"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
