'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-navy shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <img 
                src="/southern-cities-construction/sc-construction-logo.png" 
                alt="Southern Cities Construction" 
                className="h-14 w-auto md:h-16"
              />
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#services" className="text-white hover:text-gold transition">Services</a>
              <a href="#process" className="text-white hover:text-gold transition">Process</a>
              <a href="#tools" className="text-white hover:text-gold transition">Tools</a>
              <a href="#projects" className="text-white hover:text-gold transition">Projects</a>
              <a href="#contact" className="text-white hover:text-gold transition">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-navy via-navy to-blue-900">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        {/* Large centered icon logo */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <img 
            src="/southern-cities-construction/sc-construction-icon.png" 
            alt="Southern Cities Construction Icon" 
            className="h-64 md:h-96 w-auto"
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animation-fade-in">
            Building Excellence.<br />
            <span className="text-gold">Managing Every Detail.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8">
            Licensed General Contractor in Charlotte, NC
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="bg-gold text-navy px-8 py-4 rounded-lg font-semibold hover:bg-yellow-500 transition text-lg">
              Get a Quote
            </a>
            <a href="#projects" className="bg-white text-navy px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition text-lg">
              View Projects
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-navy text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'New Construction', desc: 'Ground-up builds from foundation to finish' },
              { title: 'Renovations & Remodels', desc: 'Transform existing spaces with expert craftsmanship' },
              { title: 'Site Improvements', desc: 'Enhance property value with strategic upgrades' },
              { title: 'Permit Management', desc: 'Expert permit pulling and coordination' },
              { title: 'Project Management', desc: 'Comprehensive oversight from start to finish' },
              { title: 'Subcontractor Coordination', desc: 'Vetted professionals, seamless execution' }
            ].map((service, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition">
                <h3 className="text-xl font-bold text-navy mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Our Process</h2>
          <div className="grid md:grid-cols-5 gap-6">
            {[
              { num: '1', title: 'Submit Project', desc: 'Fill out our intake form' },
              { num: '2', title: 'AI Budget Analysis', desc: 'Get automated estimate' },
              { num: '3', title: 'Permit Coordination', desc: 'We handle all permits' },
              { num: '4', title: 'Construction', desc: 'Expert oversight & execution' },
              { num: '5', title: 'Final Handoff', desc: 'Inspection & completion' }
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-gold text-navy rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-gray-300 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Portals Section */}
      <section id="tools" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-navy text-center mb-12">Client Tools & Portals</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Client Intake Form', url: 'https://ashersoutherncities-art.github.io/permit-client-intake/' },
              { name: 'Permit Manager', url: 'https://ashersoutherncities-art.github.io/permit-manager/' },
              { name: 'Construction Manager', url: 'https://sce-construction-manager.vercel.app' },
              { name: 'Draw Manager', url: 'https://construction-draw-manager-mu.vercel.app' },
              { name: 'Business Partners', url: 'https://ashersoutherncities-art.github.io/business-partners-db/' }
            ].map((tool, i) => (
              <a key={i} href={tool.url} target="_blank" rel="noopener noreferrer" 
                 className="bg-white p-6 rounded-lg border-2 border-navy hover:bg-navy hover:text-white transition group">
                <h3 className="text-lg font-bold mb-2">{tool.name}</h3>
                <span className="text-gold group-hover:text-gold">Access Tool →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Portfolio Section */}
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-navy text-center mb-12">Recent Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-100 rounded-lg overflow-hidden hover:shadow-xl transition">
                <div className="h-64 bg-gradient-to-br from-navy to-blue-900 flex items-center justify-center">
                  <span className="text-white text-lg">Project {i}</span>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-navy mb-2">Project Title</h3>
                  <p className="text-sm text-gray-600 mb-1">Charlotte, NC</p>
                  <p className="text-sm text-gray-600 mb-1">New Construction</p>
                  <p className="text-sm text-gold font-semibold">Completed 2026</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Licensed & Insured', desc: 'GC License L.107724, fully bonded and insured' },
              { title: 'AI-Powered Estimates', desc: 'Fast, accurate budget analysis using cutting-edge technology' },
              { title: 'Full Permit Management', desc: 'We handle all permitting and inspections' },
              { title: 'Transparent Draw Process', desc: 'Clear payment schedules and progress tracking' },
              { title: 'Vetted Subcontractors', desc: 'Experienced professionals we trust' },
              { title: 'Project Oversight', desc: 'Daily management and quality control' }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-gold rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-navy text-center mb-12">Get in Touch</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-navy mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-navy">Phone</p>
                  <a href="tel:7042992742" className="text-gold hover:underline">(704) 299-2742</a>
                </div>
                <div>
                  <p className="font-semibold text-navy">Email</p>
                  <a href="mailto:construction@developthesouth.com" className="text-gold hover:underline">construction@developthesouth.com</a>
                </div>
                <div>
                  <p className="font-semibold text-navy">Location</p>
                  <p className="text-gray-600">Charlotte, NC</p>
                </div>
                <div>
                  <p className="font-semibold text-navy">License</p>
                  <p className="text-gray-600">GC License L.107724</p>
                  <p className="text-gray-600">Qualifier Q.108200</p>
                </div>
              </div>
            </div>
            <div>
              <form className="space-y-4">
                <div>
                  <label className="block text-navy font-semibold mb-2">Name</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold" />
                </div>
                <div>
                  <label className="block text-navy font-semibold mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold" />
                </div>
                <div>
                  <label className="block text-navy font-semibold mb-2">Project Address</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold" placeholder="Start typing address..." />
                </div>
                <div>
                  <label className="block text-navy font-semibold mb-2">Message</label>
                  <textarea rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold"></textarea>
                </div>
                <button type="submit" className="w-full bg-gold text-navy px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <img 
              src="/southern-cities-construction/sc-construction-logo.png" 
              alt="Southern Cities Construction" 
              className="h-12 w-auto mx-auto mb-4"
            />
            <p className="text-gray-400 text-sm mb-2">A Division of Southern Cities Enterprises</p>
            <p className="text-gray-400 text-sm">GC License L.107724 (Myriad Investments LLC) | Qualifier Q.108200</p>
            <p className="text-gray-400 text-sm mt-4">© {new Date().getFullYear()} Southern Cities Construction. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
