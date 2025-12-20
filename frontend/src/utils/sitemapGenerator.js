import { toolsMetadata, categories, siteConfig } from '../config/seoConfig';

/**
 * Generate sitemap.xml dynamically
 * This should be called during build or on a server endpoint
 */
export const generateSitemap = () => {
  const baseUrl = siteConfig.url;
  const currentDate = new Date().toISOString().split('T')[0];

  // Static pages
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'daily' }, // Home
    { url: '/about', priority: '0.7', changefreq: 'monthly' },
    { url: '/contact', priority: '0.7', changefreq: 'monthly' }
  ];

  // Category hub pages
  const categoryPages = Object.values(categories).map(cat => ({
    url: `/${cat.slug}`,
    priority: '0.9',
    changefreq: 'weekly'
  }));

  // Tool pages
  const toolPages = Object.keys(toolsMetadata).map(slug => ({
    url: `/tools/${slug}`,
    priority: '0.8',
    changefreq: 'weekly'
  }));

  const allPages = [...staticPages, ...categoryPages, ...toolPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return sitemap;
};

/**
 * Generate robots.txt
 */
export const generateRobotsTxt = () => {
  const baseUrl = siteConfig.url;

  return `# ToolsHub - Robots.txt
# Welcome crawlers! All our tools are free and meant to be discovered.

User-agent: *
Allow: /

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for politeness
Crawl-delay: 1

# Block admin areas (if any)
Disallow: /admin/
Disallow: /api/
Disallow: /*.json$

# Allow all tools and content
Allow: /tools/
Allow: /pdf-tools
Allow: /image-tools
Allow: /video-tools
Allow: /audio-tools
Allow: /document-tools

# Block resource files
Disallow: /*.js$
Disallow: /*.css$
Disallow: /*.map$

# User-agent specific rules
User-agent: Googlebot
Allow: /

User-agent: Googlebot-Image
Allow: /

User-agent: Bingbot
Allow: /

# SEO spammers and bad bots
User-agent: AhrefsBot
Crawl-delay: 10

User-agent: SemrushBot
Crawl-delay: 10

User-agent: MJ12bot
Crawl-delay: 10

User-agent: DotBot
Crawl-delay: 10
`;
};

/**
 * Save sitemap to public folder (for build process)
 */
export const saveSitemap = () => {
  const sitemap = generateSitemap();
  // In a real build process, this would write to public/sitemap.xml
  return sitemap;
};

/**
 * Save robots.txt to public folder (for build process)
 */
export const saveRobotsTxt = () => {
  const robotsTxt = generateRobotsTxt();
  // In a real build process, this would write to public/robots.txt
  return robotsTxt;
};

/**
 * Sitemap index (for large sites with multiple sitemaps)
 */
export const generateSitemapIndex = () => {
  const baseUrl = siteConfig.url;
  const currentDate = new Date().toISOString().split('T')[0];

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap-main.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-tools.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
</sitemapindex>`;
};

/**
 * Generate sitemap for specific category
 */
export const generateCategorySitemap = (categorySlug) => {
  const baseUrl = siteConfig.url;
  const currentDate = new Date().toISOString().split('T')[0];

  const tools = Object.entries(toolsMetadata)
    .filter(([_, tool]) => tool.category === categorySlug)
    .map(([slug, _]) => ({
      url: `/tools/${slug}`,
      priority: '0.8',
      changefreq: 'weekly'
    }));

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${tools
  .map(
    page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;
};

export default {
  generateSitemap,
  generateRobotsTxt,
  saveSitemap,
  saveRobotsTxt,
  generateSitemapIndex,
  generateCategorySitemap
};
