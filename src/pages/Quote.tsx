import { Seo } from '@/components/layout/Seo';
import { Reveal } from '@/components/ui/Reveal';
import { QuoteWizard } from '@/components/quote/QuoteWizard';

export function Quote() {
  return (
    <>
      <Seo
        title="Get a Freight Quote | Best Track Logistics Corporation"
        description="Get a transparent estimated freight range for your shipment across the USA and Canada. Answer a few questions and receive an estimate in minutes."
        path="/quote"
      />
      <section className="relative overflow-hidden pt-32 pb-12 lg:pt-40">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 50% 40% at 50% 0%, rgba(0,242,254,0.06), transparent 70%)',
        }} />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div className="section-label"><span>QUOTE</span></div>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-cloud sm:text-5xl lg:text-6xl">
              GET A FREIGHT <span className="accent-text">ESTIMATE.</span>
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted lg:text-lg">
              Answer four quick steps to receive an estimated freight range. This is an
              estimate, not a binding quote.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 pb-24 lg:px-8">
        <div className="rounded-3xl border border-white/[0.06] bg-ink-800/40 p-6 lg:p-10">
          <QuoteWizard />
        </div>
      </section>
    </>
  );
}
