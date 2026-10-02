import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, Loader2, Package, Truck, User, Calculator } from 'lucide-react';
import { calculateQuote, type QuoteInput, type QuoteResult } from '@/lib/quoteCalculator';
import { ShipmentStep } from './ShipmentStep';
import { FreightStep } from './FreightStep';
import { ContactStep } from './ContactStep';
import { QuoteResult as QuoteResultView } from './QuoteResult';

const steps = [
  { number: '01', label: 'Shipment', icon: Package },
  { number: '02', label: 'Freight', icon: Truck },
  { number: '03', label: 'Contact', icon: User },
  { number: '04', label: 'Estimate', icon: Calculator },
];

const initialInput: QuoteInput = {
  pickupLocation: '',
  deliveryLocation: '',
  originCountry: 'USA',
  destinationCountry: 'Canada',
  freightType: 'General Freight',
  weight: 0,
  pallets: 0,
  pickupTiming: 'standard',
  fullName: '',
  company: '',
  email: '',
  phone: '',
};

export function QuoteWizard() {
  const [step, setStep] = useState(0);
  const [input, setInput] = useState<QuoteInput>(initialInput);
  const [result, setResult] = useState<QuoteResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (field: keyof QuoteInput, value: string | number) => {
    setInput((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validateStep = (): boolean => {
    const errs: Record<string, string> = {};
    if (step === 0) {
      if (!input.pickupLocation) errs.pickupLocation = 'Pickup location is required';
      if (!input.deliveryLocation) errs.deliveryLocation = 'Delivery location is required';
    }
    if (step === 1) {
      if (!input.weight || input.weight <= 0) errs.weight = 'Enter a valid weight in lbs';
    }
    if (step === 2) {
      if (!input.fullName) errs.fullName = 'Name is required';
      if (!input.email) errs.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) errs.email = 'Enter a valid email';
      if (!input.phone) errs.phone = 'Phone is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => {
    if (!validateStep()) return;
    if (step === 2) {
      setLoading(true);
      setTimeout(() => {
        const res = calculateQuote(input);
        setResult(res);
        setLoading(false);
        setStep(3);
      }, 1200);
      return;
    }
    setStep((s) => Math.min(s + 1, 3));
  };

  const back = () => setStep((s) => Math.max(s - 1, 0));

  const reset = () => {
    setInput(initialInput);
    setResult(null);
    setStep(0);
    setErrors({});
  };

  return (
    <div>
      {/* Step indicator */}
      <div className="mb-12 flex items-center justify-between">
        {steps.map((s, i) => {
          const Icon = s.icon;
          const isActive = i === step;
          const isDone = i < step;
          return (
            <div key={s.number} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300 ${
                    isActive
                      ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan'
                      : isDone
                        ? 'border-accent-cyan/40 bg-accent-cyan/5 text-accent-cyan'
                        : 'border-white/10 bg-white/5 text-muted/50'
                  }`}
                  style={isActive ? { boxShadow: '0 0 20px rgba(0,242,254,0.2)' } : {}}
                >
                  {isDone ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                </div>
                <span className={`text-xs font-medium ${isActive ? 'text-cloud' : 'text-muted/60'}`}>
                  {s.number} · {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="mx-3 h-px flex-1 bg-white/10">
                  <motion.div
                    className="h-full bg-gradient-to-r from-accent-cyan to-accent-blue"
                    initial={{ width: '0%' }}
                    animate={{ width: i < step ? '100%' : '0%' }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {step === 0 && <ShipmentStep input={input} update={update} errors={errors} />}
          {step === 1 && <FreightStep input={input} update={update} errors={errors} />}
          {step === 2 && <ContactStep input={input} update={update} errors={errors} />}
          {step === 3 && result && <QuoteResultView result={result} onReset={reset} />}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      {step < 3 && (
        <div className="mt-10 flex items-center justify-between">
          <button
            onClick={back}
            disabled={step === 0 || loading}
            className="flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-cloud disabled:opacity-30 disabled:hover:text-muted"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <button
            onClick={next}
            disabled={loading}
            className="btn-primary group"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Calculating...
              </>
            ) : step === 2 ? (
              <>
                Get Estimate
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
