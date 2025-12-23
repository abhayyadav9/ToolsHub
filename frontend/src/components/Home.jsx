import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Image as ImageIcon, 
  QrCode, 
  Zap, 
  Shield, 
  Clock, 
  Download,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import SEOHelmet from '../seo/SEOHelment';
import EnhancedSEO from '../seo/EnhancedSEO';
import { siteConfig } from '../config/seoConfig';

// Animated Counter Component for Stats
const Counter = ({ value, label }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  
  // Extract number from string (e.g., "1M+" -> 1000000)
  const numericValue = parseInt(value.replace(/[^0-9]/g, '')) || 0;
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000; // 2 seconds
      const increment = numericValue / (duration / 16); 
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= numericValue) {
          setCount(numericValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, numericValue]);

  return (
    <div ref={ref} className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 mb-2">
        {isInView ? count : 0}{suffix}
      </div>
      <div className="text-gray-600 font-bold uppercase tracking-wide text-sm">{label}</div>
    </div>
  );
};

const Home = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardHover = {
    rest: { scale: 1, y: 0 },
    hover: { 
      scale: 1.03, 
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { type: "spring", stiffness: 300 }
    }
  };

  const tools = [
    {
      name: 'PDF Converter',
      description: 'Convert PDF to Word, merge multiple PDFs, and compress PDF files',
      icon: FileText,
      href: '/tools/pdf-to-word',
      features: ['PDF to Word', 'Merge PDFs', 'Compress PDF'],
      color: 'bg-blue-500',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Image Compressor',
      description: 'Compress and optimize images without losing quality',
      icon: ImageIcon,
      href: '/tools/compress-image',
      features: ['JPEG/PNG', 'Bulk compression', 'Quality control'],
      color: 'bg-green-500',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      name: 'QR Generator',
      description: 'Generate QR codes for URLs, text, and contact information',
      icon: QrCode,
      href: '/tools/qr-generator',
      features: ['Custom design', 'Multiple formats', 'High resolution'],
      color: 'bg-purple-500',
      gradient: 'from-purple-500 to-pink-500'
    }
  ];

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Process files in seconds with our optimized algorithms',
      color: 'text-yellow-500',
      bg: 'bg-yellow-50'
    },
    {
      icon: Shield,
      title: '100% Secure',
      description: 'Your files are processed locally and never stored permanently',
      color: 'text-blue-500',
      bg: 'bg-blue-50'
    },
    {
      icon: Clock,
      title: 'Always Available',
      description: '24/7 access to all tools without registration required',
      color: 'text-green-500',
      bg: 'bg-green-50'
    },
    {
      icon: Download,
      title: 'Instant Download',
      description: 'Get your processed files immediately after conversion',
      color: 'text-purple-500',
      bg: 'bg-purple-50'
    }
  ];

  const stats = [
    { number: '3M+', label: 'Files Processed' },
    { number: '1K+', label: 'Happy Users' },
    { number: '99%', label: 'Uptime' },
    { number: '24/7', label: 'Available' }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "ToolsHub",
    "description": "Free online PDF tools including PDF to Word converter, PDF merger, PDF compressor, and more. Fast, secure, and easy to use.",
    "url": "https://toolshub.me",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  return (
    <>
      <EnhancedSEO
        title="Free Online Tools for PDF, Images, Video & More | ToolsHub"
        description="Convert PDFs, edit images, compress files, and process videos for free. 24+ professional tools. No registration required, 100% secure."
        keywords={['free online tools', 'pdf converter', 'image editor', 'video converter', 'document converter', 'file converter']}
        canonical="/"
        ogImage="/og-image.jpg"
      />
      <div className="overflow-hidden">
      <SEOHelmet
        title="Free Online PDF Tools & More - ToolsHub"
        description="Convert PDF to Word, merge PDFs, compress files, and more with our free online tools."
        keywords="PDF converter, PDF to Word, merge PDF, compress PDF, online tools"
        structuredData={structuredData}
      />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-red-600 origin-left z-50"
        style={{ scaleX }}
      />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-gray-50">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              x: [0, 100, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -right-20 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30" 
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [0, -90, 0],
              x: [0, -100, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-20 -left-20 w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30" 
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-8 text-sm font-semibold text-gray-600">
              <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>Trust by thousands of users worldwide</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
              Free Online Tools for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                Limitless Creativity
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Convert, compress, and transform your files with our powerful online suite. 
              No registration required, completely free, and 100% secure.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/tools/compress-pdf">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-orange-500/30 flex items-center gap-2"
                >
                  Start Converting <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link to="/about">
                <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: "#ffffff" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-xl font-bold text-lg hover:shadow-lg transition-all"
                >
                  Explore Tools
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* STATS SECTION (Animated Counter) */}
      <section className="py-12 bg-white relative z-20 -mt-10 mx-4 md:mx-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Counter key={index} value={stat.number} label={stat.label} />
            ))}
          </div>
        </div>
      </section>

      {/* TOOLS SECTION */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Our Powerful Tools</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Everything you need to work with files, optimized for speed.</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {tools.map((tool, index) => (
              <Link key={index} to={tool.href}>
                <motion.div 
                  variants={cardHover}
                  initial="rest"
                  whileHover="hover"
                  className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm h-full flex flex-col relative overflow-hidden group"
                >
                  {/* Hover Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  
                  <div className={`w-14 h-14 ${tool.color} rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg transform group-hover:rotate-6 transition-transform duration-300`}>
                    {React.createElement(tool.icon, { className: "w-7 h-7" })}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                    {tool.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                    {tool.description}
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {tool.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center space-x-3 text-sm text-gray-500">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6 border-t border-gray-100 flex items-center text-orange-600 font-bold group-hover:text-orange-700">
                    <span>Try Tool</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Why Choose ToolsHub?</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="text-center group"
              >
                <div className={`w-20 h-20 ${feature.bg} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {React.createElement(feature.icon, { className: `w-10 h-10 ${feature.color}` })}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-24 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 transform -skew-y-2 origin-top-left scale-110" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-orange-100 mb-10"
          >
            Join thousands of users who trust ToolsHub for their daily file processing needs.
          </motion.p>
          
          <Link to="/tools/compress-pdf">
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-orange-600 text-lg font-bold px-10 py-4 rounded-full inline-flex items-center gap-2 shadow-xl"
            >
              <span>Start Using Tools Free</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </div>
      </motion.section>
    </div>
    </>
  );
};

export default Home;