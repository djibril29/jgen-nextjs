import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import { Redis } from '@upstash/redis'

// Resend et Redis sont initialisés à la demande (pas au build)
function getResend() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY manquant dans les variables d\'environnement.')
  }
  return new Resend(process.env.RESEND_API_KEY)
}

function getRedis(): Redis | null {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    return new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  }
  return null
}

// --- Schéma de validation Zod ---
const contactSchema = z.object({
  firstName: z.string().min(1).max(50).trim(),
  lastName: z.string().min(1).max(50).trim(),
  email: z.string().email().max(254).trim().toLowerCase(),
  message: z.string().min(10).max(2000).trim(),
  // Honeypot : doit être vide, sinon c'est un bot
  website: z.string().max(0, 'Bot détecté'),
})

// --- Sanitisation simple (supprime les balises HTML) ---
function sanitize(str: string): string {
  return str.replace(/<[^>]*>/g, '').replace(/[&<>"']/g, (c) => {
    const map: Record<string, string> = {
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    }
    return map[c]
  })
}

// --- Rate limiting : max 3 messages par IP toutes les 10 minutes ---
async function checkRateLimit(ip: string): Promise<boolean> {
  const redis = getRedis()
  if (!redis) return true // pas de Redis → on laisse passer

  const key = `contact_rate_limit:${ip}`
  const count = await redis.incr(key)
  if (count === 1) {
    await redis.expire(key, 60 * 10) // expiration 10 min
  }
  return count <= 3
}

// --- Template HTML de l'email ---
function buildEmailHtml(firstName: string, lastName: string, email: string, message: string): string {
  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
    <body style="font-family: 'Open Sans', Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 0;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background: #f5f5f5; padding: 40px 0;">
        <tr><td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
            <!-- En-tête -->
            <tr>
              <td style="background: #3d1f47; padding: 32px 40px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 22px; letter-spacing: 1px;">J-GEN SENEGAL</h1>
                <p style="color: #ffd23f; margin: 6px 0 0; font-size: 13px; text-transform: uppercase; letter-spacing: 2px;">Nouveau message de contact</p>
              </td>
            </tr>
            <!-- Corps -->
            <tr>
              <td style="padding: 40px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding-bottom: 20px; border-bottom: 1px solid #f0f0f0;">
                      <p style="margin: 0 0 4px; font-size: 12px; color: #999; text-transform: uppercase; letter-spacing: 1px;">Expéditeur</p>
                      <p style="margin: 0; font-size: 16px; font-weight: bold; color: #3d1f47;">${firstName} ${lastName}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 20px 0; border-bottom: 1px solid #f0f0f0;">
                      <p style="margin: 0 0 4px; font-size: 12px; color: #999; text-transform: uppercase; letter-spacing: 1px;">Email</p>
                      <p style="margin: 0; font-size: 15px; color: #c61d4d;">
                        <a href="mailto:${email}" style="color: #c61d4d; text-decoration: none;">${email}</a>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 20px 0;">
                      <p style="margin: 0 0 12px; font-size: 12px; color: #999; text-transform: uppercase; letter-spacing: 1px;">Message</p>
                      <p style="margin: 0; font-size: 15px; color: #333; line-height: 1.7; white-space: pre-wrap;">${message}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- Pied de page -->
            <tr>
              <td style="background: #f9f9f9; padding: 20px 40px; text-align: center; border-top: 1px solid #eee;">
                <p style="margin: 0; font-size: 12px; color: #aaa;">
                  Message reçu via le formulaire de contact — <a href="https://jgen.sn/contact" style="color: #3d1f47;">jgen.sn/contact</a>
                </p>
              </td>
            </tr>
          </table>
        </td></tr>
      </table>
    </body>
    </html>
  `
}

export async function POST(request: NextRequest) {
  // --- Récupération de l'IP ---
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    '127.0.0.1'

  // --- Rate limiting ---
  const allowed = await checkRateLimit(ip)
  if (!allowed) {
    return NextResponse.json(
      { error: 'Trop de messages envoyés. Veuillez réessayer dans 10 minutes.' },
      { status: 429 }
    )
  }

  // --- Parse du corps ---
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Corps de la requête invalide.' }, { status: 400 })
  }

  // --- Validation Zod ---
  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    // Si le honeypot est rempli, on simule un succès pour ne pas alerter le bot
    const isHoneypot = parsed.error.issues.some((i) => i.path.includes('website'))
    if (isHoneypot) {
      return NextResponse.json({ message: 'Message envoyé avec succès !' }, { status: 200 })
    }
    return NextResponse.json(
      { error: 'Données invalides. Vérifiez les champs du formulaire.' },
      { status: 400 }
    )
  }

  const { firstName, lastName, email, message } = parsed.data

  // --- Sanitisation ---
  const safeName = `${sanitize(firstName)} ${sanitize(lastName)}`
  const safeEmail = sanitize(email)
  const safeMessage = sanitize(message)

  // --- Envoi de l'email via Resend ---
  const resend = getResend()
  const { error } = await resend.emails.send({
    from: 'J-GEN SENEGAL <noreply@jgen.sn>',
    to: ['info@jgen.sn'],
    replyTo: safeEmail,
    subject: `Nouveau message de ${safeName}`,
    html: buildEmailHtml(sanitize(firstName), sanitize(lastName), safeEmail, safeMessage),
  })

  if (error) {
    console.error('Resend error:', error)
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'envoi. Veuillez réessayer." },
      { status: 500 }
    )
  }

  return NextResponse.json({ message: 'Message envoyé avec succès !' }, { status: 200 })
}
