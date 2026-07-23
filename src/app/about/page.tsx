import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import PageHero from '@/components/PageHero';
import AboutPageContent from '@/components/about/AboutPageContent';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTABanner from '@/components/CTABanner';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'About Us | Cherry Homz',
  description:
    'Discover the story behind Cherry Homz — a premier boutique Sydney agency dedicated to honest advice, premium marketing and outstanding results.',
};

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col bg-bg">
      <Navbar />

      <PageHero
        eyebrow="About"
        title="Where Property Dreams Blossom"
        subtitle="A boutique Sydney agency built on local knowledge, honest advice and marketing that makes every home look its absolute best."
        image="/images/hero-about.png?v=2"
      />

      <AboutPageContent />

      <TestimonialsSection />

      <CTABanner />
      <Footer />
    </main>
  );
}
