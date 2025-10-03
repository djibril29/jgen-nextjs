import { Facebook, Instagram, Linkedin } from "lucide-react"

export function SocialMediaBar() {
  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
      <div className="bg-[#f4a261] py-3 px-2 rounded-r-lg shadow-lg">
        <div className="flex flex-col gap-3">
          <a
            href="https://facebook.com/jgensenegal"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-[#f4a261] hover:scale-110 transition-transform duration-200"
            aria-label="Facebook"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href="https://instagram.com/jgensenegal"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-[#f4a261] hover:scale-110 transition-transform duration-200"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/company/jgensenegal"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-[#f4a261] hover:scale-110 transition-transform duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  )
}
