'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface Product {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

export default function CartPage() {
  const router = useRouter()
  const [cart, setCart] = useState<Product[]>([])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })
  const [showCheckout, setShowCheckout] = useState(false)

  useEffect(() => {
    // Get cart from localStorage
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  const removeFromCart = (productId: number) => {
    const updatedCart = cart.filter(item => item.id !== productId)
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const updateQuantity = (productId: number, change: number) => {
    const updatedCart = cart.map(item => {
      if (item.id === productId) {
        const newQuantity = Math.max(1, item.quantity + change)
        return { ...item, quantity: newQuantity }
      }
      return item
    })
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleCheckout = (paymentMethod: 'cod' | 'easypaisa') => {
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      alert('Please fill in all fields')
      return
    }

    const orderDetails = `
*New Order*

*Customer Details:*
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Address: ${formData.address}

*Order Items:*
${cart.map(item => `${item.name} x${item.quantity} - Rs. ${item.price * item.quantity}`).join('\n')}

*Total Amount: Rs. ${getTotalPrice()}*

*Payment Method: ${paymentMethod === 'cod' ? 'Cash on Delivery' : 'Easypaisa'}*
${paymentMethod === 'easypaisa' ? '\nEasypaisa Number: 03001234567\n*Payment is compulsory. Please send payment screenshot.*' : ''}
    `

    const whatsappNumber = '923001234567'
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderDetails)}`, '_blank')
    
    // Clear cart after order
    localStorage.removeItem('cart')
    setCart([])
    setFormData({ name: '', email: '', phone: '', address: '' })
    alert('Order placed! We will contact you soon.')
    router.push('/shop')
  }

  if (cart.length === 0) {
    return (
      <div className="w-full bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-center">
          <svg className="w-24 h-24 mx-auto mb-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h2 
            className="text-2xl md:text-3xl font-bold mb-4 text-black"
            style={{ fontFamily: '"Times New Roman", serif' }}
          >
            Your Cart is Empty
          </h2>
          <p 
            className="text-base md:text-lg mb-6"
            style={{ color: '#0359b3', fontFamily: '"Times New Roman", serif' }}
          >
            Add some banners to your cart to continue shopping
          </p>
          <button
            onClick={() => router.push('/shop')}
            className="px-8 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-all"
            style={{ backgroundColor: '#0359b3', fontFamily: '"Times New Roman", serif' }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Header */}
      <div className="w-full py-8 md:py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 
            className="text-3xl md:text-4xl font-bold text-black"
            style={{ fontFamily: '"Times New Roman", serif' }}
          >
            Shopping Cart
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md p-4 md:p-6 border border-gray-200 flex gap-4"
              >
                <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>

                <div className="flex-1">
                  <h3 
                    className="text-base md:text-lg font-semibold text-black mb-2"
                    style={{ fontFamily: '"Times New Roman", serif' }}
                  >
                    {item.name}
                  </h3>
                  <p 
                    className="text-lg md:text-xl font-bold mb-3"
                    style={{ color: '#0359b3', fontFamily: '"Times New Roman", serif' }}
                  >
                    Rs. {item.price}
                  </p>

                  <div className="flex items-center justify-between">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 rounded-full border-2 flex items-center justify-center hover:bg-gray-100 transition-all"
                        style={{ borderColor: '#0359b3', color: '#0359b3' }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <span 
                        className="text-lg font-semibold text-black"
                        style={{ fontFamily: '"Times New Roman", serif' }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 rounded-full border-2 flex items-center justify-center hover:bg-gray-100 transition-all"
                        style={{ borderColor: '#0359b3', color: '#0359b3' }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={() => router.push('/shop')}
              className="flex items-center gap-2 hover:opacity-70 transition-opacity mt-4"
              style={{ color: '#0359b3', fontFamily: '"Times New Roman", serif' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Continue Shopping
            </button>
          </div>

          {/* Order Summary & Customer Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 sticky top-4">
              <h2 
                className="text-xl md:text-2xl font-bold text-black mb-6"
                style={{ fontFamily: '"Times New Roman", serif' }}
              >
                Order Summary
              </h2>

              {/* Customer Details Form */}
              <div className="space-y-4 mb-6">
                <div>
                  <label 
                    className="block text-sm font-semibold mb-2 text-black"
                    style={{ fontFamily: '"Times New Roman", serif' }}
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border-2 border-black focus:outline-none"
                    style={{ color: '#0359b3', fontFamily: '"Times New Roman", serif' }}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div>
                  <label 
                    className="block text-sm font-semibold mb-2 text-black"
                    style={{ fontFamily: '"Times New Roman", serif' }}
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border-2 border-black focus:outline-none"
                    style={{ color: '#0359b3', fontFamily: '"Times New Roman", serif' }}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label 
                    className="block text-sm font-semibold mb-2 text-black"
                    style={{ fontFamily: '"Times New Roman", serif' }}
                  >
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border-2 border-black focus:outline-none"
                    style={{ color: '#0359b3', fontFamily: '"Times New Roman", serif' }}
                    placeholder="Enter your phone"
                    required
                  />
                </div>

                <div>
                  <label 
                    className="block text-sm font-semibold mb-2 text-black"
                    style={{ fontFamily: '"Times New Roman", serif' }}
                  >
                    Delivery Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border-2 border-black focus:outline-none resize-none"
                    style={{ color: '#0359b3', fontFamily: '"Times New Roman", serif' }}
                    placeholder="Enter your complete address"
                    required
                  />
                </div>
              </div>

              {/* Price Summary */}
              <div className="border-t border-gray-300 pt-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span 
                    className="text-base text-black"
                    style={{ fontFamily: '"Times New Roman", serif' }}
                  >
                    Subtotal:
                  </span>
                  <span 
                    className="text-base font-semibold"
                    style={{ color: '#0359b3', fontFamily: '"Times New Roman", serif' }}
                  >
                    Rs. {getTotalPrice()}
                  </span>
                </div>
                <div className="flex justify-between mb-4">
                  <span 
                    className="text-base text-black"
                    style={{ fontFamily: '"Times New Roman", serif' }}
                  >
                    Delivery:
                  </span>
                  <span 
                    className="text-base font-semibold"
                    style={{ color: '#0359b3', fontFamily: '"Times New Roman", serif' }}
                  >
                    Free
                  </span>
                </div>
                <div className="border-t border-gray-300 pt-3 flex justify-between">
                  <span 
                    className="text-lg font-bold text-black"
                    style={{ fontFamily: '"Times New Roman", serif' }}
                  >
                    Total:
                  </span>
                  <span 
                    className="text-xl font-bold"
                    style={{ color: '#0359b3', fontFamily: '"Times New Roman", serif' }}
                  >
                    Rs. {getTotalPrice()}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => setShowCheckout(true)}
                className="w-full py-3 rounded-lg text-white font-bold hover:opacity-90 transition-all mb-3"
                style={{ backgroundColor: '#0359b3', fontFamily: '"Times New Roman", serif' }}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 
                className="text-xl md:text-2xl font-bold text-black"
                style={{ fontFamily: '"Times New Roman", serif' }}
              >
                Select Payment Method
              </h2>
              <button
                onClick={() => setShowCheckout(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handleCheckout('cod')}
                className="w-full py-3 rounded-lg border-2 border-black font-semibold hover:bg-gray-50 transition-all text-black"
                style={{ fontFamily: '"Times New Roman", serif' }}
              >
                Cash on Delivery
              </button>

              <button
                onClick={() => handleCheckout('easypaisa')}
                className="w-full py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-all"
                style={{ backgroundColor: '#0359b3', fontFamily: '"Times New Roman", serif' }}
              >
                Pay via Easypaisa
              </button>

              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p 
                  className="text-xs md:text-sm text-center font-medium"
                  style={{ color: '#0359b3', fontFamily: '"Times New Roman", serif' }}
                >
                  <strong>Easypaisa Number:</strong> 03001234567<br />
                  Payment is compulsory. Send us your payment screenshot on our WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}