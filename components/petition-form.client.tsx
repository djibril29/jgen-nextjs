'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CheckCircle2, Loader2, Copy, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const GOAL = 5000

const SOCIAL = {
  facebook: 'https://www.facebook.com/JGENSenegal/',
  linkedin: 'https://www.linkedin.com/company/jgen-women-global-entrepreneurship',
  instagram: 'https://www.instagram.com/jgen.sn/',
}

function useCountUp(target: number, duration = 1200) {
  const [value, setValue] = useState(0)
  const startRef = useRef<number | null>(null)
  const startValueRef = useRef(0)

  useEffect(() => {
    if (target === 0) return
    startValueRef.current = value
    startRef.current = null

    const step = (ts: number) => {
      if (startRef.current === null) startRef.current = ts
      const elapsed = ts - startRef.current
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(startValueRef.current + (target - startValueRef.current) * eased))
      if (progress < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target])

  return value
}

function ShareButtons({ shareUrl, shareText, compact = false }: { shareUrl: string; shareText: string; compact?: boolean }) {
  const [copied, setCopied] = useState(false)

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const base = cn(
    'flex items-center gap-1.5 rounded-full font-medium transition-colors',
    compact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'
  )

  return (
    <div className="flex flex-wrap gap-2">
      <a
        href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(base, 'bg-green-500 text-white hover:bg-green-600')}
      >
        WhatsApp
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(base, 'bg-blue-600 text-white hover:bg-blue-700')}
      >
        Facebook
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(base, 'bg-[#0077b5] text-white hover:bg-[#005f91]')}
      >
        LinkedIn
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(base, 'bg-black text-white hover:bg-zinc-800')}
      >
        X
      </a>
      <button
        onClick={copyLink}
        className={cn(base, 'border border-gray-300 text-gray-700 hover:bg-gray-50')}
      >
        {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
        {copied ? 'Copié !' : 'Copier'}
      </button>
    </div>
  )
}

function FollowButtons() {
  return (
    <div className="flex flex-wrap gap-2">
      <a
        href={SOCIAL.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-white transition-colors"
        style={{ background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}
      >
        Instagram
      </a>
      <a
        href={SOCIAL.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
      >
        Facebook
      </a>
      <a
        href={SOCIAL.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0077b5] text-white text-sm font-medium hover:bg-[#005f91] transition-colors"
      >
        LinkedIn
      </a>
    </div>
  )
}

interface PetitionFormProps {
  initialCount: number
}

export function PetitionForm({ initialCount }: PetitionFormProps) {
  const [count, setCount] = useState(initialCount)
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', city: '' })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'alreadySigned' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [signerName, setSignerName] = useState('')

  const animatedCount = useCountUp(count)
  const progressPercent = Math.min((count / GOAL) * 100, 100)

  const handleChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')

    try {
      const res = await fetch('/api/petition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (data.success) {
        setCount(data.count)
        setSignerName(formData.firstName)
        setStatus('success')
      } else if (data.alreadySigned) {
        setStatus('alreadySigned')
      } else {
        setErrorMsg(data.error || 'Une erreur est survenue.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Erreur réseau. Veuillez réessayer.')
      setStatus('error')
    }
  }

  const [shareUrl, setShareUrl] = useState('https://jgen.sn/petition')
  useEffect(() => { setShareUrl(window.location.href) }, [])
  const shareText = 'Je viens de signer la pétition pour les droits des femmes au Sénégal. Rejoignez-moi !'

  return (
    <div className="grid md:grid-cols-2 gap-10 items-start">
      {/* Left — Form or success state */}
      <div>
        {status === 'success' ? (
          <div className="py-4 space-y-6">
            <div className="text-center">
              <CheckCircle2 className="h-14 w-14 text-green-500 mx-auto mb-3" />
              <h3 className="text-2xl font-bold mb-2">Merci {signerName}&nbsp;!</h3>
              <p className="text-muted-foreground text-sm">
                Votre signature a été comptabilisée. Ensemble, nous faisons la différence.
              </p>
            </div>

            {/* Share the petition */}
            <div>
              <p className="text-sm font-semibold mb-2">Partagez la pétition</p>
              <ShareButtons shareUrl={shareUrl} shareText={shareText} />
              <p className="text-xs text-muted-foreground mt-2">
                Le bouton &quot;Copier&quot; vous permet de partager sur Instagram Stories.
              </p>
            </div>

            {/* Follow us */}
            <div>
              <p className="text-sm font-semibold mb-2">Suivez-nous sur les réseaux</p>
              <FollowButtons />
            </div>
          </div>
        ) : status === 'alreadySigned' ? (
          <div className="text-center py-8 space-y-6">
            <div>
              <CheckCircle2 className="h-14 w-14 text-yellow-500 mx-auto mb-3" />
              <h3 className="text-2xl font-bold mb-2">Déjà signé&nbsp;!</h3>
              <p className="text-muted-foreground text-sm">
                Cette adresse e-mail a déjà signé la pétition. Merci pour votre soutien&nbsp;!
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-2">Suivez-nous sur les réseaux</p>
              <div className="flex justify-center"><FollowButtons /></div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {status === 'error' && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {errorMsg}
              </div>
            )}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                  Prénom <span className="text-[#c61d4d]">*</span>
                </label>
                <Input
                  id="firstName"
                  placeholder="Votre prénom"
                  value={formData.firstName}
                  onChange={handleChange('firstName')}
                  required
                  disabled={status === 'submitting'}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                  Nom <span className="text-[#c61d4d]">*</span>
                </label>
                <Input
                  id="lastName"
                  placeholder="Votre nom"
                  value={formData.lastName}
                  onChange={handleChange('lastName')}
                  required
                  disabled={status === 'submitting'}
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email <span className="text-[#c61d4d]">*</span>
              </label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={formData.email}
                onChange={handleChange('email')}
                required
                disabled={status === 'submitting'}
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium mb-1">
                Pays / Ville
              </label>
              <Input
                id="city"
                placeholder="Dakar, Sénégal"
                value={formData.city}
                onChange={handleChange('city')}
                disabled={status === 'submitting'}
              />
            </div>
            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <input type="checkbox" id="consent" required className="mt-0.5 shrink-0" />
              <label htmlFor="consent">
                J&apos;accepte que mes données soient utilisées dans le cadre de cette pétition et
                de la mobilisation pour les droits des femmes au Sénégal.
              </label>
            </div>
            <Button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full bg-[#c61d4d] hover:bg-[#a8173f] text-white font-bold py-3 text-base"
            >
              {status === 'submitting' ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Envoi en cours…
                </span>
              ) : (
                'Je signe la pétition'
              )}
            </Button>
          </form>
        )}
      </div>

      {/* Right — Counter + progress */}
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <div className="flex items-end gap-2 mb-1">
            <span className="text-5xl font-bold text-[#3d1f47] tabular-nums">
              {animatedCount.toLocaleString('fr-SN')}
            </span>
            <span className="text-muted-foreground mb-1 text-sm">signatures</span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Objectif&nbsp;: {GOAL.toLocaleString('fr-SN')} signatures
          </p>
          <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
            <div
              className="h-full rounded-full bg-[#c61d4d] transition-all duration-700 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-right">
            {progressPercent.toFixed(1)}% de l&apos;objectif atteint
          </p>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          Votre voix compte. Chaque signature est un pas vers un changement significatif pour
          l&apos;égalité, la justice et la dignité de toutes les femmes et filles au Sénégal.
        </p>

        {/* Share buttons */}
        <div>
          <p className="text-sm font-semibold mb-3">Amplifier la mobilisation</p>
          <ShareButtons shareUrl={shareUrl} shareText={shareText} compact />
        </div>

        {/* Follow buttons */}
        <div>
          <p className="text-sm font-semibold mb-3">Suivez-nous</p>
          <FollowButtons />
        </div>
      </div>
    </div>
  )
}
