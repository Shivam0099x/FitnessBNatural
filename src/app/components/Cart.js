"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [imageLoadingStates, setImageLoadingStates] = useState({});

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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

  const handleImageLoad = (itemId) => {
    setImageLoadingStates((prev) => ({
      ...prev,
      [itemId]: { loading: false, error: false },
    }));
  };

  const handleImageError = (itemId) => {
    setImageLoadingStates((prev) => ({
      ...prev,
      [itemId]: { loading: false, error: true },
    }));
  };

  return (
    <div className="min-h-screen bg-amber-50 py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-amber-800 mb-12 text-center">
          Your Cart
        </h1>
        <div className="max-w-4xl mx-auto">
          {cartItems.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md mb-4 overflow-hidden"
            >
              <div className="p-6 flex flex-col md:flex-row items-center gap-6">
                <div className="relative w-32 h-32 rounded-md overflow-hidden bg-amber-50">
                  {item.images?.[0] ? (
                    <Image
                      src={item.images[0]}
                      alt={item.title}
                      fill={true}
                      sizes="(max-width: 128px) 100vw, 128px"
                      priority={index < 2}
                      className={`object-cover transition-opacity duration-300 ${
                        imageLoadingStates[item._id]?.loading === false
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                      onLoad={() => handleImageLoad(item._id)}
                      onError={() => handleImageError(item._id)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-amber-400">
                      No Image
                    </div>
                  )}
                </div>
                <div className="flex-grow">
                  <Link href={`/products/${item._id}`}>
                    <h2 className="text-xl font-semibold text-amber-800 mb-2 hover:text-amber-600 transition-colors">
                      {item.title}
                    </h2>
                  </Link>
                  <p className="text-amber-600 mb-2 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-bold text-amber-800">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-4 items-center">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity - 1)
                      }
                      className="bg-amber-100 text-amber-800 px-3 py-1 rounded-md hover:bg-amber-200 transition-colors"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-semibold text-amber-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity + 1)
                      }
                      className="bg-amber-100 text-amber-800 px-3 py-1 rounded-md hover:bg-amber-200 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
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
              <span className="text-2xl font-bold text-amber-800">
                ${total.toFixed(2)}
              </span>
            </div>
            <div className="space-y-4">
              <button
                className="w-full bg-amber-600 text-white py-3 rounded-md hover:bg-amber-700 transition-colors duration-200"
                onClick={() => {
                  console.log("Proceeding to checkout...");
                }}
              >
                Proceed to Checkout
              </button>
              <Link
                href="/products"
                className="block text-center w-full bg-amber-100 text-amber-800 py-3 rounded-md hover:bg-amber-200 transition-colors duration-200"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
