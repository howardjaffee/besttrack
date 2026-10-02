import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, AlertCircle, MapPin, Clock, Package, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Seo } from '@/components/layout/Seo';
import { Reveal } from '@/components/ui/Reveal';
import { ShipmentTimeline } from '@/components/logistics/ShipmentTimeline';
import { findShipment, type TrackingRecord } from '@/data/tracking';

export function Tracking() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<TrackingRecord | null | 'not_found'>(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      const record = findShipment(query);
      setResult(record || 'not_found');
      setLoading(false);
    }, 800);
  };

  return (
    <>
      <Seo
        title="Track Your Shipment | Best Track Logistics Corporation"
        description="Enter your tracking number to follow your freight across the North American network with clear shipment milestones."
        path="/track"
      />
      <section className="relative overflow-hidden pt-32 pb-12 lg:pt-40">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 50% 40% at 50% 0%, rgba(0,242,254,0.06), transparent 70%)',
        }} />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div className="section-label"><span>TRACKING</span></div>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-cloud sm:text-5xl lg:text-6xl">
              TRACK YOUR <span className="accent-text">SHIPMENT.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <form onSubmit={handleTrack} className="mt-8 max-w-2xl">
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted/50" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter tracking number (e.g. BTL-4200308)"
                    className="input-field pl-12"
                    aria-label="Tracking number"
                  />
                </div>
                <button type="submit" className="btn-primary group whitespace-nowrap">
                  Track Shipment
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
              <p className="mt-3 text-xs text-muted/50">
                Try the demo: <span className="font-mono text-accent-cyan/70">BTL-4200308</span>
              </p>
            </form>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-24 lg:px-8">
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center py-20"
            >
              <div className="flex items-center gap-3 text-muted">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-accent-cyan border-t-transparent" />
                Searching shipment records...
              </div>
            </motion.div>
          )}

          {!loading && result && result !== 'not_found' && (
            <motion.div
              key="found"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {result.isDemo && (
                <div className="mb-6 flex items-center gap-2 rounded-xl border border-accent-cyan/20 bg-accent-cyan/[0.05] px-4 py-3">
                  <Package className="h-4 w-4 text-accent-cyan" />
                  <span className="text-xs font-medium text-accent-cyan/80">Demo Tracking Record</span>
                </div>
              )}

              <div className="rounded-2xl border border-white/[0.06] bg-ink-800/40 p-6 lg:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted/60">Tracking Number</p>
                    <p className="mt-1 font-mono text-xl font-bold text-cloud">{result.trackingNumber}</p>
                  </div>
                  <span className="rounded-full border border-accent-cyan/30 bg-accent-cyan/10 px-4 py-1.5 text-sm font-medium text-accent-cyan">
                    {result.status}
                  </span>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <InfoItem icon={MapPin} label="Origin" value={result.origin} />
                  <InfoItem icon={MapPin} label="Destination" value={result.destination} />
                  <InfoItem icon={Clock} label="Est. Delivery" value={result.estimatedDelivery} />
                  <InfoItem icon={Package} label="Service" value={result.service} />
                </div>

                <div className="mt-8 border-t border-white/[0.06] pt-8">
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-cloud">Shipment Milestones</h3>
                    <span className="text-xs text-muted/50">Last update: {result.lastUpdate}</span>
                  </div>
                  <ShipmentTimeline milestones={result.milestones} />
                </div>
              </div>
            </motion.div>
          )}

          {!loading && result === 'not_found' && (
            <motion.div
              key="not-found"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl border border-white/[0.06] bg-ink-800/40 p-10 text-center"
            >
              <AlertCircle className="mx-auto h-10 w-10 text-muted/40" />
              <h3 className="mt-4 text-xl font-semibold text-cloud">Shipment Not Found</h3>
              <p className="mt-2 text-sm text-muted">
                We couldn't locate a shipment matching that tracking number. Check the
                number and try again.
              </p>
              <p className="mt-4 text-xs text-muted/50">
                Try demo number: <span className="font-mono text-accent-cyan/70">BTL-4200308</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {!loading && !result && (
          <div className="rounded-2xl border border-dashed border-white/[0.06] bg-ink-800/20 p-12 text-center">
            <Search className="mx-auto h-8 w-8 text-muted/30" />
            <p className="mt-4 text-sm text-muted">
              Enter a tracking number above to view shipment status.
            </p>
            <Link to="/quote" className="mt-6 inline-block text-sm text-accent-cyan hover:text-accent-cyan/80">
              Need to ship? Get a quote →
            </Link>
          </div>
        )}
      </section>
    </>
  );
}

function InfoItem({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-ink-800/50 p-4">
      <div className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-accent-cyan/60" />
        <span className="text-xs uppercase tracking-wider text-muted/60">{label}</span>
      </div>
      <p className="mt-1.5 text-sm font-medium text-cloud">{value}</p>
    </div>
  );
}
