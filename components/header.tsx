"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { NewsletterModal } from "@/components/newsletter-modal"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Programs", href: "/programs" },
    { label: "Blog", href: "/blog" },
    { label: "Resources", href: "/resources" },
    { label: "Contact", href: "/contact" },
  ]

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="text-xl lg:text-2xl font-bold text-primary">
              J-GEN SENEGAL
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-base font-medium transition-colors hover:text-primary",
                    pathname === item.href ? "text-primary" : "text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => setIsNewsletterOpen(true)}
              >
                Newsletter
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden py-4 border-t border-border">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block py-3 text-base font-medium transition-colors",
                    pathname === item.href ? "text-primary" : "text-foreground hover:text-primary",
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button
                className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => {
                  setIsNewsletterOpen(true)
                  setIsMenuOpen(false)
                }}
              >
                Newsletter
              </Button>
            </nav>
          )}
        </div>
      </header>

      <NewsletterModal open={isNewsletterOpen} onOpenChange={setIsNewsletterOpen} />
    </>
  )
}
