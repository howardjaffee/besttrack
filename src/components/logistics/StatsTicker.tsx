import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { useCountUp } from '@/hooks/useCountUp';
import { stats } from '@/data/services';

export function StatsTicker() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className="relative border-y border-white/[0.04] bg-ink-800/50">
      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-8 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} index={i} start={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({
  stat,
  index,
  start,
}: {
  stat: { label: string; value: number; suffix: string; sub: string };
  index: number;
  start: boolean;
}) {
  const value = useCountUp(stat.value, 2000, start);

  return (
    <div
      className={`relative ${index !== stats.length - 1 ? 'sm:border-r sm:border-white/[0.06]' : ''}`}
    >
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-bold tracking-tight text-cloud lg:text-5xl">
          {value}
        </span>
        <span className="text-3xl font-bold accent-text lg:text-4xl">{stat.suffix}</span>
      </div>
      <p className="mt-2 text-sm font-semibold text-cloud">{stat.label}</p>
      <p className="mt-1 text-xs uppercase tracking-wider text-muted/70">{stat.sub}</p>
    </div>
  );
}
