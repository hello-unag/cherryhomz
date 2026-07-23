import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import PageHero from '@/components/PageHero';
import ListingsExplorer from '@/components/listings/ListingsExplorer';
import CTABanner from '@/components/CTABanner';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Properties For Rent in Sydney | Cherry Homz',
  description:
    'Discover apartments, terraces and family homes for rent across Sydney with Cherry Homz. Responsive property management and fast applications.',
};

export default function RentPage() {
  return (
    <main className="flex min-h-screen flex-col bg-bg">
      <Navbar />

      <PageHero
        eyebrow="Rent"
        title="Rentals You'll Love Coming Home To"
        subtitle="Beachside apartments in Bondi, sky-homes in Parramatta, character terraces in Newtown — leased and managed by a team that answers the phone."
        image="/images/hero-rent.png?v=2"
        stats={[
          { value: '24 hrs', label: 'Maintenance Response' },
          { value: '98%', label: 'Tenant Satisfaction' },
          { value: '0.8%', label: 'Vacancy Rate' },
        ]}
      />

      <ListingsExplorer category="rent" headline="Properties For Rent" />

      <CTABanner />
      <Footer />
    </main>
  );
}
