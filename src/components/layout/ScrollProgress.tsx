import { motion } from 'framer-motion';
import { useScrollProgress } from '@/hooks/useScrollProgress';

export function ScrollProgress() {
  const progress = useScrollProgress();
  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[55] h-px origin-left bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-cyan"
      style={{ scaleX: progress }}
    />
  );
}
