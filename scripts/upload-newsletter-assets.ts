/**
 * Téléverse les photos du semestre 1 2026 dans la bibliothèque d'images Sanity.
 *
 * Utilisation :
 *   npx sanity exec scripts/upload-newsletter-assets.ts --with-user-token
 *
 * Le drapeau `--with-user-token` fournit au script le jeton de la session CLI :
 * aucun secret n'a donc à être écrit dans .env.local ni affiché dans un terminal.
 *
 * Le script est idempotent : Sanity déduplique les assets par empreinte du
 * fichier, donc le relancer ne crée pas de doublons — il retrouve l'asset
 * existant et réaffiche son identifiant.
 *
 * Il n'écrit aucun document de contenu. Un asset téléversé n'est visible nulle
 * part sur le site tant qu'un article publié ne le référence pas.
 */
import fs from 'node:fs'
import path from 'node:path'

import {getCliClient} from 'sanity/cli'

const client = getCliClient()

const SOURCE_DIRECTORY = path.join(process.cwd(), 'public', 'newsletters', 'semestre-1')

/**
 * Textes alternatifs, écrits d'après ce que les rapports trimestriels décrivent
 * réellement de chaque activité. Ils servent à l'accessibilité et au
 * référencement des images : une description vague n'apporte ni l'un ni l'autre.
 */
const ALT_TEXTS: Record<string, string> = {
  '8mars':
    "Rassemblement de la Journée internationale des droits des femmes, le 7 mars 2026 à Guédiawaye",
  assises1:
    "Réunion d'orientation des Assises nationales citoyennes, les 16 et 17 mars 2026 aux Almadies",
  // Le fichier est bien nommé « bejenugox » sur le disque, avec un « e ».
  bejenugox:
    "Atelier national de renforcement des capacités des Bajenu Gox, programme KIIRAY",
  bajenugox2:
    "Participantes à l'atelier national des Bajenu Gox consacré à la prévention des violences basées sur le genre",
  euleug:
    "Session de formation aux métiers d'un GIE de jeunes femmes, projet LIGGEEYAL ËLËG",
  jvssr1:
    "Cercle de sororité réunissant des adolescentes et de jeunes femmes à Yoff, projet JVSSR",
  jvssr2:
    "Participantes d'un cercle de sororité de la deuxième phase du projet JVSSR, dans la commune de Yoff",
  cercles:
    "Travaux de groupe lors d'un cercle de sororité du projet JVSSR à Yoff",
  perception:
    "Session de restitution de l'enquête de base sur les perceptions communautaires à Yoff, le 24 juin 2026 à la mairie de Yoff",
  beijing30:
    "Panel d'ouverture de l'atelier de restitution du rapport alternatif Beijing +30, à l'Hôtel Ndiambour à Dakar",
  copil:
    "Séance de travail des membres du comité de pilotage des Assises nationales citoyennes sur les droits des femmes et des filles",
  codefamille:
    "Rassemblement communautaire de femmes lors d'une rencontre de plaidoyer de J-GEN Sénégal",
  patisserie:
    "Participantes d'un GIE de Kaolack en tenue de formation lors d'une session de pâtisserie du projet LIGGEEYAL ËLËG, supervisée par l'AADS",
  kiiray:
    "Lancement officiel du programme KIIRAY dans une collectivité territoriale de la région de Dakar",
  'pas-a-pas':
    "Session de formation de jeunes leaders sur les droits en santé sexuelle et reproductive, programme PAS À PAS",
  'pas-a-pas2':
    "Travaux de groupe lors d'une formation du programme PAS À PAS à Pikine, Tivaouane Peulh et Patte d'Oie",
  'pas-a-pas3':
    "Échanges entre participantes et formatrices lors d'une session du programme PAS À PAS",
}

async function main() {
  if (!fs.existsSync(SOURCE_DIRECTORY)) {
    throw new Error(`Dossier introuvable : ${SOURCE_DIRECTORY}`)
  }

  const files = fs.readdirSync(SOURCE_DIRECTORY).filter((file) => !file.startsWith('.'))

  if (files.length === 0) {
    throw new Error(`Aucun fichier à téléverser dans ${SOURCE_DIRECTORY}`)
  }

  const uploaded: Record<string, string> = {}

  for (const file of files) {
    const baseName = path.basename(file, path.extname(file))
    const alt = ALT_TEXTS[baseName]

    if (!alt) {
      console.warn(`  ! ${file} — aucun texte alternatif défini, fichier ignoré`)
      continue
    }

    const asset = await client.assets.upload('image', fs.createReadStream(path.join(SOURCE_DIRECTORY, file)), {
      filename: file,
      title: alt,
      description: alt,
    })

    uploaded[baseName] = asset._id
    console.log(`  ✓ ${baseName.padEnd(12)} → ${asset._id}`)
  }

  console.log(`\n${Object.keys(uploaded).length} image(s) disponibles dans Sanity.`)
  console.log(JSON.stringify(uploaded, null, 2))
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
