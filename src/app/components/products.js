'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/CartContext';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart, updateQuantity, isInCart, getItemQuantity } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products');
        if (response.data.data) {
          setProducts(response.data.data);
        } else {
          setError(response.data.message || 'No products available');
        }
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const QuantityControls = ({ product }) => {
    const quantity = getItemQuantity(product._id);

    return (
      <div className="flex items-center gap-2">
        <button
          className="w-8 h-8 flex items-center justify-center bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            updateQuantity(product._id, quantity - 1);
          }}
        >
          -
        </button>
        <span className="w-8 text-center text-amber-700 font-medium">{quantity}</span>
        <button
          className="w-8 h-8 flex items-center justify-center bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            updateQuantity(product._id, quantity + 1);
          }}
        >
          +
        </button>
      </div>
    );
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-amber-50">
      <div className="text-lg text-amber-800">Loading products...</div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-amber-50">
      <div className="text-red-500">{error}</div>
    </div>
  );

  return (
    <section className="py-20 bg-amber-50">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-amber-800 mb-12">
          Our Products
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6">
                <Link href={`/products/${product._id}`} className="block mb-4">
                  <h2 className="text-xl font-semibold text-amber-800 mb-4">
                    {product.name}
                  </h2>
                  {product.image && (
                    <div className="relative h-48 mb-4 rounded-md overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill={true}
                        className="object-cover"
                      />
                    </div>
                  )}
                  <p className="text-amber-600 mb-4 line-clamp-3">
                    {product.description}
                  </p>
                  <p className="text-lg font-bold text-amber-800">
                    ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                  </p>
                </Link>
                <div className="flex gap-3">
                  {isInCart(product._id) ? (
                    <div className="flex-1 flex justify-center">
                      <QuantityControls product={product} />
                    </div>
                  ) : (
                    <button
                      className="flex-1 bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
                      onClick={(e) => handleAddToCart(e, product)}
                    >
                      Add to Cart
                    </button>
                  )}
                  <button
                    className="flex-1 bg-amber-800 text-white py-2 px-4 rounded-md hover:bg-amber-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Buy now clicked for product:', product._id);
                    }}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;