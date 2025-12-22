'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'

const banners = [
  { id: 1, name: 'Phone Case Premium', category: 'Cases', price: 500, image: '/banners/case.jpg', rating: 4.5, reviews: 25, description: 'Premium quality phone case with shock absorption. Made with high-grade materials to protect your device from drops and scratches.' },
  { id: 2, name: 'Tempered Glass', category: 'Screen Protectors', price: 300, image: '/banners/pro.jpg', rating: 4.8, reviews: 40, description: '9H hardness tempered glass screen protector. Provides excellent protection against scratches and impacts.' },
  { id: 3, name: 'Power Bank 20000mAh', category: 'Power Banks', price: 3500, image: '/banners/powe.jpg', rating: 4.6, reviews: 30, description: 'Fast charging power bank with dual USB ports. Keep your devices charged on the go.' },
  { id: 4, name: 'USB-C Cable', category: 'Cables', price: 250, image: '/banners/charg.jpg', rating: 4.3, reviews: 50, description: 'Durable USB-C fast charging cable. Supports fast charging and data transfer.' },
  { id: 5, name: 'Wireless Earbuds', category: 'Earbuds', price: 2500, image: '/banners/ear.jpg', rating: 4.7, reviews: 35, description: 'High quality wireless earbuds with noise cancellation. Enjoy crystal clear sound.' },
  { id: 6, name: 'Car Phone Holder', category: 'Holders', price: 800, image: '/banners/car.jpg', rating: 4.4, reviews: 20, description: 'Universal car phone holder with strong grip. Safe and secure mounting.' },
  { id: 7, name: 'Bluetooth Speaker', category: 'Speakers', price: 1800, image: '/banners/speaker.jpg', rating: 4.5, reviews: 28, description: 'Portable Bluetooth speaker with bass boost. Perfect for music lovers.' },
  { id: 8, name: 'Smart Watch Strap', category: 'Straps', price: 600, image: '/banners/watch.jpg', rating: 4.2, reviews: 15, description: 'Silicone strap for smart watches. Comfortable and durable.' },
  { id: 9, name: 'Phone Ring Holder', category: 'Accessories', price: 200, image: '/banners/ring.jpg', rating: 4.0, reviews: 22, description: 'Rotating ring holder for phones. Prevents drops and acts as a stand.' },
  { id: 10, name: 'Wall Charger Fast', category: 'Chargers', price: 700, image: '/banners/charg.jpg', rating: 4.6, reviews: 45, description: 'Fast wall charger with multiple ports. Charge multiple devices simultaneously.' },
  { id: 11, name: 'AUX Cable Premium', category: 'Cables', price: 350, image: '/banners/aux1.jpg', rating: 4.3, reviews: 18, description: 'Premium quality AUX cable for audio. Crystal clear sound transmission.' },
  { id: 12, name: 'Phone Stand Adjustable', category: 'Holders', price: 450, image: '/banners/stand1.jpg', rating: 4.4, reviews: 12, description: 'Adjustable phone stand for desk. Perfect for video calls and watching content.' },
]

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [userRating, setUserRating] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [cartCount, setCartCount] = useState(0)
  
  const product = banners.find(p => p.id === parseInt(params.id as string))

  useEffect(() => {
    // Update cart count from localStorage
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      const cart = JSON.parse(savedCart)
      setCartCount(cart.length)
    }
  }, [])

  if (!product) {
    return <div className="text-center py-20 text-black">Product not found</div>
  }

  const handleAddToCart = () => {
    const savedCart = localStorage.getItem('cart')
    let cart = savedCart ? JSON.parse(savedCart) : []
    
    const existingItem = cart.find((item: any) => item.id === product.id)
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.push({ ...product, quantity })
    }
    
    localStorage.setItem('cart', JSON.stringify(cart))
    setCartCount(cart.length)
    alert(`${quantity} x ${product.name} added to cart!`)
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Header with Back Button and Cart */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 hover:opacity-70 transition-opacity"
              style={{ color: '#0359b3', fontFamily: '"Times New Roman", serif' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium">Back to Shop</span>
            </button>

            <button
              onClick={() => router.push('/cart')}
              className="relative p-2 hover:opacity-70 transition-opacity"
              style={{ color: '#0359b3' }}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span 
                  className="absolute -top-1 -right-1 w-6 h-6 rounded-full text-white text-xs flex items-center justify-center font-bold"
                  style={{ backgroundColor: '#0359b3' }}
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Product Image */}
          <div className="relative w-full h-80 md:h-96 lg:h-[500px] bg-gray-50 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            {/* Category Badge */}
            <span 
              className="inline-block w-fit px-3 py-1 rounded-full text-xs md:text-sm font-medium text-white mb-3"
              style={{ backgroundColor: '#0359b3' }}
            >
              {product.category}
            </span>

            <h1 
              className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-black"
              style={{ fontFamily: '"Times New Roman", serif' }}
            >
              {product.name}
            </h1>

            {/* Rating Display */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-5 h-5 md:w-6 md:h-6"
                      fill={star <= Math.round(product.rating) ? '#FFD700' : '#E5E7EB'}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span 
                  className="text-sm md:text-base font-semibold"
                  style={{ color: '#0359b3', fontFamily: '"Times New Roman", serif' }}
                >
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Your Rating */}
            <div className="mb-6 p-3 md:p-4 bg-gray-50 rounded-lg">
              <p 
                className="text-sm md:text-base font-semibold mb-2 text-black"
                style={{ fontFamily: '"Times New Roman", serif' }}
              >
                Rate this product:
              </p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setUserRating(star)}
                    className="transition-transform hover:scale-110"
                  >
                    <svg
                      className="w-6 h-6 md:w-7 md:h-7"
                      fill={star <= userRating ? '#FFD700' : '#E5E7EB'}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                ))}
              </div>
              {userRating > 0 && (
                <p 
                  className="text-xs md:text-sm mt-2"
                  style={{ color: '#0359b3', fontFamily: '"Times New Roman", serif' }}
                >
                  You rated: {userRating} stars
                </p>
              )}
            </div>

            {/* Price */}
            <p 
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ color: '#0359b3', fontFamily: '"Times New Roman", serif' }}
            >
              Rs. {product.price}
            </p>

            {/* Description */}
            <div className="mb-6">
              <h2 
                className="text-lg md:text-xl font-bold mb-2 text-black"
                style={{ fontFamily: '"Times New Roman", serif' }}
              >
                Description
              </h2>
              <p 
                className="text-sm md:text-base leading-relaxed text-gray-700"
              >
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <div className="flex items-center gap-4">
                <span 
                  className="text-base md:text-lg font-semibold text-black"
                  style={{ fontFamily: '"Times New Roman", serif' }}
                >
                  Quantity:
                </span>
                <div className="flex items-center border-2 rounded-lg overflow-hidden" style={{ borderColor: '#0359b3' }}>
                  <button
                    onClick={decreaseQuantity}
                    className="px-3 md:px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors font-bold text-lg"
                    style={{ color: '#0359b3' }}
                  >
                    -
                  </button>
                  <span className="px-4 md:px-6 py-2 text-lg font-semibold text-black">
                    {quantity}
                  </span>
                  <button
                    onClick={increaseQuantity}
                    className="px-3 md:px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors font-bold text-lg"
                    style={{ color: '#0359b3' }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full py-3 md:py-4 rounded-lg text-white font-bold text-base md:text-lg hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
              style={{ backgroundColor: '#0359b3', fontFamily: '"Times New Roman", serif' }}
            >
              Add to Cart - Rs. {product.price * quantity}
            </button>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 md:gap-4 mt-6 pt-6 border-t border-gray-200">
              <div className="text-center">
                <svg className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2" style={{ color: '#0359b3' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-xs text-gray-600 font-medium">Quality Guaranteed</p>
              </div>
              <div className="text-center">
                <svg className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2" style={{ color: '#0359b3' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <p className="text-xs text-gray-600 font-medium">Secure Payment</p>
              </div>
              <div className="text-center">
                <svg className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2" style={{ color: '#0359b3' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <p className="text-xs text-gray-600 font-medium">Fast Delivery</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}