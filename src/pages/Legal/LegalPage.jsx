import SEO from '../../seo/SEO';
import { createPageTitle } from '../../seo/seoData';
import './LegalPage.css';

const legalCopy = {
  privacy: {
    title: 'Privacy Policy',
    description: 'HelperLoc privacy policy covering customer, worker, booking, location and support information.',
    sections: [
      ['Information We Collect', 'HelperLoc may collect account details, contact information, service requests, addresses, worker profile details, booking history, reviews and support messages.'],
      ['How We Use Information', 'We use information to create accounts, match customers with local workers, process bookings, improve safety, prevent fraud and provide customer support.'],
      ['Location and Service Data', 'Location details help show nearby workers, estimate availability and improve local service discovery.'],
      ['Your Choices', 'Users can update profile information, manage saved addresses and contact support for privacy questions.'],
    ],
  },
  terms: {
    title: 'Terms of Service',
    description: 'HelperLoc terms for customers and local workers using the service booking platform.',
    sections: [
      ['Platform Role', 'HelperLoc connects customers with local workers and helps manage discovery, booking and communication workflows.'],
      ['Bookings', 'Customers should provide accurate service details, address information and availability. Workers should accept only work they are qualified to complete.'],
      ['Pricing and Scope', 'Displayed prices are starting estimates. Final costs may vary based on inspection, parts, urgency and task complexity.'],
      ['Safety', 'Users should follow lawful, respectful and safe conduct during every booking and support interaction.'],
    ],
  },
};

const LegalPage = ({ type = 'privacy' }) => {
  const page = legalCopy[type] || legalCopy.privacy;
  const path = type === 'terms' ? '/terms-of-service' : '/privacy-policy';

  return (
    <main className="legal-page">
      <SEO
        title={createPageTitle(page.title)}
        description={page.description}
        keywords={`HelperLoc ${page.title.toLowerCase()}, local service booking policy`}
        canonicalPath={path}
      />
      <section className="container legal-page__inner">
        <h1>{page.title}</h1>
        <p>{page.description}</p>
        {page.sections.map(([heading, body]) => (
          <article key={heading}>
            <h2>{heading}</h2>
            <p>{body}</p>
          </article>
        ))}
      </section>
    </main>
  );
};

export default LegalPage;
