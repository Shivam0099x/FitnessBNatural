'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCart } from '@/app/context/CartContext'; // Assuming you have a CartContext

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart, updateQuantity, isInCart, getItemQuantity } = useCart(); // Updated to include all cart functions

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/products/${params.id}`);
        if (response.data.data) {
          setProduct(response.data.data);
          setMainImage(response.data.data.images[0]); // Set the first image as the main image
        } else {
          setError(response.data.message || 'Product not found');
        }
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch product');
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-amber-50">
        <div className="text-lg text-amber-800">Loading product...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-amber-50">
        <div className="text-red-500">{error || 'Product not found'}</div>
      </div>
    );
  }

  const QuantityControls = () => {
    const quantity = getItemQuantity(product._id);

    return (
      <div className="flex items-center gap-2">
        <button
          className="w-8 h-8 flex items-center justify-center bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
          onClick={() => updateQuantity(product._id, quantity - 1)}
        >
          -
        </button>
        <span className="w-8 text-center text-amber-700 font-medium">
          {quantity}
        </span>
        <button
          className="w-8 h-8 flex items-center justify-center bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
          onClick={() => updateQuantity(product._id, quantity + 1)}
        >
          +
        </button>
      </div>
    );
  };

  return (
    <section className="py-20 bg-amber-50 min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-xl overflow-hidden max-w-4xl mx-auto"
        >
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Main Image */}
              {mainImage && (
                <div className="relative h-96 rounded-lg overflow-hidden">
                  <Image
                    src={mainImage}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Product Details */}
              <div className="flex flex-col justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-amber-800 mb-4">{product.title}</h1>
                  <p className="text-amber-600 mb-6">{product.description}</p>
                  <p className="text-2xl font-bold text-amber-800 mb-2">
                    ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                  </p>
                  <p className="text-lg text-amber-600 mb-8">Weight: {product.weight}g</p>
                </div>
                <div className="space-y-4">
                  {isInCart(product._id) ? (
                    <QuantityControls />
                  ) : (
                    <button
                      className="w-full bg-amber-600 text-white py-3 px-6 rounded-md hover:bg-amber-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  )}
                  <button
                    className="w-full bg-amber-800 text-white py-3 px-6 rounded-md hover:bg-amber-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 text-lg"
                    onClick={() => console.log('Buy now clicked for product:', product._id)}
                  >
                    Buy Now
                  </button>
                  <button
                    onClick={() => router.back()}
                    className="w-full bg-amber-100 text-amber-800 py-3 px-6 rounded-md hover:bg-amber-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
                  >
                    Back to Products
                  </button>
                </div>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="mt-8 flex gap-4">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`w-24 h-24 rounded-lg overflow-hidden cursor-pointer border-2 ${
                    mainImage === image ? 'border-amber-600' : 'border-transparent'
                  }`}
                  onClick={() => setMainImage(image)}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
