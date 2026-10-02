import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, ArrowRight } from 'lucide-react';
import { company } from '@/data/company';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/quote', label: 'Quote' },
  { to: '/track', label: 'Track Shipment' },
  { to: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          scrolled
            ? 'glass-strong border-b border-white/[0.06] py-3'
            : 'bg-transparent py-5',
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link to="/" className="group flex flex-col" aria-label="Best Track Logistics home">
            <span className="text-base font-bold leading-none tracking-tight text-cloud">
              BEST TRACK
            </span>
            <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
              {company.tagline}
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'relative px-4 py-2 text-sm font-medium transition-colors duration-200',
                    isActive ? 'text-accent-cyan' : 'text-cloud/70 hover:text-cloud',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-accent-cyan to-accent-blue"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={company.phoneHref}
              className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-cloud"
            >
              <Phone className="h-3.5 w-3.5" />
              {company.phone}
            </a>
            <Link to="/quote" className="btn-primary group">
              Get a Freight Quote
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <button
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-cloud lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div className="absolute inset-0 bg-ink-900/95 backdrop-blur-xl" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col border-l border-white/10 bg-ink-800 p-6"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold tracking-tight text-cloud">BEST TRACK</span>
                <button
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 text-cloud"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-10 flex flex-col gap-1">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center justify-between rounded-xl px-4 py-4 text-base font-medium transition-colors',
                          isActive
                            ? 'bg-accent-cyan/10 text-accent-cyan'
                            : 'text-cloud/80 hover:bg-white/5 hover:text-cloud',
                        )
                      }
                    >
                      {item.label}
                      <ArrowRight className="h-4 w-4 opacity-40" />
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto space-y-4">
                <a
                  href={company.phoneHref}
                  className="flex items-center gap-3 text-sm text-muted"
                >
                  <Phone className="h-4 w-4 text-accent-cyan" />
                  {company.phone}
                </a>
                <Link to="/quote" className="btn-primary w-full">
                  Get a Freight Quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
