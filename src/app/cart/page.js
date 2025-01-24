'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-amber-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-amber-800 mb-6">Your Cart</h1>
            <p className="text-amber-600 mb-8">Your cart is empty</p>
            <Link 
              href="/products"
              className="inline-block bg-amber-600 text-white py-2 px-6 rounded-md hover:bg-amber-700 transition-colors duration-200"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-amber-800 mb-12 text-center">Your Cart</h1>
        <div className="max-w-4xl mx-auto">
          {cartItems.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md mb-4 overflow-hidden border border-gray-200"
            >
              <div className="p-6 flex flex-col md:flex-row items-center gap-6">
                {item.images && (
                  <div className="relative w-36 h-36 rounded-md overflow-hidden shadow-sm border border-gray-200">
                    <Image
                      src={item.images[0]}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="flex-grow">
                  <Link href={`/products/${item._id}`}>
                    <h2 className="text-xl font-semibold text-amber-800 mb-2">{item.title}</h2>
                  </Link>
                  <p className="text-amber-600 mb-2 text-sm">{item.description}</p>
                  <p className="text-lg font-bold text-amber-800">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="bg-amber-100 text-amber-800 px-3 py-1 rounded-md hover:bg-amber-200 transition-colors duration-200"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-amber-700">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="bg-amber-100 text-amber-800 px-3 py-1 rounded-md hover:bg-amber-200 transition-colors duration-200"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-200"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
          <div className="bg-white rounded-lg shadow-md p-6 mt-8">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-semibold text-amber-800">Total:</span>
              <span className="text-2xl font-bold text-amber-800">${total.toFixed(2)}</span>
            </div>
            <button 
              className="w-full bg-amber-800 text-white py-3 rounded-md hover:bg-amber-900 transition-colors duration-200"
              onClick={() => {
                console.log('Proceeding to checkout...');
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
