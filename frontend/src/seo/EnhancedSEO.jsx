import React from 'react';
import { Helmet } from 'react-helmet-async';
import StructuredData, {
  createSoftwareApplicationSchema,
  createFAQSchema,
  createBreadcrumbSchema,
  createWebPageSchema
} from './StructuredData';

/**
 * EnhancedSEO Component - Comprehensive SEO component for tool pages
 * Includes all meta tags, Open Graph, Twitter Cards, and structured data
 */
const EnhancedSEO = ({
  // Basic SEO
  title,
  description,
  keywords = [],
  canonical,
  
  // Open Graph
  ogImage = '/og-image.jpg',
  ogType = 'website',
  
  // Tool-specific
  toolName,
  toolCategory,
  
  // Structured Data
  faqs = [],
  breadcrumbs = [],
  customSchema = null,
  
  // Additional
  noIndex = false,
  lang = 'en'
}) => {
  const siteName = 'ToolsHub';
  const siteUrl = 'https://toolshub.me';
  const fullTitle = `${title} | ${siteName}`;
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;
  const fullOgImage = `${siteUrl}${ogImage}`;
  
  // Generate structured data
  const schemas = [];
  
  // Add Software Application Schema if toolName provided
  if (toolName) {
    schemas.push(createSoftwareApplicationSchema({
      name: toolName,
      description,
      url: fullCanonical,
      applicationCategory: toolCategory || 'UtilityApplication'
    }));
  }
  
  // Add FAQ Schema if FAQs provided
  if (faqs.length > 0) {
    schemas.push(createFAQSchema(faqs));
  }
  
  // Add Breadcrumb Schema if breadcrumbs provided
  if (breadcrumbs.length > 0) {
    schemas.push(createBreadcrumbSchema(breadcrumbs));
  }
  
  // Add WebPage Schema
  schemas.push(createWebPageSchema({
    name: title,
    description,
    url: fullCanonical
  }));
  
  // Add custom schema if provided
  if (customSchema) {
    schemas.push(customSchema);
  }

  return (
    <>
      <Helmet>
        {/* HTML Lang */}
        <html lang={lang} />
        
        {/* Basic Meta Tags */}
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        {keywords.length > 0 && (
          <meta name="keywords" content={keywords.join(', ')} />
        )}
        <link rel="canonical" href={fullCanonical} />
        
        {/* Robots */}
        {noIndex && <meta name="robots" content="noindex, nofollow" />}
        
        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content={ogType} />
        <meta property="og:url" content={fullCanonical} />
        <meta property="og:image" content={fullOgImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={fullOgImage} />
        <meta name="twitter:site" content="@toolshub" />
        
        {/* Additional Meta */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#ea580c" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        
        {/* Mobile App Tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content={siteName} />
        
        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </Helmet>
      
      {/* Structured Data */}
      {schemas.map((schema, index) => (
        <StructuredData key={index} data={schema} />
      ))}
    </>
  );
};

export default EnhancedSEO;
