import React from 'react';
import { Shield, Lock, EyeOff, ServerOff, FileX, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  const lastUpdated = "December 21, 2025";

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      
      {/* Header / Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-green-50 rounded-full mb-6">
            <Shield className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Your Privacy is Our Priority
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We built ToolsHub with a strict <span className="font-bold text-gray-900">"No-Storage"</span> architecture. 
            We do not save, store, or view your files. Period.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        
        {/* Core Promise Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <PolicyCard 
            icon={<ServerOff size={32} className="text-blue-500" />}
            title="No Server Storage"
            description="When you upload a file (PDF, Image, Video), it is processed temporarily in memory and deleted immediately after the conversion or compression is complete."
          />
          <PolicyCard 
            icon={<EyeOff size={32} className="text-purple-500" />}
            title="No Human Access"
            description="Our processes are 100% automated. No human—including our developers—has the technical ability to view or access your uploaded content."
          />
          <PolicyCard 
            icon={<Lock size={32} className="text-orange-500" />}
            title="Client-Side Processing"
            description="Many of our tools (like QR generation and cropping) run entirely in your browser. Your data never even leaves your device."
          />
          <PolicyCard 
            icon={<FileX size={32} className="text-red-500" />}
            title="Zero Retention Logs"
            description="We do not keep logs of the files you process. Once you close the tab or download your result, the data trace is gone forever."
          />
        </div>

        {/* Detailed Sections */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-8">
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Data Collection & Usage</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Unlike other free tools, we do not monetize your data.
            </p>
            <ul className="space-y-3">
              <ListItem text="We DO NOT store your uploaded files (PDFs, Images, Videos)." />
              <ListItem text="We DO NOT share your data with third parties or advertisers." />
              <ListItem text="We DO NOT use your content to train AI models." />
              <ListItem text="We only collect anonymous usage statistics (e.g., '100 files processed today') to improve site performance." />
            </ul>
          </section>

          <hr className="border-gray-100" />

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Local Storage & Cookies</h2>
            <p className="text-gray-600 leading-relaxed">
              We use minimal local storage on your device simply to save your UI preferences (like Dark Mode or your last used settings). This data stays on your browser and is never sent to our servers.
            </p>
          </section>

          <hr className="border-gray-100" />

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Security Measures</h2>
            <p className="text-gray-600 leading-relaxed">
              All data transfers between your device and our processing servers are encrypted using **SSL/TLS (Secure Sockets Layer)** technology. This ensures that no one can intercept your files during the upload or download process.
            </p>
          </section>

        </div>

        {/* Footer / Contact */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm mb-6">
            Last Updated: {lastUpdated}
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/" className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
              Return Home
            </Link>
            <Link to="/contact" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-colors">
              Contact Us <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

/* --- Sub-Components --- */

const PolicyCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
  </div>
);

const ListItem = ({ text }) => (
  <li className="flex items-start gap-3 text-gray-600">
    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
    <span>{text}</span>
  </li>
);