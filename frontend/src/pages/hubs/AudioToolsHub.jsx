import React from 'react';
import { Link } from 'react-router-dom';
import { Music, ArrowRight, CheckCircle, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import EnhancedSEO from '../../seo/EnhancedSEO';
import { categories, getToolsByCategory, siteConfig } from '../../config/seoConfig';

const AudioToolsHub = () => {
  const category = categories.audio;
  const tools = getToolsByCategory('audio');

  const breadcrumbs = [
    { name: 'Home', url: siteConfig.url },
    { name: category.name, url: `${siteConfig.url}/${category.slug}` }
  ];

  const faqs = [
    {
      question: 'What audio formats are supported?',
      answer: 'We support MP3, WAV, AAC, OGG, FLAC, M4A, WMA, and many other audio formats for conversion and compression.'
    },
    {
      question: 'Will audio quality be affected?',
      answer: 'You control the quality. Choose bitrates from 128kbps to 320kbps, or use lossless formats like FLAC for perfect quality.'
    },
    {
      question: 'Can I batch convert audio files?',
      answer: 'Yes, convert multiple audio files simultaneously with our batch processing feature.'
    },
    {
      question: 'Are audio tools free?',
      answer: 'Yes, all audio conversion and compression tools are completely free with no hidden costs or limits.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <EnhancedSEO
        title="Free Audio Tools Online - Convert & Compress Audio Files"
        description="Professional audio tools online. Convert MP3, WAV, AAC, compress audio files, and more. High-quality audio processing, 100% free."
        keywords={category.keywords}
        canonical={`/${category.slug}`}
        toolName="Audio Tools Suite"
        toolCategory="Audio Processing Utility"
        faqs={faqs}
        breadcrumbs={breadcrumbs}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-600 to-red-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">Free Audio Tools Online</h1>
            <p className="text-xl md:text-2xl text-orange-100 mb-8 max-w-3xl mx-auto">{category.description}</p>
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
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-500 transition-colors">
                    <Music className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">{tool.name}</h3>
                  <p className="text-gray-600 mb-4 flex-grow">{tool.description}</p>
                  <div className="pt-4 border-t border-gray-100 flex items-center text-orange-600 font-semibold">
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

export default AudioToolsHub;
