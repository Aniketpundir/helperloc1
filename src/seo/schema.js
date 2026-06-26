import { BRAND_NAME, DEFAULT_IMAGE, SITE_URL, contactPoint } from './seoData';

const sameAs = [
  'https://www.facebook.com/helperloc',
  'https://www.linkedin.com/company/helperloc',
];

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: BRAND_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  image: DEFAULT_IMAGE,
  email: contactPoint.email,
  telephone: contactPoint.telephone,
  sameAs,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: contactPoint.telephone,
    contactType: 'customer support',
    areaServed: contactPoint.areaServed,
    availableLanguage: ['en', 'hi'],
  },
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: BRAND_NAME,
  publisher: { '@id': `${SITE_URL}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/worker-category/listed-worker/{search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#local-business`,
  name: BRAND_NAME,
  url: SITE_URL,
  image: DEFAULT_IMAGE,
  priceRange: 'INR 249-4999',
  telephone: contactPoint.telephone,
  email: contactPoint.email,
  openingHours: 'Mo-Su 08:00-22:00',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IN',
    addressRegion: 'Uttarakhand',
    addressLocality: 'Dehradun',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 30.3165,
    longitude: 78.0322,
  },
  areaServed: {
    '@type': 'Country',
    name: 'India',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '2300',
  },
  review: [
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Amit Sharma' },
      reviewRating: { '@type': 'Rating', ratingValue: '5' },
      reviewBody: 'Booked a plumber quickly and received clear updates from request to completion.',
    },
  ],
};

export const breadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const faqSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

const withoutContext = ({ '@context': _context, ...schema }) => schema;

export const servicePageSchema = ({ service, location, url, faqs }) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${url}#service`,
      name: `${service.name} in ${location.name}`,
      serviceType: service.name,
      provider: { '@id': `${SITE_URL}/#organization` },
      areaServed: {
        '@type': 'AdministrativeArea',
        name: `${location.name}, ${location.state}`,
      },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'INR',
        price: service.minPrice,
        availability: 'https://schema.org/InStock',
        url,
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '2300',
      },
      review: {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Verified HelperLoc customer' },
        reviewRating: { '@type': 'Rating', ratingValue: '5' },
        reviewBody: `${service.name} booking in ${location.name} was simple, transparent and handled by a verified local worker.`,
      },
    },
    {
      '@type': 'Place',
      name: location.name,
      address: {
        '@type': 'PostalAddress',
        addressLocality: location.name,
        addressRegion: location.state,
        postalCode: location.pincodes[0],
        addressCountry: 'IN',
      },
    },
    {
      '@type': 'HowTo',
      name: `How to book ${service.name} in ${location.name}`,
      step: [
        { '@type': 'HowToStep', name: 'Search', text: `Search for ${service.name} on HelperLoc.` },
        { '@type': 'HowToStep', name: 'Compare', text: 'Compare available local workers, ratings and service details.' },
        { '@type': 'HowToStep', name: 'Book', text: 'Choose a convenient slot and confirm the booking.' },
      ],
    },
    withoutContext(faqSchema(faqs)),
    withoutContext(breadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: service.name, url: `${SITE_URL}/${service.slug}` },
      { name: location.name, url },
    ])),
  ],
});
