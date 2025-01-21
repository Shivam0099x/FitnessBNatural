import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from '../../src/app/context/CartContext';
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FitnessBNatural",
  description: "FitnessBNatural brings you the perfect peanut butter to energize your day. Whether you're hitting the gym or enjoying a snack, savor the natural taste of wellness.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <CartProvider>
         <Toaster position="top-center" />
        <Header />
        {children}
        <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
