'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CTA() {
  return (
    <section id="cta" className="py-20 bg-amber-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:w-1/2 mb-8 md:mb-0"
          >
            <Image
              src="/placeholder.svg?height=400&width=400"
              alt="Peanut Butter Jar"
              width={400}
              height={400}
              className="rounded-lg shadow-2xl"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:w-1/2 md:pl-12"
          >
            <h2 className="text-3xl font-bold text-amber-800 mb-4">Ready to Experience Peanut Perfection?</h2>
            <p className="text-xl text-amber-700 mb-6">
              Order now and taste the difference. Our premium peanut butter is just a click away!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-amber-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-amber-600 transition-colors duration-300"
            >
              <Link href={"/products"}>Shop Now</Link>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

