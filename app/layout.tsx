import type React from "react"
import type { Metadata } from "next"
import { Anton } from "next/font/google"
import { Open_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import Script from "next/script"
import { OrganizationSchema, WebsiteSchema } from "@/components/structured-data"
import "./globals.css"

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
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
      <head>
        <OrganizationSchema />
        <WebsiteSchema />
        {/* Mailchimp Newsletter Integration */}
        <Script
          id="mcjs"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/82a350c96cc3fb21f345f388f/f721dc9b90678893f85cd88ac.js");`
          }}
        />
      </head>
      <body className={`font-sans ${anton.variable} ${openSans.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
