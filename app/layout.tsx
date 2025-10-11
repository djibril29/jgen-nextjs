import type React from "react"
import type { Metadata } from "next"
import { Anton } from "next/font/google"
import { Open_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
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
  title: "J-GEN SENEGAL - Fighting Gender-Based Violence",
  description: "Feminist organization advocating for women and girls rights in Senegal",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/logo-jgen.png" },
      { url: "/logo-jgen.png", sizes: "16x16", type: "image/png" },
      { url: "/logo-jgen.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/logo-jgen.png" },
    ],
    shortcut: ["/logo-jgen.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${anton.variable} ${openSans.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
