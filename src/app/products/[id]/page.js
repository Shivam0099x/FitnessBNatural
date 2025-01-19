// app/products/[id]/page.js
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/products/${params.id}`);
        if (response.data.data) {
          setProduct(response.data.data);
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
              {product.image && (
                <div className="relative h-96 rounded-lg overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex flex-col justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-amber-800 mb-4">{product.name}</h1>
                  <p className="text-amber-600 mb-6">{product.description}</p>
                  <p className="text-2xl font-bold text-amber-800 mb-8">
                    ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                  </p>
                </div>
                <div className="space-y-4">
                  <button 
                    className="w-full bg-amber-800 text-white py-3 px-6 rounded-md hover:bg-amber-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 text-lg"
                    onClick={() => {
                      // Add your buy now logic here
                      console.log('Buy now clicked for product:', product._id);
                    }}
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}