"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function AboutUs() {
  return (
    <div className="min-h-[80vh] px-4 bg-amber-50">
      <main className="container mx-auto px-4 sm:px-6 py-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-amber-800 mb-8 text-center"
        >
          About PeanutPerfection
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Our Peanut Farm"
              width={600}
              height={400}
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-xl sm:text-2xl font-semibold text-amber-700 mb-4">Our Story</h2>
            <p className="text-amber-900 text-sm sm:text-base mb-4">
            Aachrati Foods Pvt Ltd, established on 28th March 2024, creates delicious and healthy food options, offering a variety of snacks from nutritious treats to indulgent sweets. Led by Ankit Sharma and Shivani Sharma, the company takes pride in its commitment to quality and taste.
            </p>
            <p className="text-amber-900 text-sm sm:text-base mb-4">
            With their manufacturing partner, JustBiteFoods, Aachrati Foods ensures top-notch, innovative products, including peanut butter, cookies, chocolates, and protein-packed snacks. Aachrati Foods combines good taste with good health, making eating better a fun and flavorful experience.
            </p>
            <h2 className="text-xl sm:text-2xl font-semibold text-amber-700 mb-4">Our Mission</h2>
            <p className="text-amber-900 text-sm sm:text-base">
              To deliver the creamiest, most delicious peanut butter while supporting local farmers and promoting sustainable practices. We believe in creating a product that's good for you and good for the planet.
            </p>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <section className="mt-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl font-bold text-amber-800 mb-8 text-center"
          >
            Frequently Asked Questions
          </motion.h2>
          <FAQItem
            question="What is PeanutPerfection?"
            answer="PeanutPerfection is a brand dedicated to creating premium-quality peanut butter using locally sourced peanuts. We aim to deliver exceptional taste and nutrition in every jar."
          />
          <FAQItem
            question="Where can I buy PeanutPerfection products?"
            answer="You can purchase our products directly from our website or through select retailers across the country. Visit our Shop page for more details."
          />
          <FAQItem
            question="Are your products organic?"
            answer="While not all of our products are certified organic, we ensure the highest quality by using sustainably sourced peanuts and natural ingredients with no artificial additives."
          />
          <FAQItem
            question="Do you ship internationally?"
            answer="Yes, we offer international shipping to select countries. Shipping rates and delivery times may vary depending on the destination. Check our Shipping Policy for more information."
          />
        </section>
      </main>
    </div>
  );
}

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left"
      >
        <h3 className="text-lg sm:text-xl font-semibold text-amber-700">
          {question}
        </h3>
        <span className={`text-amber-700 transform ${isOpen ? "rotate-180" : "rotate-0"}`}>
          ▼
        </span>
      </button>
      {isOpen && (
        <motion.p 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="text-amber-900 text-sm sm:text-base mt-4"
        >
          {answer}
        </motion.p>
      )}
    </div>
  );
}
