import { useEffect } from 'react';

const DEFAULT_SITE_NAME = 'Skin Infinity & Majesty';
const DEFAULT_DOMAIN = 'https://skininfinityandmajesty.com';
const DEFAULT_IMAGE = '/logo.webp';

const SEO = ({
  title = 'Skin Infinity & Majesty | Best Beauty Salon & Designer Studio in Tirunelveli',
  description = 'Skin Infinity & Majesty by S. Mahalakshmi in Ramayanpatti, Tirunelveli. Premium Hydra Facial, Skin Care, Hair Spa, Microblading, Bridal HD Makeover & Designer Aari Work Studio.',
  keywords = 'beauty salon Tirunelveli, skin care clinic Ramayanpatti, hydra facial Tirunelveli, microblading Tirunelveli, bridal makeover Tirunelveli, Aari work designer studio, S Mahalakshmi salon, hair spa Tirunelveli',
  canonical = '',
  ogImage = DEFAULT_IMAGE,
  ogType = 'website',
  schema = null
}) => {
  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // Helper function to update or create meta tags
    const updateMetaTag = (selectorAttr, selectorVal, content) => {
      if (!content) return;
      let tag = document.querySelector(`meta[${selectorAttr}="${selectorVal}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(selectorAttr, selectorVal);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // Helper function for canonical link
    const updateLinkTag = (rel, href) => {
      if (!href) return;
      let link = document.querySelector(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    // 2. Standard Meta Tags
    updateMetaTag('name', 'description', description);
    updateMetaTag('name', 'keywords', keywords);
    updateMetaTag('name', 'author', 'S. Mahalakshmi');
    updateMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // 3. Local SEO Geo Tags (Tirunelveli, Tamil Nadu)
    updateMetaTag('name', 'geo.region', 'IN-TN');
    updateMetaTag('name', 'geo.placename', 'Ramayanpatti, Tirunelveli');
    updateMetaTag('name', 'geo.position', '8.7366;77.6978');
    updateMetaTag('name', 'ICBM', '8.7366, 77.6978');

    // 4. Open Graph Meta Tags (Facebook, WhatsApp previews)
    const currentUrl = canonical ? (canonical.startsWith('http') ? canonical : `${DEFAULT_DOMAIN}${canonical}`) : window.location.href;
    const fullOgImage = ogImage.startsWith('http') ? ogImage : `${DEFAULT_DOMAIN}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;

    updateMetaTag('property', 'og:site_name', DEFAULT_SITE_NAME);
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:url', currentUrl);
    updateMetaTag('property', 'og:type', ogType);
    updateMetaTag('property', 'og:image', fullOgImage);
    updateMetaTag('property', 'og:locale', 'en_US');

    // 5. Twitter Card Meta Tags
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', title);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:image', fullOgImage);

    // 6. Canonical Link
    updateLinkTag('canonical', currentUrl);

    // 7. Inject JSON-LD Structured Data Schema
    let scriptTag = document.getElementById('json-ld-schema');
    if (schema) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'json-ld-schema';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.text = JSON.stringify(schema);
    } else if (scriptTag) {
      scriptTag.remove();
    }

  }, [title, description, keywords, canonical, ogImage, ogType, schema]);

  return null;
};

export default SEO;
