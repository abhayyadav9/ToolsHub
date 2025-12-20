import React from 'react';
import { 
  Zap, 
  Shield, 
  Users, 
  Clock, 
  CheckCircle,
  ArrowRight,
  FileText,
  Image,
  QrCode
} from 'lucide-react';
import SEOHelmet from '../seo/SEOHelment';

const About = () => {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Our optimized algorithms process files in seconds, not minutes'
    },
    {
      icon: Shield,
      title: '100% Secure',
      description: 'Your files are processed locally and automatically deleted after download'
    },
    {
      icon: Users,
      title: 'User-Friendly',
      description: 'Simple drag-and-drop interface that anyone can use'
    },
    {
      icon: Clock,
      title: 'Always Available',
      description: '24/7 access to all tools without any registration required'
    }
  ];

  const tools = [
    {
      name: 'PDF Tools',
      description: 'Convert, merge, and compress PDF files',
      icon: FileText,
      features: ['PDF to Word conversion', 'Merge multiple PDFs', 'Compress PDF files']
    },
    {
      name: 'Image Tools',
      description: 'Compress and optimize images',
      icon: Image,
      features: ['JPEG/PNG compression', 'Bulk processing', 'Quality control']
    },
    {
      name: 'QR Generator',
      description: 'Generate QR codes for various content',
      icon: QrCode,
      features: ['Custom designs', 'Multiple formats', 'High resolution']
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
    "@type": "AboutPage",
    "name": "About ToolsHub",
    "description": "Learn about ToolsHub - the free online platform for PDF tools, image compression, and more. Fast, secure, and easy to use.",
    "url": "https://toolshub.me/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "ToolsHub",
      "description": "Free online tools for file processing and conversion",
      "url": "https://toolshub.me",
      "foundingDate": "2024",
      "numberOfEmployees": "1-10"
    }
  };

  return (
    <>
      <SEOHelmet
        title="About ToolsHub - Free Online File Processing Tools"
        description="Learn about ToolsHub, the free online platform for PDF tools, image compression, and more. Fast, secure, and easy to use. No registration required."
        keywords="about toolshub, online tools, PDF converter, file processing, free tools"
        structuredData={structuredData}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="gradient-bg py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                About <span className="text-gradient">ToolsHub</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We're on a mission to make file processing simple, fast, and accessible to everyone. 
                No registration, no hidden costs, just powerful tools that work.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  We believe that powerful file processing tools should be accessible to everyone, 
                  regardless of their technical expertise or budget. That's why we created ToolsHub - 
                  a completely free platform that puts professional-grade tools in your hands.
                </p>
                <p className="text-lg text-gray-600 mb-8">
                  Our tools are designed with simplicity in mind, but don't let that fool you. 
                  Under the hood, we use cutting-edge technology to ensure your files are processed 
                  quickly and securely.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Built for Speed</h3>
                    <p className="text-gray-600">Process files in seconds, not minutes</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-primary-600 mb-2">
                        {stat.number}
                      </div>
                      <div className="text-gray-600 font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose ToolsHub?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We've built our platform with your needs in mind
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

        {/* Tools Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Tools
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Professional-grade tools for all your file processing needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {tools.map((tool, index) => (
                <div key={index} className="card">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                    {React.createElement(tool.icon, { className: "w-6 h-6 text-primary-600" })}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {tool.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {tool.description}
                  </p>
                  <ul className="space-y-2">
                    {tool.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Your Privacy Matters
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  We take your privacy seriously. All files are processed locally on our servers 
                  and are automatically deleted after download. We don't store your files, 
                  we don't track your usage, and we don't sell your data.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-green-500 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Secure Processing</h3>
                      <p className="text-gray-600 text-sm">Files are processed in isolated environments</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-green-500 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Auto-Delete</h3>
                      <p className="text-gray-600 text-sm">Files are automatically deleted after 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Users className="w-5 h-5 text-green-500 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">No Registration</h3>
                      <p className="text-gray-600 text-sm">Use our tools without creating an account</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-primary-50 rounded-2xl p-8">
                <div className="text-center">
                  <Shield className="w-16 h-16 text-primary-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    100% Secure
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Your files are processed securely and never stored permanently
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-white rounded-lg p-3">
                      <div className="font-semibold text-gray-900">No Storage</div>
                      <div className="text-gray-600">Files deleted after use</div>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <div className="font-semibold text-gray-900">No Tracking</div>
                      <div className="text-gray-600">Your privacy protected</div>
                    </div>
                  </div>
                </div>
              </div>
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
            <a
              href="/tools/pdf-converter"
              className="btn-primary text-lg px-8 py-3 inline-flex items-center space-x-2"
            >
              <span>Start Using Tools</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
