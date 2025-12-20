import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight, CheckCircle, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import EnhancedSEO from '../../seo/EnhancedSEO';
import { categories, getToolsByCategory, siteConfig } from '../../config/seoConfig';

const DocumentToolsHub = () => {
  const category = categories.document;
  const tools = getToolsByCategory('document');

  const breadcrumbs = [
    { name: 'Home', url: siteConfig.url },
    { name: category.name, url: `${siteConfig.url}/${category.slug}` }
  ];

  const faqs = [
    {
      question: 'What document formats can I convert?',
      answer: 'We support Word (DOC, DOCX), Excel (XLS, XLSX), PowerPoint (PPT, PPTX), TXT, and conversions to/from PDF.'
    },
    {
      question: 'Will formatting be preserved?',
      answer: 'Yes, our converters maintain text formatting, fonts, images, tables, and document structure.'
    },
    {
      question: 'Do I need Microsoft Office installed?',
      answer: 'No, all conversions happen online. No software installation required.'
    },
    {
      question: 'Are document tools free?',
      answer: 'Yes, all document conversion tools are 100% free with unlimited usage.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <EnhancedSEO
        title="Free Document Tools Online - Convert Word, Excel, TXT & More"
        description="Convert documents between formats online. Word to PDF, Excel to PDF, TXT conversions, and more. Fast, free, and secure document tools."
        keywords={category.keywords}
        canonical={`/${category.slug}`}
        toolName="Document Tools Suite"
        toolCategory="Document Utility"
        faqs={faqs}
        breadcrumbs={breadcrumbs}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">Free Document Tools Online</h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-3xl mx-auto">{category.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16 -mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <Link key={tool.slug} to={`/tools/${tool.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-full flex flex-col group"
                >
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-500 transition-colors">
                    <FileText className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">{tool.name}</h3>
                  <p className="text-gray-600 mb-4 flex-grow">{tool.description}</p>
                  <div className="pt-4 border-t border-gray-100 flex items-center text-indigo-600 font-semibold">
                    <span>Use Tool</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DocumentToolsHub;
