import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHelmet = ({ 
  title, 
  description, 
  keywords = '', 
  canonical = '', 
  ogTitle = '', 
  ogDescription = '', 
  ogImage = '', 
  ogType = 'website',
  twitterCard = 'summary_large_image',
  twitterTitle = '',
  twitterDescription = '',
  twitterImage = '',
  structuredData = null
}) => {
  const siteName = 'ToolsHub';
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://toolshub.me';
  const defaultImage = `${siteUrl}/og-image.jpg`;
  
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const fullDescription = description || 'Free online PDF tools including PDF to Word converter, PDF merger, PDF compressor, and more. Fast, secure, and easy to use.';
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;
  const fullOgTitle = ogTitle || title || siteName;
  const fullOgDescription = ogDescription || description || fullDescription;
  const fullOgImage = ogImage || defaultImage;
  const fullTwitterTitle = twitterTitle || ogTitle || title || siteName;
  const fullTwitterDescription = twitterDescription || ogDescription || description || fullDescription;
  const fullTwitterImage = twitterImage || ogImage || defaultImage;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={fullCanonical} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={fullOgTitle} />
      <meta property="og:description" content={fullOgDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteName} />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTwitterTitle} />
      <meta name="twitter:description" content={fullTwitterDescription} />
      <meta name="twitter:image" content={fullTwitterImage} />
      
      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="ToolsHub Team" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHelmet;
