import React from 'react';
import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://skininfinityandmajesty.com';
const DEFAULT_IMAGE = `${BASE_URL}/bg5.webp`;

const SEO = ({
  title,
  description,
  keywords,
  canonical,
  ogImage = DEFAULT_IMAGE,
  ogType = 'website',
  schema = null,
}) => {
  const fullTitle = title
    ? `${title} | Skin Infinity & Majesty - Tirunelveli`
    : 'Skin Infinity & Majesty | Best Beauty Salon & Designer Studio in Tirunelveli';

  const absoluteOgImage = ogImage.startsWith('http')
    ? ogImage
    : `${BASE_URL}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonical && <link rel="canonical" href={`${BASE_URL}${canonical}`} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteOgImage} />
      <meta property="og:url" content={`${BASE_URL}${canonical || '/'}`} />
      <meta property="og:type" content={ogType} />

      {/* Twitter */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteOgImage} />

      {/* Page-specific JSON-LD */}
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
};

export default SEO;
