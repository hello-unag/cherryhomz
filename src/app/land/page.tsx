import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import PageHero from '@/components/PageHero';
import ListingsExplorer from '@/components/listings/ListingsExplorer';
import CTABanner from '@/components/CTABanner';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Land For Sale in Sydney & NSW | Cherry Homz',
  description:
    'Registered blocks, acreage and development sites for sale across Sydney growth corridors and NSW with Cherry Homz.',
};

export default function LandPage() {
  return (
    <main className="flex min-h-screen flex-col bg-bg">
      <Navbar />

      <PageHero
        eyebrow="Land"
        title="Build Your Future From the Ground Up"
        subtitle="Registered blocks in Sydney's growth corridors, acreage escapes and development sites — with honest advice on zoning, services and settlement."
        image="/images/hero-land.png?v=2"
        stats={[
          { value: '120+', label: 'Blocks Settled' },
          { value: 'R2–R4', label: 'Zoning Expertise' },
          { value: 'STCA', label: 'DA Guidance' },
        ]}
      />

      <ListingsExplorer category="land" headline="Land For Sale" />

      <CTABanner />
      <Footer />
    </main>
  );
}
