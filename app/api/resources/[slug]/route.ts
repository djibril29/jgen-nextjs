import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const query = `*[_type == "resource" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      description,
      category,
      type,
      featuredImage,
      pdfFile{
        asset->{
          _id,
          url
        }
      },
      content,
      externalUrl,
      videoUrl,
      author,
      publishedAt,
      featured,
      tags
    }`

    const resource = await client.fetch(query, { slug })

    if (!resource) {
      return NextResponse.json(
        { success: false, error: 'Resource not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: resource
    })
  } catch (error) {
    console.error('Error fetching resource:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch resource' },
      { status: 500 }
    )
  }
}
