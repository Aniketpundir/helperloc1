export const SITE_URL = 'https://helperloc.com';
export const BRAND_NAME = 'HelperLoc';
export const DEFAULT_IMAGE = `${SITE_URL}/helperloc-og.svg`;

export const contactPoint = {
  email: 'hello@helperloc.com',
  telephone: '+91-98765-43210',
  areaServed: 'IN',
};

export const serviceCatalog = [
  { slug: 'electrician', name: 'Electrician', minPrice: 299, keywords: ['electrical repair', 'wiring', 'switch repair', 'same day electrician'] },
  { slug: 'plumber', name: 'Plumber', minPrice: 249, keywords: ['pipe leakage', 'tap repair', 'bathroom plumbing', 'emergency plumber'] },
  { slug: 'painter', name: 'Painter', minPrice: 999, keywords: ['wall painting', 'home painting', 'interior painting', 'waterproofing'] },
  { slug: 'carpenter', name: 'Carpenter', minPrice: 399, keywords: ['furniture repair', 'door fitting', 'woodwork', 'modular furniture'] },
  { slug: 'cleaner', name: 'Cleaner', minPrice: 399, keywords: ['home cleaning', 'deep cleaning', 'house cleaning', 'bathroom cleaning'] },
  { slug: 'ac-repair', name: 'AC Repair', minPrice: 499, keywords: ['ac service', 'ac gas refill', 'split ac repair', 'window ac service'] },
  { slug: 'washing-machine-repair', name: 'Washing Machine Repair', minPrice: 449, keywords: ['washer repair', 'drain issue', 'motor repair', 'front load repair'] },
  { slug: 'fridge-repair', name: 'Fridge Repair', minPrice: 499, keywords: ['refrigerator repair', 'cooling issue', 'compressor check', 'gas refill'] },
  { slug: 'ro-repair', name: 'RO Repair', minPrice: 299, keywords: ['water purifier service', 'filter change', 'ro installation', 'ro maintenance'] },
  { slug: 'home-cleaning', name: 'Home Cleaning', minPrice: 799, keywords: ['deep home cleaning', 'move in cleaning', 'apartment cleaning', 'sofa cleaning'] },
  { slug: 'bathroom-cleaning', name: 'Bathroom Cleaning', minPrice: 299, keywords: ['bathroom deep clean', 'stain removal', 'tile cleaning', 'sanitization'] },
  { slug: 'kitchen-cleaning', name: 'Kitchen Cleaning', minPrice: 399, keywords: ['chimney area cleaning', 'grease removal', 'sink cleaning', 'cabinet cleaning'] },
  { slug: 'pest-control', name: 'Pest Control', minPrice: 699, keywords: ['cockroach control', 'termite treatment', 'bed bug control', 'mosquito control'] },
  { slug: 'appliance-repair', name: 'Appliance Repair', minPrice: 349, keywords: ['home appliance repair', 'technician near me', 'same day repair', 'appliance service'] },
  { slug: 'furniture-assembly', name: 'Furniture Assembly', minPrice: 499, keywords: ['bed assembly', 'wardrobe assembly', 'table assembly', 'furniture installation'] },
  { slug: 'tv-installation', name: 'TV Installation', minPrice: 399, keywords: ['tv wall mount', 'led tv installation', 'setup technician', 'cable setup'] },
];

export const locationCatalog = [
  { slug: 'dehradun', name: 'Dehradun', district: 'Dehradun', state: 'Uttarakhand', pincodes: ['248001', '248002', '248005'] },
  { slug: 'haridwar', name: 'Haridwar', district: 'Haridwar', state: 'Uttarakhand', pincodes: ['249401', '249403'] },
  { slug: 'roorkee', name: 'Roorkee', district: 'Haridwar', state: 'Uttarakhand', pincodes: ['247667', '247668'] },
  { slug: 'rishikesh', name: 'Rishikesh', district: 'Dehradun', state: 'Uttarakhand', pincodes: ['249201', '249202'] },
  { slug: 'muzaffarnagar', name: 'Muzaffarnagar', district: 'Muzaffarnagar', state: 'Uttar Pradesh', pincodes: ['251001', '251002'] },
  { slug: 'saharanpur', name: 'Saharanpur', district: 'Saharanpur', state: 'Uttar Pradesh', pincodes: ['247001', '247002'] },
  { slug: 'delhi', name: 'Delhi', district: 'New Delhi', state: 'Delhi', pincodes: ['110001', '110018', '110092'] },
  { slug: 'noida', name: 'Noida', district: 'Gautam Buddha Nagar', state: 'Uttar Pradesh', pincodes: ['201301', '201304'] },
  { slug: 'gurugram', name: 'Gurugram', district: 'Gurugram', state: 'Haryana', pincodes: ['122001', '122018'] },
];

export const getServiceBySlug = (slug = '') =>
  serviceCatalog.find((service) => service.slug === slug.toLowerCase());

export const getLocationBySlug = (slug = '') =>
  locationCatalog.find((location) => location.slug === slug.toLowerCase());

export const toTitleCase = (value = '') =>
  value
    .split(/[-\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');

export const normalizeSlug = (value = '') =>
  decodeURIComponent(value).trim().toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const createPageTitle = (title) => `${title} | ${BRAND_NAME}`;

export const defaultMeta = {
  title: createPageTitle('Book Verified Local Services Near You'),
  description: 'HelperLoc helps customers book verified electricians, plumbers, cleaners, carpenters, painters, AC repair experts and local workers with transparent pricing.',
  keywords: 'local services, electrician near me, plumber near me, home cleaning, AC repair, appliance repair, HelperLoc',
};
