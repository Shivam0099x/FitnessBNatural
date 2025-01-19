
import Hero from './components/Hero';
import Features from './components/Features';
import CTA from './components/CTA';
import Testimonial from './components/Testimonials';

export default function Home() {
  return (
    <div className="min-h-screen bg-amber-50">
      <Hero />
      <Features />
      <Testimonial/>
      <CTA />
    </div>
  );
}

