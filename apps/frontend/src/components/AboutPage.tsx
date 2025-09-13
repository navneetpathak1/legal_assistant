import {
  Scale,
  Users,
  Shield,
  CheckCircle,
  ArrowRight,
  Briefcase,
  UserPlus,
  ArrowLeft,
} from "lucide-react";
import Footer from "./Footer";
import { Link } from "react-router-dom";

function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl">
                <Scale className="h-8 w-8 text-white" />
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors"></button>
              </div>

              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  LegalAsist
                </h1>
                <p className="text-sm text-slate-600">
                  Professional Legal Support
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Link to="/">
            <ArrowLeft size={24} className="text-gray-600" />
          </Link>
        </button>
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Shield className="h-4 w-4 mr-2" />
            Trusted by 10,000+ Legal Professionals
          </div>

          <h2 className="text-5xl md:text-7xl font-bold text-slate-800 mb-6 leading-tight">
            Revolutionizing
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent block">
              Legal Assistance
            </span>
          </h2>

          <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Experience the future of legal support with our AI-powered
            assistant. Whether you're seeking legal guidance or looking to
            expand your practice, we provide intelligent solutions tailored to
            your needs.
          </p>

          {/* Join Options */}
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16">
            <button className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center space-x-3 min-w-[240px]">
              <UserPlus className="h-6 w-6" />
              <span>
                <Link to="/register/user">
                  <p>Join as User</p>
                </Link>
              </span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="group bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200 hover:border-indigo-300 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center space-x-3 min-w-[240px]">
              <Briefcase className="h-6 w-6 text-indigo-600" />
              <span>
                <Link to="/register/lawyer">
                  <p>Join as Partner</p>
                </Link>
              </span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform text-indigo-600" />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-slate-800 mb-6">
              About LegalAsist
            </h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We're transforming the legal industry through innovative AI
              technology, making legal assistance more accessible, efficient,
              and reliable for everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h4 className="text-3xl font-bold text-slate-800 mb-6">
                Our Mission
              </h4>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                To democratize legal assistance by providing intelligent,
                accessible, and affordable legal support to individuals and
                businesses worldwide. We believe everyone deserves quality legal
                guidance, regardless of their location or resources.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Our cutting-edge AI technology, combined with a network of
                experienced legal professionals, ensures you receive accurate,
                timely, and personalized legal assistance whenever you need it.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-3xl">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="bg-blue-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8" />
                  </div>
                  <h5 className="font-semibold text-slate-800">10,000+</h5>
                  <p className="text-slate-600 text-sm">Happy Clients</p>
                </div>
                <div className="text-center">
                  <div className="bg-indigo-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Scale className="h-8 w-8" />
                  </div>
                  <h5 className="font-semibold text-slate-800">5+</h5>
                  <p className="text-slate-600 text-sm">Legal Partners</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8" />
                  </div>
                  <h5 className="font-semibold text-slate-800">99.9%</h5>
                  <p className="text-slate-600 text-sm">Accuracy Rate</p>
                </div>
                <div className="text-center">
                  <div className="bg-teal-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <h5 className="font-semibold text-slate-800">24/7</h5>
                  <p className="text-slate-600 text-sm">Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default AboutPage;
