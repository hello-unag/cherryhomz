import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import dynamic from 'next/dynamic';

const FeaturedProperties = dynamic(() => import('@/components/FeaturedProperties'), { ssr: true });
const AboutSection = dynamic(() => import('@/components/AboutSection'), { ssr: true });
const TestimonialsSection = dynamic(() => import('@/components/TestimonialsSection'), { ssr: true });
const CTABanner = dynamic(() => import('@/components/CTABanner'), { ssr: true });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: true });

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
