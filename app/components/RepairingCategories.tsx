'use client'

import Image from 'next/image'

const categories = [
  {
    id: 1,
    name: 'Mobile',
    image: '/banners/mob1.jpg',
  },
  {
    id: 2,
    name: 'Smart Watches',
    image: '/banners/watch.jpg',
  },
  {
    id: 3,
    name: 'Tablets',
    image: '/banners/tab1.jpg',
  },
  {
    id: 4,
    name: 'Earbuds',
    image: '/banners/ear1.jpg',
  },
  {
    id: 5,
    name: 'Chargers',
    image: '/banners/charg.jpg',
  },
  {
    id: 6,
    name: 'Vape & Pods',
    image: '/banners/vape.jpg',
  },
  {
    id: 7,
    name: 'Speakers',
    image: '/banners/speaker.jpg',
  },
  {
    id: 8,
    name: 'Laptops',
    image: '/banners/lap.jpg',
  },
]

export default function RepairingCategories() {
  const whatsappNumber = '923263404576 // Replace with your actual WhatsApp number'
  
  const handleWhatsAppClick = (categoryName: string) => {
    const message = `Hi! I need repair service for ${categoryName}`
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-14">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3"
            style={{ color: '#0077b6' }}
          >
            Repairing Categories
          </h2>
          <p className="text-gray-600 text-sm md:text-base lg:text-lg max-w-2xl mx-auto">
            Professional repair services for all your devices. Get instant support through WhatsApp.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Image */}
              <div className="relative w-full h-40 md:h-48 lg:h-56 bg-gray-50">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-4 md:p-5">
                {/* Category Name */}
                <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-800 mb-3 md:mb-4 text-center">
                  {category.name}
                </h3>

                {/* WhatsApp Button */}
                <button
                  onClick={() => handleWhatsAppClick(category.name)}
                  className="w-full py-2.5 md:py-3 px-2 rounded-lg text-white font-medium text-xs sm:text-sm md:text-base hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap"
                  style={{ backgroundColor: '#0077b6' }}
                >
                  <svg 
                    className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span className="leading-none">WhatsApp Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}