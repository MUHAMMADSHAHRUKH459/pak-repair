'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission - you can add your logic here
    const whatsappNumber = '923001234567'
    const message = `Name: ${formData.name}%0AEmail: ${formData.email}%0APhone: ${formData.phone}%0AMessage: ${formData.message}`
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`
    window.open(whatsappUrl, '_blank')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="w-full bg-white">
      {/* Header Section */}
      <div className="w-full py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4"
            style={{ color: '#0359b3', fontFamily: '"Times New Roman", serif' }}
          >
            Contact Us
          </h1>
          <p 
            className="text-center text-base md:text-lg max-w-2xl mx-auto"
            style={{ color: '#0359b3', fontFamily: '"Times New Roman", serif' }}
          >
            Get in touch with us for any queries or repair services. We're here to help!
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          
          {/* Contact Information & Map */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 border border-gray-100">
              <h2 
                className="text-2xl md:text-3xl font-bold mb-6"
                style={{ color: '#0359b3', fontFamily: '"Times New Roman", serif' }}
              >
                Get In Touch
              </h2>
              
              <div className="space-y-4">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0359b3' }}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 
                      className="font-semibold text-lg mb-1"
                      style={{ color: '#0359b3', fontFamily: '"Times New Roman", serif' }}
                    >
                      Address
                    </h3>
                    <p 
                      className="text-sm md:text-base"
                      style={{ color: '#0359b3', fontFamily: '"Times New Roman", serif' }}
                    >
                      Pak Repair, Karachi, Pakistan
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0359b3' }}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 
                      className="font-semibold text-lg mb-1"
                      style={{ color: '#0359b3', fontFamily: '"Times New Roman", serif' }}
                    >
                      Phone
                    </h3>
                    <p 
                      className="text-sm md:text-base"
                      style={{ color: '#0359b3', fontFamily: '"Times New Roman", serif' }}
                    >
                      +92-3263404576
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0359b3' }}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 
                      className="font-semibold text-lg mb-1"
                      style={{ color: '#0359b3', fontFamily: '"Times New Roman", serif' }}
                    >
                      Email
                    </h3>
                    <p 
                      className="text-sm md:text-base"
                      style={{ color: '#0359b3', fontFamily: '"Times New Roman", serif' }}
                    >
                      info@pakrepair.com
                    </p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0359b3' }}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 
                      className="font-semibold text-lg mb-1"
                      style={{ color: '#0359b3', fontFamily: '"Times New Roman", serif' }}
                    >
                      Working Hours
                    </h3>
                    <p 
                      className="text-sm md:text-base"
                      style={{ color: '#0359b3', fontFamily: '"Times New Roman", serif' }}
                    >
                      Mon - Sat: 10:00 AM - 9:00 PM<br />
                      Sunday: 11:00 AM - 7:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115830.8304070792!2d66.87966559726561!3d24.87363460000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33ff94e1a173b%3A0x8eeb328d83d5f5b7!2sSAQIB%20BAKERY!5e0!3m2!1sen!2s!4v1766363228044!5m2!1sen!2s" 
                width="100%" 
                height="400" 
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-64 md:h-96"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 border border-gray-100">
            <h2 
              className="text-2xl md:text-3xl font-bold mb-6"
              style={{ color: '#0359b3', fontFamily: '"Times New Roman", serif' }}
            >
              Send Us a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label 
                  htmlFor="name" 
                  className="block text-sm md:text-base font-semibold mb-2"
                  style={{ color: '#0359b3', fontFamily: '"Times New Roman", serif' }}
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-opacity-100 transition-colors"
                  style={{ 
                    borderColor: '#0359b3', 
                    color: '#0359b3',
                    fontFamily: '"Times New Roman", serif'
                  }}
                  placeholder="Enter your name"
                />
              </div>

              {/* Email */}
              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm md:text-base font-semibold mb-2"
                  style={{ color: '#0359b3', fontFamily: '"Times New Roman", serif' }}
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-opacity-100 transition-colors"
                  style={{ 
                    borderColor: '#0359b3', 
                    color: '#0359b3',
                    fontFamily: '"Times New Roman", serif'
                  }}
                  placeholder="Enter your email"
                />
              </div>

              {/* Phone */}
              <div>
                <label 
                  htmlFor="phone" 
                  className="block text-sm md:text-base font-semibold mb-2"
                  style={{ color: '#0359b3', fontFamily: '"Times New Roman", serif' }}
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-opacity-100 transition-colors"
                  style={{ 
                    borderColor: '#0359b3', 
                    color: '#0359b3',
                    fontFamily: '"Times New Roman", serif'
                  }}
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Message */}
              <div>
                <label 
                  htmlFor="message" 
                  className="block text-sm md:text-base font-semibold mb-2"
                  style={{ color: '#0359b3', fontFamily: '"Times New Roman", serif' }}
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-opacity-100 transition-colors resize-none"
                  style={{ 
                    borderColor: '#0359b3', 
                    color: '#0359b3',
                    fontFamily: '"Times New Roman", serif'
                  }}
                  placeholder="Enter your message"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 md:py-4 rounded-lg text-white font-semibold text-base md:text-lg hover:opacity-90 transition-opacity"
                style={{ 
                  backgroundColor: '#0359b3',
                  fontFamily: '"Times New Roman", serif'
                }}
              >
                Send Message via WhatsApp
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}