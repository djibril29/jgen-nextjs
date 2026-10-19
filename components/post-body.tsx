import Image from "next/image"
import { PortableText, type PortableTextComponents } from "@portabletext/react"
import { urlFor } from "@/sanity/lib/image"

// Accepte les formes courantes : watch?v=, youtu.be/, shorts/, embed/
function getYouTubeId(url?: string) {
  if (!url) return null
  const match = url.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/)
  return match ? match[1] : null
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      return (
        <figure className="not-prose my-10">
          <Image
            src={urlFor(value).width(1600).fit("max").auto("format").url()}
            alt={value.alt || value.caption || ""}
            width={1600}
            height={1067}
            sizes="(min-width: 768px) 768px, 100vw"
            className="h-auto w-full rounded-lg"
          />
          {value.caption && (
            <figcaption className="mt-3 text-sm text-muted-foreground">{value.caption}</figcaption>
          )}
        </figure>
      )
    },
    youtube: ({ value }) => {
      const id = getYouTubeId(value?.url)
      if (!id) return null
      return (
        <figure className="not-prose my-10">
          <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${id}`}
              title={value.caption || "Vidéo YouTube"}
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
          <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-sm text-muted-foreground">
            {value.caption && <span>{value.caption}</span>}
            <a
              href={`https://www.youtube.com/watch?v=${id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground"
            >
              Voir sur YouTube
            </a>
          </figcaption>
        </figure>
      )
    },
  },
  marks: {
    // Les liens sortants s'ouvrent dans un nouvel onglet : l'article reste ouvert.
    link: ({ value, children }) => {
      const href: string = value?.href || ""
      const external = /^https?:\/\//.test(href)
      return (
        <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {children}
        </a>
      )
    },
  },
}

export function PostBody({ value }: { value: any }) {
  return <PortableText value={value} components={components} />
}
