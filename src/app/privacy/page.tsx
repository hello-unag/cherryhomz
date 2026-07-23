import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import PageHero from '@/components/PageHero';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy | Cherry Homz',
  description: 'Privacy Policy of Cherry Homz in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles.',
};

export default function PrivacyPage() {
  return (
    <main className="flex min-h-screen flex-col bg-bg">
      <Navbar />

      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your personal information in accordance with Australian privacy laws."
        image="/images/hero-about.png?v=2"
      />

      <section className="py-16 px-6 md:py-24 md:px-12 lg:px-20 bg-surface">
        <div className="mx-auto max-w-4xl bg-card rounded-3xl border border-line-accent p-8 md:p-12 shadow-sm">
          <div className="prose prose-slate max-w-none dark:prose-invert">
            <p className="text-sm text-muted">Last Updated: July 2026</p>

            <h2 className="text-xl md:text-2xl font-bold text-ink mt-8 mb-4">1. Commitment to Privacy</h2>
            <p className="text-muted leading-relaxed mb-6">
              Cherry Homz (referred to as &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information in accordance with the <em>Privacy Act 1988</em> (Cth) and the Australian Privacy Principles (APPs).
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-ink mt-8 mb-4">2. The Personal Information We Collect</h2>
            <p className="text-muted leading-relaxed mb-4">
              We collect personal information that is reasonably necessary for us to provide our real estate services, respond to inquiries, and run our business. This information may include:
            </p>
            <ul className="list-disc pl-6 text-muted mb-6 space-y-2">
              <li>Your name, email address, phone number, and mailing address.</li>
              <li>Details of properties you enquire about, sell, buy, rent, or lease through us.</li>
              <li>Financial information (such as proof of income or billing details) if you apply for a tenancy or enlist us to sell/manage property.</li>
              <li>Any information you provide directly through our website contact forms, WhatsApp chat, or direct communication.</li>
            </ul>

            <h2 className="text-xl md:text-2xl font-bold text-ink mt-8 mb-4">3. How We Collect Personal Information</h2>
            <p className="text-muted leading-relaxed mb-6">
              We collect personal information directly from you when you fill out forms on our website, email us, call us, attend our property inspections, or communicate with us on WhatsApp. We may also collect information from publicly available databases or third-party real estate portals where you enquire about our listings.
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-ink mt-8 mb-4">4. How We Use Your Information</h2>
            <p className="text-muted leading-relaxed mb-4">
              We use the personal information we collect for purposes including:
            </p>
            <ul className="list-disc pl-6 text-muted mb-6 space-y-2">
              <li>Providing real estate agency services, including facilitating the buying, selling, renting, or building of properties.</li>
              <li>Responding to your specific property and service enquiries.</li>
              <li>Sending you relevant property alerts, marketing updates, and promotional material (which you can opt-out of at any time).</li>
              <li>Meeting our regulatory obligations under New South Wales and Australian property legislation.</li>
            </ul>

            <h2 className="text-xl md:text-2xl font-bold text-ink mt-8 mb-4">5. Disclosure of Personal Information</h2>
            <p className="text-muted leading-relaxed mb-4">
              We do not sell your personal information. We may disclose your information to:
            </p>
            <ul className="list-disc pl-6 text-muted mb-6 space-y-2">
              <li>Third parties involved in a property transaction (such as solicitors, conveyancers, and building inspectors).</li>
              <li>Service providers who assist us in operating our business (such as database hosts, IT developers, and marketing agencies).</li>
              <li>Government authorities or law enforcement agencies where required or permitted by law.</li>
            </ul>

            <h2 className="text-xl md:text-2xl font-bold text-ink mt-8 mb-4">6. Security of Your Personal Information</h2>
            <p className="text-muted leading-relaxed mb-6">
              We take all reasonable steps to store your personal information securely in encrypted digital databases and physically secured files. We protect it from misuse, interference, loss, unauthorized access, modification, or disclosure.
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-ink mt-8 mb-4">7. Accessing and Correcting Your Information</h2>
            <p className="text-muted leading-relaxed mb-6">
              You have a right to access and seek correction of the personal information we hold about you. If you would like to request access to or correct your details, please contact us at <a href="mailto:info@cherryshomz.com.au" className="text-primary hover:underline">info@cherryshomz.com.au</a>.
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-ink mt-8 mb-4">8. Complaints and Contact</h2>
            <p className="text-muted leading-relaxed mb-6">
              If you have any questions or wish to lodge a complaint about a breach of the APPs, please contact us at <a href="mailto:info@cherryshomz.com.au" className="text-primary hover:underline">info@cherryshomz.com.au</a>. We will investigate your complaint promptly and respond in writing within 30 days.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
