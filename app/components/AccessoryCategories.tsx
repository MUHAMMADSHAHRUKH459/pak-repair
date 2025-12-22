'use client'

import { useState } from 'react'
import Image from 'next/image'

const accessories = [
  {
    id: 1,
    name: 'Phone Cases',
    image: '/banners/case.jpg',
  },
  {
    id: 2,
    name: 'Screen Protectors',
    image: '/banners/pro.jpg',
  },
  {
    id: 3,
    name: 'Power Banks',
    image: '/banners/powe.jpg',
  },
  {
    id: 4,
    name: 'Cables',
    image: '/banners/charg.jpg',
  },
  {
    id: 5,
    name: 'Headphones',
    image: '/banners/head.jpg',
  },
  {
    id: 6,
    name: 'Car Holders',
    image: '/banners/car.jpg',
  },
  {
    id: 7,
    name: 'Bluetooth Devices',
    image: '/banners/blue.jpg',
  },
  {
    id: 8,
    name: 'Smart Bands',
    image: '/banners/brand.jpg',
  },
]

export default function AccessoryCategories() {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  // 1 item on mobile, 3 items on desktop
  const getItemsPerView = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 ? 1 : 3
    }
    return 3
  }

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView())

  // Update itemsPerView on window resize
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', () => {
      setItemsPerView(getItemsPerView())
    })
  }

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

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-14">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3"
            style={{ color: '#0359b3' }}
          >
            Accessory Categories
          </h2>
          <p className="text-gray-600 text-sm md:text-base lg:text-lg max-w-2xl mx-auto">
            Explore our wide range of quality mobile accessories
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
                  style={{ width: itemsPerView === 1 ? '100%' : `${100 / itemsPerView}%` }}
                >
                  <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 max-w-md mx-auto">
                    {/* Image */}
                    <div className="relative w-full h-64 md:h-48 lg:h-56 bg-gray-50">
                      <Image
                        src={accessory.image}
                        alt={accessory.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4 md:p-4">
                      <h3 className="text-base md:text-base lg:text-lg font-semibold text-gray-800 text-center">
                        {accessory.name}
                      </h3>
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