import type { QuoteInput } from '@/lib/quoteCalculator';
import { Field } from './ShipmentStep';

interface StepProps {
  input: QuoteInput;
  update: (field: keyof QuoteInput, value: string | number) => void;
  errors: Record<string, string>;
}

const freightTypes = ['General Freight', 'Palletized Freight', 'Machinery', 'Commercial Goods', 'Other'];
const timings: { value: 'standard' | 'urgent'; label: string }[] = [
  { value: 'standard', label: 'Standard' },
  { value: 'urgent', label: 'Urgent' },
];

export function FreightStep({ input, update, errors }: StepProps) {
  return (
    <div className="space-y-5">
      <Field label="Freight Type">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {freightTypes.map((type) => (
            <button
              key={type}
              onClick={() => update('freightType', type)}
              className={`rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                input.freightType === type
                  ? 'border-accent-cyan/50 bg-accent-cyan/10 text-accent-cyan'
                  : 'border-white/10 bg-white/5 text-muted hover:border-white/20 hover:text-cloud'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Weight (lbs)" error={errors.weight}>
          <input
            type="number"
            min="0"
            value={input.weight || ''}
            onChange={(e) => update('weight', parseFloat(e.target.value) || 0)}
            placeholder="e.g. 5000"
            className="input-field"
            aria-label="Weight in pounds"
          />
        </Field>

        <Field label="Number of Pallets (Optional)">
          <input
            type="number"
            min="0"
            value={input.pallets || ''}
            onChange={(e) => update('pallets', parseInt(e.target.value) || 0)}
            placeholder="e.g. 6"
            className="input-field"
            aria-label="Number of pallets"
          />
        </Field>
      </div>

      <Field label="Pickup Timing">
        <div className="grid grid-cols-2 gap-2">
          {timings.map((t) => (
            <button
              key={t.value}
              onClick={() => update('pickupTiming', t.value)}
              className={`rounded-xl border px-4 py-3.5 text-sm font-medium transition-all ${
                input.pickupTiming === t.value
                  ? 'border-accent-cyan/50 bg-accent-cyan/10 text-accent-cyan'
                  : 'border-white/10 bg-white/5 text-muted hover:border-white/20 hover:text-cloud'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </Field>
    </div>
  );
}
