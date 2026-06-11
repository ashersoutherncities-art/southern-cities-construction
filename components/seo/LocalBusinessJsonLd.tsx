import { SITE_CONFIG } from '@/lib/site-config';

/**
 * Site-wide LocalBusiness JSON-LD (GeneralContractor subtype).
 *
 * Inject in the root layout. Sourced from lib/site-config so any biz-fact
 * change automatically flows here. Validated against schema.org/LocalBusiness
 * and Google's structured data requirements.
 */
export default function LocalBusinessJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    '@id': `${SITE_CONFIG.baseUrl}/#business`,
    name: SITE_CONFIG.name,
    legalName: SITE_CONFIG.legalName,
    url: SITE_CONFIG.baseUrl,
    telephone: SITE_CONFIG.phoneTel,
    email: SITE_CONFIG.emailInfo,
    image: `${SITE_CONFIG.baseUrl}${SITE_CONFIG.logoLight}`,
    logo: `${SITE_CONFIG.baseUrl}${SITE_CONFIG.logoLight}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.state,
      postalCode: SITE_CONFIG.address.zip,
      addressCountry: SITE_CONFIG.address.country,
    },
    areaServed: {
      '@type': 'State',
      name: SITE_CONFIG.stats.areaServed,
    },
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'NC General Contractor License',
      value: SITE_CONFIG.license.number,
    },
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'license',
      name: SITE_CONFIG.license.issuer,
      identifier: SITE_CONFIG.license.number,
    },
    sameAs: [SITE_CONFIG.baseUrl],
    priceRange: '$$',
    foundingDate: `${new Date().getFullYear() - SITE_CONFIG.stats.yearsInBusiness}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
