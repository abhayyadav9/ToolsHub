import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Shield,
  Zap,
  Download
} from 'lucide-react';
import { motion } from 'framer-motion';
import EnhancedSEO from '../../seo/EnhancedSEO';
import { categories, getToolsByCategory, siteConfig } from '../../config/seoConfig';

const PDFToolsHub = () => {
  const category = categories.pdf;
  const tools = getToolsByCategory('pdf');

  const breadcrumbs = [
    { name: 'Home', url: siteConfig.url },
    { name: category.name, url: `${siteConfig.url}/${category.slug}` }
  ];

  const faqs = [
    {
      question: 'Are your PDF tools really free?',
      answer: 'Yes, all our PDF tools are 100% free with no hidden costs, no file size limits, and no registration required.'
    },
    {
      question: 'Is it safe to use online PDF tools?',
      answer: 'Absolutely. We process files securely using encrypted connections. All uploaded files are automatically deleted after processing and are never stored or shared.'
    },
    {
      question: 'Do I need to install software?',
      answer: 'No installation needed. All tools work directly in your browser on any device - Windows, Mac, Linux, iOS, or Android.'
    },
    {
      question: 'Can I process multiple PDFs at once?',
      answer: 'Yes, most of our tools support batch processing, allowing you to work with multiple PDF files simultaneously.'
    },
    {
      question: 'What PDF formats are supported?',
      answer: 'We support all standard PDF versions and formats, including PDF/A for archiving, password-protected PDFs, and PDFs with forms.'
    }
  ];

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Process PDFs in seconds with optimized algorithms',
      color: 'text-yellow-500',
      bg: 'bg-yellow-50'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Files encrypted and auto-deleted after processing',
      color: 'text-blue-500',
      bg: 'bg-blue-50'
    },
    {
      icon: Download,
      title: 'No Limits',
      description: 'Unlimited conversions with no file size restrictions',
      color: 'text-green-500',
      bg: 'bg-green-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <EnhancedSEO
        title="Free PDF Tools Online - Convert, Merge, Compress & Edit PDFs"
        description="Complete suite of free PDF tools. Convert PDF to Word, merge PDFs, compress files, split pages, OCR, and more. No software installation required."
        keywords={category.keywords}
        canonical={`/${category.slug}`}
        toolName="PDF Tools Suite"
        toolCategory="PDF Utility Suite"
        faqs={faqs}
        breadcrumbs={breadcrumbs}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
              <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
              <span className="text-sm font-semibold">Trusted by millions worldwide</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
              Free PDF Tools Online
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              {category.description}
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {['No Registration', 'No Watermarks', '100% Secure', 'Unlimited Use'].map((badge, i) => (
                <span key={i} className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium">
                  <CheckCircle className="w-4 h-4 inline mr-2" />
                  {badge}
                </span>
              ))}
            </div>
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
                  whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-full flex flex-col group"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-500 transition-colors">
                    <FileText className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {tool.name}
                  </h3>

                  <p className="text-gray-600 mb-4 flex-grow">
                    {tool.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    {tool.features.slice(0, 3).map((feature, i) => (
                      <div key={i} className="flex items-center text-sm text-gray-500">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                    <span>Use Tool</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our PDF Tools?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`w-16 h-16 ${feature.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  {React.createElement(feature.icon, { className: `w-8 h-8 ${feature.color}` })}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Choose a PDF tool above and start converting, merging, or editing in seconds!
          </p>
          <Link to="/tools/pdf-to-word">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg inline-flex items-center gap-2"
            >
              Start Converting Now <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PDFToolsHub;
