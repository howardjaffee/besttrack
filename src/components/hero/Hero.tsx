import { Suspense, lazy, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Search, Shield } from 'lucide-react';
import { company } from '@/data/company';

const LogisticsGlobe = lazy(() =>
  import('./LogisticsGlobe').then((m) => ({ default: m.LogisticsGlobe })),
);
const NetworkFallback = lazy(() =>
  import('./NetworkFallback').then((m) => ({ default: m.NetworkFallback })),
);

const floatCards = [
  { label: 'NORTH AMERICAN NETWORK', pos: 'top-[12%] left-[4%]', delay: 0.6 },
  { label: 'CROSS-BORDER', pos: 'top-[20%] right-[6%]', delay: 0.8 },
  { label: 'PORT → DESTINATION', pos: 'bottom-[22%] left-[6%]', delay: 1.0 },
  { label: 'REAL-TIME COORDINATION', pos: 'bottom-[14%] right-[5%]', delay: 1.2 },
];

function useWebGLSupport() {
  const [supported, setSupported] = useState(true);
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setSupported(!!gl);
    } catch {
      setSupported(false);
    }
  }, []);
  return supported;
}

export function Hero() {
  const webglSupported = useWebGLSupport();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const use3D = webglSupported && !isMobile;

  return (
    <section className="relative min-h-[760px] overflow-hidden lg:min-h-[90vh]">
      {/* Background layers */}
      <div className="absolute inset-0 bg-ink-900" />
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 80% 60% at 70% 40%, rgba(0,242,254,0.08), transparent 70%)',
      }} />
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 60% 50% at 20% 80%, rgba(0,102,255,0.06), transparent 70%)',
      }} />
      {/* Vignette */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 100% 80% at 50% 50%, transparent 50%, rgba(11,15,25,0.6) 100%)',
      }} />

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-accent-cyan/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex min-h-[760px] max-w-7xl flex-col justify-center px-5 pt-28 pb-16 lg:min-h-[90vh] lg:px-8 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          {/* Left: content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="eyebrow flex items-center gap-3"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan animate-pulse" />
              North American Freight Network
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-cloud sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              MOVE FREIGHT
              <br />
              WITHOUT THE
              <br />
              <span className="accent-text text-glow">GUESSWORK.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 max-w-lg text-base leading-relaxed text-muted lg:text-lg"
            >
              Best Track Logistics coordinates dependable freight movement across the USA
              and Canada — from manufacturer pickup and port drayage to cross-border
              transport and final delivery.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Link to="/quote" className="btn-primary group">
                Get an Instant Quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/track" className="btn-secondary group">
                <Search className="h-4 w-4 text-accent-cyan" />
                Track a Shipment
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-muted"
            >
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-accent-cyan/60" />
                US DOT {company.dotNumber}
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-accent-cyan/60" />
                {company.mcNumber}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-accent-cyan" />
                {company.coverageLabel}
              </span>
            </motion.div>
          </div>

          {/* Right: 3D / fallback visualization */}
          <div className="relative aspect-square w-full max-w-xl mx-auto lg:max-w-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative h-full w-full"
            >
              <Suspense fallback={<NetworkFallback />}>
                {use3D ? <LogisticsGlobe /> : <NetworkFallback />}
              </Suspense>
            </motion.div>

            {/* Floating data cards */}
            {floatCards.map((card) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: card.delay }}
                className={`absolute ${card.pos} hidden lg:block`}
              >
                <div className="glass rounded-xl px-3 py-2 animate-float-slow">
                  <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-cloud/80">
                    {card.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-900 to-transparent" />
    </section>
  );
}
