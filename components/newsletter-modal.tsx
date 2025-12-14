"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, AlertCircle } from "lucide-react"

interface NewsletterModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewsletterModal({ open, onOpenChange }: NewsletterModalProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (data.success) {
        setIsSubmitted(true)
        // Reset after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false)
          setEmail("")
          onOpenChange(false)
        }, 3000)
      } else {
        setError(data.error || "Une erreur est survenue lors de l'inscription.")
      }
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Ne ratez pas nos nouvelles</DialogTitle>
          <DialogDescription className="text-center text-lg">
            Abonnez-vous à notre newsletter pour recevoir les dernières actualités et mises à jour de J-GEN SENEGAL.
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          <div className="py-8 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-xl font-semibold text-green-600">Merci pour votre inscription!</p>
            <p className="text-muted-foreground mt-2">Vous recevrez bientôt nos actualités.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Votre adresse email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError(null) // Clear error when user types
                }}
                required
                className={`h-12 text-lg ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
              />
            </div>
            
            {/* Error message */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            
            <Button type="submit" disabled={isSubmitting} className="w-full h-12 text-lg">
              {isSubmitting ? "Inscription en cours..." : "S'abonner"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
