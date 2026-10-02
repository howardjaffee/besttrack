export const company = {
  name: 'Best Track Logistics Corporation',
  shortName: 'Best Track',
  tagline: 'Logistics Corporation',
  phone: '(613) 403-0153',
  phoneHref: 'tel:+16134030153',
  contactOfficer: 'Ankit Thakur',
  address: {
    street: '130 W 35th St #31',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'United States',
  },
  fullAddress: '130 W 35th St #31, New York, NY 10001, United States',
  dotNumber: '4200308',
  mcNumber: 'MC-1620317',
  coverage: ['USA', 'Canada'],
  coverageLabel: 'USA + Canada',
  email: 'info@besttracklogistics.com',
};

export type Company = typeof company;
