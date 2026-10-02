import { Link } from 'react-router-dom';
import { ArrowRight, Warehouse, Globe, Truck } from 'lucide-react';
import { Seo } from '@/components/layout/Seo';
import { Reveal } from '@/components/ui/Reveal';
import { services } from '@/data/services';

const iconMap = { warehouse: Warehouse, globe: Globe, truck: Truck };

export function Services() {
  return (
    <>
      <Seo
        title="Freight Services | Best Track Logistics Corporation"
        description="Manufacturer pickup, plant-to-port drayage, cross-border freight transport between USA and Canada, and intermodal support and delivery coordination."
        path="/services"
      />
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 60% 40% at 30% 20%, rgba(0,242,254,0.06), transparent 70%)',
        }} />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div className="section-label"><span>SERVICES</span></div>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-cloud sm:text-5xl lg:text-6xl">
              FOCUSED FREIGHT <span className="accent-text">CAPABILITIES.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-muted lg:text-lg">
              Three core logistics services designed for manufacturers and shippers moving
              freight across the United States and Canada.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-24 px-5 pb-24 lg:px-8">
        {services.map((service) => {
          const Icon = iconMap[service.icon as keyof typeof iconMap] ?? Truck;
          return (
            <section key={service.id} className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
              <Reveal>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-accent-cyan/60">{service.number}</span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                      <Icon className="h-5 w-5 text-accent-cyan" />
                    </div>
                  </div>
                  <h2 className="mt-5 text-2xl font-bold tracking-tight text-cloud sm:text-3xl">
                    {service.title}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-muted">{service.description}</p>
                  <div className="mt-6 rounded-xl border border-white/[0.06] bg-ink-800/50 p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-accent-cyan/70">Use Case</p>
                    <p className="mt-2 text-sm text-muted">{service.useCase}</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="rounded-2xl border border-white/[0.06] bg-ink-800/40 p-6 lg:p-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted/70 mb-6">Service Process</p>
                  <div className="space-y-0">
                    {service.process.map((step, j) => (
                      <div key={step.step} className="relative flex gap-4 pb-6 last:pb-0">
                        {j < service.process.length - 1 && (
                          <div className="absolute left-4 top-8 bottom-0 w-px bg-white/10" />
                        )}
                        <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent-cyan/30 bg-accent-cyan/5">
                          <span className="text-[10px] font-bold text-accent-cyan">{step.step}</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-cloud">{step.label}</p>
                          <p className="mt-0.5 text-xs text-muted">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </section>
          );
        })}

        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-ink-800 to-ink-700 p-10 text-center lg:p-16">
            <div className="pointer-events-none absolute inset-0 opacity-20" style={{
              background: 'radial-gradient(ellipse 50% 50% at 50% 0%, rgba(0,242,254,0.3), transparent 70%)',
            }} />
            <h2 className="relative text-2xl font-bold tracking-tight text-cloud sm:text-3xl lg:text-4xl">
              REQUEST FREIGHT <span className="accent-text">PRICING.</span>
            </h2>
            <p className="relative mt-4 text-base text-muted">
              Get a transparent estimate for your shipment in minutes.
            </p>
            <Link to="/quote" className="btn-primary relative mt-8 group">
              Get a Freight Quote
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </>
  );
}
