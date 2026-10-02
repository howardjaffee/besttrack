import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Compass } from 'lucide-react';
import { Seo } from '@/components/layout/Seo';

export function NotFound() {
  return (
    <>
      <Seo title="Route Not Found | Best Track Logistics Corporation" description="The page you're looking for doesn't exist." path="/404" />
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(0,242,254,0.04), transparent 70%)',
        }} />
        <div className="relative text-center px-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Compass className="mx-auto h-12 w-12 text-accent-cyan/60" />
            <p className="mt-6 font-mono text-sm text-accent-cyan/60">404 · OFF ROUTE</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-cloud sm:text-5xl lg:text-6xl">
              ROUTE <span className="accent-text">NOT FOUND</span>
            </h1>
            <p className="mt-4 max-w-md mx-auto text-base text-muted">
              The destination you're looking for doesn't exist on this network.
            </p>
            <Link to="/" className="btn-primary mt-8 group">
              Return Home
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
