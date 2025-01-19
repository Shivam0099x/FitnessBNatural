'use client';
import { motion } from 'framer-motion';

export default function Features() {
  const features = [
    { title: "100% Natural", description: "Made from pure, high-quality peanuts with no additives." },
    { title: "Protein-Rich", description: "Packed with plant-based protein for a nutritious snack." },
    { title: "Versatile", description: "Perfect for spreading, cooking, or eating straight from the jar." },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-amber-800 mb-12">Why Choose Our Peanut Butter?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-amber-50 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-amber-700 mb-2">{feature.title}</h3>
              <p className="text-amber-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

