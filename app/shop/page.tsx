'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Product {
  id: number
  name: string
  category: string
  price: number
  image: string
  rating: number
  reviews: number
  description: string
}

const products: Product[] = [
  { id: 1, name: 'Phone Case Premium', category: 'Cases', price: 500, image: '/banners/case.jpg', rating: 4.5, reviews: 25, description: 'Premium quality phone case with shock absorption' },
  { id: 2, name: 'Tempered Glass', category: 'Screen Protectors', price: 300, image: '/banners/pro.jpg', rating: 4.8, reviews: 40, description: '9H hardness tempered glass screen protector' },
  { id: 3, name: 'Power Bank 20000mAh', category: 'Power Banks', price: 3500, image: '/banners/powe.jpg', rating: 4.6, reviews: 30, description: 'Fast charging power bank with dual USB ports' },
  { id: 4, name: 'USB-C Cable', category: 'Cables', price: 250, image: '/banners/charg.jpg', rating: 4.3, reviews: 50, description: 'Durable USB-C fast charging cable' },
  { id: 5, name: 'Wireless Earbuds', category: 'Earbuds', price: 2500, image: '/products/earbuds1.jpg', rating: 4.7, reviews: 35, description: 'High quality wireless earbuds with noise cancellation' },
  { id: 6, name: 'Car Phone Holder', category: 'Holders', price: 800, image: '/products/holder1.jpg', rating: 4.4, reviews: 20, description: 'Universal car phone holder with strong grip' },
  { id: 7, name: 'Bluetooth Speaker', category: 'Speakers', price: 1800, image: '/products/speaker1.jpg', rating: 4.5, reviews: 28, description: 'Portable Bluetooth speaker with bass boost' },
  { id: 8, name: 'Smart Watch Strap', category: 'Straps', price: 600, image: '/products/strap1.jpg', rating: 4.2, reviews: 15, description: 'Silicone strap for smart watches' },
  { id: 9, name: 'Phone Ring Holder', category: 'Accessories', price: 200, image: '/products/ring1.jpg', rating: 4.0, reviews: 22, description: 'Rotating ring holder for phones' },
  { id: 10, name: 'Wall Charger Fast', category: 'Chargers', price: 700, image: '/products/charger1.jpg', rating: 4.6, reviews: 45, description: 'Fast wall charger with multiple ports' },
  { id: 11, name: 'AUX Cable Premium', category: 'Cables', price: 350, image: '/products/aux1.jpg', rating: 4.3, reviews: 18, description: 'Premium quality AUX cable for audio' },
  { id: 12, name: 'Phone Stand Adjustable', category: 'Holders', price: 450, image: '/products/stand1.jpg', rating: 4.4, reviews: 12, description: 'Adjustable phone stand for desk' },
]

export default function ShopPage() {
  const [cart, setCart] = useState<Product[]>([])
  const [showCart, setShowCart] = useState(false)

  const addToCart = (product: Product) => {
    setCart([...cart, product])
    setShowCart(true)
  }

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Header */}
      <div className="w-full py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 text-black"
            style={{ fontFamily: '"Times New Roman", serif' }}
          >
            Our Shop
          </h1>
          <p 
            className="text-center text-base md:text-lg max-w-2xl mx-auto"
            style={{ color: '#0359b3', fontFamily: '"Times New Roman", serif' }}
          >
            Browse our collection of quality mobile accessories
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200"
            >
              {/* Product Image */}
              <Link href={`/shop/${product.id}`}>
                <div className="relative w-full h-40 md:h-48 bg-gray-50 cursor-pointer">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>

              {/* Product Info */}
              <div className="p-3 md:p-4">
                <Link href={`/shop/${product.id}`}>
                  <h3 
                    className="text-sm md:text-base font-semibold mb-2 text-black hover:underline cursor-pointer"
                    style={{ fontFamily: '"Times New Roman", serif' }}
                  >
                    {product.name}
                  </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-3 h-3 md:w-4 md:h-4"
                        fill={star <= Math.round(product.rating) ? '#FFD700' : '#E5E7EB'}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span 
                    className="text-xs md:text-sm ml-1"
                    style={{ color: '#0359b3', fontFamily: '"Times New Roman", serif' }}
                  >
                    ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <p 
                  className="text-base md:text-lg font-bold mb-3"
                  style={{ color: '#0359b3', fontFamily: '"Times New Roman", serif' }}
                >
                  Rs. {product.price}
                </p>

                {/* Add to Cart Button */}
                <button
                  onClick={() => addToCart(product)}
                  className="w-full py-2 md:py-2.5 rounded-lg text-white font-medium text-xs md:text-sm hover:opacity-90 transition-all"
                  style={{ backgroundColor: '#0359b3', fontFamily: '"Times New Roman", serif' }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Modal */}
      {showCart && cart.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 
                className="text-xl md:text-2xl font-bold text-black"
                style={{ fontFamily: '"Times New Roman", serif' }}
              >
                Your Cart
              </h2>
              <button
                onClick={() => setShowCart(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Cart Items */}
            <div className="space-y-4 mb-6">
              {cart.map((item, index) => (
                <div key={index} className="flex gap-3 border-b border-gray-200 pb-3">
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 
                      className="text-sm font-semibold text-black"
                      style={{ fontFamily: '"Times New Roman", serif' }}
                    >
                      {item.name}
                    </h4>
                    <p 
                      className="text-sm font-bold"
                      style={{ color: '#0359b3', fontFamily: '"Times New Roman", serif' }}
                    >
                      Rs. {item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="border-t border-gray-300 pt-4 mb-6">
              <div className="flex justify-between items-center">
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
                  Rs. {cart.reduce((sum, item) => sum + item.price, 0)}
                </span>
              </div>
            </div>

            {/* Payment Options */}
            <div className="space-y-3">
              <h3 
                className="text-lg font-bold text-black mb-3"
                style={{ fontFamily: '"Times New Roman", serif' }}
              >
                Select Payment Method
              </h3>
              
              <button
                onClick={() => {
                  alert('Cash on Delivery selected! We will contact you soon.')
                  setCart([])
                  setShowCart(false)
                }}
                className="w-full py-3 rounded-lg border-2 border-black font-semibold hover:bg-gray-50 transition-all text-black"
                style={{ fontFamily: '"Times New Roman", serif' }}
              >
                Cash on Delivery
              </button>

              <button
                onClick={() => {
                  const whatsappNumber = '923001234567'
                  const message = `Hi! I want to place an order via Easypaisa.\n\nOrder Details:\n${cart.map(item => `${item.name} - Rs. ${item.price}`).join('\n')}\n\nTotal: Rs. ${cart.reduce((sum, item) => sum + item.price, 0)}\n\nEasypaisa Number: 03001234567\n\nI will send the payment screenshot shortly.`
                  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank')
                }}
                className="w-full py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-all"
                style={{ backgroundColor: '#0359b3', fontFamily: '"Times New Roman", serif' }}
              >
                Pay via Easypaisa
              </button>

              <div 
                className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200"
              >
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