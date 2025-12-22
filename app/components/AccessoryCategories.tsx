'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const accessories = [
  {
    id: 1,
    name: 'Phone Case Premium',
    image: '/banners/case.jpg',
    price: 500,
    rating: 4.5,
    reviews: 25,
    category: 'Cases'
  },
  {
    id: 2,
    name: 'Tempered Glass',
    image: '/banners/pro.jpg',
    price: 300,
    rating: 4.8,
    reviews: 40,
    category: 'Screen Protectors'
  },
  {
    id: 3,
    name: 'Power Bank 20000mAh',
    image: '/banners/powe.jpg',
    price: 3500,
    rating: 4.6,
    reviews: 30,
    category: 'Power Banks'
  },
  {
    id: 4,
    name: 'USB-C Cable',
    image: '/banners/charg.jpg',
    price: 250,
    rating: 4.3,
    reviews: 50,
    category: 'Cables'
  },
  {
    id: 5,
    name: 'Wireless Earbuds',
    image: '/banners/ear.jpg',
    price: 2500,
    rating: 4.7,
    reviews: 35,
    category: 'Earbuds'
  },
  {
    id: 6,
    name: 'Car Phone Holder',
    image: '/banners/car.jpg',
    price: 800,
    rating: 4.4,
    reviews: 20,
    category: 'Holders'
  },
  {
    id: 7,
    name: 'Bluetooth Speaker',
    image: '/banners/speaker.jpg',
    price: 1800,
    rating: 4.5,
    reviews: 28,
    category: 'Speakers'
  },
  {
    id: 8,
    name: 'Smart Watch Strap',
    image: '/banners/watch.jpg',
    price: 600,
    rating: 4.2,
    reviews: 15,
    category: 'Straps'
  },
]

export default function AccessoryCategories() {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(3)
  const [cartCount, setCartCount] = useState(0)
  
  // Update itemsPerView based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2)
      } else {
        setItemsPerView(3)
      }
    }

    // Set initial value
    updateItemsPerView()

    // Add event listener
    window.addEventListener('resize', updateItemsPerView)

    // Update cart count
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      const cart = JSON.parse(savedCart)
      setCartCount(cart.length)
    }

    // Cleanup
    return () => window.removeEventListener('resize', updateItemsPerView)
  }, [])

  const nextSlide = () => {
    if (currentIndex < accessories.length - itemsPerView) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const addToCart = (product: any) => {
    const savedCart = localStorage.getItem('cart')
    let cart = savedCart ? JSON.parse(savedCart) : []
    
    // Check if product already exists in cart
    const existingItem = cart.find((item: any) => item.id === product.id)
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
    <section className="w-full py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-14">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3"
            style={{ color: '#0359b3' }}
          >
            Featured Accessories
          </h2>
          <p className="text-gray-600 text-sm md:text-base lg:text-lg max-w-2xl mx-auto">
            Shop our handpicked collection of premium mobile accessories
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-10 bg-white rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ color: '#0359b3' }}
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Slider */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {accessories.map((accessory) => (
                <div
                  key={accessory.id}
                  className="flex-shrink-0 px-2 md:px-3"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 flex flex-col h-full">
                    {/* Image - Clickable to product detail */}
                    <Link href={`/shop/${accessory.id}`}>
                      <div className="relative w-full h-48 md:h-56 lg:h-64 bg-gray-50 cursor-pointer overflow-hidden group">
                        <Image
                          src={accessory.image}
                          alt={accessory.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </Link>

                    {/* Product Info */}
                    <div className="p-3 md:p-4 flex flex-col flex-grow">
                      {/* Category Badge */}
                      <span 
                        className="inline-block w-fit px-2 py-1 rounded-full text-xs font-medium text-white mb-2"
                        style={{ backgroundColor: '#0359b3' }}
                      >
                        {accessory.category}
                      </span>

                      {/* Product Name */}
                      <Link href={`/shop/${accessory.id}`}>
                        <h3 
                          className="text-sm md:text-base font-semibold mb-2 text-black hover:underline cursor-pointer line-clamp-2"
                          style={{ fontFamily: '"Times New Roman", serif' }}
                        >
                          {accessory.name}
                        </h3>
                      </Link>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-3">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className="w-3 h-3 md:w-4 md:h-4"
                              fill={star <= Math.round(accessory.rating) ? '#FFD700' : '#E5E7EB'}
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
                          ({accessory.reviews})
                        </span>
                      </div>

                      {/* Price */}
                      <p 
                        className="text-lg md:text-xl font-bold mb-3"
                        style={{ color: '#0359b3', fontFamily: '"Times New Roman", serif' }}
                      >
                        Rs. {accessory.price}
                      </p>

                      {/* Add to Cart Button */}
                      <button
                        onClick={() => addToCart(accessory)}
                        className="w-full py-2 md:py-2.5 rounded-lg text-white font-medium text-xs md:text-sm hover:opacity-90 transition-all mt-auto"
                        style={{ backgroundColor: '#0359b3', fontFamily: '"Times New Roman", serif' }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            disabled={currentIndex >= accessories.length - itemsPerView}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-10 bg-white rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ color: '#0359b3' }}
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Slide Indicator */}
        <div className="flex justify-center items-center gap-2 mt-6 md:mt-8">
          <span className="text-sm md:text-base text-gray-600">
            {currentIndex + 1} - {Math.min(currentIndex + itemsPerView, accessories.length)} of {accessories.length}
          </span>
        </div>
      </div>
    </section>
  )
}