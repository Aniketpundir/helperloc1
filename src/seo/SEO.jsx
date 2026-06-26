import { useEffect } from 'react';
import { defaultMeta, DEFAULT_IMAGE, SITE_URL } from './seoData';
import { localBusinessSchema, organizationSchema, websiteSchema } from './schema';

const managedSelector = '[data-helperloc-seo="true"]';

const setMeta = (attribute, key, content) => {
  if (!content) return;
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    element.setAttribute('data-helperloc-seo', 'true');
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

const setLink = (rel, href) => {
  if (!href) return;
  let element = document.head.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    element.setAttribute('data-helperloc-seo', 'true');
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
};

const absoluteUrl = (path) => {
  if (!path) return SITE_URL;
  if (path.startsWith('http')) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
};

const SEO = ({
  title = defaultMeta.title,
  description = defaultMeta.description,
  keywords = defaultMeta.keywords,
  canonicalPath,
  image = DEFAULT_IMAGE,
  type = 'website',
  structuredData = [],
  noindex = false,
}) => {
  useEffect(() => {
    const canonical = canonicalPath ? absoluteUrl(canonicalPath) : absoluteUrl(window.location.pathname);
    const imageUrl = absoluteUrl(image);

    document.title = title;
    document.documentElement.lang = 'en-IN';

    setMeta('name', 'description', description);
    setMeta('name', 'keywords', keywords);
    setMeta('name', 'robots', noindex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
    setMeta('name', 'theme-color', '#004d99');

    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:image', imageUrl);
    setMeta('property', 'og:image:alt', `${title} preview image`);
    setMeta('property', 'og:site_name', 'HelperLoc');
    setMeta('property', 'og:locale', 'en_IN');

    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:site', '@helperloc');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', imageUrl);
    setMeta('name', 'twitter:image:alt', `${title} preview image`);

    setLink('canonical', canonical);

    document.head.querySelectorAll('script[type="application/ld+json"][data-helperloc-seo="true"]').forEach((node) => node.remove());
    [organizationSchema, websiteSchema, localBusinessSchema, ...structuredData].forEach((schema) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-helperloc-seo', 'true');
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => {
      document.head.querySelectorAll(managedSelector).forEach((node) => {
        if (node.tagName === 'SCRIPT') node.remove();
      });
    };
  }, [canonicalPath, description, image, keywords, noindex, structuredData, title, type]);

  return null;
};

export default SEO;
