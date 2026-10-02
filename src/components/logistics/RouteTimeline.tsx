import { useState } from 'react';
import { motion } from 'framer-motion';
import { networkNodes } from '@/data/services';

export function RouteTimeline() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="relative">
      {/* Desktop horizontal */}
      <div className="hidden lg:block">
        <div className="relative flex justify-between">
          {/* Base line */}
          <div className="absolute left-0 right-0 top-8 h-px bg-white/10" />
          {/* Animated progress line */}
          <motion.div
            className="absolute left-0 top-8 h-px bg-gradient-to-r from-accent-cyan to-accent-blue"
            initial={{ width: '0%' }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
          {/* Traveling particle */}
          <motion.div
            className="absolute top-8 h-2 w-2 -translate-y-1/2 rounded-full bg-accent-cyan"
            style={{ boxShadow: '0 0 10px rgba(0,242,254,0.8)' }}
            initial={{ left: '0%' }}
            animate={{ left: ['0%', '100%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />

          {networkNodes.map((node, i) => (
            <div
              key={node.id}
              className="relative flex flex-col items-center pt-4"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              <motion.div
                className={`relative z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  active === i
                    ? 'border-accent-cyan bg-accent-cyan/20 scale-125'
                    : 'border-white/20 bg-ink-800'
                }`}
                style={active === i ? { boxShadow: '0 0 20px rgba(0,242,254,0.4)' } : {}}
              >
                <span className="text-[10px] font-bold text-cloud">{i + 1}</span>
              </motion.div>

              <span className="mt-4 text-xs font-semibold uppercase tracking-wider text-cloud/80">
                {node.label}
              </span>

              {active === i && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-16 w-48 rounded-xl border border-white/10 bg-ink-700 p-3 shadow-xl"
                >
                  <p className="text-xs leading-relaxed text-muted">{node.desc}</p>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile vertical */}
      <div className="lg:hidden">
        <div className="relative space-y-0">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10" />
          <motion.div
            className="absolute left-4 top-0 w-px bg-gradient-to-b from-accent-cyan to-accent-blue"
            initial={{ height: '0%' }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
          {networkNodes.map((node, i) => (
            <div key={node.id} className="relative flex gap-4 pb-8 last:pb-0">
              <div className="relative z-10 mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-accent-cyan/40 bg-ink-800">
                <span className="text-[10px] font-bold text-accent-cyan">{i + 1}</span>
              </div>
              <div className="pt-1">
                <span className="text-sm font-semibold text-cloud">{node.label}</span>
                <p className="mt-1 text-xs leading-relaxed text-muted">{node.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
