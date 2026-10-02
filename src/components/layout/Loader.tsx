import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Loader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDone(true), 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-900"
        >
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col items-center">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-2xl font-bold tracking-tight text-cloud"
              >
                BEST TRACK
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-1 text-[10px] font-medium uppercase tracking-[0.3em] text-muted"
              >
                Logistics Corporation
              </motion.span>
            </div>
            <div className="relative h-px w-48 overflow-hidden bg-white/10">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                className="absolute inset-y-0 w-full bg-gradient-to-r from-transparent via-accent-cyan to-transparent"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
