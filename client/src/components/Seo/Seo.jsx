import { Helmet } from 'react-helmet';

const SITE_NAME = 'CommuteGo';
const SITE_URL = 'https://commutego.in';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;
const TWITTER_HANDLE = '@commutego';

/**
 * Reusable SEO component.
 *
 * Emits per-page <title>, meta description, canonical, robots,
 * Open Graph + Twitter Card tags, and an optional JSON-LD block.
 *
 * Usage:
 *   <Seo
 *     title="Hidden Destinations"
 *     description="..."
 *     path="/hidden-destinations"
 *     keywords="hidden places india, offbeat destinations"
 *     jsonLd={{ '@type': 'ItemList', ... }}
 *   />
 *
 * Pass `index={false}` for pages that should NOT be indexed (login, 404, etc.).
 */
const Seo = ({
  title,
  description = "CommuteGo — Discover hidden places, meet verified local buddies, and find travel companions across India.",
  keywords,
  path = '/',
  image,
  type = 'website',
  index = true,
  jsonLd,
}) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Discover Hidden Places, Meet Local Experts & Travel Together`;
  const canonicalUrl = `${SITE_URL}${path}`;
  const ogImage = image ? (image.startsWith('http') ? image : `${SITE_URL}${image}`) : DEFAULT_OG_IMAGE;
  const robots = index ? 'index, follow, max-image-preview:large' : 'noindex, nofollow';

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={SITE_NAME} />
      <meta name="robots" content={robots} />
      <meta name="googlebot" content={robots} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title || SITE_NAME} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD structured data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

// Default Organization JSON-LD — import this on the home page.
export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    "CommuteGo is a premium travel platform helping travelers discover hidden destinations, meet verified local buddies, and find travel companions across India.",
  sameAs: [
    'https://twitter.com/commutego',
    'https://www.instagram.com/commutego',
    'https://www.facebook.com/commutego',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'keshabdas2003@gmail.com',
    availableLanguage: ['English', 'Hindi'],
  },
  areaServed: {
    '@type': 'Country',
    name: 'India',
  },
};

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/hidden-destinations?search={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export default Seo;
