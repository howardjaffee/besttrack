import { motion } from 'framer-motion';
import { ArrowRight, Warehouse, Globe, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Service } from '@/data/services';

const iconMap: Record<string, typeof Warehouse> = {
  warehouse: Warehouse,
  globe: Globe,
  truck: Truck,
};

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = iconMap[service.icon] ?? Truck;
  const delay = index * 0.15;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-ink-800/60 p-8 transition-all duration-300 hover:border-accent-cyan/30"
    >
      {/* Glow on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{
        background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,242,254,0.08), transparent 70%)',
      }} />

      {/* Animated network lines */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-20 transition-opacity duration-500 group-hover:opacity-40" preserveAspectRatio="none">
        <defs>
          <pattern id={`grid-${service.id}`} width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,242,254,0.1)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${service.id})`} />
      </svg>

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-wider text-accent-cyan/60">
            {service.number}
          </span>
          <motion.div
            whileHover={{ rotate: 0, scale: 1.1 }}
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5"
          >
            <Icon className="h-6 w-6 text-accent-cyan" />
          </motion.div>
        </div>

        <h3 className="mt-6 text-xl font-semibold leading-snug text-cloud">
          {service.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {service.short}
        </p>

        <Link
          to="/services"
          className="mt-6 flex items-center gap-2 text-sm font-medium text-accent-cyan opacity-0 transition-all duration-300 group-hover:opacity-100"
        >
          Learn more
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}
