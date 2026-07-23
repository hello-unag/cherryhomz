import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';

import FeaturedProperties from '@/components/FeaturedProperties';
import AboutSection from '@/components/AboutSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTABanner from '@/components/CTABanner';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-bg">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative">
        <HeroSection />
      </div>
      
      <FeaturedProperties />
      
      <AboutSection />
      
      <TestimonialsSection />
      
      <CTABanner />
      
      <Footer />
    </main>
  );
}
