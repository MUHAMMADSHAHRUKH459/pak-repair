'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
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
  quantity?: number
}

const banners: Product[] = [
  { id: 1, name: 'Phone Case Premium', category: 'Cases', price: 500, image: '/banners/case.jpg', rating: 4.5, reviews: 25, description: 'Premium quality phone case with shock absorption' },
  { id: 2, name: 'Tempered Glass', category: 'Screen Protectors', price: 300, image: '/banners/pro.jpg', rating: 4.8, reviews: 40, description: '9H hardness tempered glass screen protector' },
  { id: 3, name: 'Power Bank 20000mAh', category: 'Power Banks', price: 3500, image: '/banners/powe.jpg', rating: 4.6, reviews: 30, description: 'Fast charging power bank with dual USB ports' },
  { id: 4, name: 'USB-C Cable', category: 'Cables', price: 250, image: '/banners/charg.jpg', rating: 4.3, reviews: 50, description: 'Durable USB-C fast charging cable' },
  { id: 5, name: 'Wireless Earbuds', category: 'Earbuds', price: 2500, image: '/banners/ear.jpg', rating: 4.7, reviews: 35, description: 'High quality wireless earbuds with noise cancellation' },
  { id: 6, name: 'Car Phone Holder', category: 'Holders', price: 800, image: '/banners/car.jpg', rating: 4.4, reviews: 20, description: 'Universal car phone holder with strong grip' },
  { id: 7, name: 'Bluetooth Speaker', category: 'Speakers', price: 1800, image: '/banners/speaker.jpg', rating: 4.5, reviews: 28, description: 'Portable Bluetooth speaker with bass boost' },
  { id: 8, name: 'Smart Watch Strap', category: 'Straps', price: 600, image: '/banners/watch.jpg', rating: 4.2, reviews: 15, description: 'Silicone strap for smart watches' },
  { id: 9, name: 'Phone Ring Holder', category: 'Accessories', price: 200, image: '/banners/ring.jpg', rating: 4.0, reviews: 22, description: 'Rotating ring holder for phones' },
  { id: 10, name: 'Wall Charger Fast', category: 'Chargers', price: 700, image: '/banners/charg.jpg', rating: 4.6, reviews: 45, description: 'Fast wall charger with multiple ports' },
  { id: 11, name: 'AUX Cable Premium', category: 'Cables', price: 350, image: '/banners/aux1.jpg', rating: 4.3, reviews: 18, description: 'Premium quality AUX cable for audio' },
  { id: 12, name: 'Phone Stand Adjustable', category: 'Holders', price: 450, image: '/banners/stand1.jpg', rating: 4.4, reviews: 12, description: 'Adjustable phone stand for desk' },
]

export default function ShopPage() {
  const [cartCount, setCartCount] = useState(0)
  const router = useRouter()

  useEffect(() => {
    // Update cart count from localStorage
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      const cart = JSON.parse(savedCart)
      setCartCount(cart.length)
    }
  }, [])

  const addToCart = (product: Product) => {
    const savedCart = localStorage.getItem('cart')
    let cart = savedCart ? JSON.parse(savedCart) : []
    
    // Check if product already exists in cart
    const existingItem = cart.find((item: Product) => item.id === product.id)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({ ...product, quantity: 1 })
    }
    
    localStorage.setItem('cart', JSON.stringify(cart))
    setCartCount(cart.length)
    
    // Show success message
    alert(`${product.name} added to cart!`)
  }

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Enhanced Header with Gradient Background */}
      <div className="w-full py-12 md:py-16 relative overflow-hidden" style={{ 
        background: 'linear-gradient(135deg, #0359b3 0%, #0470d8 100%)'
      }}>
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 tracking-tight"
                style={{ fontFamily: '"Times New Roman", serif' }}
              >
                Explore Premium Accessories
              </h1>
              <div className="w-20 h-1 bg-white rounded-full"></div>
            </div>
            
            {/* Cart Icon */}
            <button
              onClick={() => router.push('/cart')}
              className="relative p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-all duration-300"
            >
              <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span 
                  className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white text-xs flex items-center justify-center font-bold shadow-lg"
                  style={{ color: '#0359b3' }}
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
          
          <p 
            className="text-white text-base md:text-lg max-w-2xl leading-relaxed opacity-95"
            style={{ fontFamily: '"Times New Roman", serif' }}
          >
            Discover premium mobile accessories crafted for quality and style. Find the perfect match for your device.
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {banners.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 flex flex-col"
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
              <div className="p-3 md:p-4 flex flex-col flex-grow">
                <Link href={`/shop/${product.id}`}>
                  <h3 
                    className="text-sm md:text-base font-semibold mb-2 text-black hover:underline cursor-pointer line-clamp-2"
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

                {/* Add to Cart Button - Now at the bottom with proper spacing */}
                <button
                  onClick={() => addToCart(product)}
                  className="w-full py-2 md:py-2.5 rounded-lg text-white font-medium text-xs md:text-sm hover:opacity-90 transition-all mt-auto"
                  style={{ backgroundColor: '#0359b3', fontFamily: '"Times New Roman", serif' }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}