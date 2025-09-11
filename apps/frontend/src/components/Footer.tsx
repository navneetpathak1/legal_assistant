import { Scale, Linkedin, Github, Globe, Code } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Scale className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold">LegalAssist</span>
            </div>
            <p className="text-gray-400">
              Professional legal assistance services providing expert guidance
              for all your legal needs.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <div className="space-y-2 text-gray-400">
              <div>Legal Research</div>
              <div>Document Preparation</div>
              <div>Client Consultation</div>
              <div>Compliance Support</div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <div className="space-y-2 text-gray-400">
              <div>
                <a href="https://navneet-portfolio-zcm8.vercel.app/">
                  About Us
                </a>
              </div>
              <div>
                <a href="https://navneet-portfolio-zcm8.vercel.app/">
                  Our Team
                </a>
              </div>
              <div>Careers</div>
              <div><a href="/T&C">Privacy Policy</a></div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-gray-400">
              <div>+918923651177</div>
              <div>navneetpathak1909@gmail.com</div>
              <div className="flex space-x-4 mt-2">
                <a
                  href="https://www.linkedin.com/in/navneetpathak1909/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-indigo-600"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="https://github.com/navneetpathak1"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-gray-100"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="https://leetcode.com/u/navneetpathak19/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-yellow-400"
                >
                  <Code className="w-6 h-6" />
                </a>
                <a
                  href="https://navneet-portfolio-zcm8.vercel.app/ "
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-500"
                >
                  <Globe className="w-6 h-6" />
                </a>
              </div>
              <div>GEHU Bhimtal</div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400">
            © 2025 LegalAssist. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="/T&C"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Terms & Conditions
            </a>
            <a
              href="/T&C"
              className="text-gray-400 hover:text-white transition-colors"
            >
            
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
