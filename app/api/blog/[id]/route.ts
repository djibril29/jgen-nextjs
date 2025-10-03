/**
 * 🎓 LEARNING: Individual Blog Post API
 * 
 * This API handles operations on specific blog posts:
 * - GET: Retrieve a specific blog post by ID
 * - PUT: Update a blog post
 * - DELETE: Delete a blog post
 * 
 * URL: http://localhost:3000/api/blog/[id]
 * Example: http://localhost:3000/api/blog/1
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

// 🎓 LEARNING: This is the same data as in the main blog API
// In a real app, this would be shared from a database
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

// 🎓 LEARNING: GET request - retrieve a specific blog post
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    
    // 🎓 LEARNING: Find the blog post with the matching ID
    const post = blogPosts.find(p => p.id === id)
    
    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 } // Not found
      )
    }

    return NextResponse.json({
      success: true,
      data: post
    })
  } catch (error) {
    console.error('❌ Error fetching blog post:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    )
  }
}

// 🎓 LEARNING: PUT request - update a blog post
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    
    // 🎓 LEARNING: Find the blog post index
    const postIndex = blogPosts.findIndex(p => p.id === id)
    
    if (postIndex === -1) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    // 🎓 LEARNING: Update the blog post
    blogPosts[postIndex] = {
      ...blogPosts[postIndex], // Keep existing data
      ...body, // Override with new data
      id: id, // Ensure ID doesn't change
    }

    return NextResponse.json({
      success: true,
      message: 'Blog post updated successfully',
      data: blogPosts[postIndex]
    })
  } catch (error) {
    console.error('❌ Error updating blog post:', error)
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    )
  }
}

// 🎓 LEARNING: DELETE request - delete a blog post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    
    // 🎓 LEARNING: Find the blog post index
    const postIndex = blogPosts.findIndex(p => p.id === id)
    
    if (postIndex === -1) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    // 🎓 LEARNING: Remove the blog post from array
    const deletedPost = blogPosts.splice(postIndex, 1)[0]

    return NextResponse.json({
      success: true,
      message: 'Blog post deleted successfully',
      data: deletedPost
    })
  } catch (error) {
    console.error('❌ Error deleting blog post:', error)
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    )
  }
}
