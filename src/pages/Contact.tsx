import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, User, CheckCircle2, ArrowRight } from 'lucide-react';
import { Seo } from '@/components/layout/Seo';
import { Reveal } from '@/components/ui/Reveal';
import { company } from '@/data/company';

export function Contact() {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    origin: '',
    destination: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = (field: string, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    setErrors((p) => ({ ...p, [field]: '' }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name) errs.name = 'Name is required';
    if (!form.email) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.message) errs.message = 'Message is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1200);
  };

  return (
    <>
      <Seo
        title="Contact | Best Track Logistics Corporation"
        description="Contact Best Track Logistics Corporation to coordinate your next freight shipment across the USA and Canada."
        path="/contact"
      />
      <section className="relative overflow-hidden pt-32 pb-12 lg:pt-40">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 50% 40% at 50% 0%, rgba(0,102,255,0.06), transparent 70%)',
        }} />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div className="section-label"><span>CONTACT</span></div>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-cloud sm:text-5xl lg:text-6xl">
              LET'S MOVE YOUR <span className="accent-text">NEXT SHIPMENT.</span>
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
          {/* Contact info */}
          <Reveal>
            <div className="space-y-6">
              <div className="glass rounded-2xl p-6 lg:p-8">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-cloud">Company</h3>
                <p className="mt-3 text-base font-medium text-cloud">{company.name}</p>
                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-cyan/60" />
                    <span className="text-muted">{company.fullAddress}</span>
                  </div>
                  <a href={company.phoneHref} className="flex items-center gap-3 text-muted transition-colors hover:text-cloud">
                    <Phone className="h-4 w-4 text-accent-cyan/60" />
                    {company.phone}
                  </a>
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-accent-cyan/60" />
                    <span className="text-muted">{company.contactOfficer} — Contact Officer</span>
                  </div>
                </div>
              </div>

              {/* Map visual */}
              <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-ink-800/40 p-0 h-64">
                <div className="absolute inset-0 grid-bg opacity-30" />
                <div className="absolute inset-0" style={{
                  background: 'radial-gradient(ellipse 40% 40% at 50% 50%, rgba(0,242,254,0.08), transparent 70%)',
                }} />
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
                  <path d="M 20 80 L 40 60 L 70 50 L 100 55 L 130 45 L 160 70 L 180 90" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                  <path d="M 30 100 L 50 85 L 80 75 L 110 80 L 140 70 L 170 95" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
                  <path d="M 25 120 L 55 110 L 85 100 L 115 105 L 145 95 L 175 115" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                  <circle cx="100" cy="100" r="40" fill="none" stroke="rgba(0,242,254,0.06)" strokeWidth="0.5" />
                  <circle cx="100" cy="100" r="25" fill="none" stroke="rgba(0,242,254,0.04)" strokeWidth="0.5" />
                  <motion.circle
                    cx="100" cy="100" r="3" fill="#00F2FE"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <circle cx="100" cy="100" r="6" fill="none" stroke="#00F2FE" strokeWidth="0.5" opacity="0.3" />
                </svg>
                <div className="absolute bottom-4 left-4">
                  <p className="text-xs font-medium text-cloud">New York, NY 10001</p>
                  <p className="text-[10px] text-muted/60">40.7128° N, 74.0060° W</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.2}>
            <div className="rounded-2xl border border-white/[0.06] bg-ink-800/40 p-6 lg:p-8">
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <CheckCircle2 className="h-12 w-12 text-accent-cyan" />
                    <h3 className="mt-4 text-xl font-semibold text-cloud">Inquiry Ready</h3>
                    <p className="mt-2 max-w-sm text-sm text-muted">
                      Your message has been captured in this demo interface. Connect the
                      form to your preferred email/CRM provider before production launch.
                    </p>
                    <button
                      onClick={() => {
                        setSuccess(false);
                        setForm({ name: '', company: '', email: '', phone: '', origin: '', destination: '', message: '' });
                      }}
                      className="btn-secondary mt-6"
                    >
                      Send Another
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={submit}
                    className="space-y-5"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Name" error={errors.name}>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => update('name', e.target.value)}
                          placeholder="Your name"
                          className={`input-field ${errors.name ? 'error' : ''}`}
                        />
                      </Field>
                      <Field label="Company">
                        <input
                          type="text"
                          value={form.company}
                          onChange={(e) => update('company', e.target.value)}
                          placeholder="Company name"
                          className="input-field"
                        />
                      </Field>
                      <Field label="Email" error={errors.email}>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => update('email', e.target.value)}
                          placeholder="you@company.com"
                          className={`input-field ${errors.email ? 'error' : ''}`}
                        />
                      </Field>
                      <Field label="Phone">
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => update('phone', e.target.value)}
                          placeholder="(555) 123-4567"
                          className="input-field"
                        />
                      </Field>
                      <Field label="Shipment Origin">
                        <input
                          type="text"
                          value={form.origin}
                          onChange={(e) => update('origin', e.target.value)}
                          placeholder="Pickup city or port"
                          className="input-field"
                        />
                      </Field>
                      <Field label="Shipment Destination">
                        <input
                          type="text"
                          value={form.destination}
                          onChange={(e) => update('destination', e.target.value)}
                          placeholder="Delivery city or ZIP"
                          className="input-field"
                        />
                      </Field>
                    </div>
                    <Field label="Message" error={errors.message}>
                      <textarea
                        rows={4}
                        value={form.message}
                        onChange={(e) => update('message', e.target.value)}
                        placeholder="Tell us about your freight coordination needs..."
                        className={`input-field resize-none ${errors.message ? 'error' : ''}`}
                      />
                    </Field>
                    <button type="submit" disabled={loading} className="btn-primary group w-full sm:w-auto">
                      {loading ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-ink-900 border-t-transparent" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Inquiry
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-cloud/90">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}
