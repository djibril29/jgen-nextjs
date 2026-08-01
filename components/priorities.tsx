import { client } from "@/sanity/lib/client"
import { Suspense } from "react"
import { PrioritiesClient, ProgramCard } from "./priorities.client"

export async function Priorities() {
  // Quatre programmes, soit deux rangées de deux cartes. Le bouton « Voir tous
  // nos programmes » mène aux quatre autres.
  const query = `*[_type=="program"]|order(_createdAt desc)[0...4]{
    _id,
    title,
    summary,
    "slug": slug.current,
    featuredImage,
    status,
    executionPeriod,
    location
  }`
  const programs = await client.fetch<ProgramCard[]>(query, {}, {
    next: { revalidate: 60 } // Revalidate every 60 seconds
  })
  return (
    <Suspense>
      {/* @ts-expect-error Async Server/Client boundary */}
      <PrioritiesClient programs={programs} />
    </Suspense>
  )
}
