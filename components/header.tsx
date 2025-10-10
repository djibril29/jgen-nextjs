"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { NewsletterModal } from "@/components/newsletter-modal"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  // Pages qui ont un fond violet dans le hero
  const isHomePage = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Programs", href: "/programs" },
    { label: "Blog", href: "/blog" },
    { label: "Resources", href: "/resources" },
    { label: "Careers", href: "/about/careers" },
    { label: "Contact", href: "/contact" },
  ]

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled || !isHomePage
          ? "bg-white shadow-md" 
          : "bg-white/95 backdrop-blur-sm"
      )}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 lg:h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Image 
                src="/logo-jgen.png" 
                alt="J-GEN SENEGAL Logo" 
                width={150}
                height={60}
                className="h-10 lg:h-12 w-auto"
                priority
              />
              <div className="flex flex-col">
                <span className="text-base lg:text-lg font-bold text-primary leading-tight">
                  J-GEN SENEGAL
                </span>
                <span className="text-[8px] lg:text-[9px] text-muted-foreground leading-tight">
                  Agir pour les femmes et les filles au sénégal
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Centered like in image */}
            <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-bold uppercase tracking-wide px-4 py-2 transition-colors",
                    pathname === item.href 
                      ? "bg-[#c61d4d] text-white" 
                      : "text-gray-800 hover:bg-gray-100"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right side - Newsletter button */}
            <div className="hidden lg:flex items-center">
              {/* Newsletter Button - Crimson Pink */}
              <Button
                size="sm"
                className="bg-[#c61d4d] text-white hover:bg-[#b01a45] font-bold px-6 rounded-none"
                onClick={() => setIsNewsletterOpen(true)}
              >
                Newsletter
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden py-4 border-t border-border bg-white">
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
