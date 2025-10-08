import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { notFound } from "next/navigation"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { PortableText } from "@portabletext/react"

export const revalidate = 60 // Revalidate every 60 seconds

interface Career {
  _id: string
  title: string
  slug: string
  subtitle?: string
  description: string
  deadline: string
  type: string
  domain: string
  location?: string
  duration?: string
  status: string
  responsibilities: string[]
  qualifications: string[]
  advantages?: string[]
  applicationEmail?: string
  applicationInstructions?: string
  featuredImage?: any
  heroImage?: any
  termsOfReferencePdf?: any
  pdfFile?: any
  additionalContent?: any
}

async function getCareer(slug: string): Promise<Career | null> {
  const query = `*[_type == "career" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    subtitle,
    description,
    deadline,
    type,
    domain,
    location,
    duration,
    status,
    responsibilities,
    qualifications,
    advantages,
    applicationEmail,
    applicationInstructions,
    featuredImage,
    heroImage,
    termsOfReferencePdf{
      asset->{
        _id,
        url
      }
    },
    pdfFile{
      asset->{
        _id,
        url
      }
    },
    additionalContent
  }`
  
  return client.fetch(query, { slug })
}

// Generate static params for all careers
export async function generateStaticParams() {
  const query = `*[_type == "career" && defined(slug.current)][].slug.current`
  const slugs = await client.fetch<string[]>(query)
  
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

export default async function CareerDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const career = await getCareer(slug)

  if (!career) {
    notFound()
  }

  // Format deadline
  const formatDeadline = (deadline: string) => {
    return new Date(deadline).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const pdfUrl = career.pdfFile?.asset?.url || null
  const termsOfReferencePdfUrl = career.termsOfReferencePdf?.asset?.url || null

  return (
    <main className="min-h-screen bg-[#f8f8f8]">
      <Header />
      
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section with Image */}
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-4">
                {career.subtitle || "OFFRE D'EMPLOI"}
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-12">
                {career.title}
              </h1>
              
              {/* Featured Image */}
              <div className="max-w-2xl mx-auto mb-12">
                <div className="bg-gradient-to-br from-[#f4a261] to-[#e9c46a] rounded-3xl p-8 md:p-12 shadow-xl">
                  <div className="aspect-square max-w-md mx-auto flex items-center justify-center overflow-hidden rounded-2xl">
                    {career.heroImage ? (
                      <img
                        src={urlFor(career.heroImage).width(600).height(600).url()}
                        alt={career.heroImage.alt || career.title}
                        className="w-full h-full object-cover"
                      />
                    ) : career.featuredImage ? (
                      <img
                        src={urlFor(career.featuredImage).width(600).height(600).url()}
                        alt={career.featuredImage.alt || career.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-8xl">👤</div>
                    )}
                  </div>
                  <div className="mt-8 text-white">
                    <p className="text-2xl font-bold mb-2">{career.type}</p>
                    <p className="text-xl mb-1">{career.domain}</p>
                    {career.location && (
                      <p className="text-lg opacity-90">{career.location}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Description */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-8 bg-primary rounded-full"></div>
                    <h2 className="text-2xl md:text-3xl font-bold">Description du poste</h2>
                  </div>
                  <p className="text-base leading-relaxed text-gray-700">
                    {career.description}
                  </p>
                </div>

                {/* Terms of Reference PDF Viewer */}
                {termsOfReferencePdfUrl && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1 h-8 bg-primary rounded-full"></div>
                      <h2 className="text-2xl md:text-3xl font-bold">Termes de référence</h2>
                    </div>
                    
                    {/* Action Bar */}
                    <div className="bg-primary/10 p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Document PDF</p>
                          <p className="text-sm text-gray-600">Consultez les termes de référence ci-dessous</p>
                        </div>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <Button 
                          asChild 
                          variant="default" 
                          size="sm"
                          className="flex-1 sm:flex-initial"
                        >
                          <a href={termsOfReferencePdfUrl} download target="_blank" rel="noopener noreferrer">
                            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Télécharger
                          </a>
                        </Button>
                        <Button 
                          asChild 
                          variant="outline" 
                          size="sm"
                          className="flex-1 sm:flex-initial"
                        >
                          <a href={termsOfReferencePdfUrl} target="_blank" rel="noopener noreferrer">
                            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Ouvrir
                          </a>
                        </Button>
                      </div>
                    </div>

                    {/* PDF Viewer */}
                    <div className="w-full border-2 border-gray-200 rounded-xl overflow-hidden shadow-xl bg-white">
                      <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Aperçu du document</span>
                        <span className="text-xs text-gray-500 hidden sm:inline">Utilisez la molette pour naviguer</span>
                      </div>
                      <iframe
                        src={`${termsOfReferencePdfUrl}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`}
                        className="w-full h-[600px] md:h-[800px] lg:h-[1000px] bg-white"
                        title="Termes de référence"
                        allow="fullscreen"
                      />
                    </div>

                    {/* Fallback message */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm mt-6">
                      <p className="text-blue-900">
                        <strong>💡 Astuce :</strong> Le PDF ne s'affiche pas correctement ?
                        <a href={termsOfReferencePdfUrl} target="_blank" rel="noopener noreferrer" className="text-primary font-semibold underline ml-1">
                          Ouvrez-le dans un nouvel onglet
                        </a> ou téléchargez-le pour une meilleure expérience de lecture.
                      </p>
                    </div>
                  </div>
                )}

                {/* Responsibilities */}
                {career.responsibilities && career.responsibilities.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1 h-8 bg-primary rounded-full"></div>
                      <h2 className="text-2xl md:text-3xl font-bold">Responsabilités</h2>
                    </div>
                    <ul className="space-y-4">
                      {career.responsibilities.map((responsibility: string, index: number) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-5 h-5 mt-1">
                            <Check className="w-5 h-5 text-[#4a90e2]" strokeWidth={3} />
                          </div>
                          <span className="text-base leading-relaxed text-gray-700">
                            {responsibility}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Qualifications */}
                {career.qualifications && career.qualifications.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1 h-8 bg-primary rounded-full"></div>
                      <h2 className="text-2xl md:text-3xl font-bold">Qualifications</h2>
                    </div>
                    <ul className="space-y-4">
                      {career.qualifications.map((qualification: string, index: number) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-5 h-5 mt-1">
                            <Check className="w-5 h-5 text-[#4a90e2]" strokeWidth={3} />
                          </div>
                          <span className="text-base leading-relaxed text-gray-700">
                            {qualification}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Additional Content */}
                {career.additionalContent && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1 h-8 bg-primary rounded-full"></div>
                      <h2 className="text-2xl md:text-3xl font-bold">Informations complémentaires</h2>
                    </div>
                    <div className="prose prose-lg max-w-none">
                      <PortableText value={career.additionalContent} />
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Advantages Card */}
                  {career.advantages && career.advantages.length > 0 && (
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                      <h3 className="text-xl font-bold mb-4">Avantages</h3>
                      <ul className="space-y-3">
                        {career.advantages.map((advantage: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary mt-1">✓</span>
                            <span className="text-sm leading-relaxed text-gray-700">
                              {advantage}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Application Card */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <h3 className="text-xl font-bold mb-4">Prêt(e) à nous rejoindre ?</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Date limite de candidature :
                    </p>
                    <p className="text-lg font-bold text-primary mb-6">
                      {formatDeadline(career.deadline)}
                    </p>
                    
                    {career.applicationInstructions && (
                      <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                        {career.applicationInstructions}
                      </p>
                    )}
                    
                    <div className="space-y-3">
                      <Button 
                        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 rounded-xl"
                        asChild
                      >
                        <a href={`mailto:${career.applicationEmail || 'recrutement@jgen-senegal.org'}?subject=Candidature - ${career.title}`}>
                          Postuler maintenant
                        </a>
                      </Button>
                      
                      {pdfUrl && (
                        <Button 
                          variant="outline"
                          className="w-full font-semibold py-6 rounded-xl"
                          asChild
                        >
                          <a href={pdfUrl} download target="_blank" rel="noopener noreferrer">
                            Télécharger la fiche PDF
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Info Card */}
                  {(career.duration || career.location) && (
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                      <h3 className="text-xl font-bold mb-4">Informations</h3>
                      <div className="space-y-3 text-sm">
                        {career.type && (
                          <div>
                            <span className="font-semibold text-gray-900">Type : </span>
                            <span className="text-gray-700">{career.type}</span>
                          </div>
                        )}
                        {career.duration && (
                          <div>
                            <span className="font-semibold text-gray-900">Durée : </span>
                            <span className="text-gray-700">{career.duration}</span>
                          </div>
                        )}
                        {career.location && (
                          <div>
                            <span className="font-semibold text-gray-900">Lieu : </span>
                            <span className="text-gray-700">{career.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="mt-16 bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
                A propos de J-GEN SENEGAL
              </h2>
              <p className="text-base leading-relaxed text-gray-700 text-center max-w-4xl mx-auto">
                J-GEN SENEGAL est une organisation féministe à but non lucratif qui promeut l'égalité 
                des sexes et l'autonomisation des femmes au Sénégal. Nous menons des actions de 
                plaidoyer, de sensibilisation et de renforcement des capacités pour transformer les 
                normes sociales et les rapports de pouvoir. Notre vision est celle d'une société où les 
                femmes et les hommes vivent dans l'égalité et la justice.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
