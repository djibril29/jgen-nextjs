/**
 * Sérialise un objet JSON-LD pour insertion dans un `<script>`.
 *
 * `JSON.stringify` laisse passer `<` tel quel : un titre d'article contenant
 * « </script> » fermerait le bloc et injecterait le reste dans le document.
 * On échappe donc `<` sous forme d'échappement Unicode, que JSON comprend et
 * que l'analyseur HTML ne voit pas comme une balise.
 */
function serializeJsonLd(schema: unknown): string {
  return JSON.stringify(schema).replace(/</g, "\\u003c")
}

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "J-GEN SENEGAL",
    "alternateName": "J-GEN",
    "url": "https://jgen.sn",
    "logo": "https://jgen.sn/logo-jgen.png",
    "description": "Organisation féministe sénégalaise luttant contre les violences basées sur le genre",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "SN",
      "addressLocality": "Dakar",
    },
    "sameAs": [
      "https://facebook.com/jgensenegal",
      "https://instagram.com/jgensenegal",
      "https://linkedin.com/company/jgensenegal",
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "areaServed": "SN",
      "availableLanguage": ["fr", "wo"]
    },
    "foundingDate": "2020",
    "knowsAbout": [
      "Violences basées sur le genre",
      "Droits des femmes",
      "Plaidoyer féministe",
      "Autonomisation des femmes",
      "Protection des filles"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "Sénégal"
    },
    "mission": "Créer un Sénégal où les femmes et les filles vivent libres de toute violence et discrimination"
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
    />
  )
}

export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "J-GEN SENEGAL",
    "url": "https://jgen.sn",
    "description": "Site officiel de J-GEN SENEGAL - Organisation féministe luttant contre les violences basées sur le genre",
    "publisher": {
      "@type": "Organization",
      "name": "J-GEN SENEGAL"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://jgen.sn/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
    />
  )
}

export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
    />
  )
}

/**
 * Balisage d'un article.
 *
 * Les champs absents sont retirés avant sérialisation : un `Article` qui déclare
 * une propriété vide vaut moins qu'un `Article` qui ne la déclare pas, et Google
 * signale les valeurs nulles comme des erreurs dans son outil de test.
 */
export function ArticleSchema({
  headline,
  description,
  url,
  image,
  datePublished,
  dateModified,
  authorName,
  keywords,
}: {
  headline: string
  description?: string
  url: string
  image?: string
  datePublished?: string
  dateModified?: string
  authorName?: string
  keywords?: string[]
}) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    inLanguage: "fr-SN",
    publisher: {
      "@type": "Organization",
      name: "J-GEN SENEGAL",
      url: "https://jgen.sn",
      logo: {
        "@type": "ImageObject",
        url: "https://jgen.sn/logo-jgen.png",
      },
    },
    author: {
      "@type": authorName && authorName !== "jgen" ? "Person" : "Organization",
      name: authorName && authorName !== "jgen" ? authorName : "J-GEN SENEGAL",
    },
  }

  if (description) schema.description = description
  if (image) schema.image = [image]
  if (datePublished) schema.datePublished = datePublished
  if (dateModified) schema.dateModified = dateModified
  if (keywords && keywords.length > 0) schema.keywords = keywords.join(", ")

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
    />
  )
}
