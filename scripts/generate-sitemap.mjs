import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { locationCatalog, serviceCatalog, SITE_URL } from '../src/seo/seoData.js';

const staticRoutes = [
  { path: '/', changefreq: 'daily', priority: '1.0' },
  { path: '/how-it-works', changefreq: 'monthly', priority: '0.8' },
  { path: '/about-us', changefreq: 'monthly', priority: '0.7' },
  { path: '/contact-us', changefreq: 'monthly', priority: '0.7' },
  { path: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
  { path: '/terms-of-service', changefreq: 'yearly', priority: '0.3' },
];

const serviceLocationRoutes = serviceCatalog.flatMap((service) =>
  locationCatalog.map((location) => ({
    path: `/${service.slug}/${location.slug}`,
    changefreq: 'weekly',
    priority: service.slug === 'electrician' || service.slug === 'plumber' ? '0.9' : '0.8',
  }))
);

const urls = [...staticRoutes, ...serviceLocationRoutes];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((url) => `  <url><loc>${SITE_URL}${url.path}</loc><changefreq>${url.changefreq}</changefreq><priority>${url.priority}</priority></url>`)
  .join('\n')}
</urlset>
`;

writeFileSync(resolve('public/sitemap.xml'), xml);
console.log(`Generated ${urls.length} sitemap URLs.`);
