import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

const PETITION_KEY = 'petition:count'

function getRedis() {
  return Redis.fromEnv()
}
const GOAL = 5000

export async function GET() {
  try {
    const count = (await getRedis().get<number>(PETITION_KEY)) ?? 0
    return NextResponse.json({ count, goal: GOAL })
  } catch (error) {
    console.error('Redis GET error:', error)
    return NextResponse.json({ count: 0, goal: GOAL })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, city } = await request.json()

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { success: false, error: 'Prénom, nom et email sont requis.' },
        { status: 400 }
      )
    }

    const API_KEY = process.env.MAILCHIMP_API_KEY
    const AUDIENCE_ID = process.env.MAILCHIMP_PETITION_AUDIENCE_ID
    const API_SERVER = process.env.MAILCHIMP_API_SERVER

    if (!API_KEY || !AUDIENCE_ID || !API_SERVER) {
      return NextResponse.json(
        { success: false, error: 'Configuration manquante.' },
        { status: 500 }
      )
    }

    // Add signer to Mailchimp
    const mcResponse = await fetch(
      `https://${API_SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,
      {
        method: 'POST',
        headers: {
          Authorization: `apikey ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed',
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName,
            CITY: city || '',
          },
          tags: ['Pétition VBG Sénégal'],
        }),
      }
    )

    const mcData = await mcResponse.json()

    // If already signed, don't increment counter but return success
    if (!mcResponse.ok) {
      if (mcData.title === 'Member Exists') {
        const count = (await getRedis().get<number>(PETITION_KEY)) ?? 0
        return NextResponse.json({
          success: false,
          alreadySigned: true,
          error: 'Cette adresse e-mail a déjà signé la pétition.',
          count,
          goal: GOAL,
        })
      }
      return NextResponse.json(
        { success: false, error: mcData.detail || 'Erreur lors de l\'inscription.' },
        { status: 400 }
      )
    }

    // Increment counter in Redis
    const newCount = await getRedis().incr(PETITION_KEY)

    return NextResponse.json({ success: true, count: newCount, goal: GOAL })
  } catch (error) {
    console.error('Petition API error:', error)
    return NextResponse.json(
      { success: false, error: 'Une erreur est survenue. Veuillez réessayer.' },
      { status: 500 }
    )
  }
}
