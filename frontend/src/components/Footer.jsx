import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Github, Twitter, Mail, FileText, Image, QrCode } from 'lucide-react';


const Footer = () => {
  const currentYear = new Date().getFullYear();

  const tools = [
    { name: 'PDF to Word', href: '/tools/pdf-to-word', icon: FileText },
    { name: 'Merge PDF', href: '/tools/merge-pdf', icon: FileText },
    { name: 'Compress PDF', href: '/tools/compress-pdf', icon: FileText },
    { name: 'Image Compressor', href: '/tools/compress-image', icon: Image },
    { name: 'QR Generator', href: '/tools/qr-generator', icon: QrCode },
    { name: 'Image to PDF', href: '/tools/image-to-pdf', icon: FileText },
    { name: 'Word to PDF', href: '/tools/word-to-pdf', icon: FileText },
    { name: 'Split PDF', href: '/tools/split-pdf', icon: FileText },
  ];

  const resources = [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Blog', href: '/blog' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ];

  const socialLinks = [
    { name: 'GitHub', href: '#', icon: Github },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Email', href: 'mailto:contact@toolshub.me', icon: Mail },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">ToolsHub</span>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Free online tools for PDF conversion, image compression, QR code generation, and more. 
              Fast, secure, and easy to use.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label={social.name}
                >
                  {React.createElement(social.icon, { className: "w-5 h-5" })}
                </a>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tools</h3>
            <ul className="space-y-2">
              {tools.map((tool) => (
                <li key={tool.name}>
                  <Link
                    to={tool.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center space-x-2"
                  >
                    {React.createElement(tool.icon, { className: "w-4 h-4" })}
                    <span>{tool.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <Link
                    to={resource.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {resource.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Get notified about new tools and features.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              />
              <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-r-lg transition-colors duration-200 text-sm font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} ToolsHub. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
