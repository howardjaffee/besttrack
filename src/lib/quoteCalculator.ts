export interface QuoteInput {
  pickupLocation: string;
  deliveryLocation: string;
  originCountry: string;
  destinationCountry: string;
  freightType: string;
  weight: number;
  pallets: number;
  pickupTiming: 'standard' | 'urgent';
  fullName: string;
  company: string;
  email: string;
  phone: string;
}

export interface QuoteResult {
  low: number;
  high: number;
  transitLow: number;
  transitHigh: number;
  breakdown: { label: string; amount: number }[];
  freightType: string;
  origin: string;
  destination: string;
  weight: number;
  isCrossBorder: boolean;
}

const BASE_FEE = 450;
const WEIGHT_RATE = 0.08;
const CROSS_BORDER_SURCHARGE = 250;
const URGENT_HANDLING = 175;
const PALLET_RATE = 25;

function distanceFactor(origin: string, destination: string): number {
  const o = origin.toLowerCase();
  const d = destination.toLowerCase();
  const crossBorder =
    (o.includes('canada') && !d.includes('canada')) ||
    (d.includes('canada') && !o.includes('canada')) ||
    (o.includes('on') && d.includes('ny')) ||
    (o.includes('ny') && d.includes('on'));
  const hash = (o + d).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const base = crossBorder ? 380 : 180;
  const variance = (hash % 200) + 40;
  return base + variance;
}

export function calculateQuote(input: QuoteInput): QuoteResult {
  const weightCost = input.weight * WEIGHT_RATE;
  const isCrossBorder =
    input.originCountry !== input.destinationCountry ||
    input.originCountry === 'cross-border';
  const crossBorderCost = isCrossBorder ? CROSS_BORDER_SURCHARGE : 0;
  const urgentCost = input.pickupTiming === 'urgent' ? URGENT_HANDLING : 0;
  const palletCost = (input.pallets || 0) * PALLET_RATE;
  const distCost = distanceFactor(
    `${input.pickupLocation} ${input.originCountry}`,
    `${input.deliveryLocation} ${input.destinationCountry}`,
  );

  const total =
    BASE_FEE + weightCost + crossBorderCost + urgentCost + palletCost + distCost;

  const low = Math.round((total * 0.92) / 10) * 10;
  const high = Math.round((total * 1.08) / 10) * 10;

  const transitBase = isCrossBorder ? 3 : 2;
  const transitLow = transitBase;
  const transitHigh = transitBase + 2;

  const breakdown = [
    { label: 'Base Fee', amount: BASE_FEE },
    { label: 'Weight Factor', amount: Math.round(weightCost) },
    ...(isCrossBorder ? [{ label: 'Cross-Border Surcharge', amount: CROSS_BORDER_SURCHARGE }] : []),
    ...(input.pickupTiming === 'urgent' ? [{ label: 'Urgent Handling', amount: URGENT_HANDLING }] : []),
    ...((input.pallets || 0) > 0 ? [{ label: 'Pallet Factor', amount: palletCost }] : []),
    { label: 'Distance Factor', amount: Math.round(distCost) },
  ];

  return {
    low,
    high,
    transitLow,
    transitHigh,
    breakdown,
    freightType: input.freightType,
    origin: `${input.pickupLocation}, ${input.originCountry}`,
    destination: `${input.deliveryLocation}, ${input.destinationCountry}`,
    weight: input.weight,
    isCrossBorder,
  };
}
