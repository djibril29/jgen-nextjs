import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const limit = parseInt(searchParams.get('limit') || '20')

    let query = `*[_type == "resource"`
    const params: any = {}

    if (category && category !== 'Tous') {
      query += ` && category == $category`
      params.category = category
    }

    if (featured === 'true') {
      query += ` && featured == true`
    }

    query += `] | order(publishedAt desc)[0...${limit}]{
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

    const resources = await client.fetch(query, params)

    return NextResponse.json({
      success: true,
      data: resources
    })
  } catch (error) {
    console.error('Error fetching resources:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch resources' },
      { status: 500 }
    )
  }
}
