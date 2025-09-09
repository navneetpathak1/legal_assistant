import { useState } from "react";
import {
  Menu,
  X,
  Scale,
  Shield,
  FileText,
  Users,
  Clock,
  Award,
  ChevronRight,
  Star,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Briefcase,
  Heart,
} from "lucide-react";
import Footer from "./Footer";

function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const services = [
    {
      icon: <Scale className="w-8 h-8" />,
      title: "Legal Research",
      description:
        "Comprehensive legal research and case analysis to support your legal arguments and strategies.",
      features: ["Case Law Analysis", "Statute Research", "Legal Precedents"],
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Document Preparation",
      description:
        "Professional preparation of legal documents, contracts, and court filings with precision.",
      features: ["Contract Drafting", "Legal Forms", "Court Documents"],
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Client Consultation",
      description:
        "Expert legal consultation services to guide you through complex legal matters.",
      features: ["Legal Advice", "Case Evaluation", "Strategy Planning"],
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Compliance Support",
      description:
        "Ensure your business stays compliant with all relevant laws and regulations.",
      features: [
        "Regulatory Compliance",
        "Risk Assessment",
        "Policy Development",
      ],
    },
  ];

  const testimonials = [
    {
      name: "Navneet Pathak",
      role: "Business Owner",
      content:
        "The legal assistant service exceeded my expectations. Professional, thorough, and incredibly helpful throughout my case.",
      rating: 5,
    },
    {
      name: "Navneet Pathak",
      role: "Startup Founder",
      content:
        "Outstanding support for our legal documentation needs. Fast, accurate, and cost-effective solutions.",
      rating: 5,
    },
    {
      name: "Navneet Pathak",
      role: "Individual Client",
      content:
        "Made the legal process so much easier to understand. Highly recommend their consultation services.",
      rating: 5,
    },
  ];

  const stats = [
    {
      number: "2+",
      label: "Cases Handled",
      icon: <Briefcase className="w-6 h-6" />,
    },
    {
      number: "100%",
      label: "Success Rate",
      icon: <Award className="w-6 h-6" />,
    },
    {
      number: "24/7",
      label: "Support Available",
      icon: <Clock className="w-6 h-6" />,
    },
    {
      number: "50+",
      label: "Legal Areas",
      icon: <BookOpen className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Scale className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">
                LegalAssist
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#home"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Home
              </a>
              <a
                href="#services"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Services
              </a>
              <a
                href="#about"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                About
              </a>
              <a
                href="#testimonials"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Reviews
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Contact
              </a>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
                Get Started
              </button>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-600"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-200 shadow-lg">
              <div className="px-4 py-4 space-y-4">
                <a
                  href="#home"
                  className="block text-gray-700 hover:text-blue-600 font-medium"
                >
                  Home
                </a>
                <a
                  href="#services"
                  className="block text-gray-700 hover:text-blue-600 font-medium"
                >
                  Services
                </a>
                <a
                  href="#about"
                  className="block text-gray-700 hover:text-blue-600 font-medium"
                >
                  About
                </a>
                <a
                  href="#testimonials"
                  className="block text-gray-700 hover:text-blue-600 font-medium"
                >
                  Reviews
                </a>
                <a
                  href="#contact"
                  className="block text-gray-700 hover:text-blue-600 font-medium"
                >
                  Contact
                </a>
                <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors">
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="pt-20 pb-16 bg-gradient-to-br from-blue-50 via-white to-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Your Trusted
                  <span className="text-blue-600 block">Legal Assistant</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Professional legal support services designed to simplify
                  complex legal processes and provide expert system guidance for
                  individuals and businesses.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center group">
                  Start Consultation
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full hover:border-blue-600 hover:text-blue-600 transition-all duration-300">
                  Learn More
                </button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Licensed Professionals</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Confidential</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Shield className="w-12 h-12" />
                    <div className="text-right">
                      <div className="text-2xl font-bold">2+</div>
                      <div className="text-blue-100">Cases Handled</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-6 h-6" />
                        <div>
                          <div className="font-semibold">Document Review</div>
                          <div className="text-blue-100 text-sm">
                            Professional system Analysis
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <Users className="w-6 h-6" />
                        <div>
                          <div className="font-semibold">
                            Legal Consultation
                          </div>
                          <div className="text-blue-100 text-sm">
                            Expert system Guidance
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Legal Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive legal assistance tailored to meet your specific
              needs with professional expertise and personalized attention.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <div className="text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <button className="text-blue-600 font-semibold flex items-center group-hover:text-blue-700">
                    Learn More
                    <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">
                Why Choose LegalAssist?
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Smart, reliable, and always by your side—making legal guidance
                simple and accessible.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-full p-2">
                    <Award className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Expert System
                    </h3>
                    <p className="text-gray-600">
                      Expert legal system with extensive experience across
                      multiple practice areas.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-full p-2">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      24/7 Availability
                    </h3>
                    <p className="text-gray-600">
                      Round-the-clock support for urgent legal matters and
                      emergency consultations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-full p-2">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Confidential & Secure
                    </h3>
                    <p className="text-gray-600">
                      Complete confidentiality and secure handling of all your
                      legal documents and information.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold">Get Started Today</h3>
                  <p className="text-blue-100">
                    Schedule a consultation with our legal experts and get
                    personalized assistance for your legal needs.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold">1</span>
                      </div>
                      <span>Schedule Consultation</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold">2</span>
                      </div>
                      <span>Discuss Your Case</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold">3</span>
                      </div>
                      <span>Receive Expert Guidance</span>
                    </div>
                  </div>
                  <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors w-full">
                    Book Consultation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600">
              Trusted by hundreds of satisfied clients across various legal
              matters.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  );
}

export default LandingPage;
