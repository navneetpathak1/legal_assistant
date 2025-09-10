import React from 'react';
import { ArrowLeft, Scale, Shield, FileText, AlertTriangle, Users, Globe, Lock } from 'lucide-react';
import { Link } from "react-router-dom"
interface TermsConditionsProps {
  onBack: () => void;
  page: string
}

const TermsConditions: React.FC<TermsConditionsProps> = ({ onBack, page }) => {
  const sections = [
    {
      id: 'acceptance',
      title: '1. Acceptance of Terms',
      icon: FileText,
      content: `By accessing and using the Legal Assist website and services ("the Platform"), you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our platform. These terms apply to all visitors, users, and others who access or use the service.`
    },
    {
      id: 'definitions',
      title: '2. Definitions',
      icon: Scale,
      content: `"Legal Assist" refers to our AI-powered legal assistance platform and all related services.
"User" means any individual who accesses or uses our platform.
"Content" includes all text, data, information, software, graphics, or other materials.
"Services" encompasses all features, tools, and functionalities provided through our platform.
"Professional Legal Advice" means formal legal counsel provided by licensed attorneys.`
    },
    {
      id: 'platform-description',
      title: '3. Platform Description',
      icon: Globe,
      content: `Legal Assist is a comprehensive legal technology platform that provides:
• AI-powered legal information and guidance
• Document analysis and review tools
• Legal research assistance
• Connection with qualified legal professionals
• Educational legal resources and templates
• Case management and tracking tools

Our platform is designed to make legal information more accessible while connecting users with professional legal services when needed.`
    },
    {
      id: 'user-accounts',
      title: '4. User Accounts and Registration',
      icon: Users,
      content: `To access certain features, you must create an account by providing accurate, current, and complete information. You are responsible for:
• Maintaining the confidentiality of your account credentials
• All activities that occur under your account
• Notifying us immediately of any unauthorized use
• Ensuring your account information remains accurate and up-to-date

We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent activity.`
    },
    {
      id: 'service-limitations',
      title: '5. Service Limitations and Disclaimers',
      icon: AlertTriangle,
      content: `IMPORTANT: Legal Assist does NOT provide legal advice and should NOT be considered a substitute for professional legal counsel. Our services are for informational and educational purposes only.

• We do not create attorney-client relationships
• Information provided is general in nature and may not apply to your specific situation
• We cannot guarantee the accuracy, completeness, or timeliness of information
• Always consult with qualified attorneys for specific legal matters
• We are not responsible for decisions made based on platform information`
    },
    {
      id: 'user-conduct',
      title: '6. User Conduct and Responsibilities',
      icon: Shield,
      content: `Users must comply with all applicable laws and regulations. Prohibited activities include:
• Providing false or misleading information
• Attempting to gain unauthorized access to our systems
• Using the platform for illegal activities
• Harassing, threatening, or defaming others
• Sharing confidential information inappropriately
• Violating intellectual property rights
• Attempting to reverse engineer our technology
• Using automated systems to access our platform without permission`
    },
    {
      id: 'privacy-security',
      title: '7. Privacy and Data Security',
      icon: Lock,
      content: `We are committed to protecting your privacy and maintaining the security of your information:
• All communications are encrypted using industry-standard protocols
• We follow strict data protection and privacy policies
• Personal information is not shared with third parties without consent
• We implement robust security measures to protect against data breaches
• Users can request data deletion in accordance with applicable privacy laws
• We comply with GDPR, CCPA, and other relevant privacy regulations

For detailed information, please review our Privacy Policy.`
    },
    {
      id: 'intellectual-property',
      title: '8. Intellectual Property Rights',
      icon: Scale,
      content: `All content, features, functionality, and technology on Legal Assist are owned by us and protected by copyright, trademark, patent, and other intellectual property laws.

Users retain ownership of content they submit but grant us a license to use, modify, and display such content for platform operations. Users may not:
• Copy, modify, or distribute our proprietary content
• Use our trademarks without written permission
• Create derivative works based on our platform
• Remove or alter copyright notices`
    },
    {
      id: 'subscription-services',
      title: '9. Subscription Services and Billing',
      icon: FileText,
      content: `Legal Assist offers both free and premium subscription services:

FREE TIER:
• Basic AI legal assistance
• Limited document analysis
• Access to legal resources

PRO SUBSCRIPTION ($29/month):
• Unlimited AI consultations
• Advanced document analysis
• Priority lawyer matching
• Premium support
• Extended legal research access

Billing terms:
• Subscriptions auto-renew monthly
• Cancellation takes effect at the end of the billing period
• No refunds for partial months
• Prices subject to change with 30 days notice`
    },
    {
      id: 'third-party-services',
      title: '10. Third-Party Services and Links',
      icon: Globe,
      content: `Our platform may contain links to third-party websites, services, or applications. We are not responsible for:
• The content, privacy policies, or practices of third-party services
• Any damages or losses caused by third-party services
• The availability or functionality of external links

When connecting with legal professionals through our platform, separate terms may apply to those professional relationships.`
    },
    {
      id: 'limitation-liability',
      title: '11. Limitation of Liability',
      icon: AlertTriangle,
      content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW:
• Legal Assist shall not be liable for any indirect, incidental, special, consequential, or punitive damages
• Our total liability shall not exceed the amount paid for services in the preceding 12 months
• We disclaim all warranties, express or implied, including merchantability and fitness for a particular purpose
• We are not liable for service interruptions, data loss, or security breaches beyond our reasonable control
• Users assume all risks associated with using our platform`
    },
    {
      id: 'indemnification',
      title: '12. Indemnification',
      icon: Shield,
      content: `Users agree to indemnify, defend, and hold harmless Legal Assist, its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from:
• User's violation of these terms
• User's use of the platform
• User's violation of any rights of another party
• User's violation of applicable laws or regulations

This indemnification obligation survives termination of these terms.`
    },
    {
      id: 'termination',
      title: '13. Termination',
      icon: FileText,
      content: `Either party may terminate this agreement at any time:

USER TERMINATION:
• Users may delete their accounts at any time
• Cancellation of subscriptions takes effect at the end of the billing period
• Users remain responsible for all charges incurred before termination

PLATFORM TERMINATION:
• We may suspend or terminate accounts for terms violations
• We may discontinue services with reasonable notice
• Upon termination, user access to the platform ceases immediately
• Certain provisions of these terms survive termination`
    },
    {
      id: 'dispute-resolution',
      title: '14. Dispute Resolution',
      icon: Scale,
      content: `BINDING ARBITRATION:
• Most disputes will be resolved through binding arbitration rather than court proceedings
• Arbitration will be conducted by a neutral arbitrator in accordance with established rules
• Class action lawsuits are waived
• Users may opt out of arbitration within 30 days of account creation

GOVERNING LAW:
• These terms are governed by the laws of [Jurisdiction]
• Any disputes not subject to arbitration will be resolved in the courts of [Location]`
    },
    {
      id: 'modifications',
      title: '15. Modifications to Terms',
      icon: FileText,
      content: `We reserve the right to modify these Terms and Conditions at any time. Changes will be effective when:
• Posted on our website with an updated "Last Modified" date
• Users are notified via email for material changes
• Continued use of the platform after changes constitutes acceptance

We encourage users to review these terms periodically. If you disagree with any changes, you must discontinue use of the platform.`
    },
    {
      id: 'general-provisions',
      title: '16. General Provisions',
      icon: Scale,
      content: `SEVERABILITY: If any provision is found unenforceable, the remaining provisions remain in full effect.

ENTIRE AGREEMENT: These terms constitute the entire agreement between users and Legal Assist.

NO WAIVER: Failure to enforce any provision does not constitute a waiver of that provision.

ASSIGNMENT: Users may not assign these terms without our written consent.

FORCE MAJEURE: We are not liable for delays or failures due to circumstances beyond our reasonable control.

SURVIVAL: Provisions that by their nature should survive termination will continue to apply.`
    },
    {
      id: 'Follow',
      title: '17. Follow My Social Account',
      icon: FileText,
      content: `You should follow my Social Account`
    },
    {
      id: 'contact-information',
      title: '18. Contact Information',
      icon: FileText,
      content: `For questions, concerns, or legal notices regarding these Terms and Conditions:

LEGAL DEPARTMENT:
📧 Email: navneetpathak1909@gmail.com
📞 Phone: +918923651177

MAILING ADDRESS:
Graphic Era Hill University Bhimtal

BUSINESS HOURS:
Monday - Friday: 9:00 AM - 6:00 PM EST
Response time: I will try to reply but not guarantee

For technical support or general questions, please use our in-platform support system or visit our Help Center (HPC Lab).`
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Link to={page} ><ArrowLeft size={24} className="text-gray-600" /></Link>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Scale size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Terms & Conditions</h1>
                <p className="text-gray-600">Legal Assist Platform - General Terms of Service</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Introduction */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText size={32} className="text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Welcome to Legal Assist</h2>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              These Terms and Conditions govern your use of the Legal Assist platform, including our website, 
              mobile applications, and all related services. Please read these terms carefully as they contain 
              important information about your rights and obligations when using our platform.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">Important Legal Notice</h3>
                  <p className="text-blue-800 text-sm">
                    Last updated: January 15, 2025. By using Legal Assist, you agree to these terms. 
                    These terms may be updated periodically with notice to users.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Scale size={20} className="text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-amber-900 mb-1">Not Legal Advice</h3>
                  <p className="text-amber-800 text-sm">
                    Legal Assist provides information and tools but does not provide legal advice. 
                    Always consult qualified attorneys for specific legal matters.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Terms Sections */}
        <div className="space-y-6">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon size={24} className="text-gray-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 leading-tight">{section.title}</h2>
                </div>
                <div className="ml-16">
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mt-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Questions About These Terms?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              If you have any questions about these Terms & Conditions or need clarification on any provisions, 
              our legal team is here to help. We're committed to transparency and clear communication.
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2">
                <span>📧</span>
                <span>navneetpathak1909@gmail.com</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span>📞</span>
                <span>+918923651177</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span>📍</span>
                <span>123 Legal Tech Blvd</span>
              </div>
            </div>
          </div>
        </div>

        {/* Agreement Button */}
        <div className="text-center mt-8">
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            I Understand and Agree to These Terms
          </button>
          <p className="text-sm text-gray-500 mt-4 max-w-md mx-auto">
            By clicking this button, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;