/**
 * URL publique du site, centralisée.
 *
 * Deux variables sont lues, dans cet ordre :
 *  - NEXT_PUBLIC_SITE_URL  → disponible côté navigateur et côté serveur Next.js
 *  - NEWSLETTER_SITE_URL   → repli pour les scripts Node purs (génération de l'e-mail),
 *                            qui n'ont pas accès aux variables inlinées par Next.
 *
 * Si aucune n'est définie, on retombe sur le domaine de production documenté.
 * Voir .env.example.
 */
const FALLBACK_SITE_URL = "https://jgen.sn"

function readSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEWSLETTER_SITE_URL ||
    FALLBACK_SITE_URL

  // Retire le slash final pour que buildUrl() produise toujours la même forme.
  return raw.trim().replace(/\/+$/, "")
}

export const SITE_URL = readSiteUrl()

/**
 * Construit une URL absolue à partir d'un chemin relatif, avec des paramètres
 * de requête optionnels. On passe par l'API `URL` plutôt que par de la
 * concaténation de chaînes, afin d'éviter les doubles slashs et les paramètres
 * mal encodés.
 */
export function buildUrl(
  path: string,
  searchParams?: Record<string, string>,
): string {
  const url = new URL(path.startsWith("/") ? path : `/${path}`, `${SITE_URL}/`)

  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      url.searchParams.set(key, value)
    }
  }

  return url.toString()
}

/** Paramètres UTM de la campagne Mailchimp du semestre 1 2026. */
export const NEWSLETTER_SEMESTER_ONE_2026_UTM = {
  utm_source: "mailchimp",
  utm_medium: "email",
  utm_campaign: "newsletter_semestre_1_2026",
} as const

/**
 * Ajoute les paramètres UTM de la campagne à un chemin du site.
 * Utilisé uniquement par le template e-mail — la page web garde des liens propres.
 */
export function withNewsletterUtm(path: string): string {
  return buildUrl(path, { ...NEWSLETTER_SEMESTER_ONE_2026_UTM })
}
