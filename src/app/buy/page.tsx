import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import PageHero from '@/components/PageHero';
import ListingsExplorer from '@/components/listings/ListingsExplorer';
import CTABanner from '@/components/CTABanner';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Properties For Sale in Sydney | Cherry Homz',
  description:
    'Browse houses, apartments, townhouses and luxury homes for sale across Sydney and Australia with Cherry Homz — Sydney real estate experts.',
};

export default function BuyPage() {
  return (
    <main className="flex min-h-screen flex-col bg-bg">
      <Navbar />

      <PageHero
        eyebrow="Buy"
        title="Find Your Next Home in Sydney"
        subtitle="Covering all parts of Sydney — from Western Sydney and the Norwest to the South West, Eastern Suburbs, and beyond — explore homes for sale hand-picked by our local experts."
        image="/images/hero-buy.png?v=2"
      />

      <ListingsExplorer category="buy" headline="Properties For Sale" />

      <CTABanner />
      <Footer />
    </main>
  );
}
