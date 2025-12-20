import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * StructuredData Component - Renders JSON-LD structured data for SEO
 * Supports multiple schema types for enhanced rich snippets
 */
const StructuredData = ({ data }) => {
  if (!data) return null;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(data)}
      </script>
    </Helmet>
  );
};

/**
 * SoftwareApplicationSchema - Schema for tool pages
 */
export const createSoftwareApplicationSchema = ({
  name,
  description,
  url,
  category = 'UtilityApplication',
  operatingSystem = 'Any',
  applicationCategory = 'UtilityApplication',
  offers = { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  aggregateRating = null,
  author = {
    '@type': 'Organization',
    name: 'ToolsHub',
    url: 'https://toolshub.me'
  }
}) => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name,
  description,
  url,
  applicationCategory,
  operatingSystem,
  offers,
  author,
  ...(aggregateRating && { aggregateRating })
});

/**
 * FAQPageSchema - Schema for FAQ sections
 */
export const createFAQSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
});

/**
 * BreadcrumbListSchema - Schema for breadcrumb navigation
 */
export const createBreadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url
  }))
});

/**
 * WebPageSchema - General webpage schema
 */
export const createWebPageSchema = ({
  name,
  description,
  url,
  breadcrumb = null
}) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name,
  description,
  url,
  ...(breadcrumb && { breadcrumb })
});

/**
 * HowToSchema - Schema for tutorial/guide pages
 */
export const createHowToSchema = ({
  name,
  description,
  steps,
  estimatedCost = { '@type': 'MonetaryAmount', currency: 'USD', value: '0' },
  totalTime = 'PT5M'
}) => ({
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name,
  description,
  estimatedCost,
  totalTime,
  step: steps.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.name,
    text: step.text,
    ...(step.image && { image: step.image })
  }))
});

/**
 * OrganizationSchema - Schema for website/organization
 */
export const createOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ToolsHub',
  url: 'https://toolshub.me',
  logo: 'https://toolshub.me/logo.png',
  description: 'Free online tools for PDF conversion, image editing, video processing, and document management',
  sameAs: [
    'https://twitter.com/toolshub',
    'https://facebook.com/toolshub',
    'https://linkedin.com/company/toolshub'
  ]
});

/**
 * WebSiteSchema - Schema for the main website
 */
export const createWebSiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ToolsHub',
  url: 'https://toolshub.me',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://toolshub.me/search?q={search_term_string}',
    'query-input': 'required name=search_term_string'
  }
});

export default StructuredData;
