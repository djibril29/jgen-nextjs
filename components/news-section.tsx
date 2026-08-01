import { client } from "@/sanity/lib/client"
import { Suspense } from "react"
import { NewsSectionClient, NewsItem } from "./news-section.client"

export async function NewsSection() {
  // Deux rangées de trois. Le semestre 1 2026 a fait passer le blog de huit à
  // trente et un articles : trois vignettes ne donnaient plus la mesure de ce
  // qui est couvert.
  const query = `*[_type=="post"]|order(publishedAt desc)[0...6]{
    _id,
    title,
    excerpt,
    image,
    "slug": slug.current,
    "tags": coalesce(categories[]->title, []),
    publishedAt
  }`
  const items = await client.fetch<NewsItem[]>(query, {}, {
    next: { revalidate: 60 } // Revalidate every 60 seconds
  })
  return (
    <Suspense>
      {/* @ts-expect-error Async Server/Client boundary */}
      <NewsSectionClient items={items} />
    </Suspense>
  )
}
