'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Johnson",
    image: "/placeholder.svg?height=100&width=100",
    description: "FitnessBNatural's peanut butter is a game-changer in my fitness journey. It's delicious and packed with protein!",
    rating: 5
  },
  {
    name: "Mike Thompson",
    image: "/placeholder.svg?height=100&width=100",
    description: "I've tried many natural peanut butters, but this one tops them all. Great taste and perfect consistency.",
    rating: 4
  },
  {
    name: "Emily Rodriguez",
    image: "/placeholder.svg?height=100&width=100",
    description: "As a nutritionist, I highly recommend FitnessBNatural. It's a clean, high-quality protein source for my clients.",
    rating: 5
  }
];

function StarRating({ rating }) {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );
}

export default function Testimonial() {
  return (
    <section className="py-20 bg-amber-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-amber-800 mb-12">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-6 flex">
                <div className="flex-shrink-0 mr-4">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-amber-800 mb-2">{testimonial.name}</h3>
                  <p className="text-amber-600 mb-4">{testimonial.description}</p>
                  <StarRating rating={testimonial.rating} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

