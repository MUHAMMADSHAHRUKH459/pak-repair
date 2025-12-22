'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'

const banners = [
  { id: 1, name: 'Phone Case Premium', category: 'Cases', price: 500, image: '/banners/case.jpg', rating: 4.5, reviews: 25, description: 'Premium quality phone case with shock absorption. Made with high-grade materials to protect your device from drops and scratches.' },
  { id: 2, name: 'Tempered Glass', category: 'Screen Protectors', price: 300, image: '/banners/pro.jpg', rating: 4.8, reviews: 40, description: '9H hardness tempered glass screen protector. Provides excellent protection against scratches and impacts.' },
  { id: 3, name: 'Power Bank 20000mAh', category: 'Power Banks', price: 3500, image: '/banners/powe.jpg', rating: 4.6, reviews: 30, description: 'Fast charging power bank with dual USB ports. Keep your devices charged on the go.' },
  { id: 4, name: 'USB-C Cable', category: 'Cables', price: 250, image: '/banners/cable1.jpg', rating: 4.3, reviews: 50, description: 'Durable USB-C fast charging cable. Supports fast charging and data transfer.' },
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
  
  const product = banners.find(p => p.id === parseInt(params.id as string))

  if (!product) {
    return <div className="text-center py-20 text-black">Product not found</div>
  }

  const handleAddToCart = () => {
    const savedCart = localStorage.getItem('cart')
    let cart = savedCart ? JSON.parse(savedCart) : []
    
    const existingItem = cart.find((item: any) => item.id === product.id)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({ ...product, quantity: 1 })
    }
    
    localStorage.setItem('cart', JSON.stringify(cart))
    alert(`${product.name} added to cart!`)
    router.push('/cart')
  }

  return (
    <div className="w-full bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 hover:opacity-70 transition-opacity"
          style={{ color: '#0359b3', fontFamily: '"Times New Roman", serif' }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Shop
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Product Image */}
          <div className="relative w-full h-64 md:h-96 lg:h-[500px] bg-gray-50 rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Product Details */}
          <div>
            <h1 
              className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-black"
              style={{ fontFamily: '"Times New Roman", serif' }}
            >
              {product.name}
            </h1>

            <p 
              className="text-sm md:text-base mb-4"
              style={{ color: '#0359b3', fontFamily: '"Times New Roman", serif' }}
            >
              Category: {product.category}
            </p>

            {/* Rating Display */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
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
                  className="text-base md:text-lg font-semibold"
                  style={{ color: '#0359b3', fontFamily: '"Times New Roman", serif' }}
                >
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Your Rating */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
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
                      className="w-7 h-7 md:w-8 md:h-8"
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
                  className="text-sm mt-2"
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
                className="text-xl md:text-2xl font-bold mb-3 text-black"
                style={{ fontFamily: '"Times New Roman", serif' }}
              >
                Description
              </h2>
              <p 
                className="text-sm md:text-base leading-relaxed"
                style={{ color: '#0359b3', fontFamily: '"Times New Roman", serif' }}
              >
                {product.description}
              </p>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full py-3 md:py-4 rounded-lg text-white font-bold text-base md:text-lg hover:opacity-90 transition-all"
              style={{ backgroundColor: '#0359b3', fontFamily: '"Times New Roman", serif' }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}