import type { QuoteInput } from '@/lib/quoteCalculator';

interface StepProps {
  input: QuoteInput;
  update: (field: keyof QuoteInput, value: string | number) => void;
  errors: Record<string, string>;
}

export function ShipmentStep({ input, update, errors }: StepProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <Field label="Pickup Location / Port" error={errors.pickupLocation}>
        <input
          type="text"
          value={input.pickupLocation}
          onChange={(e) => update('pickupLocation', e.target.value)}
          placeholder="e.g. New York, NY or Port of Newark"
          className="input-field"
          aria-label="Pickup location"
        />
      </Field>

      <Field label="Delivery ZIP / Location" error={errors.deliveryLocation}>
        <input
          type="text"
          value={input.deliveryLocation}
          onChange={(e) => update('deliveryLocation', e.target.value)}
          placeholder="e.g. Toronto, ON or 10001"
          className="input-field"
          aria-label="Delivery location"
        />
      </Field>

      <Field label="Origin Country">
        <select
          value={input.originCountry}
          onChange={(e) => update('originCountry', e.target.value)}
          className="input-field"
          aria-label="Origin country"
        >
          <option value="USA">United States</option>
          <option value="Canada">Canada</option>
        </select>
      </Field>

      <Field label="Destination Country">
        <select
          value={input.destinationCountry}
          onChange={(e) => update('destinationCountry', e.target.value)}
          className="input-field"
          aria-label="Destination country"
        >
          <option value="Canada">Canada</option>
          <option value="USA">United States</option>
        </select>
      </Field>
    </div>
  );
}

export function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-cloud/90">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}
