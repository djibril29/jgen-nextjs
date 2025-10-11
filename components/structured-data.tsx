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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
