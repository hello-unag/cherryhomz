import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import PageHero from '@/components/PageHero';
import Footer from '@/components/Footer';

import BuildShowcaseSection from '@/components/BuildShowcaseSection';

export const metadata: Metadata = {
  title: 'Build With Us | Cherry Homz',
  description: 'Build Your Dream Home with Confidence. Connect with trusted and licensed builders across Sydney with Cherry Homz.',
};

export default function BuildWithUsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-bg">
      <Navbar />

      <PageHero
        eyebrow="Build With Us"
        title="Build Your Dream Home with Confidence"
        subtitle="At Cherry Homz, we connect you with trusted and licensed builders across Sydney to help bring your dream home to life. From finding the perfect block of land to selecting the ideal home design, we guide you through every step of the building journey with confidence and peace of mind."
        image="/images/build_hero.png"
      />

      {/* Intro & CTA Section */}
      <section className="px-6 py-16 md:py-24 max-w-[1440px] mx-auto w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-ink">Your Trusted Building Partner</h2>
            <p className="text-lg text-muted leading-relaxed">
              Building a home is one of life's biggest investments. That's why Cherry Homz works closely with experienced and licensed builders to make the process simple, transparent, and stress-free.
            </p>
            <p className="text-lg text-muted leading-relaxed">
              Whether you're building your first home, upgrading to a luxury residence, investing in property, or creating your forever home, our team will help connect you with the right builder and the right solution for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/contact" className="px-8 py-3 rounded-lg bg-primary text-white font-semibold text-center hover:bg-primary-hover transition-colors shadow-lg">
                Start Your Building Journey
              </Link>
              <Link href="/contact" className="px-8 py-3 rounded-lg border-2 border-primary text-primary font-semibold text-center hover:bg-primary hover:text-white transition-colors">
                Book a Free Consultation
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <img src="/images/build_interior.png" alt="Modern luxury interior" className="object-cover w-full h-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="bg-surface py-16 md:py-24 px-6">
        <div className="max-w-[1440px] mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">Our Building Solutions</h2>
            <p className="text-muted max-w-2xl mx-auto text-lg">We offer a comprehensive range of building options tailored to your lifestyle and investment goals.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'House & Land Packages', desc: 'Find the perfect combination of land and a quality home design tailored to your lifestyle and budget.' },
              { title: 'Custom Home Designs', desc: 'Work with trusted builders to create a home that\'s uniquely yours, designed around your family\'s lifestyle.' },
              { title: 'Luxury Homes', desc: 'Premium homes built with quality craftsmanship, modern architecture, and exceptional finishes.' },
              { title: 'Knockdown Rebuild', desc: 'Love your location but need a new home? We can help connect you with builders who specialise in knockdown rebuild projects.' },
              { title: 'Investment Homes', desc: 'Build smart investment properties designed to maximise long-term returns.' }
            ].map((solution, i) => (
              <div key={i} className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow border border-line flex flex-col h-full">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 shrink-0">
                  <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-ink mb-3">{solution.title}</h3>
                <p className="text-muted leading-relaxed flex-grow">{solution.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Build With Us & Process */}
      <section className="px-6 py-16 md:py-24 max-w-[1440px] mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3">
            <h2 className="text-3xl md:text-4xl font-bold text-ink mb-8">Why Build With Cherry Homz?</h2>
            <ul className="space-y-4">
              {[
                'Access to trusted licensed builders',
                'Expert guidance throughout the journey',
                'Personalised home solutions',
                'Transparent communication',
                'End-to-end project coordination',
                'Local Sydney market knowledge'
              ].map((benefit, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg text-muted font-medium">{benefit}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-12 p-8 bg-surface rounded-2xl border border-line shadow-inner">
              <h3 className="text-xl font-bold text-ink mb-4">Why Choose Cherry Homz?</h3>
              <p className="text-muted mb-4 leading-relaxed">We don't just help people buy and sell property—we help them create a place to call home.</p>
              <p className="text-muted leading-relaxed">With our trusted network of licensed builders and personalised guidance, you'll have a dedicated team supporting you from the initial consultation through to the completion of your new home.</p>
            </div>
          </div>
          
          <div className="lg:w-2/3">
            <h2 className="text-3xl md:text-4xl font-bold text-ink mb-8">Our Simple Process</h2>
            <div className="relative border-l-2 border-primary/20 ml-4 md:ml-6 space-y-10 py-4">
              {[
                { title: '1. Consultation', desc: 'We take the time to understand your goals, lifestyle, budget, and vision.' },
                { title: '2. Land Selection', desc: 'We\'ll help you find the ideal block of land or work with the land you already own.' },
                { title: '3. Builder Matching', desc: 'Based on your requirements, we\'ll introduce you to trusted licensed builders from our network.' },
                { title: '4. Home Design', desc: 'Choose from modern designs or customise a home that perfectly suits your family.' },
                { title: '5. Construction Journey', desc: 'Your selected builder manages the construction while we continue to support you throughout the process.' },
                { title: '6. Handover', desc: 'Celebrate the completion of your new home and receive the keys to your dream property.' }
              ].map((step, i) => (
                <div key={i} className="relative pl-8 md:pl-12">
                  <div className="absolute w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm -left-[17px] top-0 border-4 border-white shadow-sm">
                    {i + 1}
                  </div>
                  <h3 className="text-xl font-bold text-ink mb-2">{step.title.substring(3)}</h3>
                  <p className="text-muted text-lg leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-12 relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl">
               <img src="/images/build_process.png" alt="Building Process Planning" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Section: Homes Built With Cherry Homz */}
      <BuildShowcaseSection />

      {/* FAQ Section */}
      <section className="bg-surface py-16 md:py-24 px-6">
        <div className="max-w-[800px] mx-auto w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-ink mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { q: 'Do you build homes yourselves?', a: 'Cherry Homz partners with trusted and licensed builders across Sydney to help clients find the right builder and building solution for their needs.' },
              { q: 'Can I choose my own builder?', a: 'Absolutely. If you already have a preferred builder, we\'re happy to work alongside them.' },
              { q: 'Do you help with land selection?', a: 'Yes. We can assist you in finding suitable land that matches your budget and building goals.' },
              { q: 'Do you offer custom home designs?', a: 'Yes. Our builder partners offer a wide range of customisable home designs to suit different lifestyles and budgets.' }
            ].map((faq, i) => (
              <div key={i} className="bg-card rounded-xl p-6 shadow-sm border border-line transition-all hover:shadow-md">
                <h4 className="text-lg font-bold text-ink mb-3">{faq.q}</h4>
                <p className="text-muted leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 px-6 bg-primary text-white text-center">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Ready to Build Your Dream Home?</h2>
          <p className="text-xl text-white/90 mb-4 font-medium">Let's turn your vision into reality.</p>
          <p className="text-lg text-white/80 mb-10 leading-relaxed">Book your free consultation today and discover how Cherry Homz can connect you with the right builder for your next home.</p>
          <Link href="/contact" className="inline-block px-10 py-4 bg-card text-primary font-bold rounded-lg hover:bg-line transition-colors shadow-xl text-lg">
            Book a Free Consultation
          </Link>
        </div>
      </section>

      {/* Compliance Note */}
      <div className="bg-night py-6 px-6 text-center text-sm text-faint">
        <div className="max-w-[1200px] mx-auto">
          <strong className="text-faint">Compliance Note:</strong> Cherry Homz facilitates introductions to trusted licensed builders and development partners. Construction services are provided by the respective licensed building companies.
        </div>
      </div>

      <Footer />
    </main>
  );
}
