/**
 * ============================================================================
 * GÉNÉRATION DU HTML MAILCHIMP — NEWSLETTER SEMESTRE 1 2026
 * ----------------------------------------------------------------------------
 * Usage :  npm run email:generate
 *
 * Étapes :
 *   1. rendu du template React Email               → render()
 *   2. mise en forme lisible                       → pretty()
 *   3. conversion data-mc-edit → mc:edit           → convertMailchimpAttributes()
 *   4. validation stricte du HTML produit          → validateHtml()
 *   5. version texte                               → toPlainText()
 *   6. écriture des fichiers dans generated-emails/
 *
 * Toute anomalie interrompt le script avec un message explicite et un code de
 * sortie non nul : aucun fichier invalide n'est jamais écrit.
 *
 * Les fonctions de transformation et de validation vivent dans
 * scripts/newsletter-html.ts, afin de rester importables et testables.
 * ============================================================================
 */

import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

// Le tsconfig du projet utilise `jsx: "preserve"` : le JSX est compilé avec le
// runtime classique, qui exige que `React` soit dans la portée du module.
import * as React from "react"
import { pretty, render, toPlainText } from "react-email"

import NewsletterSemestreOne2026Email from "@/emails/newsletter-semestre-1-2026"
import {
  NEWSLETTER_IMAGE_NAMES,
  newsletterSemesterOne2026 as data,
} from "@/content/newsletter-semestre-1-2026"
import {
  getNewsletterImageDirectories,
  listMissingNewsletterImages,
  listUnusedNewsletterImages,
} from "@/lib/newsletter-image"
import { SITE_URL } from "@/lib/site"
import {
  ValidationError,
  convertMailchimpAttributes,
  extractEditableRegions,
  validateHtml,
} from "./newsletter-html"

const OUTPUT_DIRECTORY = "generated-emails"
const OUTPUT_BASENAME = "newsletter-semestre-1-2026"

async function main(): Promise<void> {
  const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
  const outputDirectory = path.join(projectRoot, OUTPUT_DIRECTORY)
  const htmlPath = path.join(outputDirectory, `${OUTPUT_BASENAME}.html`)
  const textPath = path.join(outputDirectory, `${OUTPUT_BASENAME}.txt`)

  console.log(`\nGénération de la newsletter — ${data.header.periodLabel}`)
  console.log(`URL du site utilisée : ${SITE_URL}`)

  if (SITE_URL.includes("localhost") || SITE_URL.includes("127.0.0.1")) {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL / NEWSLETTER_SITE_URL pointe vers une adresse locale. " +
        "Renseignez l'URL de production avant de générer l'e-mail.",
    )
  }

  const rawHtml = await render(<NewsletterSemestreOne2026Email />)
  const formattedHtml = await pretty(rawHtml)
  const mailchimpHtml = convertMailchimpAttributes(formattedHtml)

  validateHtml(mailchimpHtml)

  const plainText = toPlainText(mailchimpHtml)

  await fs.mkdir(outputDirectory, { recursive: true })
  await fs.writeFile(htmlPath, mailchimpHtml, "utf8")
  await fs.writeFile(textPath, plainText, "utf8")

  console.log("\n✔ Validation réussie.")
  console.log(`  Zones éditables : ${extractEditableRegions(mailchimpHtml).join(", ")}`)
  console.log("\nFichiers produits :")
  console.log(`  HTML  ${path.relative(projectRoot, htmlPath)}`)
  console.log(`  Texte ${path.relative(projectRoot, textPath)}`)

  // Rappel sur les visuels.
  const directories = getNewsletterImageDirectories()
  const missingImages = listMissingNewsletterImages(NEWSLETTER_IMAGE_NAMES)
  const unusedImages = listUnusedNewsletterImages(NEWSLETTER_IMAGE_NAMES)

  console.log(
    `\nDossiers d'images lus : ${
      directories.length > 0 ? directories.map((d) => `public/${d}`).join(", ") : "aucun"
    }`,
  )

  if (missingImages.length > 0) {
    console.log("\n⚠ Visuels non encore fournis (aucune balise <img> n'a été insérée pour eux) :")
    for (const name of missingImages) {
      console.log(`  · ${name}`)
    }
    console.log("  Déposez-les dans public/newsletters/semestre-1/ — l'extension importe peu.")
  } else {
    console.log("\n✔ Tous les visuels référencés sont présents.")
  }

  if (unusedImages.length > 0) {
    console.log("\nℹ Fichiers présents mais référencés par aucun contenu :")
    for (const name of unusedImages) {
      console.log(`  · ${name}`)
    }
    console.log(
      "  Soit ils sont en réserve, soit le nom ne correspond pas à celui attendu " +
        "dans content/newsletter-semestre-1-2026.ts.",
    )
  }

  console.log(
    "\nRappel : les images de l'e-mail pointent vers le site en production. " +
      "Déployez le site AVANT d'envoyer la campagne, sinon elles renverront une erreur 404.\n",
  )
}

main().catch((error: unknown) => {
  console.error("\n✖ Échec de la génération de la newsletter.\n")

  if (error instanceof ValidationError) {
    for (const problem of error.problems) {
      console.error(`  · ${problem}`)
    }
    console.error("\n  Aucun fichier n'a été écrit.\n")
  } else if (error instanceof Error) {
    console.error(`  ${error.message}\n`)
    if (error.stack) console.error(error.stack)
  } else {
    console.error(error)
  }

  process.exitCode = 1
})
