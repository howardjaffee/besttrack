import type { QuoteInput } from '@/lib/quoteCalculator';
import { Field } from './ShipmentStep';

interface StepProps {
  input: QuoteInput;
  update: (field: keyof QuoteInput, value: string | number) => void;
  errors: Record<string, string>;
}

export function ContactStep({ input, update, errors }: StepProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <Field label="Full Name" error={errors.fullName}>
        <input
          type="text"
          value={input.fullName}
          onChange={(e) => update('fullName', e.target.value)}
          placeholder="John Smith"
          className="input-field"
          aria-label="Full name"
        />
      </Field>

      <Field label="Company">
        <input
          type="text"
          value={input.company}
          onChange={(e) => update('company', e.target.value)}
          placeholder="Company name"
          className="input-field"
          aria-label="Company name"
        />
      </Field>

      <Field label="Email" error={errors.email}>
        <input
          type="email"
          value={input.email}
          onChange={(e) => update('email', e.target.value)}
          placeholder="john@company.com"
          className="input-field"
          aria-label="Email address"
        />
      </Field>

      <Field label="Phone" error={errors.phone}>
        <input
          type="tel"
          value={input.phone}
          onChange={(e) => update('phone', e.target.value)}
          placeholder="(555) 123-4567"
          className="input-field"
          aria-label="Phone number"
        />
      </Field>
    </div>
  );
}
