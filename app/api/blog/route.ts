/**
 * 🎓 LEARNING: Blog Posts API
 * 
 * This API handles:
 * - GET: Retrieve all blog posts
 * - POST: Create a new blog post
 * 
 * URL: http://localhost:3000/api/blog
 */

import { NextRequest, NextResponse } from 'next/server'

// 🎓 LEARNING: TypeScript interface for blog post data
interface BlogPost {
  id: string
  title: string
  content: string
  author: string
  publishedAt: string
  tags: string[]
}

// 🎓 LEARNING: Simulate database - in real app, this would be a real database
let blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Welcome to J-GEN SENEGAL',
    content: 'We are committed to fighting gender-based violence in Senegal...',
    author: 'Admin',
    publishedAt: new Date().toISOString(),
    tags: ['welcome', 'mission']
  },
  {
    id: '2',
    title: 'Our Impact in 2024',
    content: 'This year we have helped over 500 women...',
    author: 'Impact Team',
    publishedAt: new Date().toISOString(),
    tags: ['impact', '2024']
  }
]

// 🎓 LEARNING: GET request - retrieve all blog posts
export async function GET() {
  try {
    // 🎓 LEARNING: Return all blog posts
    return NextResponse.json({
      success: true,
      data: blogPosts,
      count: blogPosts.length
    })
  } catch (error) {
    console.error('❌ Error fetching blog posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}

// 🎓 LEARNING: POST request - create a new blog post
export async function POST(request: NextRequest) {
  try {
    // 🎓 LEARNING: Get data from request body
    const body = await request.json()
    
    // 🎓 LEARNING: Validate required fields
    if (!body.title || !body.content || !body.author) {
      return NextResponse.json(
        { error: 'Title, content, and author are required' },
        { status: 400 }
      )
    }

    // 🎓 LEARNING: Create new blog post object
    const newPost: BlogPost = {
      id: (blogPosts.length + 1).toString(), // Simple ID generation
      title: body.title,
      content: body.content,
      author: body.author,
      publishedAt: new Date().toISOString(),
      tags: body.tags || []
    }

    // 🎓 LEARNING: Add to our "database" (array)
    blogPosts.push(newPost)

    // 🎓 LEARNING: Return the created post
    return NextResponse.json({
      success: true,
      message: 'Blog post created successfully',
      data: newPost
    }, { status: 201 }) // 201 = Created

  } catch (error) {
    console.error('❌ Error creating blog post:', error)
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}
