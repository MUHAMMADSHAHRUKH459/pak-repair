'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface CartProduct {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

export default function CartPage() {
  const router = useRouter()
  const [cart, setCart] = useState<CartProduct[]>([])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })
  const [showCheckout, setShowCheckout] = useState(false)
  const [showEasypaisaInfo, setShowEasypaisaInfo] = useState(false)
  const [showCODConfirm, setShowCODConfirm] = useState(false)
  const [savedCartForEasypaisa, setSavedCartForEasypaisa] = useState<CartProduct[]>([])
  const [savedFormDataForEasypaisa, setSavedFormDataForEasypaisa] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })
  const [currentOrderId, setCurrentOrderId] = useState('')
  
  const DELIVERY_CHARGES = 200

  const getApiUrl = () => {
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
  }

  useEffect(() => {
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

  const getSubtotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }

  const getTotalPrice = () => {
    return getSubtotal() + DELIVERY_CHARGES
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

    if (paymentMethod === 'cod') {
      setShowCheckout(false)
      setShowCODConfirm(true)
    } else {
      proceedWithEasypaisa()
    }
  }

  const confirmCODOrder = () => {
    const apiUrl = getApiUrl()
    
    const orderData = {
      orderId: `ORD-${Date.now()}`,
      customerDetails: formData,
      items: cart.map(item => ({
        ...item,
        image: item.image.startsWith('http') ? item.image : `${apiUrl}${item.image}`
      })),
      totalAmount: getTotalPrice(),
      paymentMethod: 'Cash on Delivery',
      orderDate: new Date().toISOString(),
      status: 'Pending'
    }

    // Instant actions - No waiting!
    localStorage.removeItem('cart')
    setCart([])
    router.push(`/thank-you?orderId=${orderData.orderId}`)
    
    // Background save (fire and forget)
    fetch(`${apiUrl}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
      keepalive: true
    }).catch(err => console.error('Background save:', err))
  }

  const proceedWithEasypaisa = () => {
    const apiUrl = getApiUrl()
    
    setSavedCartForEasypaisa(cart)
    setSavedFormDataForEasypaisa(formData)
    
    const orderId = `ORD-${Date.now()}`
    setCurrentOrderId(orderId)
    
    const orderData = {
      orderId: orderId,
      customerDetails: formData,
      items: cart.map(item => ({
        ...item,
        image: item.image.startsWith('http') ? item.image : `${apiUrl}${item.image}`
      })),
      totalAmount: getTotalPrice(),
      paymentMethod: 'Easypaisa',
      orderDate: new Date().toISOString(),
      status: 'Awaiting Payment'
    }

    // Instant actions - No waiting!
    setShowCheckout(false)
    setShowEasypaisaInfo(true)
    
    // Background save (fire and forget)
    fetch(`${apiUrl}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
      keepalive: true
    }).catch(err => console.error('Background save:', err))
  }

  const sendToWhatsApp = () => {
    const subtotal = savedCartForEasypaisa.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const total = subtotal + DELIVERY_CHARGES
    
    const orderDetails = `
*New Order - Payment Required*

*Order ID: ${currentOrderId}*

*Customer Details:*
Name: ${savedFormDataForEasypaisa.name}
Phone: ${savedFormDataForEasypaisa.phone}
Address: ${savedFormDataForEasypaisa.address}

*Order Items:*
${savedCartForEasypaisa.map(item => `${item.name} x${item.quantity} - Rs. ${item.price * item.quantity}`).join('\n')}

*Price Breakdown:*
Subtotal: Rs. ${subtotal}
Delivery Charges: Rs. ${DELIVERY_CHARGES}
*Total Amount: Rs. ${total}*

*Payment Method: Easypaisa*
*Easypaisa Account: 0923263404576*

I have sent the payment screenshot.
    `

    const whatsappNumber = '923263404576'
    
    localStorage.removeItem('cart')
    setCart([])
    setFormData({ name: '', email: '', phone: '', address: '' })
    setSavedCartForEasypaisa([])
    setSavedFormDataForEasypaisa({ name: '', email: '', phone: '', address: '' })
    setShowEasypaisaInfo(false)
    
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderDetails)}`, '_blank')
    router.push(`/thank-you?orderId=${currentOrderId}`)
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
            Add some products to your cart to continue shopping
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

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 sticky top-4">
              <h2 
                className="text-xl md:text-2xl font-bold text-black mb-6"
                style={{ fontFamily: '"Times New Roman", serif' }}
              >
                Order Summary
              </h2>

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
                    Rs. {getSubtotal()}
                  </span>
                </div>
                <div className="flex justify-between mb-4">
                  <span 
                    className="text-base text-black"
                    style={{ fontFamily: '"Times New Roman", serif' }}
                  >
                    Delivery Charges:
                  </span>
                  <span 
                    className="text-base font-semibold"
                    style={{ color: '#0359b3', fontFamily: '"Times New Roman", serif' }}
                  >
                    Rs. {DELIVERY_CHARGES}
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
                className="w-full py-3 rounded-lg border-2 font-semibold hover:opacity-90 transition-all text-white"
                style={{ backgroundColor: '#0359b3', borderColor: '#0359b3', fontFamily: '"Times New Roman", serif' }}
              >
                Cash on Delivery
              </button>

              <button
                onClick={() => handleCheckout('easypaisa')}
                className="w-full py-3 rounded-lg border-2 border-black font-semibold hover:bg-gray-50 transition-all text-black"
                style={{ fontFamily: '"Times New Roman", serif' }}
              >
                Pay via Easypaisa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* COD Confirmation Modal */}
      {showCODConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 md:p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" style={{ color: '#0359b3' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 
                className="text-xl md:text-2xl font-bold text-black mb-3"
                style={{ fontFamily: '"Times New Roman", serif' }}
              >
                Confirm Your Order
              </h2>
              <p className="text-gray-600 text-sm mb-6">
                You have selected Cash on Delivery (COD) as your payment method.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-black mb-3" style={{ fontFamily: '"Times New Roman", serif' }}>
                Order Summary
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Items:</span>
                  <span className="font-semibold text-black">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold text-black">Rs. {getSubtotal()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Charges:</span>
                  <span className="font-semibold text-black">Rs. {DELIVERY_CHARGES}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-300">
                  <span className="text-gray-600 font-bold">Total Amount:</span>
                  <span className="font-bold" style={{ color: '#0359b3' }}>Rs. {getTotalPrice()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-semibold text-black">Cash on Delivery</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-600 text-center mb-6">
              You will pay <strong className="text-black">Rs. {getTotalPrice()}</strong> in cash when your order is delivered.
            </p>

            <div className="space-y-3">
              <button
                onClick={confirmCODOrder}
                className="w-full py-3 rounded-lg text-white font-bold hover:opacity-90 transition-all"
                style={{ backgroundColor: '#0359b3', fontFamily: '"Times New Roman", serif' }}
              >
                Confirm Order
              </button>

              <button
                onClick={() => {
                  setShowCODConfirm(false)
                  setShowCheckout(true)
                }}
                className="w-full py-3 rounded-lg border-2 border-gray-300 font-semibold hover:bg-gray-50 transition-all text-gray-700"
                style={{ fontFamily: '"Times New Roman", serif' }}
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Easypaisa Payment Instructions Modal */}
      {showEasypaisaInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 
                className="text-2xl md:text-3xl font-bold text-black mb-2"
                style={{ fontFamily: '"Times New Roman", serif' }}
              >
                Order Created Successfully!
              </h2>
              <p className="text-gray-600 text-sm">
                Order ID: {currentOrderId}
              </p>
            </div>

            {/* Order Summary Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-black mb-3 text-center" style={{ fontFamily: '"Times New Roman", serif' }}>
                Order Summary
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Total Items:</span>
                  <span className="font-semibold text-black">{savedCartForEasypaisa.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Subtotal:</span>
                  <span className="font-semibold text-black">Rs. {savedCartForEasypaisa.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Delivery Charges:</span>
                  <span className="font-semibold text-black">Rs. {DELIVERY_CHARGES}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-blue-300">
                  <span className="text-gray-700 font-bold">Total to Pay:</span>
                  <span className="font-bold text-lg" style={{ color: '#0359b3' }}>Rs. {savedCartForEasypaisa.reduce((sum, item) => sum + (item.price * item.quantity), 0) + DELIVERY_CHARGES}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 
                className="text-lg font-bold text-black mb-4 text-center"
                style={{ fontFamily: '"Times New Roman", serif' }}
              >
                Complete Your Payment
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#0359b3' }}>
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-black">Send payment to Easypaisa</p>
                    <p className="text-xs text-gray-600">Account Number: <strong className="text-black">0923263404576</strong></p>
                    <p className="text-xs text-gray-600">Amount: <strong className="text-black">Rs. {savedCartForEasypaisa.reduce((sum, item) => sum + (item.price * item.quantity), 0) + DELIVERY_CHARGES}</strong></p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#0359b3' }}>
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-black">Take a screenshot of payment</p>
                    <p className="text-xs text-gray-600">Make sure transaction details are visible</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#0359b3' }}>
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-black">Send screenshot on WhatsApp</p>
                    <p className="text-xs text-gray-600">Click the button below to send</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-500 rounded-lg p-4 mb-6">
              <h4 className="text-red-700 font-bold text-center mb-2 text-sm md:text-base">
                ⚠️ PAYMENT IS COMPULSORY ⚠️
              </h4>
              <p className="text-red-600 text-xs md:text-sm text-center">
                Send us your payment screenshot on our WhatsApp to confirm your order
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={sendToWhatsApp}
                className="w-full py-3 rounded-lg text-white font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2"
                style={{ backgroundColor: '#25D366', fontFamily: '"Times New Roman", serif' }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Send Screenshot on WhatsApp
              </button>

              <button
                onClick={sendToWhatsApp}
                className="w-full py-3 rounded-lg border-2 border-gray-300 font-semibold hover:bg-gray-50 transition-all text-gray-700"
                style={{ fontFamily: '"Times New Roman", serif' }}
              >
                I'll Send Later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}