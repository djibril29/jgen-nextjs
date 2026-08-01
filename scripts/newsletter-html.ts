/**
 * Fonctions pures de transformation et de validation du HTML de la newsletter.
 *
 * Elles sont isolées du script de génération pour être importables et testables
 * sans déclencher de rendu ni d'écriture de fichier.
 */

import { newsletterSemesterOne2026 as data } from "@/content/newsletter-semestre-1-2026"
import { withNewsletterUtm } from "@/lib/site"

/** Zones que Mailchimp doit rendre éditables. Chaque valeur doit être unique. */
export const EXPECTED_EDITABLE_REGIONS = [
  "hero_title",
  "hero_intro",
  "hero_image",
  "main_cta",
  "editorial_footer",
] as const

// ---------------------------------------------------------------------------
// Conversion des zones éditables
// ---------------------------------------------------------------------------

/**
 * Convertit les attributs `data-mc-edit="…"` en `mc:edit="…"`.
 *
 * Un attribut avec namespace ne peut pas être écrit tel quel en JSX : le
 * template utilise donc `data-mc-edit`, et la conversion est faite ici, de
 * manière ciblée. La regex est ancrée sur le nom d'attribut exact — il ne
 * s'agit pas d'un remplacement global de chaîne.
 */
export function convertMailchimpAttributes(html: string): string {
  return html.replace(/\bdata-mc-edit="([\w-]+)"/g, 'mc:edit="$1"')
}

/** Extrait la liste des valeurs `mc:edit` présentes dans le HTML. */
export function extractEditableRegions(html: string): string[] {
  return Array.from(html.matchAll(/\bmc:edit="([\w-]+)"/g), (match) => match[1])
}

// ---------------------------------------------------------------------------
// Normalisation
// ---------------------------------------------------------------------------

/**
 * Décode les entités HTML produites par React lors du rendu, afin de pouvoir
 * chercher les textes dans leur forme d'origine. React échappe notamment
 * l'apostrophe (`&#x27;`) et l'esperluette des URL (`&amp;`), ce qui rendrait
 * une comparaison brute systématiquement fausse.
 */
export function decodeHtmlEntities(html: string): string {
  return html
    .replace(/&#x27;|&#39;|&apos;/g, "'")
    .replace(/&quot;|&#34;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&#x2F;|&#47;/g, "/")
    // L'esperluette se décode en dernier, pour ne pas réintroduire d'entités.
    .replace(/&amp;/g, "&")
}

/**
 * Normalise un texte avant comparaison :
 *  - décodage des entités HTML ;
 *  - suppression des caractères invisibles insérés par <Preview> pour caler la
 *    longueur du preheader dans les clients de messagerie ;
 *  - réduction de toutes les suites d'espaces à un seul espace, car `pretty()`
 *    retourne les lignes longues et coupe donc les phrases.
 */
export function normalizeForSearch(value: string): string {
  return decodeHtmlEntities(value)
    .replace(/[​‌‍‎‏⁠͏؜﻿]/g, "")
    .replace(/\s+/g, " ")
    .trim()
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

/** Motifs strictement interdits dans le HTML final. */
export const FORBIDDEN_PATTERNS: { pattern: RegExp; reason: string }[] = [
  { pattern: /localhost/i, reason: "référence à localhost" },
  { pattern: /127\.0\.0\.1/, reason: "référence à 127.0.0.1" },
  { pattern: /\/_next\//, reason: "référence à /_next/ (optimisation d'images Next.js)" },
  { pattern: /<script/i, reason: "balise <script> (interdite dans un e-mail)" },
  { pattern: /data-mc-edit=/, reason: "attribut data-mc-edit non converti" },
  { pattern: /src="\//, reason: 'chemin d\'image relatif (src="/…")' },
  { pattern: /href="\//, reason: 'lien relatif (href="/…")' },
  { pattern: /TODO_URL/, reason: "URL fictive TODO_URL" },
  { pattern: /href=""/, reason: 'lien vide (href="")' },
  { pattern: /<link[^>]+rel="stylesheet"/i, reason: "feuille de style externe" },
]

/** Chaînes qui doivent impérativement être présentes. */
export function requiredStrings(): { value: string; reason: string }[] {
  return [
    { value: "<!DOCTYPE html", reason: "doctype du document" },
    { value: "<title>", reason: "balise <title>" },
    { value: "*|ARCHIVE|*", reason: "merge tag version navigateur" },
    { value: "*|UNSUB|*", reason: "merge tag de désabonnement" },
    { value: "*|UPDATE_PROFILE|*", reason: "merge tag de mise à jour des préférences" },
    { value: "*|HTML:LIST_ADDRESS_HTML|*", reason: "merge tag de l'adresse postale" },
    { value: "mc:edit=", reason: "au moins une zone éditable Mailchimp" },
    { value: data.meta.seoTitle, reason: "titre du document" },
    { value: data.emailPreview, reason: "texte de prévisualisation (preheader)" },
    { value: withNewsletterUtm(data.pagePath), reason: "lien vers la page complète" },
  ]
}

export class ValidationError extends Error {
  constructor(public readonly problems: string[]) {
    super(`Validation du HTML échouée (${problems.length} problème(s))`)
    this.name = "ValidationError"
  }
}

/**
 * Contrôle le HTML final destiné à Mailchimp.
 * Lève une `ValidationError` listant tous les problèmes rencontrés.
 */
export function validateHtml(html: string): void {
  const problems: string[] = []
  const searchable = normalizeForSearch(html)

  for (const { pattern, reason } of FORBIDDEN_PATTERNS) {
    if (pattern.test(html)) {
      problems.push(`Contenu interdit détecté — ${reason}.`)
    }
  }

  for (const { value, reason } of requiredStrings()) {
    if (!searchable.includes(normalizeForSearch(value))) {
      problems.push(`Contenu obligatoire absent — ${reason} (« ${value} »).`)
    }
  }

  // Zones éditables : présence et unicité.
  const regions = extractEditableRegions(html)
  const duplicates = regions.filter((region, index) => regions.indexOf(region) !== index)
  if (duplicates.length > 0) {
    problems.push(
      `Zones mc:edit dupliquées : ${Array.from(new Set(duplicates)).join(", ")}. Chaque valeur doit être unique.`,
    )
  }
  for (const expected of EXPECTED_EDITABLE_REGIONS) {
    if (!regions.includes(expected)) {
      problems.push(`Zone éditable manquante : mc:edit="${expected}".`)
    }
  }

  // Toutes les images doivent utiliser une URL absolue en https.
  for (const match of html.matchAll(/<img[^>]+src="([^"]*)"/gi)) {
    const src = match[1]
    if (!src.startsWith("https://")) {
      problems.push(`URL d'image non absolue : « ${src} ». Les images doivent être en https://.`)
    }
  }

  // Tous les liens doivent être absolus, un mailto:, un tel: ou un merge tag Mailchimp.
  for (const match of html.matchAll(/<a[^>]+href="([^"]*)"/gi)) {
    const href = match[1]
    const isAcceptable =
      href.startsWith("https://") ||
      href.startsWith("http://") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("*|")
    if (!isAcceptable) {
      problems.push(`Lien non absolu : « ${href} ».`)
    }
  }

  if (problems.length > 0) {
    throw new ValidationError(problems)
  }
}
