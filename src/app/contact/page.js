'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Github, Twitter } from 'lucide-react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
    alert('Thank you for your message. We will get back to you soon!');
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <main className="container mx-auto px-6 py-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-amber-800 mb-8 text-center"
        >
          Contact Us
        </motion.h1>
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-xl p-6"
          >
            <h2 className="text-2xl font-semibold text-amber-700 mb-4">Get in Touch</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="text-amber-500" />
                <span>info@peanutperfection.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-amber-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="text-amber-500" />
                <span>123 Peanut Lane, Nutville, NV 12345</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-amber-700 mt-6 mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:text-amber-600">
                <Instagram />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:text-amber-600">
                <Github />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:text-amber-600">
                <Twitter />
              </a>
            </div>
          </motion.div>
          <motion.form 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-amber-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-amber-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-amber-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-amber-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-amber-700">Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-amber-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-200 focus:ring-opacity-50"
              ></textarea>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-amber-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-amber-600 transition-colors duration-300"
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </main>
    </div>
  );
}

