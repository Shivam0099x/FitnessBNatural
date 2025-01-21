'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center bg-gradient-to-b from-amber-100 to-amber-50">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:w-1/2 mb-8 md:mb-0 text-center md:text-left"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-amber-800 mb-4">
              Discover the Creamiest Peanut Butter
            </h1>
            <p className="text-xl text-amber-700 mb-6">
              Indulge in the rich, smooth taste of our premium peanut butter.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-amber-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-amber-600 transition"
            >
              <Link href="/products">Try Now</Link>
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:w-1/2 flex justify-center"
          >
            <Image
              src="https://images.unsplash.com/photo-1624684244440-1130c3b65783?q=80&w=1885&auto=format&fit=crop"
              alt="Creamy Peanut Butter"
              width={400}
              height={300}
              className="rounded-lg shadow-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
