'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function ThankYouPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [orderId, setOrderId] = useState('')

  useEffect(() => {
    // Get order ID from URL
    const id = searchParams.get('orderId')
    if (id) {
      setOrderId(id)
    } else {
      // No order ID? Redirect to shop
      router.push('/shop')
    }
  }, [searchParams, router])

  return (
    <div className="w-full bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 
            className="text-3xl md:text-4xl font-bold text-black mb-4"
            style={{ fontFamily: '"Times New Roman", serif' }}
          >
            Thank You!
          </h1>

          <p 
            className="text-xl md:text-2xl mb-2"
            style={{ color: '#0359b3', fontFamily: '"Times New Roman", serif' }}
          >
            Your Order Has Been Confirmed
          </p>

          <p className="text-gray-600 text-base mb-8">
            We've received your order and will process it shortly
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white border-2 rounded-lg p-6 mb-8" style={{ borderColor: '#0359b3' }}>
          <div className="text-center mb-4">
            <p 
              className="text-sm text-gray-600 mb-2"
              style={{ fontFamily: '"Times New Roman", serif' }}
            >
              Order ID
            </p>
            <p 
              className="text-2xl font-bold"
              style={{ color: '#0359b3', fontFamily: '"Times New Roman", serif' }}
            >
              {orderId}
            </p>
          </div>

          <div className="border-t pt-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-semibold text-gray-900">Order Received</p>
                  <p className="text-sm text-gray-600">We've successfully received your order</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="font-semibold text-gray-900">Confirmation Email</p>
                  <p className="text-sm text-gray-600">Order confirmation sent to your email</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p className="font-semibold text-gray-900">We'll Contact You</p>
                  <p className="text-sm text-gray-600">Our team will call you soon to confirm delivery details</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <div>
                  <p className="font-semibold text-gray-900">Fast Delivery</p>
                  <p className="text-sm text-gray-600">Your order will be delivered within 3-5 business days</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What's Next Section */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h2 
            className="text-xl font-bold text-black mb-4"
            style={{ fontFamily: '"Times New Roman", serif' }}
          >
            What Happens Next?
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="font-bold" style={{ color: '#0359b3' }}>1.</span>
              <span>Our team will verify your order details</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold" style={{ color: '#0359b3' }}>2.</span>
              <span>We'll call you to confirm delivery address and time</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold" style={{ color: '#0359b3' }}>3.</span>
              <span>Your order will be carefully packed and shipped</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold" style={{ color: '#0359b3' }}>4.</span>
              <span>You'll receive your products at your doorstep!</span>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="text-center mb-8">
          <p className="text-gray-600 mb-2">Need help with your order?</p>
          <p className="font-semibold text-gray-900">
            Contact us: <a href="tel:923263404576" className="hover:underline" style={{ color: '#0359b3' }}>0923263404576</a>
          </p>
          <p className="text-sm text-gray-500 mt-1">Available 9 AM - 6 PM (Mon-Sat)</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => router.push('/shop')}
            className="flex-1 py-3 rounded-lg text-white font-bold hover:opacity-90 transition-all"
            style={{ backgroundColor: '#0359b3', fontFamily: '"Times New Roman", serif' }}
          >
            Continue Shopping
          </button>

          <button
            onClick={() => router.push('/')}
            className="flex-1 py-3 rounded-lg border-2 font-bold hover:bg-gray-50 transition-all"
            style={{ borderColor: '#0359b3', color: '#0359b3', fontFamily: '"Times New Roman", serif' }}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}