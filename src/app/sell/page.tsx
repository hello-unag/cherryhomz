import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import PageHero from '@/components/PageHero';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Sell Your Property in Sydney | Cherry Homz',
  description:
    'Ready to sell? Cherry Homz delivers premium marketing, expert negotiation and record-breaking results for homeowners across Sydney. Get a free appraisal today.',
};

const STEPS = [
  {
    number: '01',
    title: 'Free Property Appraisal',
    description:
      'Our local experts visit your property and provide a detailed, data-backed market appraisal — completely free and with no obligation.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Premium Marketing Campaign',
    description:
      'Professional photography, video tours, digital campaigns and front-page placement on all major property portals to maximise your reach.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Expert Negotiation',
    description:
      'Our experienced agents handle every offer, counter-offer and auction bid — fighting hard to secure you the best possible price.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Smooth Settlement',
    description:
      'We coordinate with solicitors, buyers and financiers to ensure a seamless settlement — keeping you informed every step of the way.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const WHY_ITEMS = [
  { stat: '97%', label: 'Auction clearance rate' },
  { stat: '31 days', label: 'Average days on market' },
  { stat: '$1.2B+', label: 'In property sold' },
  { stat: '500+', label: 'Happy vendors' },
];

export default function SellPage() {
  return (
    <main className="flex min-h-screen flex-col bg-bg">
      <Navbar />

      <PageHero
        eyebrow="Sell"
        title="Sell With Sydney's Best"
        subtitle="Maximum exposure. Expert negotiation. Record results. Cherry Homz delivers a premium selling experience from appraisal to settlement."
        image="/images/hero-buy.png?v=2"
      />

      {/* ── How We Sell ── */}
      <section className="py-20 px-4 max-w-6xl mx-auto w-full">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold tracking-[3px] uppercase mb-3" style={{ color: 'var(--primary)' }}>
            Our Process
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-ink mb-4">
            How We Get You the Best Price
          </h2>
          <p className="text-muted max-w-2xl mx-auto text-base leading-relaxed">
            A proven four-step process that has delivered record results across Sydney suburbs —
            designed to minimise stress and maximise your return.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="group relative bg-card rounded-2xl p-8 border border-line shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              {/* Background number watermark */}
              <span
                className="absolute top-4 right-6 text-7xl font-black select-none pointer-events-none"
                style={{ color: 'var(--primary)', opacity: 0.05 }}
              >
                {step.number}
              </span>

              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl mb-5"
                style={{ backgroundColor: 'rgba(155,27,48,0.08)', color: 'var(--primary)' }}
              >
                {step.icon}
              </div>

              <div
                className="text-xs font-bold tracking-[2px] uppercase mb-2"
                style={{ color: 'var(--primary)' }}
              >
                Step {step.number}
              </div>
              <h3 className="text-xl font-bold text-ink mb-3">{step.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>


      {/* ── Free Appraisal CTA ── */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-xs font-bold tracking-[3px] uppercase mb-3" style={{ color: 'var(--primary)' }}>
            Get Started
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-ink mb-4">
            Ready to Sell? Let&apos;s Talk.
          </h2>
          <p className="text-muted mb-8 text-base leading-relaxed max-w-xl mx-auto">
            Book your free property appraisal today and find out what your home is worth in the current market.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white shadow-lg transition-colors duration-200"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              Book Free Appraisal
            </a>
            <a
              href="tel:0470593442"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold border-2 transition-colors duration-200 text-ink hover:text-primary"
              style={{ borderColor: 'var(--line)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.273-3.973-6.869-6.87l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              Call 0470 593 442
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
