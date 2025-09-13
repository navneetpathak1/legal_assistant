import React, { useState } from 'react';
import { 
  HelpCircle, 
  Search, 
  ChevronRight, 
  ChevronDown,
  ArrowLeft,
  Mail,
  Phone,
  MessageCircle,
  BookOpen,
  Video,
  FileText,
  Users
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HelpPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const faqSections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: BookOpen,
      questions: [
        {
          question: 'How do I create an account?',
          answer: 'Click on the "Sign Up" button on the homepage and choose whether you want to register as a client or lawyer. Fill in your details and verify your email address.'
        },
        {
          question: 'What\'s the difference between a client and lawyer account?',
          answer: 'Client accounts are for individuals seeking legal advice, while lawyer accounts are for legal professionals who want to provide consultation services.'
        },
        {
          question: 'How do I upgrade to Premium?',
          answer: 'Go to your dashboard and click on "Upgrade to Premium". You can pay using various payment methods including credit cards and digital wallets.'
        }
      ]
    },
    {
      id: 'legal-services',
      title: 'Legal Services',
      icon: Users,
      questions: [
        {
          question: 'What types of legal advice can I get?',
          answer: 'Our AI assistant can help with general legal questions, contract reviews, document analysis, and connect you with qualified lawyers for specific legal matters.'
        },
        {
          question: 'How do I book a consultation with a lawyer?',
          answer: 'Browse available lawyers in your area, check their specializations and availability, then book a consultation slot that works for you.'
        },
        {
          question: 'Is my legal information confidential?',
          answer: 'Yes, all your legal information and conversations are encrypted and kept strictly confidential. We follow industry-standard security practices.'
        }
      ]
    },
    {
      id: 'billing',
      title: 'Billing & Payments',
      icon: FileText,
      questions: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept major credit cards, debit cards, PayPal, and other digital payment methods. All payments are processed securely.'
        },
        {
          question: 'Can I get a refund?',
          answer: 'Refunds are available within 7 days of purchase for unused services. Please contact our support team for assistance.'
        },
        {
          question: 'How much does a lawyer consultation cost?',
          answer: 'Consultation fees vary by lawyer and specialization. You can see the rates on each lawyer\'s profile before booking.'
        }
      ]
    },
    {
      id: 'technical',
      title: 'Technical Support',
      icon: Video,
      questions: [
        {
          question: 'The chat feature isn\'t working properly',
          answer: 'Try refreshing the page or clearing your browser cache. If the issue persists, please contact our technical support team.'
        },
        {
          question: 'I can\'t upload documents',
          answer: 'Make sure your document is in PDF, DOC, or DOCX format and is under 10MB in size. Check your internet connection and try again.'
        },
        {
          question: 'How do I change my password?',
          answer: 'Go to Settings > Account > Change Password. Enter your current password and new password to update your account security.'
        }
      ]
    }
  ];

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help via email',
      contact: 'support@legalassist.com',
      action: 'Send Email'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Call us directly',
      contact: '+1 (555) 123-4567',
      action: 'Call Now'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our support team',
      contact: 'Available 24/7',
      action: 'Start Chat'
    }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const filteredSections = faqSections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.questions.some(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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
                <HelpCircle className="w-6 h-6 text-blue-600" />
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Help & Support
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search help articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Contact Methods */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    {method.description}
                  </p>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-4">
                    {method.contact}
                  </p>
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    {method.action}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQ Sections */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {filteredSections.map((section) => {
              const Icon = section.icon;
              const isExpanded = expandedSection === section.id;
              
              return (
                <div key={section.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {section.title}
                      </h3>
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  
                  {isExpanded && (
                    <div className="px-6 pb-4">
                      <div className="space-y-4">
                        {section.questions.map((faq, index) => (
                          <div key={index} className="border-l-4 border-blue-200 dark:border-blue-800 pl-4">
                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                              {faq.question}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400">
                              {faq.answer}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Additional Resources */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Documentation</h3>
              <ul className="space-y-2">
                <li><a href="/help" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">User Guide</a></li>
                <li><a href="/contact" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">API Documentation</a></li>
                <li><a href="/privacy" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">Security Guidelines</a></li>
                <li><a href="/privacy" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Community</h3>
              <ul className="space-y-2">
                <li><a href="/contact" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">Community Forum</a></li>
                <li><a href="/about" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">Legal Blog</a></li>
                <li><a href="/help" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">Video Tutorials</a></li>
                <li><a href="/contact" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">Webinars</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
