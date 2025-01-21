'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount, isLoaded } = useCart();

  return (
    <header className="bg-amber-100 shadow-lg">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-amber-800">
            FitnessBNatural
          </Link>

          {/* Desktop Navigation */}
          <div className="flex-1 hidden md:flex md:justify-center space-x-4">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/products">Shop Now</NavLink>
            <NavLink href="/about">About Us</NavLink>
            <NavLink href="/contact">Contact Us</NavLink>
          </div>

          {/* Cart Icon + Auth Buttons (Desktop) */}
          <div className="hidden md:flex md:items-center space-x-4">
            <NavLink href="/cart">
              <div className="text-amber-800 hover:text-amber-600 relative">
                <ShoppingCart size={20} />
                {isLoaded && cartCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-600 text-white rounded-full text-xs px-1.5 py-0.5">
                    {cartCount}
                  </span>
                )}
              </div>
            </NavLink>
            <button className="text-amber-800 hover:text-amber-600">Login</button>
            <button className="text-amber-800 hover:text-amber-600">Signup</button>
          </div>

          {/* Cart Icon + Hamburger (Mobile) */}
          <div className="flex items-center md:hidden space-x-4">
            <NavLink href="/cart">
              <div className="text-amber-800 hover:text-amber-600 relative">
                <ShoppingCart size={24} />
                {isLoaded && cartCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-600 text-white rounded-full text-xs px-1.5 py-0.5">
                    {cartCount}
                  </span>
                )}
              </div>
            </NavLink>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-amber-800"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d={
                    isOpen
                      ? 'M6 18L18 6M6 6l12 12'
                      : 'M4 6h16M4 12h16M4 18h16'
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 space-y-2"
          >
            <NavLink href="/" mobile>
              Home
            </NavLink>
            <NavLink href="/products" mobile>
              Shop Now
            </NavLink>
            <NavLink href="/about" mobile>
              About Us
            </NavLink>
            <NavLink href="/contact" mobile>
              Contact Us
            </NavLink>
            <NavLink href="/cart" mobile>
              Cart {isLoaded && cartCount > 0 && `(${cartCount})`}
            </NavLink>
            <NavLink href="/login" mobile>
              Login
            </NavLink>
            <NavLink href="/signup" mobile>
              Signup
            </NavLink>
          </motion.div>
        )}
      </nav>
    </header>
  );
}

function NavLink({ href, children, mobile }) {
  return (
    <Link
      href={href}
      className={`text-amber-800 hover:text-amber-600 transition-colors duration-300 ${
        mobile ? 'block py-2' : ''
      }`}
    >
      {children}
    </Link>
  );
}
