import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Image as ImageIcon, 
  ArrowRight, 
  CheckCircle, 
  Star,
  Sparkles,
  Shield,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import EnhancedSEO from '../../seo/EnhancedSEO';
import { categories, getToolsByCategory, siteConfig } from '../../config/seoConfig';

const ImageToolsHub = () => {
  const category = categories.image;
  const tools = getToolsByCategory('image');

  const breadcrumbs = [
    { name: 'Home', url: siteConfig.url },
    { name: category.name, url: `${siteConfig.url}/${category.slug}` }
  ];

  const faqs = [
    {
      question: 'Are image tools free to use?',
      answer: 'Yes, all image editing tools are completely free with no watermarks, file size limits, or usage restrictions.'
    },
    {
      question: 'What image formats are supported?',
      answer: 'We support all major formats including JPG, PNG, WebP, GIF, BMP, TIFF, and SVG for various operations.'
    },
    {
      question: 'Will my images be stored?',
      answer: 'No, all images are processed in real-time and automatically deleted from our servers after processing.'
    },
    {
      question: 'Can I batch process multiple images?',
      answer: 'Yes, most tools support batch processing to edit multiple images simultaneously for faster workflow.'
    },
    {
      question: 'Do image tools work on mobile?',
      answer: 'Absolutely! All our image tools are mobile-friendly and work on smartphones, tablets, and desktops.'
    }
  ];

  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered',
      description: 'Advanced AI for background removal and enhancement',
      color: 'text-purple-500',
      bg: 'bg-purple-50'
    },
    {
      icon: Zap,
      title: 'Instant Processing',
      description: 'Edit and convert images in seconds',
      color: 'text-yellow-500',
      bg: 'bg-yellow-50'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Images never stored, 100% secure processing',
      color: 'text-green-500',
      bg: 'bg-green-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <EnhancedSEO
        title="Free Image Tools Online - Compress, Resize, Convert & Edit Images"
        description="Professional image editing tools online. Compress images, remove backgrounds, resize photos, convert formats, and more. AI-powered, free, and easy to use."
        keywords={category.keywords}
        canonical={`/${category.slug}`}
        toolName="Image Tools Suite"
        toolCategory="Image Editing Utility"
        faqs={faqs}
        breadcrumbs={breadcrumbs}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-emerald-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
              <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
              <span className="text-sm font-semibold">AI-Powered Image Tools</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
              Professional Image Tools
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
              {category.description}
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {['AI Background Removal', 'Batch Processing', 'No Watermarks', 'Unlimited Use'].map((badge, i) => (
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
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-500 transition-colors">
                    <ImageIcon className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
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

                  <div className="pt-4 border-t border-gray-100 flex items-center text-green-600 font-semibold group-hover:text-green-700">
                    <span>Use Tool</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Image Tools?</h2>
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

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Start Editing Images Now</h2>
          <p className="text-xl text-green-100 mb-8">
            Professional image tools at your fingertips. No signup required!
          </p>
          <Link to="/tools/compress-image">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg inline-flex items-center gap-2"
            >
              Compress Image Now <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ImageToolsHub;
