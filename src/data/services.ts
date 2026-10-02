export interface Service {
  id: string;
  number: string;
  title: string;
  short: string;
  description: string;
  useCase: string;
  process: { step: string; label: string; desc: string }[];
  icon: string;
}

export const services: Service[] = [
  {
    id: 'drayage',
    number: '01',
    title: 'Manufacturer Pickup & Plant-to-Port Drayage',
    short:
      'Coordinate freight pickup directly from manufacturer facilities, warehouses and production locations and move cargo toward ports, terminals or designated delivery points.',
    description:
      'Coordinate freight pickup directly from manufacturer facilities, warehouses and production locations. Move cargo toward ports, terminals or designated delivery points with clear dispatch and milestone visibility from the first mile onward.',
    useCase:
      'Manufacturers and shippers needing reliable first-mile coordination from production facilities to port terminals or intermodal transfer points.',
    process: [
      { step: '01', label: 'Pickup', desc: 'Freight collected at manufacturer facility or warehouse' },
      { step: '02', label: 'Coordination', desc: 'Dispatch confirmed and route milestones established' },
      { step: '03', label: 'Transit', desc: 'Cargo moved toward port or designated terminal' },
      { step: '04', label: 'Delivery', desc: 'Freight delivered to terminal or transfer point' },
    ],
    icon: 'warehouse',
  },
  {
    id: 'cross-border',
    number: '02',
    title: 'Cross-Border Freight Transport',
    short:
      'Professional freight coordination for shipments moving between the United States and Canada, with visibility across critical North American lanes.',
    description:
      'Professional freight coordination for shipments moving between the United States and Canada. Maintain visibility across critical North American lanes with responsive coordination from origin to destination.',
    useCase:
      'Businesses shipping between the USA and Canada that need coordinated cross-border freight movement with clear milestone tracking.',
    process: [
      { step: '01', label: 'Pickup', desc: 'Freight collected at origin facility' },
      { step: '02', label: 'Coordination', desc: 'Cross-border lane and transit plan confirmed' },
      { step: '03', label: 'Transit', desc: 'Freight moved across USA–Canada corridor' },
      { step: '04', label: 'Delivery', desc: 'Shipment delivered to destination' },
    ],
    icon: 'globe',
  },
  {
    id: 'intermodal',
    number: '03',
    title: 'Intermodal Support & Delivery',
    short:
      'Connect port, terminal and inland transportation steps into a coordinated freight journey from origin to destination.',
    description:
      'Connect port, terminal and inland transportation steps into a coordinated freight journey. Bridge the gap between intermodal transfer points and final delivery with clear handoff visibility.',
    useCase:
      'Shippers needing coordination between port terminals, rail transfer and inland trucking to complete the last leg of the freight journey.',
    process: [
      { step: '01', label: 'Pickup', desc: 'Container received at port or terminal' },
      { step: '02', label: 'Coordination', desc: 'Intermodal handoff and inland route planned' },
      { step: '03', label: 'Transit', desc: 'Freight moved via rail and/or truck to inland point' },
      { step: '04', label: 'Delivery', desc: 'Final delivery to destination completed' },
    ],
    icon: 'truck',
  },
];

export const stats = [
  { label: 'On-Time Delivery', value: 98, suffix: '%', sub: 'Operational target' },
  { label: 'Active North American Lanes', value: 24, suffix: '+', sub: 'Illustrative network capacity' },
  { label: 'Freight Movement', value: 10, suffix: 'K+', sub: 'Annual shipment units' },
];

export const pillars = [
  {
    number: '01',
    title: 'Direct Coordination',
    desc: 'Clear communication between shipper, carrier and logistics stakeholders.',
    icon: 'message-square',
  },
  {
    number: '02',
    title: 'North American Focus',
    desc: 'Operations designed around USA and Canada freight movement.',
    icon: 'map',
  },
  {
    number: '03',
    title: 'Shipment Visibility',
    desc: 'Clear shipment milestones from dispatch through delivery.',
    icon: 'eye',
  },
  {
    number: '04',
    title: 'Responsive Support',
    desc: 'Professional coordination when freight schedules change.',
    icon: 'headset',
  },
];

export const networkNodes = [
  { id: 'manufacturer', label: 'Manufacturer', desc: 'Freight originates at production facility or warehouse.' },
  { id: 'pickup', label: 'Pickup', desc: 'Cargo dispatched and first-mile transit begins.' },
  { id: 'port', label: 'Port / Terminal', desc: 'Freight arrives at port or intermodal transfer point.' },
  { id: 'transit', label: 'Cross-Border Transit', desc: 'Shipment moves across USA–Canada corridor.' },
  { id: 'destination', label: 'Destination', desc: 'Final delivery completed at destination.' },
];
