'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const banners = [
  {
    id: 1,
    image: '/banners/ban1.jpg',
    alt: 'Banner 1'
  },
  {
    id: 2,
    image: '/banners/ban3.jpg',
    alt: 'Banner 2'
  },
  {
    id: 3,
    image: '/banners/ban2.jpg',
    alt: 'Banner 3'
  }
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState(false)

  // Preload all images
  useEffect(() => {
    const imagePromises = banners.map((banner) => {
      return new Promise((resolve, reject) => {
        const img = new window.Image()
        img.src = banner.image
        img.onload = resolve
        img.onerror = reject
      })
    })

    Promise.all(imagePromises)
      .then(() => setImagesLoaded(true))
      .catch(() => setImagesLoaded(true))
  }, [])

  useEffect(() => {
    if (!imagesLoaded) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [imagesLoaded])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)
  }

  return (
    <div className="relative w-full h-40 sm:h-48 md:h-56 lg:h-72 xl:h-80 bg-white overflow-hidden">
      {/* Carousel Images */}
      <div className="relative w-full h-full">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={banner.image}
              alt={banner.alt}
              fill
              className="object-contain md:object-cover"
              priority={index === 0}
              sizes="100vw"
              quality={100}
              loading={index === 0 ? 'eager' : 'eager'}
            />
          </div>
        ))}
      </div>

      {/* Previous Button */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 md:p-2 rounded-full shadow-lg transition-all z-10"
        style={{ color: '#0359b3' }}
      >
        <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 md:p-2 rounded-full shadow-lg transition-all z-10"
        style={{ color: '#0359b3' }}
      >
        <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicators */}
      <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 md:gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1.5 md:h-2.5 rounded-full transition-all ${
              index === currentSlide 
                ? 'w-6 md:w-8' 
                : 'w-1.5 md:w-2.5 bg-white/60 hover:bg-white/80'
            }`}
            style={index === currentSlide ? { backgroundColor: '#0359b3' } : {}}
          />
        ))}
      </div>
    </div>
  )
}