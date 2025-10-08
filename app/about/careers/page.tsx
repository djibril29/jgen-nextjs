import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CareersClient } from "@/components/careers-client"
import { client } from "@/sanity/lib/client"
import { Suspense } from "react"

export const revalidate = 60 // Revalidate every 60 seconds

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

async function getCareers() {
  const query = `*[_type == "career" && status == "open"] | order(deadline asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    deadline,
    type,
    domain,
    status,
    featuredImage,
    featured
  }`
  
  return client.fetch<Career[]>(query)
}

export default async function CareersPage() {
  const careers = await getCareers()

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Suspense fallback={<CareersPageSkeleton />}>
        <CareersClient careers={careers} />
      </Suspense>
      <Footer />
    </main>
  )
}

function CareersPageSkeleton() {
  return (
    <div className="pt-32 pb-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="h-16 bg-gray-200 rounded-lg animate-pulse mb-6" />
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="h-14 bg-gray-200 rounded-lg animate-pulse mb-8" />
          <div className="grid gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}