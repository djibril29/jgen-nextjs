/**
 * 🎓 LEARNING: This is your first API route!
 * 
 * What is this file?
 * - It's a backend function that runs on the server
 * - It handles HTTP requests (GET, POST, PUT, DELETE)
 * - It can connect to databases, send emails, etc.
 * 
 * File location: app/api/contact/route.ts
 * URL endpoint: http://localhost:3000/api/contact
 */

import { NextRequest, NextResponse } from 'next/server'
import { database } from '@/lib/database'

// 🎓 LEARNING: TypeScript interface for type safety
interface ContactFormData {
  name: string
  email: string
  message: string
  subject?: string
}

// 🎓 LEARNING: This function handles POST requests to /api/contact
export async function POST(request: NextRequest) {
  try {
    // 🎓 LEARNING: Get data from the request body
    const body: ContactFormData = await request.json()
    
    // 🎓 LEARNING: Validate the data
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 } // Bad request
      )
    }

    // 🎓 LEARNING: Validate email format (basic validation)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // 🎓 LEARNING: Save to database using our database functions
    const submission = await database.createContactSubmission({
      name: body.name,
      email: body.email,
      message: body.message
    })

    console.log('📧 Contact form saved to database:', submission)
    console.log('📤 Email would be sent to:', 'admin@jgen-senegal.org')

    // 🎓 LEARNING: Return success response with database ID
    return NextResponse.json(
      { 
        message: 'Contact form submitted successfully!',
        id: submission.id // Real ID from database
      },
      { status: 200 } // Success
    )

  } catch (error) {
    // 🎓 LEARNING: Handle errors gracefully
    console.error('❌ Error processing contact form:', error)
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 } // Server error
    )
  }
}

// 🎓 LEARNING: This function handles GET requests to /api/contact
export async function GET() {
  // 🎓 LEARNING: Return information about this endpoint
  return NextResponse.json({
    message: 'Contact API endpoint',
    methods: ['POST'],
    description: 'Submit contact form data'
  })
}
