export interface TrackingMilestone {
  id: string;
  label: string;
  sublabel: string;
  status: 'completed' | 'current' | 'upcoming';
  timestamp: string;
  location: string;
}

export interface TrackingRecord {
  trackingNumber: string;
  origin: string;
  destination: string;
  status: string;
  estimatedDelivery: string;
  lastUpdate: string;
  service: string;
  milestones: TrackingMilestone[];
  isDemo: boolean;
}

export const demoTrackingRecord: TrackingRecord = {
  trackingNumber: 'BTL-4200308',
  origin: 'New York, NY',
  destination: 'Toronto, ON',
  status: 'In Transit',
  estimatedDelivery: 'Oct 04 – Oct 05, 2026',
  lastUpdate: 'Oct 02, 2026 — 14:30 EST',
  service: 'Cross-Border Freight Transport',
  isDemo: true,
  milestones: [
    {
      id: 'dispatched',
      label: 'Dispatched',
      sublabel: 'Shipment registered and carrier assigned',
      status: 'completed',
      timestamp: 'Oct 01, 2026 — 08:00 EST',
      location: 'New York, NY',
    },
    {
      id: 'port-pickup',
      label: 'Port / Terminal Pickup',
      sublabel: 'Freight collected at origin facility',
      status: 'completed',
      timestamp: 'Oct 01, 2026 — 11:15 EST',
      location: 'Newark Terminal, NJ',
    },
    {
      id: 'cross-border',
      label: 'Cross-Border Transit',
      sublabel: 'Shipment moving through USA–Canada corridor',
      status: 'current',
      timestamp: 'Oct 02, 2026 — 14:30 EST',
      location: 'Approaching Windsor, ON border',
    },
    {
      id: 'arrival',
      label: 'Destination Arrival',
      sublabel: 'Freight arrives at destination terminal',
      status: 'upcoming',
      timestamp: 'Est. Oct 03, 2026',
      location: 'Toronto, ON',
    },
    {
      id: 'delivered',
      label: 'Delivered',
      sublabel: 'Final delivery confirmed',
      status: 'upcoming',
      timestamp: 'Est. Oct 04 – Oct 05, 2026',
      location: 'Toronto, ON',
    },
  ],
};

export function findShipment(trackingNumber: string): TrackingRecord | null {
  const normalized = trackingNumber.trim().toUpperCase();
  if (normalized === demoTrackingRecord.trackingNumber) {
    return demoTrackingRecord;
  }
  return null;
}
