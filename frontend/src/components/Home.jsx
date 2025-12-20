import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Image, 
  QrCode, 
  Zap, 
  Shield, 
  Clock, 
  Download,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import SEOHelmet from '../seo/SEOHelment';

const Home = () => {
  const tools = [
    {
      name: 'PDF Converter',
      description: 'Convert PDF to Word, merge multiple PDFs, and compress PDF files',
      icon: FileText,
      href: '/tools/pdf-converter',
      features: ['PDF to Word', 'Merge PDFs', 'Compress PDF'],
      color: 'bg-blue-500'
    },
    {
      name: 'Image Compressor',
      description: 'Compress and optimize images without losing quality',
      icon: Image,
      href: '/tools/image-compressor',
      features: ['JPEG/PNG', 'Bulk compression', 'Quality control'],
      color: 'bg-green-500'
    },
    {
      name: 'QR Generator',
      description: 'Generate QR codes for URLs, text, and contact information',
      icon: QrCode,
      href: '/tools/qr-generator',
      features: ['Custom design', 'Multiple formats', 'High resolution'],
      color: 'bg-purple-500'
    }
  ];

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Process files in seconds with our optimized algorithms'
    },
    {
      icon: Shield,
      title: '100% Secure',
      description: 'Your files are processed locally and never stored permanently'
    },
    {
      icon: Clock,
      title: 'Always Available',
      description: '24/7 access to all tools without registration required'
    },
    {
      icon: Download,
      title: 'Instant Download',
      description: 'Get your processed files immediately after conversion'
    }
  ];

  const stats = [
    { number: '1M+', label: 'Files Processed' },
    { number: '50K+', label: 'Happy Users' },
    { number: '99.9%', label: 'Uptime' },
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
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "PDF to Word conversion",
      "PDF merging",
      "PDF compression",
      "Image compression",
      "QR code generation"
    ]
  };

  return (
    <>
      <SEOHelmet
        title="Free Online PDF Tools & More - ToolsHub"
        description="Convert PDF to Word, merge PDFs, compress files, and more with our free online tools. Fast, secure, and easy to use. No registration required."
        keywords="PDF converter, PDF to Word, merge PDF, compress PDF, online tools, free tools, image compressor, QR generator"
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <section className="gradient-bg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Free Online Tools for
              <span className="text-gradient block mt-2">Everyone</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Convert, compress, and transform your files with our powerful online tools. 
              No registration required, completely free, and your files stay private.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/tools/pdf-converter"
                className="btn-primary text-lg px-8 py-3 inline-flex items-center space-x-2"
              >
                <span>Start Converting</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/about"
                className="btn-secondary text-lg px-8 py-3"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Powerful Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to work with files, all in one place
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <Link
                key={index}
                to={tool.href}
                className="card hover:shadow-lg transition-all duration-300 group"
              >
                <div className={`w-12 h-12 ${tool.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {React.createElement(tool.icon, { className: "w-6 h-6 text-white" })}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {tool.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {tool.description}
                </p>
                <ul className="space-y-1">
                  {tool.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-500">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex items-center text-primary-600 font-medium group-hover:text-primary-700">
                  <span>Try it now</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose ToolsHub?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make file processing simple, fast, and secure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {React.createElement(feature.icon, { className: "w-8 h-8 text-primary-600" })}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of users who trust ToolsHub for their file processing needs
          </p>
          <Link
            to="/tools/pdf-converter"
            className="btn-primary text-lg px-8 py-3 inline-flex items-center space-x-2"
          >
            <span>Start Using Tools</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
