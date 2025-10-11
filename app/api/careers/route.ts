import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'open'
    const type = searchParams.get('type')
    const domain = searchParams.get('domain')
    const featured = searchParams.get('featured')
    const limit = parseInt(searchParams.get('limit') || '20')

    let query = `*[_type == "career"`
    const params: any = {}

    // Filter by status
    if (status && status !== 'all') {
      query += ` && status == $status`
      params.status = status
    }

    // Filter by type
    if (type && type !== 'all') {
      query += ` && type == $type`
      params.type = type
    }

    // Filter by domain
    if (domain && domain !== 'all') {
      query += ` && domain == $domain`
      params.domain = domain
    }

    // Filter by featured
    if (featured === 'true') {
      query += ` && featured == true`
    }

    query += `] | order(deadline asc)[0...${limit}]{
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
      featuredImage,
      featured,
      publishedAt
    }`

    const careers = await client.fetch(query, params)

    return NextResponse.json({ 
      success: true, 
      data: careers,
      count: careers.length 
    })
  } catch (error) {
    console.error('Error fetching careers:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch careers' },
      { status: 500 }
    )
  }
}
