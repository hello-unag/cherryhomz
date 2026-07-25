import type { Metadata } from 'next';
import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import PageHero from '@/components/PageHero';
import ContactPageContent from '@/components/contact/ContactPageContent';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Contact Us | Cherry Homz — Sydney Real Estate Agency',
  description:
    'Talk to Cherry Homz about buying, selling, renting or land in Sydney. Call 1800 CHERRY, WhatsApp us or send an enquiry — we reply within one business day.',
};

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col bg-bg">
      <Navbar />

      <PageHero
        eyebrow="Contact"
        title="Let's Talk Property"
        subtitle="Buying, selling, renting or just curious what your home is worth — our Sydney team replies within one business day."
        image="/images/hero-contact.png?v=2"
      />

      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      }>
        <ContactPageContent />
      </Suspense>

      <Footer />
    </main>
  );
}
