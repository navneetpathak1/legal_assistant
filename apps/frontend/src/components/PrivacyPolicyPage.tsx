import React from 'react';
import { 
  Shield, 
  ArrowLeft, 
  Eye, 
  Lock, 
  Database, 
  Users,
  FileText,
  CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicyPage: React.FC = () => {
  const navigate = useNavigate();

  const sections = [
    {
      id: 'introduction',
      title: 'Introduction',
      icon: FileText,
      content: `LegalAssist ("we," "our," or "us") is committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our legal assistance platform and services.`
    },
    {
      id: 'information-collection',
      title: 'Information We Collect',
      icon: Database,
      content: `We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support. This may include:

• Personal Information: Name, email address, phone number, country, and other contact details
• Professional Information: For lawyers, we collect specialization, availability, consultation fees, and professional credentials
• Communication Data: Messages, consultations, and other communications through our platform
• Payment Information: Billing details and payment history (processed securely through third-party providers)
• Usage Data: Information about how you interact with our platform, features used, and time spent`
    },
    {
      id: 'how-we-use',
      title: 'How We Use Your Information',
      icon: Users,
      content: `We use the information we collect to:

• Provide and maintain our legal assistance services
• Connect clients with qualified lawyers
• Process payments and manage subscriptions
• Send important updates about your account and our services
• Improve our platform and develop new features
• Provide customer support and respond to inquiries
• Ensure platform security and prevent fraud
• Comply with legal obligations and enforce our terms of service`
    },
    {
      id: 'information-sharing',
      title: 'Information Sharing and Disclosure',
      icon: Shield,
      content: `We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:

• With your consent or at your direction
• With lawyers you choose to consult with (limited to necessary information)
• With service providers who assist us in operating our platform (under strict confidentiality agreements)
• When required by law or to protect our rights and safety
• In connection with a business transfer or acquisition
• With your explicit consent for other purposes`
    },
    {
      id: 'data-security',
      title: 'Data Security',
      icon: Lock,
      content: `We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:

• Encryption of data in transit and at rest
• Regular security assessments and updates
• Access controls and authentication measures
• Secure data centers and infrastructure
• Employee training on data protection practices
• Incident response procedures

However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.`
    },
    {
      id: 'your-rights',
      title: 'Your Rights and Choices',
      icon: CheckCircle,
      content: `Depending on your location, you may have certain rights regarding your personal information:

• Access: Request access to your personal information we hold
• Correction: Request correction of inaccurate or incomplete information
• Deletion: Request deletion of your personal information
• Portability: Request a copy of your data in a portable format
• Restriction: Request restriction of processing in certain circumstances
• Objection: Object to processing based on legitimate interests
• Withdrawal: Withdraw consent where processing is based on consent

To exercise these rights, please contact us using the information provided in the "Contact Us" section.`
    },
    {
      id: 'data-retention',
      title: 'Data Retention',
      icon: Database,
      content: `We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Specifically:

• Account information: Retained while your account is active and for a reasonable period thereafter
• Communication records: Retained for legal and business purposes as required
• Payment information: Retained as required by financial regulations
• Usage data: Retained for analytics and improvement purposes

We will securely delete or anonymize your information when it is no longer needed.`
    },
    {
      id: 'cookies',
      title: 'Cookies and Tracking Technologies',
      icon: Eye,
      content: `We use cookies and similar tracking technologies to enhance your experience on our platform. These technologies help us:

• Remember your preferences and settings
• Analyze platform usage and performance
• Provide personalized content and features
• Ensure platform security and functionality

You can control cookie settings through your browser preferences, though disabling certain cookies may affect platform functionality.`
    },
    {
      id: 'third-party',
      title: 'Third-Party Services',
      icon: Users,
      content: `Our platform may integrate with third-party services for various functions:

• Payment processing (Razorpay, Stripe)
• Communication services
• Analytics and performance monitoring
• Customer support tools

These third parties have their own privacy policies, and we encourage you to review them. We are not responsible for the privacy practices of these third-party services.`
    },
    {
      id: 'international',
      title: 'International Data Transfers',
      icon: Shield,
      content: `Your information may be transferred to and processed in countries other than your country of residence. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards, including:

• Standard contractual clauses approved by relevant authorities
• Adequacy decisions by data protection authorities
• Other appropriate safeguards as required by law`
    },
    {
      id: 'children',
      title: 'Children\'s Privacy',
      icon: Shield,
      content: `Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information promptly.

If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.`
    },
    {
      id: 'changes',
      title: 'Changes to This Privacy Policy',
      icon: FileText,
      content: `We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any material changes by:

• Posting the updated policy on our platform
• Sending you an email notification
• Providing notice through our platform

Your continued use of our services after any changes indicates your acceptance of the updated Privacy Policy.`
    },
    {
      id: 'contact',
      title: 'Contact Us',
      icon: Users,
      content: `If you have any questions about this Privacy Policy or our privacy practices, please contact us:

Email: privacy@legalassist.com
Phone: +1 (555) 123-4567
Address: 123 Legal Street, Suite 100, New York, NY 10001

We will respond to your inquiry within 30 days of receipt.`
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-blue-600" />
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Privacy Policy
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Introduction */}
        <div className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Privacy Policy
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Your privacy is important to us. This Privacy Policy explains how LegalAssist collects, 
              uses, and protects your information when you use our legal assistance platform.
            </p>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Table of Contents
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {sections.map((section, index) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 py-1"
                >
                  <span className="text-sm font-medium">{index + 1}.</span>
                  <span className="text-sm">{section.title}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div key={section.id} id={section.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                <div className="flex items-center space-x-3 mb-4">
                  <Icon className="w-6 h-6 text-blue-600" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {index + 1}. {section.title}
                  </h3>
                </div>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Questions About Privacy?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            If you have any questions about this Privacy Policy or our privacy practices, 
            please don't hesitate to contact us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/contact')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Contact Us
            </button>
            <button
              onClick={() => navigate('/help')}
              className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Help Center
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
