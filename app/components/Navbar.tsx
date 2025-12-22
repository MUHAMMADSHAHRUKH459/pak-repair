'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="w-full px-6 py-3" style={{ backgroundColor: '#ffffffff' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 md:gap-3">
            <Image
              src="/banners/logo.png"
              alt="Pak Repair Logo"
              width={130}
              height={130}
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation Links - Centered */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center gap-8">
            <Link href="/" className="font-medium hover:opacity-80 transition-opacity" style={{ color: '#080808' }}>
              Home
            </Link>
            <Link href="/shop" className="font-medium hover:opacity-80 transition-opacity" style={{ color: '#080808' }}>
              Shop
            </Link>
            <Link href="/contact" className="font-medium hover:opacity-80 transition-opacity" style={{ color: '#080808' }}>
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2"
            style={{ color: '#080808' }}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            <Link 
              href="/" 
              className="font-medium hover:opacity-80 transition-opacity py-2" 
              style={{ color: '#080808' }}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/shop" 
              className="font-medium hover:opacity-80 transition-opacity py-2" 
              style={{ color: '#080808' }}
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <Link 
              href="/contact" 
              className="font-medium hover:opacity-80 transition-opacity py-2" 
              style={{ color: '#080808' }}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}