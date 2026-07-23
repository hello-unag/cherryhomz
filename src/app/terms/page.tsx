import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import PageHero from '@/components/PageHero';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service | Cherry Homz',
  description: 'Terms of Service for using the Cherry Homz website and services under Australian law.',
};

export default function TermsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-bg">
      <Navbar />

      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        subtitle="The terms and guidelines governing your use of the Cherry Homz website and real estate services."
        image="/images/hero-about.png?v=2"
      />

      <section className="py-16 px-6 md:py-24 md:px-12 lg:px-20 bg-surface">
        <div className="mx-auto max-w-4xl bg-card rounded-3xl border border-line-accent p-8 md:p-12 shadow-sm">
          <div className="prose prose-slate max-w-none dark:prose-invert">
            <p className="text-sm text-muted">Last Updated: July 2026</p>

            <h2 className="text-xl md:text-2xl font-bold text-ink mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted leading-relaxed mb-6">
              Welcome to Cherry Homz. By accessing, browsing, or using our website ([www.cherryhomz.com.au](https://www.cherryhomz.com.au)), you agree to be bound by these Terms of Service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-ink mt-8 mb-4">2. Real Estate Information Disclaimer</h2>
            <p className="text-muted leading-relaxed mb-6">
              All information, listing descriptions, dimensions, photographs, maps, floorplans, and prices displayed on this website are provided for general information purposes only. While we endeavor to ensure all material is accurate, it does not constitute formal advice or a binding offer. You must make your own independent enquiries and seek legal and financial advice before entering into any transaction or property agreement.
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-ink mt-8 mb-4">3. Intellectual Property</h2>
            <p className="text-muted leading-relaxed mb-6">
              The copy, layout, design, graphics, custom icons, code, and photographic assets displayed on this website are the intellectual property of Cherry Homz and are protected by Australian and international copyright, trademark, and other intellectual property laws. You may not copy, reproduce, modify, distribute, or republish any part of this site without our prior written consent.
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-ink mt-8 mb-4">4. Permitted Use</h2>
            <p className="text-muted leading-relaxed mb-4">
              You are granted a temporary, non-transferable license to access the content on this website for personal, non-commercial purposes. Under this license, you must not:
            </p>
            <ul className="list-disc pl-6 text-muted mb-6 space-y-2">
              <li>Use the materials for any commercial purpose or public display.</li>
              <li>Attempt to decompile, reverse engineer, or extract data from any software contained on the website.</li>
              <li>Use web scrapers, spiders, or automated bots to harvest property listings or user contact details.</li>
              <li>Provide false contact details or impersonate others when submitting inquiry forms.</li>
            </ul>

            <h2 className="text-xl md:text-2xl font-bold text-ink mt-8 mb-4">5. Limitation of Liability</h2>
            <p className="text-muted leading-relaxed mb-6">
              To the maximum extent permitted by law, including the Australian Consumer Law (ACL), Cherry Homz, its directors, employees, and associated agents will not be liable for any loss, damage, or expense (whether direct, indirect, or consequential) suffered by you or any third party arising out of or in connection with your use of our website or reliance on its content.
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-ink mt-8 mb-4">6. Third-Party Links</h2>
            <p className="text-muted leading-relaxed mb-6">
              Our website may contain links to external third-party sites (such as government portals, mapping services, or social channels). We have no control over the content or policies of these sites and accept no responsibility for any services or information they provide.
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-ink mt-8 mb-4">7. Governing Law</h2>
            <p className="text-muted leading-relaxed mb-6">
              These Terms of Service are governed by and construed in accordance with the laws of New South Wales, Australia. You irrevocably submit to the exclusive jurisdiction of the courts of New South Wales and the Federal Court of Australia to resolve any disputes.
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-ink mt-8 mb-4">8. Modifications to Terms</h2>
            <p className="text-muted leading-relaxed mb-6">
              We may revise these Terms of Service for our website at any time without notice. By using this website, you are agreeing to be bound by the then-current version of these Terms of Service.
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-ink mt-8 mb-4">9. Contact Us</h2>
            <p className="text-muted leading-relaxed mb-6">
              If you have any questions regarding these Terms of Service, please contact us at <a href="mailto:info@cherryhomz.com.au" className="text-primary hover:underline">info@cherryhomz.com.au</a>.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
