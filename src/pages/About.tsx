import { motion } from 'framer-motion';
import { Shield, Eye, MessageSquare, Award } from 'lucide-react';
import { Seo } from '@/components/layout/Seo';
import { Reveal } from '@/components/ui/Reveal';
import { company } from '@/data/company';

const philosophy = [
  { title: 'Reliability', desc: 'Consistent freight coordination from dispatch through delivery.', icon: Shield },
  { title: 'Visibility', desc: 'Clear shipment milestones so stakeholders stay informed.', icon: Eye },
  { title: 'Communication', desc: 'Direct coordination between shippers, carriers and logistics teams.', icon: MessageSquare },
  { title: 'Accountability', desc: 'Professional ownership of the freight journey from start to finish.', icon: Award },
];

export function About() {
  return (
    <>
      <Seo
        title="About | Best Track Logistics Corporation"
        description="A growing North American logistics operation focused on practical freight transportation and coordination across the USA and Canada."
        path="/about"
      />
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 60% 40% at 70% 20%, rgba(0,102,255,0.06), transparent 70%)',
        }} />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div className="section-label"><span>ABOUT</span></div>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-cloud sm:text-5xl lg:text-6xl">
              A MORE CONNECTED WAY TO <span className="accent-text">MOVE FREIGHT.</span>
            </h1>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-24 px-5 pb-24 lg:px-8">
        {/* Company Overview */}
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <div className="section-label"><span>COMPANY OVERVIEW</span></div>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                Best Track Logistics Corporation is a growing North American logistics
                operation focused on practical freight transportation and coordination.
                We connect manufacturers, shippers and carriers across the United States
                and Canada — from plant-to-port drayage to cross-border freight and
                intermodal delivery support.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted">
                Rather than pretending to be a massive global conglomerate, we focus on
                what matters: responsive coordination, clear shipment visibility, and
                dependable freight movement across the North American lanes we know well.
              </p>
            </div>
            <div className="glass rounded-2xl p-6 lg:p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted/70">Headquarters</p>
              <p className="mt-2 text-sm font-medium text-cloud">{company.fullAddress}</p>
              <div className="mt-4 border-t border-white/[0.06] pt-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted/70">Coverage Area</p>
                <p className="mt-2 text-sm font-medium text-cloud">{company.coverageLabel}</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* North American Focus */}
        <Reveal>
          <div className="rounded-2xl border border-white/[0.06] bg-ink-800/40 p-8 lg:p-12">
            <div className="section-label"><span>NORTH AMERICAN FOCUS</span></div>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-cloud sm:text-3xl">
              Operations designed around <span className="accent-text">USA & Canada.</span>
            </h2>
            <p className="mt-4 max-w-2xl text-base text-muted">
              Our network is built around the freight corridors that connect manufacturers
              and shippers across the United States and Canada. From New York to Toronto,
              Chicago to Windsor, and ports to inland destinations — we coordinate freight
              movement where North American commerce happens.
            </p>
          </div>
        </Reveal>

        {/* Registration & Compliance */}
        <Reveal>
          <div>
            <div className="section-label"><span>REGISTRATION & COMPLIANCE</span></div>
            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              <div className="glass rounded-2xl p-6 lg:col-span-2">
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-accent-cyan" />
                  <h3 className="text-lg font-semibold text-cloud">Regulatory Information</h3>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-white/[0.06] bg-ink-800/50 p-4">
                    <p className="text-xs uppercase tracking-wider text-muted/60">US DOT</p>
                    <p className="mt-1 font-mono text-2xl font-bold text-cloud">{company.dotNumber}</p>
                  </div>
                  <div className="rounded-xl border border-white/[0.06] bg-ink-800/50 p-4">
                    <p className="text-xs uppercase tracking-wider text-muted/60">MC/MX</p>
                    <p className="mt-1 font-mono text-2xl font-bold text-cloud">{company.mcNumber}</p>
                  </div>
                  <div className="rounded-xl border border-white/[0.06] bg-ink-800/50 p-4 sm:col-span-2">
                    <p className="text-xs uppercase tracking-wider text-muted/60">Operating Region</p>
                    <p className="mt-1 text-lg font-medium text-cloud">{company.coverageLabel}</p>
                  </div>
                </div>
                <p className="mt-4 text-xs text-muted/50">
                  Regulatory information should be independently verified through the
                  appropriate transportation authorities.
                </p>
              </div>
              <div className="glass rounded-2xl p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted/70">Contact Officer</p>
                <p className="mt-2 text-lg font-semibold text-cloud">{company.contactOfficer}</p>
                <a href={company.phoneHref} className="mt-4 block text-sm text-accent-cyan hover:text-accent-cyan/80">
                  {company.phone}
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Operating Philosophy */}
        <Reveal>
          <div>
            <div className="section-label"><span>OPERATING PHILOSOPHY</span></div>
            <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
              {philosophy.map((p, i) => {
                const Icon = p.icon;
                return (
                  <motion.div
                    key={p.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="bg-ink-800/60 p-6 transition-colors hover:bg-ink-700/60"
                  >
                    <Icon className="h-6 w-6 text-accent-cyan" />
                    <h3 className="mt-4 text-base font-semibold text-cloud">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </>
  );
}
