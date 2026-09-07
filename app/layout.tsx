import type React from "react"
import type { Metadata } from "next"
import { Bricolage_Grotesque } from "next/font/google"
import { Archivo } from "next/font/google"
import Script from "next/script"
import { Suspense } from "react"
import { OrganizationSchema, WebsiteSchema } from "@/components/structured-data"
import "./globals.css"

// Titres et donnees chiffrees. Police variable : l'axe opsz accentue les ink
// traps en grand et neutralise le dessin en petit, automatiquement.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  axes: ["opsz"],
  variable: "--font-bricolage",
  display: "swap",
})

// Corps de texte et interface. L'italique reel evite l'oblique synthetique
// dans les citations.
const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  variable: "--font-archivo",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://jgen.sn'),
  title: {
    default: "J-GEN SENEGAL - Lutter contre les violences basées sur le genre",
    template: "%s | J-GEN SENEGAL"
  },
  description: "Organisation féministe sénégalaise engagée dans la lutte contre les violences basées sur le genre. Plaidoyer, sensibilisation et accompagnement des femmes et filles au Sénégal.",
  keywords: [
    "violence basée sur le genre",
    "droits des femmes Sénégal",
    "organisation féministe Sénégal",
    "VBG Sénégal",
    "autonomisation femmes",
    "plaidoyer féministe",
    "protection femmes filles",
    "égalité genre Sénégal",
    "Dakar droits femmes",
    "J-GEN SENEGAL"
  ],
  authors: [{ name: "J-GEN SENEGAL" }],
  creator: "J-GEN SENEGAL",
  publisher: "J-GEN SENEGAL",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "fr_SN",
    url: "https://jgen.sn",
    siteName: "J-GEN SENEGAL",
    title: "J-GEN SENEGAL - Lutter contre les violences basées sur le genre",
    description: "Organisation féministe sénégalaise engagée dans la lutte contre les violences basées sur le genre.",
    images: [
      {
        url: "/logo-jgen.png",
        width: 1200,
        height: 630,
        alt: "J-GEN SENEGAL Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "J-GEN SENEGAL - Lutter contre les violences basées sur le genre",
    description: "Organisation féministe sénégalaise engagée dans la lutte contre les violences basées sur le genre.",
    images: ["/logo-jgen.png"],
    creator: "@jgensenegal",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/logo-jgen.png" },
      { url: "/logo-jgen.png", sizes: "16x16", type: "image/png" },
      { url: "/logo-jgen.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/logo-jgen.png" }],
    shortcut: ["/logo-jgen.png"],
  },
  verification: {
    google: "votre-code-google-search-console",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      {/*
        Pas de <head> manuel : en App Router, Next.js construit lui-meme le head
        a partir de l'API Metadata. En rendre un soi-meme fait cohabiter deux
        sources sur les memes noeuds, ce qui casse l'hydratation.

        Le JSON-LD est valide dans le <body> : Google le lit ou qu'il soit.
      */}
      <body className={`font-sans ${bricolage.variable} ${archivo.variable} antialiased`}>
        <OrganizationSchema />
        <WebsiteSchema />
        <Suspense fallback={null}>{children}</Suspense>
        {/*
          Mailchimp. L'ancien extrait inline creait un <script> et l'inserait en
          tete du document ; cette mutation du DOM survenait avant l'hydratation
          et faisait diverger l'arbre React. next/script fait le meme chargement
          asynchrone, mais apres l'hydratation.
        */}
        <Script
          id="mcjs"
          strategy="afterInteractive"
          src="https://chimpstatic.com/mcjs-connected/js/users/82a350c96cc3fb21f345f388f/f721dc9b90678893f85cd88ac.js"
        />
      </body>
    </html>
  )
}
