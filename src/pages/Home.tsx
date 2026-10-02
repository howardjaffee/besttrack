import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquare, Map, Eye, Headset, ArrowRight, Search, Phone } from 'lucide-react';
import { Hero } from '@/components/hero/Hero';
import { StatsTicker } from '@/components/logistics/StatsTicker';
import { ServiceCard } from '@/components/logistics/ServiceCard';
import { RouteTimeline } from '@/components/logistics/RouteTimeline';
import { Reveal } from '@/components/ui/Reveal';
import { Seo } from '@/components/layout/Seo';
import { services, pillars } from '@/data/services';
import { company } from '@/data/company';

const pillarIcons = [MessageSquare, Map, Eye, Headset];

export function Home() {
  return (
    <>
      <Seo
        title="Best Track Logistics Corporation | North American Freight & Logistics"
        description="Best Track Logistics provides professional freight transportation and logistics coordination across the USA and Canada, including plant-to-port drayage, cross-border freight and intermodal delivery support."
        path="/"
      />
      <Hero />

      {/* Trust / Regulatory Strip */}
      <section className="border-b border-white/[0.04] bg-ink-900">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-5 py-5 lg:px-8">
          <span className="text-xs uppercase tracking-[0.2em] text-muted/50">Registered Motor Carrier</span>
          <span className="text-xs font-mono text-muted">US DOT {company.dotNumber}</span>
          <span className="hidden h-3 w-px bg-white/10 sm:block" />
          <span className="text-xs font-mono text-muted">{company.mcNumber}</span>
          <span className="hidden h-3 w-px bg-white/10 sm:block" />
          <span className="text-xs uppercase tracking-[0.15em] text-accent-cyan/70">USA + Canada</span>
        </div>
      </section>

      <StatsTicker />

      {/* Services Section */}
      <section className="relative py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div className="max-w-2xl">
              <div className="section-label">
                <span>02 / SERVICES</span>
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-cloud sm:text-4xl lg:text-5xl">
                FREIGHT MOVEMENT,
                <br />
                WITHOUT THE <span className="accent-text">COMPLEXITY.</span>
              </h2>
              <p className="mt-4 text-base text-muted lg:text-lg">
                Focused logistics capabilities for manufacturers, shippers and businesses
                moving freight across North America.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Logistics Network Visualization */}
      <section className="relative border-y border-white/[0.04] bg-ink-800/40 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div className="mb-16 max-w-2xl">
              <div className="section-label">
                <span>03 / NETWORK</span>
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-cloud sm:text-4xl lg:text-5xl">
                ORIGIN TO <span className="accent-text">DESTINATION.</span>
              </h2>
              <p className="mt-4 text-base text-muted lg:text-lg">
                Every shipment moves through a coordinated freight journey — from
                manufacturer pickup through cross-border transit to final delivery.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <RouteTimeline />
          </Reveal>
        </div>
      </section>

      {/* Why Best Track */}
      <section className="relative py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div className="max-w-2xl">
              <div className="section-label">
                <span>04 / WHY BEST TRACK</span>
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-cloud sm:text-4xl lg:text-5xl">
                BUILT AROUND
                <br />
                <span className="accent-text">VISIBILITY & CONTROL.</span>
              </h2>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar, i) => {
              const Icon = pillarIcons[i] ?? MessageSquare;
              return (
                <motion.div
                  key={pillar.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative bg-ink-800/60 p-8 transition-colors duration-300 hover:bg-ink-700/60"
                >
                  <span className="font-mono text-xs text-accent-cyan/40">{pillar.number}</span>
                  <Icon className="mt-4 h-7 w-7 text-accent-cyan" />
                  <h3 className="mt-4 text-lg font-semibold text-cloud">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{pillar.desc}</p>
                  <motion.div
                    className="mt-6 h-px bg-gradient-to-r from-accent-cyan to-transparent"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.1 + 0.3 }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Shipment Visibility Preview */}
      <section className="relative border-y border-white/[0.04] bg-ink-800/40 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="section-label">
                <span>05 / VISIBILITY</span>
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-cloud sm:text-4xl lg:text-5xl">
                TRACK EVERY <span className="accent-text">MILESTONE.</span>
              </h2>
              <p className="mt-4 text-base text-muted lg:text-lg">
                Clear shipment milestones from dispatch through delivery. Enter a tracking
                number and follow your freight across the North American network.
              </p>
              <Link to="/track" className="btn-secondary mt-8 group">
                <Search className="h-4 w-4 text-accent-cyan" />
                Try Demo Tracking
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="glass rounded-2xl p-6 lg:p-8">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-accent-cyan">BTL-4200308</span>
                  <span className="rounded-full border border-accent-cyan/30 bg-accent-cyan/10 px-3 py-1 text-xs font-medium text-accent-cyan">
                    In Transit
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted/60">Origin</p>
                    <p className="font-medium text-cloud">New York, NY</p>
                  </div>
                  <div className="flex-1 mx-4 h-px bg-gradient-to-r from-accent-cyan to-accent-blue" />
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-wider text-muted/60">Destination</p>
                    <p className="font-medium text-cloud">Toronto, ON</p>
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  {['Dispatched', 'Port / Terminal Pickup'].map((label) => (
                    <div key={label} className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-accent-cyan" />
                      <span className="text-sm text-muted">{label}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-accent-cyan ring-4 ring-accent-cyan/20 animate-pulse" />
                    <span className="text-sm font-medium text-cloud">Cross-Border Transit</span>
                  </div>
                  {['Destination Arrival', 'Delivered'].map((label) => (
                    <div key={label} className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full border border-muted/30" />
                      <span className="text-sm text-muted/50">{label}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-xs text-muted/50">Demo Tracking Record</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Quote CTA */}
      <section className="relative py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-ink-800 to-ink-700 p-10 lg:p-16">
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-20" style={{
                background: 'radial-gradient(circle, rgba(0,242,254,0.4), transparent 70%)',
              }} />
              <div className="relative max-w-2xl">
                <div className="section-label">
                  <span>06 / QUOTE</span>
                </div>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-cloud sm:text-4xl lg:text-5xl">
                  GET A TRANSPARENT <span className="accent-text">FREIGHT ESTIMATE.</span>
                </h2>
                <p className="mt-4 text-base text-muted lg:text-lg">
                  Answer a few questions about your shipment and receive an estimated
                  freight range in minutes. No commitment required.
                </p>
                <Link to="/quote" className="btn-primary mt-8 group">
                  Start a Quote
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div className="grid items-center gap-8 rounded-3xl border border-white/[0.06] bg-ink-800/50 p-10 lg:grid-cols-[2fr_1fr] lg:p-14">
              <div>
                <div className="section-label">
                  <span>07 / CONTACT</span>
                </div>
                <h2 className="mt-4 text-2xl font-bold tracking-tight text-cloud sm:text-3xl lg:text-4xl">
                  LET'S MOVE YOUR <span className="accent-text">NEXT SHIPMENT.</span>
                </h2>
                <p className="mt-3 text-base text-muted">
                  Speak with our team about your freight coordination needs.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link to="/contact" className="btn-primary group">
                  Send Inquiry
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <a href={company.phoneHref} className="btn-secondary">
                  <Phone className="h-4 w-4 text-accent-cyan" />
                  {company.phone}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
