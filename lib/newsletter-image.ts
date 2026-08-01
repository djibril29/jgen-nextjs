import fs from "node:fs"
import path from "node:path"

import { SITE_URL } from "@/lib/site"

/**
 * Résolution des visuels de la newsletter.
 *
 * Principe : on désigne une image par son NOM DE BASE uniquement (« cover »,
 * « elles-aussi »…). Ce module retrouve le fichier réellement présent sur le
 * disque, quelle que soit son extension et quelle que soit la casse.
 *
 * Conséquence pratique pour J-GEN : déposer `cover.png`, `cover.jpg` ou
 * `Cover.JPEG` fonctionne à l'identique, sans aucune modification de code.
 *
 * Ce module s'exécute côté Node uniquement :
 *  - dans la page (Server Component, au moment du build) ;
 *  - dans le script `npm run email:generate`.
 * Il ne doit jamais être importé depuis un composant "use client".
 */

/**
 * Dossiers explorés, par ordre de priorité. Chemins relatifs à `public/`.
 *
 * Tous les dossiers existants sont lus et FUSIONNÉS : un visuel peut donc se
 * trouver dans n'importe lequel d'entre eux. En cas de même nom de base dans
 * deux dossiers, le premier de cette liste l'emporte.
 *
 * Les deux orthographes (« newsletter » et « newsletters ») sont acceptées, de
 * même que les sous-dossiers par édition, afin qu'aucun dépôt de fichier ne se
 * retrouve ignoré à cause d'une variante de nommage.
 */
const IMAGE_DIRECTORIES = [
  "newsletters/semestre-1",
  "newsletters/semestre-1-2026",
  "newsletter/semestre-1",
  "newsletter/semestre-1-2026",
  "newsletters",
  "newsletter",
] as const

/** Extensions acceptées, par ordre de préférence en cas de doublon de nom. */
const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif"] as const

export type ResolvedNewsletterImage = {
  /** Chemin servi par Next, ex. `/newsletters/semestre-1/jvssr.png` */
  publicPath: string
  /** URL absolue, obligatoire pour l'e-mail, ex. `https://jgen.sn/newsletters/...` */
  absoluteUrl: string
  /** Texte alternatif descriptif */
  alt: string
}

type IndexedFile = { directory: string; fileName: string }

type ImageIndex = {
  /** Dossiers effectivement trouvés et contenant au moins une image */
  directories: string[]
  /** nom de base en minuscules -> fichier réel */
  files: Map<string, IndexedFile>
}

let cachedIndex: ImageIndex | null = null

function extensionRank(fileName: string): number {
  const extension = path.extname(fileName).toLowerCase()
  const rank = (IMAGE_EXTENSIONS as readonly string[]).indexOf(extension)
  return rank === -1 ? Number.MAX_SAFE_INTEGER : rank
}

function buildIndex(): ImageIndex {
  const publicDir = path.join(process.cwd(), "public")
  const files = new Map<string, IndexedFile>()
  const directories: string[] = []

  for (const directory of IMAGE_DIRECTORIES) {
    let entries: string[]
    try {
      entries = fs.readdirSync(path.join(publicDir, directory))
    } catch {
      // Dossier absent : on passe au suivant.
      continue
    }

    let found = 0

    for (const entry of entries) {
      const extension = path.extname(entry).toLowerCase()
      if (!(IMAGE_EXTENSIONS as readonly string[]).includes(extension)) continue

      found += 1
      const base = path.basename(entry, path.extname(entry)).toLowerCase()
      const existing = files.get(base)

      // Un dossier plus prioritaire l'emporte toujours ; à dossier égal, on
      // départage par l'ordre des extensions (cover.jpg avant cover.png).
      if (existing) {
        const sameDirectory = existing.directory === directory
        if (!sameDirectory) continue
        if (extensionRank(existing.fileName) <= extensionRank(entry)) continue
      }

      files.set(base, { directory, fileName: entry })
    }

    if (found > 0) directories.push(directory)
  }

  return { directories, files }
}

function getIndex(): ImageIndex {
  if (!cachedIndex) {
    cachedIndex = buildIndex()
  }
  return cachedIndex
}

/**
 * Retourne l'image correspondant au nom de base donné, ou `undefined` si
 * aucun fichier ne correspond.
 *
 * @param name nom de base SANS extension, ex. "cover"
 * @param alt  texte alternatif descriptif (obligatoire)
 */
export function resolveNewsletterImage(
  name: string,
  alt: string,
): ResolvedNewsletterImage | undefined {
  const found = getIndex().files.get(name.toLowerCase())
  if (!found) return undefined

  const publicPath = `/${found.directory}/${found.fileName}`

  return {
    publicPath,
    absoluteUrl: `${SITE_URL}${publicPath}`,
    alt,
  }
}

/**
 * Liste les noms de base demandés qui n'ont pas encore de fichier sur le disque.
 * Utilisé par le script de génération pour rappeler à l'équipe ce qu'il reste à fournir.
 */
export function listMissingNewsletterImages(names: readonly string[]): string[] {
  const index = getIndex()
  return names.filter((name) => !index.files.has(name.toLowerCase()))
}

/** Dossiers effectivement utilisés (vide si aucune image n'a encore été déposée). */
export function getNewsletterImageDirectories(): string[] {
  return getIndex().directories
}

/**
 * Noms de base présents sur le disque mais référencés par aucun contenu.
 * Permet de signaler un visuel déposé qui ne s'affiche nulle part — le plus
 * souvent une faute de frappe dans le nom du fichier.
 */
export function listUnusedNewsletterImages(names: readonly string[]): string[] {
  const referenced = new Set(names.map((name) => name.toLowerCase()))
  return Array.from(getIndex().files.keys()).filter((base) => !referenced.has(base))
}
