"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
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
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Pages qui ont un fond violet dans le hero
  const isHomePage = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Block body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const navItems = [
    { label: "Accueil", href: "/" },
    { label: "À propos", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Programmes", href: "/programs" },
    { label: "Ressources", href: "/resources" },
    { label: "Carrière", href: "/about/careers" },
    { label: "Contact", href: "/contact" },
  ]

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
        isScrolled || !isHomePage
          ? "bg-white shadow-md" 
          : "bg-white/95 backdrop-blur-sm"
      )}>
        <div className="w-full px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="flex items-center justify-between h-14 lg:h-16 xl:h-20">
            {/* Logo - Responsive sizing */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0 z-[110]">
              <Image 
                src="/logo-jgen.png" 
                alt="J-GEN SENEGAL Logo" 
                width={150}
                height={60}
                className="h-8 sm:h-9 lg:h-10 xl:h-12 w-auto"
                priority
              />
              <div className="hidden sm:flex flex-col">
                <span className="text-sm lg:text-base xl:text-lg font-bold text-primary leading-tight whitespace-nowrap">
                  J-GEN SENEGAL
                </span>
                <span className="text-[7px] lg:text-[8px] xl:text-[9px] text-muted-foreground leading-tight">
                  Agir pour les femmes et les filles au sénégal
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Centered, responsive */}
            <nav className="hidden xl:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-xs font-bold uppercase tracking-wide px-3 py-2 transition-colors whitespace-nowrap",
                    pathname === item.href 
                      ? "bg-[#c61d4d] text-white" 
                      : "text-gray-800 hover:bg-gray-100"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right side - Social Icons & Newsletter button */}
            <div className="hidden xl:flex items-center gap-4 flex-shrink-0">
              {/* Social Icons with Green Accent */}
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#00d4aa] flex items-center justify-center">
                  <a 
                    href="https://www.facebook.com/JGENSenegal/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white hover:bg-[#c61d4d] flex items-center justify-center transition-colors"
                    aria-label="Facebook"
                  >
                    <svg className="w-4 h-4 text-[#3d1f47] hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                </div>
                
                <div className="w-10 h-10 rounded-full bg-[#00d4aa] flex items-center justify-center">
                  <a 
                    href="https://www.instagram.com/jgen.sn/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white hover:bg-[#c61d4d] flex items-center justify-center transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="w-4 h-4 text-[#3d1f47] hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                    </svg>
                  </a>
                </div>
                
                <div className="w-10 h-10 rounded-full bg-[#00d4aa] flex items-center justify-center">
                  <a 
                    href="https://www.linkedin.com/company/jgen-women-global-entrepreneurship" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white hover:bg-[#c61d4d] flex items-center justify-center transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-4 h-4 text-[#3d1f47] hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Newsletter Button */}
              <Button
                size="sm"
                className="bg-[#c61d4d] text-white hover:bg-[#b01a45] font-bold px-4 xl:px-6 rounded-none text-xs whitespace-nowrap"
                onClick={() => setIsNewsletterOpen(true)}
              >
                Newsletter
              </Button>
            </div>

            {/* Mobile/Tablet Menu Button */}
            <button 
              className={cn(
                "xl:hidden p-2 flex-shrink-0 transition-colors z-[110] relative",
                isMenuOpen && "text-[#00d4aa]"
              )} 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile/Tablet Navigation - Sidebar Drawer via Portal */}
      {isMounted && isMenuOpen && createPortal(
        <>
          {/* Backdrop overlay */}
          <div 
            className="xl:hidden fixed inset-0 bg-black/50 z-[9998] animate-in fade-in duration-300"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Sidebar Menu */}
          <div className="xl:hidden fixed left-0 top-0 bottom-0 w-[85%] sm:w-[400px] bg-white z-[9999] overflow-y-auto animate-in slide-in-from-left duration-300 shadow-2xl">
            {/* Close button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 left-4 p-2 text-[#3d1f47] hover:text-[#c61d4d] transition-colors"
              aria-label="Fermer le menu"
            >
              <X className="h-7 w-7" />
            </button>

            <nav className="flex flex-col h-full px-6 pt-20 pb-8">
              {/* Menu Items */}
              <div className="flex-1 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "block py-4 text-xl font-bold uppercase tracking-wide transition-all border-b border-gray-200",
                      pathname === item.href 
                        ? "text-[#c61d4d]" 
                        : "text-[#3d1f47] hover:text-[#c61d4d] hover:translate-x-2",
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Bottom Section - Social Icons & Newsletter */}
              <div className="pt-6 mt-6 border-t border-gray-200 space-y-6">
                {/* Social Icons */}
                <div className="flex items-center gap-4 justify-start">
                  <a 
                    href="https://www.facebook.com/JGENSenegal/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#3d1f47]/10 hover:bg-[#c61d4d] flex items-center justify-center transition-colors group"
                    aria-label="Facebook"
                  >
                    <svg className="w-5 h-5 text-[#3d1f47] group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  
                  <a 
                    href="https://www.instagram.com/jgen.sn/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#3d1f47]/10 hover:bg-[#c61d4d] flex items-center justify-center transition-colors group"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5 text-[#3d1f47] group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                    </svg>
                  </a>
                  
                  <a 
                    href="https://www.linkedin.com/company/jgen-women-global-entrepreneurship" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#3d1f47]/10 hover:bg-[#c61d4d] flex items-center justify-center transition-colors group"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-5 h-5 text-[#3d1f47] group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>

                {/* Newsletter Button */}
                <Button
                  className="w-full bg-[#c61d4d] text-white hover:bg-[#b01a45] font-black text-base py-5 rounded-none uppercase tracking-wide"
                  onClick={() => {
                    setIsNewsletterOpen(true)
                    setIsMenuOpen(false)
                  }}
                >
                  Newsletter
                </Button>
              </div>
            </nav>
          </div>
        </>,
        document.body
      )}

      <NewsletterModal open={isNewsletterOpen} onOpenChange={setIsNewsletterOpen} />
    </>
  )
}
