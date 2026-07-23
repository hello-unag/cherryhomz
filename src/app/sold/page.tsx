import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import PageHero from '@/components/PageHero';
import ListingsExplorer from '@/components/listings/ListingsExplorer';
import CTABanner from '@/components/CTABanner';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Recently Sold Properties | Cherry Homz',
  description:
    'See recent sales results from Cherry Homz across Sydney and Australia — auction records, above-reserve results and premium campaigns.',
};

export default function SoldPage() {
  return (
    <main className="flex min-h-screen flex-col bg-bg">
      <Navbar />

      <PageHero
        eyebrow="Sold"
        title="Results That Speak For Themselves"
        subtitle="Every sold sticker tells a story — record streets, five-bidder auctions and above-reserve results achieved for owners just like you."
        image="/images/hero-sold.png?v=2"
      />

      <ListingsExplorer category="sold" headline="Recently Sold" />


      <CTABanner />
      <Footer />
    </main>
  );
}
