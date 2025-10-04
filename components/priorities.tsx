import { client } from "@/sanity/lib/client"
import { Suspense } from "react"
import { PrioritiesClient, ProgramCard } from "./priorities.client"

export async function Priorities() {
  const query = `*[_type=="program"]|order(_createdAt desc)[0...4]{
    _id,
    title,
    summary,
    "slug": slug.current,
    featuredImage
  }`
  const programs = await client.fetch<ProgramCard[]>(query)
  return (
    <Suspense>
      {/* @ts-expect-error Async Server/Client boundary */}
      <PrioritiesClient programs={programs} />
    </Suspense>
  )
}
