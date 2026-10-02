import { motion } from 'framer-motion';
import { CheckCircle, Circle, Loader2 } from 'lucide-react';
import type { TrackingMilestone } from '@/data/tracking';
import { cn } from '@/lib/utils';

export function ShipmentTimeline({ milestones }: { milestones: TrackingMilestone[] }) {
  const currentIndex = milestones.findIndex((m) => m.status === 'current');

  return (
    <>
      {/* Desktop horizontal timeline */}
      <div className="hidden md:block">
        <div className="relative flex justify-between">
          <div className="absolute left-0 right-0 top-5 h-0.5 bg-white/10" />
          <motion.div
            className="absolute left-0 top-5 h-0.5 bg-gradient-to-r from-accent-cyan to-accent-blue"
            initial={{ width: '0%' }}
            animate={{ width: `${(currentIndex / (milestones.length - 1)) * 100}%` }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
          />

          {milestones.map((m) => (
            <div key={m.id} className="relative flex flex-col items-center" style={{ width: `${100 / milestones.length}%` }}>
              <div
                className={cn(
                  'relative z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all',
                  m.status === 'completed' && 'border-accent-cyan bg-accent-cyan/10',
                  m.status === 'current' && 'border-accent-cyan bg-accent-cyan/20',
                  m.status === 'upcoming' && 'border-white/15 bg-ink-800',
                )}
                style={m.status === 'current' ? { boxShadow: '0 0 24px rgba(0,242,254,0.4)' } : {}}
              >
                {m.status === 'completed' && <CheckCircle className="h-5 w-5 text-accent-cyan" />}
                {m.status === 'current' && (
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Loader2 className="h-5 w-5 animate-spin text-accent-cyan" />
                  </motion.div>
                )}
                {m.status === 'upcoming' && <Circle className="h-5 w-5 text-muted/40" />}
              </div>

              {/* Pulsing ring for current */}
              {m.status === 'current' && (
                <motion.div
                  className="absolute top-0 h-11 w-11 rounded-full border-2 border-accent-cyan"
                  animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                />
              )}

              <div className="mt-4 text-center">
                <p className={cn(
                  'text-xs font-semibold uppercase tracking-wider',
                  m.status === 'upcoming' ? 'text-muted/60' : 'text-cloud',
                )}>
                  {m.label}
                </p>
                <p className="mt-1 text-xs text-muted/70">{m.location}</p>
                <p className="mt-0.5 text-[10px] text-muted/50">{m.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile vertical timeline */}
      <div className="md:hidden">
        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-white/10" />
          <motion.div
            className="absolute left-5 top-0 w-0.5 bg-gradient-to-b from-accent-cyan to-accent-blue"
            initial={{ height: '0%' }}
            animate={{ height: `${(currentIndex / (milestones.length - 1)) * 100}%` }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
          />

          <div className="space-y-6">
            {milestones.map((m) => (
              <div key={m.id} className="relative flex gap-4">
                <div
                  className={cn(
                    'relative z-10 mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2',
                    m.status === 'completed' && 'border-accent-cyan bg-accent-cyan/10',
                    m.status === 'current' && 'border-accent-cyan bg-accent-cyan/20',
                    m.status === 'upcoming' && 'border-white/15 bg-ink-800',
                  )}
                  style={m.status === 'current' ? { boxShadow: '0 0 20px rgba(0,242,254,0.3)' } : {}}
                >
                  {m.status === 'completed' && <CheckCircle className="h-5 w-5 text-accent-cyan" />}
                  {m.status === 'current' && <Loader2 className="h-5 w-5 animate-spin text-accent-cyan" />}
                  {m.status === 'upcoming' && <Circle className="h-5 w-5 text-muted/40" />}
                </div>
                <div className="pt-1.5">
                  <p className={cn(
                    'text-sm font-semibold',
                    m.status === 'upcoming' ? 'text-muted/60' : 'text-cloud',
                  )}>
                    {m.label}
                  </p>
                  <p className="mt-0.5 text-xs text-muted/70">{m.sublabel}</p>
                  <p className="mt-1 text-xs text-muted">{m.location} · {m.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
