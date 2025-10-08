import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const query = `*[_type == "career" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      subtitle,
      description,
      deadline,
      type,
      domain,
      location,
      duration,
      status,
      responsibilities,
      qualifications,
      advantages,
      applicationEmail,
      applicationInstructions,
      featuredImage,
      heroImage,
      termsOfReferencePdf{
        asset->{
          _id,
          url
        }
      },
      pdfFile{
        asset->{
          _id,
          url
        }
      },
      additionalContent,
      publishedAt,
      tags
    }`

    const career = await client.fetch(query, { slug })

    if (!career) {
      return NextResponse.json(
        { success: false, error: 'Career opportunity not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: career })
  } catch (error) {
    console.error('Error fetching career:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch career opportunity' },
      { status: 500 }
    )
  }
}
