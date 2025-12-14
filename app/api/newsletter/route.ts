import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email requis' },
        { status: 400 }
      )
    }

    const API_KEY = process.env.MAILCHIMP_API_KEY
    const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID
    const API_SERVER = process.env.MAILCHIMP_API_SERVER

    if (!API_KEY || !AUDIENCE_ID || !API_SERVER) {
      console.error('Configuration Mailchimp manquante:', { API_KEY: !!API_KEY, AUDIENCE_ID: !!AUDIENCE_ID, API_SERVER: !!API_SERVER })
      return NextResponse.json(
        { success: false, error: 'Configuration Mailchimp manquante' },
        { status: 500 }
      )
    }

    const response = await fetch(
      `https://${API_SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,
      {
        method: 'POST',
        headers: {
          'Authorization': `apikey ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed', // Utiliser 'pending' pour double opt-in
          tags: ['Website Signup'],
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      console.error('Mailchimp error:', data)
      
      // Gérer le cas où l'email existe déjà
      if (data.title === 'Member Exists') {
        return NextResponse.json(
          { success: false, error: 'Cet email est déjà inscrit à notre newsletter.' },
          { status: 400 }
        )
      }
      
      // Gérer les emails invalides
      if (data.title === 'Invalid Resource') {
        return NextResponse.json(
          { success: false, error: 'Adresse email invalide.' },
          { status: 400 }
        )
      }
      
      return NextResponse.json(
        { success: false, error: data.detail || 'Erreur lors de l\'inscription' },
        { status: response.status }
      )
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Inscription réussie à la newsletter!' 
    })
  } catch (error) {
    console.error('Erreur newsletter:', error)
    return NextResponse.json(
      { success: false, error: 'Une erreur est survenue. Veuillez réessayer.' },
      { status: 500 }
    )
  }
}

