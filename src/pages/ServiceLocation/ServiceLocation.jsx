import { Link, Navigate, useParams } from 'react-router-dom';
import SEO from '../../seo/SEO';
import {
  createPageTitle,
  getLocationBySlug,
  getServiceBySlug,
  normalizeSlug,
  serviceCatalog,
  SITE_URL,
} from '../../seo/seoData';
import { servicePageSchema } from '../../seo/schema';
import './ServiceLocation.css';

const buildFaqs = (service, location) => [
  {
    question: `What is the best way to book ${service.name} in ${location.name}?`,
    answer: `Search ${service.name} on HelperLoc, compare verified local workers, choose a time slot and confirm the booking online.`,
  },
  {
    question: `How much does ${service.name} cost in ${location.name}?`,
    answer: `HelperLoc ${service.name} bookings in ${location.name} usually start around INR ${service.minPrice}. Final cost depends on scope, parts, urgency and worker availability.`,
  },
  {
    question: `Are HelperLoc ${service.name} workers verified?`,
    answer: 'HelperLoc is built around worker profiles, ratings, reviews and service history so customers can choose trusted local professionals.',
  },
  {
    question: `Which pincodes are covered in ${location.name}?`,
    answer: `Common HelperLoc coverage in ${location.name} includes ${location.pincodes.join(', ')} and nearby local areas.`,
  },
];

const ServiceLocation = () => {
  const params = useParams();
  const service = getServiceBySlug(normalizeSlug(params.serviceSlug));
  const location = getLocationBySlug(normalizeSlug(params.locationSlug));

  if (!service || !location) {
    return <Navigate to="/worker-category" replace />;
  }

  const url = `${SITE_URL}/${service.slug}/${location.slug}`;
  const faqs = buildFaqs(service, location);
  const relatedServices = serviceCatalog.filter((item) => item.slug !== service.slug).slice(0, 6);
  const title = createPageTitle(`${service.name} in ${location.name} - Verified Local Workers`);
  const description = `Book verified ${service.name.toLowerCase()} in ${location.name}, ${location.state}. Compare local workers, pricing from INR ${service.minPrice}, reviews, service process, FAQs and nearby pincodes.`;

  return (
    <>
      <SEO
        title={title}
        description={description}
        keywords={[service.name, location.name, location.state, ...service.keywords, 'local service booking', 'verified workers'].join(', ')}
        canonicalPath={`/${service.slug}/${location.slug}`}
        structuredData={[servicePageSchema({ service, location, url, faqs })]}
      />

      <main className="seo-page">
        <section className="seo-page__hero">
          <div className="container seo-page__hero-inner">
            <nav className="seo-page__breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <Link to="/worker-category">Services</Link>
              <span>/</span>
              <span>{service.name} in {location.name}</span>
            </nav>
            <h1>{service.name} in {location.name}</h1>
            <p>
              Book verified local {service.name.toLowerCase()} professionals in {location.name}, {location.district}.
              Get transparent pricing, nearby worker options, reviews and a clear service process before you confirm.
            </p>
            <div className="seo-page__actions">
              <Link className="seo-page__primary" to={`/worker-category/listed-worker/${encodeURIComponent(service.name)}`}>
                Book {service.name}
              </Link>
              <Link className="seo-page__secondary" to="/contact-us">Ask a Question</Link>
            </div>
          </div>
        </section>

        <section className="container seo-page__grid" aria-label={`${service.name} guide`}>
          <article className="seo-page__panel">
            <h2>Quick Answer</h2>
            <p>
              HelperLoc helps you find {service.name.toLowerCase()} workers near {location.name} for urgent repairs,
              planned maintenance and home improvement tasks. Prices start from INR {service.minPrice}, with the final
              quote based on work complexity, materials and travel distance.
            </p>
          </article>

          <article className="seo-page__panel">
            <h2>Key Takeaways</h2>
            <ul>
              <li>Service area: {location.name}, {location.state}, including {location.pincodes.join(', ')}.</li>
              <li>Best for: {service.keywords.slice(0, 3).join(', ')}.</li>
              <li>Booking flow: search, compare, choose slot and confirm.</li>
              <li>Risk control: check ratings, scope, price and worker profile before booking.</li>
            </ul>
          </article>

          <article className="seo-page__panel">
            <h2>Service Process</h2>
            <ol>
              <li>Describe the issue and select {service.name}.</li>
              <li>Compare available workers near {location.name}.</li>
              <li>Confirm timing, address and expected work scope.</li>
              <li>Review the completed service and save the worker for future jobs.</li>
            </ol>
          </article>

          <article className="seo-page__panel">
            <h2>Pricing Guide</h2>
            <table>
              <thead>
                <tr>
                  <th>Need</th>
                  <th>Typical Starting Cost</th>
                  <th>Good For</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Basic visit</td>
                  <td>INR {service.minPrice}</td>
                  <td>Inspection and minor fixes</td>
                </tr>
                <tr>
                  <td>Standard work</td>
                  <td>INR {service.minPrice + 500}+</td>
                  <td>Repair, installation or cleaning tasks</td>
                </tr>
                <tr>
                  <td>Complex work</td>
                  <td>Custom quote</td>
                  <td>Parts, multiple rooms or urgent support</td>
                </tr>
              </tbody>
            </table>
          </article>

          <article className="seo-page__panel">
            <h2>Pros and Cons</h2>
            <div className="seo-page__columns">
              <div>
                <h3>Benefits</h3>
                <ul>
                  <li>Faster local worker discovery.</li>
                  <li>Clearer comparison before booking.</li>
                  <li>Useful for urgent and planned home tasks.</li>
                </ul>
              </div>
              <div>
                <h3>Watchouts</h3>
                <ul>
                  <li>Final cost can change if parts are needed.</li>
                  <li>Peak slots may have limited availability.</li>
                  <li>Very large jobs may need a site visit first.</li>
                </ul>
              </div>
            </div>
          </article>

          <article className="seo-page__panel">
            <h2>Common Mistakes</h2>
            <ul>
              <li>Booking without sharing photos or a clear description.</li>
              <li>Comparing only price instead of profile, rating and experience.</li>
              <li>Skipping safety details such as access, parking and building rules.</li>
            </ul>
          </article>

          <article className="seo-page__panel seo-page__panel--wide">
            <h2>FAQs</h2>
            {faqs.map((faq) => (
              <details key={faq.question} open>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </article>

          <article className="seo-page__panel seo-page__panel--wide">
            <h2>Related Services in {location.name}</h2>
            <div className="seo-page__links">
              {relatedServices.map((item) => (
                <Link key={item.slug} to={`/${item.slug}/${location.slug}`}>
                  {item.name} in {location.name}
                </Link>
              ))}
            </div>
          </article>
        </section>
      </main>
    </>
  );
};

export default ServiceLocation;
