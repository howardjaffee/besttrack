import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, RotateCcw } from 'lucide-react';
import type { QuoteResult } from '@/lib/quoteCalculator';

export function QuoteResult({ result, onReset }: { result: QuoteResult; onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3">
        <CheckCircle2 className="h-6 w-6 text-accent-cyan" />
        <h3 className="text-xl font-semibold text-cloud">Estimated Freight Range</h3>
      </div>

      <div className="rounded-2xl border border-accent-cyan/20 bg-gradient-to-br from-accent-cyan/[0.05] to-transparent p-8 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Estimated Range</p>
        <div className="mt-2 flex items-baseline justify-center gap-2">
          <span className="text-4xl font-bold text-cloud lg:text-5xl">
            ${result.low.toLocaleString()}
          </span>
          <span className="text-2xl text-muted">–</span>
          <span className="text-4xl font-bold accent-text lg:text-5xl">
            ${result.high.toLocaleString()}
          </span>
        </div>
        <p className="mt-3 text-sm text-muted">
          Estimated transit: {result.transitLow}–{result.transitHigh} business days
        </p>
        <p className="mt-4 text-xs text-muted/60">
          This is an estimate, not a binding freight quote.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <DetailRow label="Shipment Type" value={result.freightType} />
        <DetailRow label="Weight" value={`${result.weight.toLocaleString()} lbs`} />
        <DetailRow label="Origin" value={result.origin} />
        <DetailRow label="Destination" value={result.destination} />
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-ink-800/50 p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted/70 mb-3">Cost Breakdown</p>
        <div className="space-y-2">
          {result.breakdown.map((item) => (
            <div key={item.label} className="flex justify-between text-sm">
              <span className="text-muted">{item.label}</span>
              <span className="font-mono text-cloud">${item.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link to="/contact" className="btn-primary group flex-1">
          Request a Confirmed Quote
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
        <button onClick={onReset} className="btn-secondary">
          <RotateCcw className="h-4 w-4 text-accent-cyan" />
          New Quote
        </button>
      </div>
    </motion.div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-ink-800/40 p-4">
      <p className="text-xs uppercase tracking-wider text-muted/60">{label}</p>
      <p className="mt-1 text-sm font-medium text-cloud">{value}</p>
    </div>
  );
}
