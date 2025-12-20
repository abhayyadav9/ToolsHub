import React from 'react';
import { Link } from 'react-router-dom';
import { Video, ArrowRight, CheckCircle, Star, Zap, Shield, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import EnhancedSEO from '../../seo/EnhancedSEO';
import { categories, getToolsByCategory, siteConfig } from '../../config/seoConfig';

const VideoToolsHub = () => {
  const category = categories.video;
  const tools = getToolsByCategory('video');

  const breadcrumbs = [
    { name: 'Home', url: siteConfig.url },
    { name: category.name, url: `${siteConfig.url}/${category.slug}` }
  ];

  const faqs = [
    {
      question: 'What video formats can I convert?',
      answer: 'We support all major formats including MP4, AVI, MOV, MKV, WMV, FLV, WebM, and more. Convert between any supported formats freely.'
    },
    {
      question: 'Is there a video file size limit?',
      answer: 'Free users can process videos up to 2GB. Files are processed quickly and securely in the cloud.'
    },
    {
      question: 'Will video quality be preserved?',
      answer: 'Yes, you can maintain original quality or choose custom settings for resolution, bitrate, and compression levels.'
    },
    {
      question: 'Can I extract audio from video?',
      answer: 'Absolutely! Use our Video to Audio tool to extract high-quality audio in MP3, AAC, WAV, and other formats.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <EnhancedSEO
        title="Free Video Tools Online - Convert, Compress & Edit Videos"
        description="Professional video processing tools online. Convert video formats, compress videos, extract audio, and more. Fast, free, and secure video tools."
        keywords={category.keywords}
        canonical={`/${category.slug}`}
        toolName="Video Tools Suite"
        toolCategory="Video Processing Utility"
        faqs={faqs}
        breadcrumbs={breadcrumbs}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
              <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
              <span className="text-sm font-semibold">Professional Video Processing</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">Free Video Tools Online</h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto">{category.description}</p>
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
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-500 transition-colors">
                    <Video className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">{tool.name}</h3>
                  <p className="text-gray-600 mb-4 flex-grow">{tool.description}</p>
                  <div className="pt-4 border-t border-gray-100 flex items-center text-purple-600 font-semibold">
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

export default VideoToolsHub;
