import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Phone } from 'lucide-react';
import { company } from '@/data/company';

const footerColumns = [
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Services', to: '/services' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Tools',
    links: [
      { label: 'Get a Quote', to: '/quote' },
      { label: 'Track Shipment', to: '/track' },
    ],
  },
  {
    title: 'Operations',
    links: [
      { label: 'USA', to: '/services' },
      { label: 'Canada', to: '/services' },
      { label: 'Cross-Border', to: '/services' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-ink-800">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.5fr]">
          <div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-cloud">BEST TRACK</span>
              <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
                {company.tagline}
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Reliable coordination. Clear visibility. North American freight movement.
            </p>
            <div className="mt-5 space-y-2 text-sm text-muted">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-cyan/70" />
                <span>{company.fullAddress}</span>
              </div>
              <a href={company.phoneHref} className="flex items-center gap-2 transition-colors hover:text-cloud">
                <Phone className="h-4 w-4 text-accent-cyan/70" />
                {company.phone}
              </a>
            </div>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-cloud/80">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted transition-colors hover:text-accent-cyan"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-cloud/80">
              Regulatory
            </h3>
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-wider text-muted">US DOT</span>
                <span className="font-mono text-sm text-cloud">{company.dotNumber}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-wider text-muted">MC/MX</span>
                <span className="font-mono text-sm text-cloud">{company.mcNumber}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-2xl border border-white/[0.06] bg-gradient-to-r from-ink-700 to-ink-800 p-8 lg:flex-row lg:items-center">
          <div>
            <p className="text-lg font-semibold text-cloud">Ready to move freight?</p>
            <p className="mt-1 text-sm text-muted">
              Get a transparent estimate in minutes — no commitment required.
            </p>
          </div>
          <Link to="/quote" className="btn-primary group shrink-0">
            Get a Freight Quote
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/[0.04] pt-8 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Best Track Logistics Corporation. All rights reserved.
          </p>
          <p className="text-xs text-muted/60">
            Regulatory information should be independently verified through appropriate transportation authorities.
          </p>
        </div>
      </div>
    </footer>
  );
}
