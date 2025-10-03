/**
 * 🎓 LEARNING: This is a CLIENT COMPONENT that connects to our backend API
 * 
 * Key concepts:
 * - 'use client' makes this run in the browser (frontend)
 * - useState manages form data and UI state
 * - fetch() sends data to our backend API
 * - Event handlers respond to user interactions
 */

'use client' // 🎓 LEARNING: This tells Next.js this component runs in the browser

import { useState } from 'react' // 🎓 LEARNING: React hook for managing state
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone } from "lucide-react"

// 🎓 LEARNING: TypeScript interface for form data
interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  message: string
}

export function Contact() {
  // 🎓 LEARNING: State management - stores form data and UI state
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false) // Loading state
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle') // Form status

  // 🎓 LEARNING: Function to handle input changes
  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // 🎓 LEARNING: Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // Prevent page refresh
    
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // 🎓 LEARNING: Send data to our backend API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          message: formData.message
        })
      })

      const result = await response.json()

      if (response.ok) {
        // 🎓 LEARNING: Success - clear form and show success message
        setFormData({ firstName: '', lastName: '', email: '', message: '' })
        setSubmitStatus('success')
        console.log('✅ Form submitted successfully:', result)
      } else {
        // 🎓 LEARNING: Error - show error message
        setSubmitStatus('error')
        console.error('❌ Form submission failed:', result.error)
      }
    } catch (error) {
      // 🎓 LEARNING: Network or other error
      setSubmitStatus('error')
      console.error('❌ Network error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">Get in Touch</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8" />
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            Have questions or want to get involved? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Address</h4>
                  <p className="text-muted-foreground">Dakar, Senegal</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <p className="text-muted-foreground">contact@jgensenegal.org</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Phone</h4>
                  <p className="text-muted-foreground">+221 XX XXX XX XX</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            {/* 🎓 LEARNING: Status messages */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                ✅ Message sent successfully! We'll get back to you soon.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                ❌ Failed to send message. Please try again.
              </div>
            )}

            {/* 🎓 LEARNING: Form with event handlers */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                    First Name
                  </label>
                  <Input 
                    id="firstName" 
                    placeholder="Your first name"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                    Last Name
                  </label>
                  <Input 
                    id="lastName" 
                    placeholder="Your last name"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell us how you'd like to get involved or ask us a question..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
