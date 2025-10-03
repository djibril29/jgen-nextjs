/**
 * 🎓 LEARNING: Database Configuration
 * 
 * This file shows you how to connect to different types of databases.
 * We'll demonstrate multiple options so you can choose what works best.
 */

// 🎓 LEARNING: Option 1 - SQLite (File-based database, great for learning)
// Install: npm install better-sqlite3 @types/better-sqlite3

/*
import Database from 'better-sqlite3'
import path from 'path'

const dbPath = path.join(process.cwd(), 'data', 'jgen-senegal.db')
export const db = new Database(dbPath)

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS contact_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)

db.exec(`
  CREATE TABLE IF NOT EXISTS blog_posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    tags TEXT,
    published_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)
*/

// 🎓 LEARNING: Option 2 - PostgreSQL (Production database)
// Install: npm install pg @types/pg

/*
import { Pool } from 'pg'

export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
})

// Create tables (run this once)
export async function initializeDatabase() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `)

  await db.query(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      author VARCHAR(255) NOT NULL,
      tags TEXT[],
      published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `)
}
*/

// 🎓 LEARNING: Option 3 - MongoDB (Document database)
// Install: npm install mongodb

/*
import { MongoClient, Db } from 'mongodb'

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const client = new MongoClient(uri)

export let db: Db

export async function connectDatabase() {
  await client.connect()
  db = client.db('jgen-senegal')
  console.log('✅ Connected to MongoDB')
}

export async function disconnectDatabase() {
  await client.close()
  console.log('✅ Disconnected from MongoDB')
}
*/

// 🎓 LEARNING: Option 4 - Prisma (Database ORM - Object Relational Mapping)
// Install: npm install prisma @prisma/client
// Run: npx prisma init

/*
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
*/

// 🎓 LEARNING: For now, we'll use a simple in-memory database
// This is just for learning - in production, use a real database

interface ContactSubmission {
  id: string
  name: string
  email: string
  message: string
  createdAt: string
}

interface BlogPost {
  id: string
  title: string
  content: string
  author: string
  tags: string[]
  publishedAt: string
}

// 🎓 LEARNING: In-memory storage (data disappears when server restarts)
let contactSubmissions: ContactSubmission[] = []
let blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Welcome to J-GEN SENEGAL',
    content: 'We are committed to fighting gender-based violence in Senegal...',
    author: 'Admin',
    tags: ['welcome', 'mission'],
    publishedAt: new Date().toISOString()
  }
]

// 🎓 LEARNING: Database functions (these would connect to real database)
export const database = {
  // Contact submissions
  async createContactSubmission(data: Omit<ContactSubmission, 'id' | 'createdAt'>) {
    const submission: ContactSubmission = {
      id: Math.random().toString(36).substring(7),
      ...data,
      createdAt: new Date().toISOString()
    }
    contactSubmissions.push(submission)
    return submission
  },

  async getContactSubmissions() {
    return contactSubmissions
  },

  // Blog posts
  async createBlogPost(data: Omit<BlogPost, 'id' | 'publishedAt'>) {
    const post: BlogPost = {
      id: Math.random().toString(36).substring(7),
      ...data,
      publishedAt: new Date().toISOString()
    }
    blogPosts.push(post)
    return post
  },

  async getBlogPosts() {
    return blogPosts
  },

  async getBlogPost(id: string) {
    return blogPosts.find(post => post.id === id)
  },

  async updateBlogPost(id: string, data: Partial<BlogPost>) {
    const index = blogPosts.findIndex(post => post.id === id)
    if (index === -1) return null
    
    blogPosts[index] = { ...blogPosts[index], ...data }
    return blogPosts[index]
  },

  async deleteBlogPost(id: string) {
    const index = blogPosts.findIndex(post => post.id === id)
    if (index === -1) return null
    
    return blogPosts.splice(index, 1)[0]
  }
}
