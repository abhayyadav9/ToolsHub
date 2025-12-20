import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Star, Upload, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import EnhancedSEO from '../../seo/EnhancedSEO';
import { getToolMetadata, generateBreadcrumbs, getRelatedTools } from '../../config/seoConfig';

/**
 * ToolPageTemplate - Reusable template for tool pages
 * 
 * Usage:
 * <ToolPageTemplate 
 *   slug="pdf-to-word"
 *   ToolComponent={YourToolComponent}
 * />
 */
const ToolPageTemplate = ({ slug, ToolComponent, children }) => {
  const metadata = getToolMetadata(slug);
  const breadcrumbs = generateBreadcrumbs(slug);
  const relatedTools = getRelatedTools(slug);

  if (!metadata) {
    return <div>Tool not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SEO Meta Tags */}
      <EnhancedSEO
        title={metadata.title}
        description={metadata.description}
        keywords={[...metadata.keywords, ...metadata.longTailKeywords]}
        canonical={`/tools/${slug}`}
        toolName={metadata.name}
        toolCategory={metadata.category}
        faqs={metadata.faqs}
        breadcrumbs={breadcrumbs}
      />

      {/* Breadcrumb Navigation */}
      <section className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span>/</span>}
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-gray-900 font-medium">{crumb.name}</span>
                ) : (
                  <Link to={crumb.url.replace('https://toolshub.me', '')} className="hover:text-orange-600">
                    {crumb.name}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-red-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-orange-200 mb-6">
              <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span className="text-sm font-semibold text-gray-700">Free & Secure</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              {metadata.name}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {metadata.description}
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {metadata.features.slice(0, 4).map((feature, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 border border-gray-200 shadow-sm"
                >
                  <CheckCircle className="w-4 h-4 inline mr-2 text-green-500" />
                  {feature}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tool Component */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {ToolComponent ? <ToolComponent /> : children}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">1. Upload</h3>
              <p className="text-gray-600">Upload your file by clicking or dragging and dropping</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">2. Process</h3>
              <p className="text-gray-600">We process your file securely and quickly</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">3. Download</h3>
              <p className="text-gray-600">Download your processed file instantly</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {metadata.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
              >
                <CheckCircle className="w-8 h-8 text-green-500 mb-3" />
                <h3 className="font-bold text-gray-900">{feature}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {metadata.faqs && metadata.faqs.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {metadata.faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-xl p-6 border border-gray-200"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Related Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedTools.map((tool) => (
                <Link key={tool.slug} to={`/tools/${tool.slug}`}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm group"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600">
                      {tool.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{tool.description}</p>
                    <div className="flex items-center text-orange-600 font-semibold">
                      <span>Try Tool</span>
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-orange-100 mb-8">
            Start using {metadata.name} now. No registration required, completely free!
          </p>
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg inline-flex items-center gap-2"
            >
              Explore More Tools <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ToolPageTemplate;
