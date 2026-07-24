'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropertyMap from '@/components/PropertyMap';

/* ------------------------------------------------------------------ */
/*  Contact page body — quick actions, enquiry form, office + FAQ.     */
/* ------------------------------------------------------------------ */

const ENQUIRY_TYPES = [
  'Buying a property',
  'Selling my property',
  'Renting a property',
  'Property management',
  'Build with us',
  'Land & development',
  'Something else',
] as const;

const FAQS = [
  {
    q: 'How much is my property worth?',
    a: 'We offer free, no-obligation appraisals. One of our licensed agents will walk through your property, compare recent sales in your street and suburb, and give you an honest price range — usually within 48 hours of your enquiry.',
  },
  {
    q: 'What are your selling fees?',
    a: 'Our commission is competitive with the Sydney market and always agreed up front — no hidden marketing surprises. Every campaign includes professional photography, floorplans and premium portal listings as standard.',
  },
  {
    q: 'How quickly can I move into a rental?',
    a: 'If your application and references check out, we can often approve within 24–48 hours. Have your ID, proof of income and rental history ready to speed things up.',
  },
  {
    q: 'Do you help first home buyers?',
    a: 'Absolutely. We\'ll guide you through pre-approval, the First Home Buyer Assistance Scheme (stamp duty concessions in NSW), inspections and settlement — with no jargon and no rush.',
  },
  {
    q: 'Which areas do you service?',
    a: 'Our home turf is Sydney — from the Eastern Suburbs and Northern Beaches to the Hills growth corridor — with partner offices in Melbourne, Brisbane, Perth and the Gold Coast.',
  },
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  enquiry: string;
  message: string;
}

const EMPTY_FORM: FormState = {
  name: '',
  email: '',
  phone: '',
  enquiry: ENQUIRY_TYPES[0],
  message: '',
};

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const inputClass =
  'w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm font-medium text-ink outline-none transition-all duration-200 placeholder:text-faint focus:border-primary focus:ring-2 focus:ring-primary/10';

export default function ContactPageContent() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const update = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = 'Please tell us your name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email address';
    if (!/^[\d\s+()-]{8,}$/.test(form.phone)) next.phone = 'Enter a valid phone number';
    if (form.message.trim().length < 10) next.message = 'Tell us a little more (10+ characters)';

    setErrors(next);
    if (Object.keys(next).length === 0) {
      setIsSubmitting(true);
      setSubmitError(null);

      // Read access key from environment variable (with hardcoded fallback)
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '98137720-2b69-4976-a66a-77c5d28b7d5d';

      if (!accessKey) {
        console.warn("Web3Forms access key is not configured.");
        setTimeout(() => {
          setIsSubmitting(false);
          setSubmitted(true);
        }, 1000);
        return;
      }

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: accessKey,
            name: form.name,
            email: form.email,
            phone: form.phone,
            subject: `New Enquiry from ${form.name} (${form.enquiry})`,
            from_name: "Cherry Homz Website",
            message: `Interested in: ${form.enquiry}\n\nMessage:\n${form.message}`,
          }),
        });

        const result = await response.json();
        if (response.status === 200 || result.success) {
          setSubmitted(true);
        } else {
          setSubmitError(result.message || "Failed to submit enquiry. Please try again.");
        }
      } catch (err) {
        setSubmitError("Network error. Please check your connection and try again.");
        console.error("Web3Forms submission error:", err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      {/* ---- Quick contact actions ---- */}
      <section className="relative z-10 -mt-8 px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="mx-auto grid max-w-5xl grid-cols-3 gap-3 md:gap-5">
          {[
            {
              label: 'Call Us',
              sub: '0470 593 442',
              href: 'tel:0470593442',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.273-3.973-6.869-6.87l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              ),
            },
            {
              label: 'WhatsApp',
              sub: 'Chat now',
              href: 'https://wa.me/61470593442',
              icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              ),
            },
            {
              label: 'Email',
              sub: 'info@cherryhomz.com.au',
              href: 'mailto:info@cherryhomz.com.au',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              ),
            },
          ].map((action, i) => (
            <motion.a
              key={action.label}
              href={action.href}
              target={action.href.startsWith('http') ? '_blank' : undefined}
              rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="flex flex-col items-center gap-1.5 rounded-2xl border border-line-accent bg-card px-3 py-5 text-center shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:py-6"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-primary">
                {action.icon}
              </span>
              <span className="text-sm font-bold text-ink md:text-base">{action.label}</span>
              <span className="hidden text-xs text-muted sm:block">{action.sub}</span>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ---- Form + office ---- */}
      <section className="bg-bg py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 md:px-12 lg:grid-cols-5 lg:gap-14 lg:px-20">
          {/* Form */}
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="lg:col-span-3">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Send an Enquiry</p>
            <h2 className="mt-3 text-3xl font-bold text-ink md:text-4xl">
              Tell Us What You&apos;re Looking For
            </h2>
            <p className="mt-3 text-base text-muted">
              We reply to every enquiry within one business day — usually much faster.
            </p>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-8 text-center"
                >
                  <span className="text-4xl" aria-hidden>🌸</span>
                  <h3 className="mt-3 text-xl font-bold text-ink">Thank you, {form.name.split(' ')[0]}!</h3>
                  <p className="mt-2 text-sm text-muted">
                    Your enquiry is on its way to our team. We&apos;ll be in touch within one business day.
                  </p>
                  <button
                    type="button"
                    onClick={() => { setForm(EMPTY_FORM); setSubmitted(false); }}
                    className="mt-6 text-sm font-semibold text-primary underline-offset-4 hover:underline"
                  >
                    Send another enquiry
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2"
                >
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-name" className="text-xs font-semibold uppercase tracking-wide text-ink/60">
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      placeholder="Jane Citizen"
                      className={inputClass}
                    />
                    {errors.name && <p className="text-xs font-medium text-primary-hover">{errors.name}</p>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-phone" className="text-xs font-semibold uppercase tracking-wide text-ink/60">
                      Phone *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      placeholder="04xx xxx xxx"
                      className={inputClass}
                    />
                    {errors.phone && <p className="text-xs font-medium text-primary-hover">{errors.phone}</p>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-email" className="text-xs font-semibold uppercase tracking-wide text-ink/60">
                      Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      placeholder="jane@example.com"
                      className={inputClass}
                    />
                    {errors.email && <p className="text-xs font-medium text-primary-hover">{errors.email}</p>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-enquiry" className="text-xs font-semibold uppercase tracking-wide text-ink/60">
                      I&apos;m Interested In
                    </label>
                    <div className="relative">
                      <select
                        id="contact-enquiry"
                        value={form.enquiry}
                        onChange={(e) => update('enquiry', e.target.value)}
                        className={`${inputClass} appearance-none cursor-pointer pr-9`}
                      >
                        {ENQUIRY_TYPES.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                      <svg
                        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40"
                        viewBox="0 0 20 20" fill="currentColor" aria-hidden
                      >
                        <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label htmlFor="contact-message" className="text-xs font-semibold uppercase tracking-wide text-ink/60">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      value={form.message}
                      onChange={(e) => update('message', e.target.value)}
                      placeholder="Tell us about the property or suburb you have in mind…"
                      className={`${inputClass} resize-y`}
                    />
                    {errors.message && <p className="text-xs font-medium text-primary-hover">{errors.message}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    {submitError && (
                      <div className="mb-4 rounded-xl bg-red-50 border border-red-200 p-4 text-sm font-medium text-primary-hover">
                        ⚠️ {submitError}
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-cherry w-full rounded-xl px-8 py-4 text-base font-semibold sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        'Send Enquiry'
                      )}
                    </button>
                    <p className="mt-3 text-xs text-faint">
                      By submitting you agree to our privacy policy. We never share your details.
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Office details */}
          <motion.aside {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }} className="lg:col-span-2">
            <div className="overflow-hidden rounded-3xl border border-[rgba(155,27,48,0.1)] bg-surface shadow-sm">
              <div className="h-56 w-full md:h-64">
                <PropertyMap lat={-33.8688} lng={151.2093} />
              </div>
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-bold text-ink">Sydney Head Office</h3>
                <address className="mt-3 space-y-3 text-sm not-italic leading-relaxed text-muted">
                  <p className="flex items-start gap-2.5">
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth={1.8} className="mt-0.5 h-4.5 w-4.5 shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    Level 8, 300 George Street,<br />Sydney NSW 2000
                  </p>
                  <p className="flex items-center gap-2.5">
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth={1.8} className="h-4.5 w-4.5 shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.273-3.973-6.869-6.87l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    <a href="tel:0470593442" className="transition-colors hover:text-primary">0470 593 442</a>
                  </p>
                  <p className="flex items-center gap-2.5">
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth={1.8} className="h-4.5 w-4.5 shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    <a href="mailto:info@cherryhomz.com.au" className="transition-colors hover:text-primary">info@cherryhomz.com.au</a>
                  </p>
                </address>

                <div className="mt-6 border-t border-line-accent pt-5">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-ink/60">Opening Hours</h4>
                  <dl className="mt-3 space-y-1.5 text-sm text-muted">
                    <div className="flex justify-between"><dt>Monday – Friday</dt><dd className="font-semibold">8:30 AM – 6:00 PM</dd></div>
                    <div className="flex justify-between"><dt>Saturday</dt><dd className="font-semibold">9:00 AM – 4:00 PM</dd></div>
                    <div className="flex justify-between"><dt>Sunday</dt><dd className="font-semibold">By appointment</dd></div>
                  </dl>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <section className="bg-accent-soft py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-6 md:px-12">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="mb-10 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">FAQ</p>
            <h2 className="mt-3 text-3xl font-bold text-ink md:text-4xl">Questions We Hear Every Week</h2>
          </motion.div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => {
              const open = openFaq === i;
              return (
                <motion.div
                  key={faq.q}
                  {...fadeUp}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="overflow-hidden rounded-2xl border border-line-accent bg-card"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5"
                  >
                    <span className="text-sm font-bold text-ink md:text-base">{faq.q}</span>
                    <motion.span
                      animate={{ rotate: open ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-soft text-lg font-bold text-primary"
                      aria-hidden
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <p className="px-5 pb-5 text-sm leading-relaxed text-muted md:px-6 md:text-base">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
