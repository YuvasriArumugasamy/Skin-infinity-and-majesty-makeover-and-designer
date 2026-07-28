import React from 'react';
import { Helmet } from 'react-helmet-async';

const BASE_URL = import.meta.env.VITE_SITE_URL || 'https://skininfinityandmajesty.com';
const DEFAULT_IMAGE = `${BASE_URL}/bg5.webp`;
const DEFAULT_DESCRIPTION = 'Premium beauty salon in Tirunelveli offering bridal makeover, hydra facial, skin care, hair spa, microblading and designer Aari work by S. Mahalakshmi.';
const DEFAULT_KEYWORDS = 'beauty salon Tirunelveli, bridal makeover Tirunelveli, hydra facial Tirunelveli, hair spa Tirunelveli, microblading Tirunelveli, aari work Tirunelveli, skin care Tirunelveli';

const buildDefaultSchema = (canonicalPath = '/') => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['BeautySalon', 'HairSalon', 'LocalBusiness'],
      '@id': `${BASE_URL}/#organization`,
      name: 'Skin Infinity & Majesty Makeover & Designer',
      alternateName: 'Skin Infinity & Majesty Tirunelveli',
      url: BASE_URL,
      telephone: '+91 63808 50488',
      email: 'skininfinityandmajesty@gmail.com',
      description: 'Premium beauty salon, bridal makeover, skin care and designer studio in Tirunelveli.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Tirunelveli - Sankarankoil Rd, Ramayanpatti',
        addressLocality: 'Tirunelveli',
        addressRegion: 'Tamil Nadu',
        postalCode: '627358',
        addressCountry: 'IN'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 8.7366,
        longitude: 77.6978
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '10:00',
          closes: '20:00'
        }
      ],
      priceRange: '₹₹',
      founder: {
        '@type': 'Person',
        name: 'S. Mahalakshmi',
        jobTitle: 'Founder & Beauty Specialist'
      },
      sameAs: ['https://instagram.com/s.mahalakshmi74', 'https://wa.me/916380850488']
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: 'Skin Infinity & Majesty',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${BASE_URL}/?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${BASE_URL}/services` },
        { '@type': 'ListItem', position: 3, name: 'Bridal', item: `${BASE_URL}/bridal` },
        { '@type': 'ListItem', position: 4, name: 'Contact', item: `${BASE_URL}/contact` }
      ]
    }
  ]
});

const SEO = ({
  title,
  description,
  keywords,
  canonical,
  ogImage = DEFAULT_IMAGE,
  ogType = 'website',
  schema = null,
}) => {
  const canonicalPath = canonical ? canonical : '/';
  const canonicalUrl = canonicalPath.startsWith('http') ? canonicalPath : `${BASE_URL}${canonicalPath.startsWith('/') ? '' : '/'}${canonicalPath}`;
  const fullTitle = title
    ? `${title} | Skin Infinity & Majesty`
    : 'Skin Infinity & Majesty | Best Beauty Salon, Bridal Makeover & Designer Studio in Tirunelveli';
  const seoDescription = description || DEFAULT_DESCRIPTION;
  const seoKeywords = keywords || DEFAULT_KEYWORDS;

  const absoluteOgImage = ogImage.startsWith('http')
    ? ogImage
    : `${BASE_URL}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;

  const resolvedSchema = schema || buildDefaultSchema(canonicalPath);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <meta name="author" content="S. Mahalakshmi" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="theme-color" content="#C57488" />
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="en-in" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={absoluteOgImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Skin Infinity & Majesty" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={absoluteOgImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image:alt" content="Skin Infinity & Majesty Beauty Salon Tirunelveli" />

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(resolvedSchema)}</script>
    </Helmet>
  );
};

export default SEO;
