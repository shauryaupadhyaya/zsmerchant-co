"use client"

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Menu, X, ChevronRight, Shield, Users, FileCheck, GraduationCap, Mail, Phone, MapPin, ArrowRight, CheckCircle2, TrendingUp, Target, Zap, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ZSMerchantWebsite() {
  const [currentPage, setCurrentPage] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  const navigateTo = (page: string) => {
    setCurrentPage(page)
    setIsMenuOpen(false)
  }

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'case-studies', label: 'Case Studies' },
    { id: 'contact', label: 'Contact' }
  ]

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Navigation */}
      <nav
        className={cn(
          "fixed w-full z-50 transition-all duration-500 ease-out",
          scrolled
            ? "bg-background/95 backdrop-blur-xl shadow-lg shadow-primary/5 border-b border-border/50"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-20">
            <button
              onClick={() => navigateTo('home')}
              className="flex-shrink-0 group"
            >
              <h1 className={cn(
                "text-2xl font-semibold transition-all duration-300 group-hover:scale-[1.02]",
                currentPage === 'home' && !scrolled ? "text-white" : "text-foreground"
              )}>
                Z S Merchant{' '}
                <span className={cn(
                  "font-light transition-colors duration-300",
                  currentPage === 'home' && !scrolled ? "text-primary/90" : "text-primary"
                )}>& Co.</span>
              </h1>
            </button>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={cn(
                    "relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300",
                    currentPage === item.id
                      ? "text-primary"
                      : currentPage === 'home' && !scrolled 
                        ? "text-white/70 hover:text-white"
                        : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary rounded-full transition-all duration-300",
                      currentPage === item.id ? "w-6" : "w-0"
                    )}
                  />
                </button>
              ))}
            </div>

            <button
              className={cn(
                "md:hidden p-2 rounded-lg transition-colors duration-200",
                currentPage === 'home' && !scrolled 
                  ? "text-white hover:bg-white/10" 
                  : "text-foreground hover:bg-muted"
              )}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <div className="relative w-6 h-6">
                <Menu className={cn("absolute inset-0 transition-all duration-300", isMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0")} size={24} />
                <X className={cn("absolute inset-0 transition-all duration-300", isMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90")} size={24} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-500 ease-out border-t",
            currentPage === 'home' && !scrolled 
              ? "bg-slate-900/95 backdrop-blur-xl border-white/10"
              : "bg-background/95 backdrop-blur-xl border-border/50",
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="px-6 py-4 space-y-1">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                style={{ transitionDelay: `${index * 50}ms` }}
                className={cn(
                  "block w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300",
                  isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0",
                  currentPage === item.id
                    ? currentPage === 'home' && !scrolled 
                      ? "text-primary bg-primary/20"
                      : "text-primary bg-primary/10"
                    : currentPage === 'home' && !scrolled
                      ? "text-white/70 hover:text-white hover:bg-white/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="animate-in fade-in duration-500">
        {currentPage === 'home' && <HomePage navigateTo={navigateTo} />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'services' && <ServicesPage navigateTo={navigateTo} />}
        {currentPage === 'case-studies' && <CaseStudiesPage />}
        {currentPage === 'contact' && <ContactPage />}
      </main>

      {/* Footer */}
      <Footer navigateTo={navigateTo} />
    </div>
  )
}

// HomePage Component
function HomePage({ navigateTo }: { navigateTo: (page: string) => void }) {
  const differentiators = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Technology-Driven",
      description: "Leverages AI to automate processes and reduce manual effort for faster and accurate results."
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: "Agile & Modular",
      description: "Solutions are agile, simple, and modular, allowing easy adaptation to changing business needs."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Cost-Effective Solutions",
      description: "Delivering premium best-in-class quality at competitive rates."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "C-Suite Experts",
      description: "Senior consultants with over 30 years of experience are responsible for end-to-end delivery."
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-32">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 mb-8 animate-in slide-in-from-bottom-4 duration-700">
              <span className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium tracking-wide border border-primary/20 backdrop-blur-sm">
                <Sparkles className="w-4 h-4" />
                CONSULTING & ADVISORY EXCELLENCE
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-light text-white mb-8 leading-[1.1] animate-in slide-in-from-bottom-6 duration-700 delay-100">
              Strategic Compliance & Risk Management
              <span className="block font-semibold mt-2 bg-gradient-to-r from-primary via-cyan-400 to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                Solutions for Future-Ready Organizations
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl animate-in slide-in-from-bottom-8 duration-700 delay-200 text-pretty">
              Powered by AI-Based Systems, Advisory & Shared Services
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-in slide-in-from-bottom-10 duration-700 delay-300">
              <button
                onClick={() => navigateTo('services')}
                className="group relative px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium transition-all duration-300 flex items-center justify-center overflow-hidden shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                <span className="relative z-10 flex items-center">
                  Explore Our Services
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </button>
              <button
                onClick={() => navigateTo('contact')}
                className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 hover:border-white/40 hover:bg-white/10 text-white rounded-xl font-medium transition-all duration-300 hover:-translate-y-0.5"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24 lg:py-32 bg-background relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <span className="text-primary font-semibold text-sm tracking-wider uppercase mb-4 block">Why Choose Us</span>
            <h2 className="text-4xl md:text-5xl font-light text-foreground mb-6 text-balance">
              Why Choose <span className="font-semibold">Z S Merchant & Co.</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
              We combine deep expertise with innovative technology to deliver exceptional value
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentiators.map((item, index) => (
              <div
                key={index}
                className="group relative p-8 bg-card hover:bg-accent rounded-2xl transition-all duration-500 border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground font-light leading-relaxed text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6 text-balance">
            Ready to Transform Your Organization?
          </h2>
          <p className="text-xl text-slate-300 mb-12 font-light max-w-2xl mx-auto">
            {"Let's discuss how our expertise can help you achieve your goals"}
          </p>
          <button
            onClick={() => navigateTo('contact')}
            className="group px-10 py-4 bg-white text-slate-900 rounded-xl font-semibold hover:bg-slate-100 transition-all duration-300 inline-flex items-center shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Start a Conversation
            <ChevronRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </section>
    </div>
  )
}

// Team Member Modal Component
function TeamMemberModal({
  isOpen,
  onClose,
  member
}: {
  isOpen: boolean
  onClose: () => void
  member: {
    name: string
    role: string
    initials: string
    fullBio: string
  } | null
}) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleEscape)
    }
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])
  
  if (!isOpen || !member || !mounted) return null
  
  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
      onClick={onClose}
    >
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300" 
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
      />
      <div
        className="relative bg-card border border-border rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 max-w-2xl w-full max-h-[85vh] overflow-y-auto animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-300"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 mb-6 pr-8 sm:pr-0">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary to-primary/70 rounded-xl sm:rounded-2xl flex items-center justify-center text-primary-foreground text-xl sm:text-2xl font-semibold flex-shrink-0">
            {member.initials}
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-1">{member.name}</h3>
            <p className="text-primary font-medium text-sm sm:text-base">{member.role}</p>
          </div>
        </div>
        
        <div className="prose prose-slate max-w-none">
          {member.fullBio.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-muted-foreground font-light leading-relaxed text-sm sm:text-base mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
  
  return createPortal(modalContent, document.body)
}

// AboutPage Component
function AboutPage() {
  const [selectedMember, setSelectedMember] = useState<{
    name: string
    role: string
    initials: string
    fullBio: string
  } | null>(null)

  const teamMembers = [
    {
      name: "Zarsis Merchant",
      role: "Managing Director, Founder & Head Compliance & Risk",
      initials: "ZM",
      gradient: "from-primary to-primary/70",
      shortBio: "Chartered Accountant with 30+ years of experience in Compliance, Risk, Internal Audit, and Operations at Citibank & Et Al Consultancy in Asia.",
      fullBio: `Chartered Accountant with extensive senior-level experience in Internal Audit, Governance, Risk Management, and Compliance with Citibank NA and Change Et Al Consultancy in Asia. Founder of this company in Singapore.

Expert in managing Operational, Compliance, and Credit risks and in establishing robust frameworks, systems, and organizations. Developed and implemented risk strategies for payment digitization, trade blockchain, fintech partnerships, digital assets, and ESG initiatives.

Track record of deploying AI and ML tools to enhance effectiveness. Creator of a proprietary 4-Dimensional Model to evaluate risks and controls, driving actionable insights for improvement.

Member of the following:
- Institute of Singapore Chartered Accountants (ISCA)
- Institute of Chartered Accountants of India (ICAI)
- Singapore Institute of Directors (SID)`
    },
    {
      name: "Siddharth U.",
      role: "Managing Director, Co-founder & Head Go-to-Market-International",
      initials: "SU",
      gradient: "from-slate-700 to-slate-900",
      shortBio: "Seasoned professional with extensive experience in corporate governance and strategic advisory. Brings valuable insights from leading financial institutions.",
      fullBio: ""
    },
    {
      name: "Pankaj Jaggi",
      role: "Managing Director & Head Operations, Data & Financial Crime",
      initials: "PJ",
      gradient: "from-slate-600 to-slate-800",
      shortBio: "Banking professional with 30+ years of experience in Consumer & Corporate Operations, Product Mgmt., Risk, Internal Audit, and Compliance including Financial Crime at Citibank Asia & EMEA.",
      fullBio: `Senior banking executive with 30+ years of experience at Citibank, Asia & EMEA regions, across Consumer and Corporate - Operations, Product Management, Internal Audit, Risk, and Compliance. Acknowledged in the industry as an expert in financial crime, and led transformation programs for Anti-Money Laundering, Sanctions & Fraud Management frameworks, processes & systems at Citibank globally.

Led in-country and regional roles across 17 APAC and EMEA regions, including BPO and vendor operations. Managed 4,000 internal staff and 16,000 vendor staff; strong leadership in multi-site, offshore, and outsourced operations.

Proven track record of solving complex issues, improving operational efficiency, and enhancing customer delivery.

Directed key regulatory programs under US OCC & FRB Consent Order for KYC and Transaction Monitoring across 17 countries.`
    },
    {
      name: "Balaji Katakam",
      role: "Senior Advisor",
      initials: "BK",
      gradient: "from-slate-500 to-slate-700",
      shortBio: "Chartered Accountant with 20+ years of experience in Financial Crime, Cyber Security & Internal Audit at Citibank Asia.",
      fullBio: `Chartered Accountant with over 20+ years of experience at Citibank. Was the Head of Services Financial Crime Risk.

He also has strong product and operations knowledge of payments, trade finance & services. He also led a large team at a shared service facility of Citibank in Malaysia. He is also involved in Information Security and items control framework.

Most recently he led cross-functional teams to respond to changes in global sanctions regimes, during the Russia–Ukraine conflict and was consulted extensively by his peers and colleagues.`
    }
  ]

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-20 animate-in slide-in-from-bottom-4 duration-700">
          <span className="text-primary font-semibold text-sm tracking-wider uppercase mb-4 block">About Us</span>
          <h1 className="text-5xl md:text-6xl font-light text-foreground mb-8 leading-tight">
            Building Trust Through
            <span className="block font-semibold">Excellence & Innovation</span>
          </h1>
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-cyan-400 rounded-full mb-8" />
        </div>

        {/* Story */}
        <div className="mb-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-in slide-in-from-left duration-700 delay-200">
              <h2 className="text-3xl font-semibold text-foreground mb-6">Our Story</h2>
              <div className="space-y-6 text-muted-foreground text-lg font-light leading-relaxed">
                <p>
                  Established in January 2024, Z S Merchant & Co. was founded by Zarsis Merchant, a Chartered Accountant with more than three decades of senior leadership experience across Citibank N.A. and Change Et Al Consultancy in Asia.
                </p>
                <p>
                  We specialise in providing strategic Compliance and Risk Management solutions through a combination of AI-based systems, expert advisory, and shared services.
                </p>
                <p>
                  Our name represents accountability, integrity, and a hands-on leadership ethos, reflecting our commitment to helping organisations build resilient, future-ready operating models that enable growth, trust, and long-term value creation.
                </p>
              </div>
            </div>
            <div className="animate-in slide-in-from-right duration-700 delay-300">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-cyan-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
                <div className="relative bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-12 text-white border border-slate-800">
                  <h3 className="text-2xl font-semibold mb-8">Our Mission</h3>
                  <p className="text-lg font-light leading-relaxed mb-10 text-slate-300">
                    To help organisations strengthen regulatory compliance and manage risk with confidence, and achieve sustainable growth through intelligent technology, expert advisory and practical execution.
                  </p>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="group/stat">
                      <div className="text-5xl font-bold bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent mb-2 transition-transform duration-300 group-hover/stat:scale-105">30+</div>
                      <div className="text-sm text-slate-400">Years Experience</div>
                    </div>
                    <div className="group/stat">
                      <div className="text-5xl font-bold bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent mb-2 transition-transform duration-300 group-hover/stat:scale-105">2024</div>
                      <div className="text-sm text-slate-400">Founded</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Partner */}
        <div className="mb-24">
          <h2 className="text-3xl font-semibold text-foreground mb-6">Our Partner</h2>
          <div className="bg-card border border-border rounded-3xl p-8 md:p-10 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
            <p className="text-muted-foreground text-lg font-light leading-relaxed mb-6">
              In November 2025, we entered into a strategic partnership with RiskCognition, a US-registered company with deep domain expertise in AI-powered Compliance and Risk Management systems and shared services.
            </p>
            <p className="text-muted-foreground text-lg font-light leading-relaxed mb-6">
              Headquartered in New York, with offices in London, Dubai, and New Delhi, RiskCognition brings strong technology capabilities and scalable delivery infrastructure to complement our advisory-led approach.
            </p>
            <p className="text-muted-foreground text-lg font-light leading-relaxed mb-8">
              Together, our partnership combines advanced technology, deep domain expertise, and practical execution to deliver best-in-class solutions and measurable outcomes for our clients.
            </p>
            <a 
              href="https://www.riskcognition.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors duration-300 group"
            >
              Visit our partner website
              <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* What Differentiates Us */}
        <div className="mb-24">
          <h2 className="text-3xl font-semibold text-foreground mb-6">What Differentiates Us</h2>
          <div className="bg-card border border-border rounded-3xl p-8 md:p-10">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Personalized expert involvement with senior consultants managing engagements",
                "Cost-effective services through a lean and efficient structure",
                "Leverages AI and machine learning to automate processes",
                "Agile, simple, and modular solutions for easy adaptation",
                "Future-proofing processes by addressing root causes",
                "Strong partnership model with technology experts"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 group">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                  <p className="text-muted-foreground font-light leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team */}
        <div>
          <h2 className="text-3xl font-semibold text-foreground mb-12">Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="group bg-card border border-border rounded-2xl p-8 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2 hover:border-primary/30"
              >
                <div className={cn(
                  "w-20 h-20 bg-gradient-to-br rounded-2xl flex items-center justify-center text-white text-2xl font-semibold mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3",
                  member.gradient
                )}>
                  {member.initials}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-4">{member.role}</p>
                <p className="text-muted-foreground font-light leading-relaxed text-sm mb-4">
                  {member.shortBio}
                </p>
                {member.fullBio && (
                  <button
                    onClick={() => setSelectedMember(member)}
                    className="text-primary font-medium text-sm hover:text-primary/80 inline-flex items-center group/btn transition-all duration-300"
                  >
                    Read More
                    <ChevronRight className="ml-1 w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <TeamMemberModal
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
        member={selectedMember}
      />
    </div>
  )
}

// ServicesPage Component
function ServicesPage({ navigateTo }: { navigateTo: (page: string) => void }) {
  const services = [
    {
      icon: <Zap className="w-10 h-10" />,
      title: "AI Powered Technology Solutions",
      subtitle: "Speed, Scale, and ROI",
      description: "Intelligent automation that plans, decides and reasons like an expert - while retaining human oversight for control.",
      details: "Our platform delivers 3-5X increased assessment speed, 60-70% reduction in manual efforts, 80-90% reduction in breaches, and 30-40% cost reduction. Features include AI agents & AI teammates that hyper-automate mundane tasks, modular consumption model, flexible architecture, and customizable configurations.",
      advantages: ["3-5X increased assessment speed", "60-70% reduction in manual efforts", "80-90% reduction in breaches", "30-40% cost reduction", "99% increase in data accuracy", "Flexible & modular architecture"]
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "Advisory Services",
      subtitle: "Solving Challenges, Strengthening Governance, and ROI",
      description: "Partnering with clients to design, implement & operationalise compliance & risk frameworks, enabled by AI-powered systems & managed services.",
      details: "We understand existing environments, establish best-in-class frameworks, and provide ongoing BAU support. Our approach includes client environment assessment, blueprint design, pilot cycles, go-live implementation, and continuous risk & compliance operations.",
      advantages: ["Client environment assessment", "Risk & compliance baseline", "Blueprint & taxonomy design", "Pilot & go-live implementation", "Ongoing BAU support", "Reporting & dashboards"]
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: "Managed Services Reimagined",
      subtitle: "Agility, Expertise, and ROI",
      description: "Our centres of excellence deliver outsourced compliance and risk management through an AI-enabled operating model.",
      details: "Shared service centre currently located in India, providing scalable delivery infrastructure with expert teams. We handle risk updates, RCSA execution, issue and incident management, regulatory compliance monitoring, and comprehensive reporting.",
      advantages: ["AI-enabled operating model", "Scalable delivery infrastructure", "Expert dedicated teams", "RCSA execution", "Regulatory compliance monitoring", "Comprehensive reporting"]
    }
  ]

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-20 animate-in slide-in-from-bottom-4 duration-700">
          <span className="text-primary font-semibold text-sm tracking-wider uppercase mb-4 block">What We Offer</span>
          <h1 className="text-5xl md:text-6xl font-light text-foreground mb-8 leading-tight">
            Compliance & Risk Management
            <span className="block font-semibold">Solutions</span>
          </h1>
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-cyan-400 rounded-full mb-8" />
          <p className="text-xl text-muted-foreground max-w-3xl font-light leading-relaxed">
            We combine deep expertise with innovative technology to deliver exceptional value through AI-powered systems, expert advisory, and shared services.
          </p>
        </div>

        {/* Services Grid */}
        <div className="space-y-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-card border border-border rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:border-primary/30"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="grid lg:grid-cols-3">
                <div className="lg:col-span-1 bg-gradient-to-br from-slate-900 to-slate-950 p-10 lg:p-12 flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative">
                    <div className="w-10 h-10 text-primary mb-6 transition-colors duration-500 group-hover:text-cyan-400">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-2">{service.title}</h3>
                    <p className="text-primary font-medium text-sm">{service.subtitle}</p>
                  </div>
                </div>
                <div className="lg:col-span-2 p-10 lg:p-12">
                  <p className="text-lg text-foreground mb-6 font-light leading-relaxed">
                    {service.description}
                  </p>
                  <p className="text-muted-foreground font-light leading-relaxed mb-6">
                    {service.details}
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {service.advantages.map((adv, i) => (
                      <div key={i} className="flex items-center gap-2 group/adv">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 transition-transform duration-300 group-hover/adv:scale-110" />
                        <span className="text-sm text-muted-foreground font-light">{adv}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => navigateTo('contact')}
                    className="text-primary font-semibold hover:text-primary/80 inline-flex items-center group/btn transition-all duration-300"
                  >
                    Learn More
                    <ChevronRight className="ml-1 w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-2" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// CaseStudiesPage Component
function CaseStudiesPage() {
  const caseStudies = [
    {
      sector: "Non-Profit Sector",
      title: "Risk Management Framework Enhancement",
      highlights: ["Simplified & Automated", "Standardised Risk Taxonomy", "Improved Governance"],
      challenge: "A large US non-profit that provides grants and loans for sustainability projects worldwide required a comprehensive risk management framework enhancement.",
      solution: "Z S Merchant & Co. simplified and automated risk processes, standardised risk taxonomy, improved governance, and aligned risk management with organisational goals.",
      outcome: "Risk monitoring, reporting, and overall effectiveness were significantly improved. The organisation achieved enhanced risk visibility and strengthened stakeholder confidence.",
      gradient: "from-blue-900 to-slate-900"
    },
    {
      sector: "Financial Services",
      title: "Digital Bank Governance Evaluation",
      highlights: ["4-Dimensional Model", "Gap Identification", "Clear Improvement Areas"],
      challenge: "A digital bank needed a robust governance evaluation to identify gaps and areas for improvement across governance, risk, and compliance frameworks.",
      solution: "The firm developed a customised 4-Dimensional Governance Evaluation Model that assessed corporate governance, management performance, risk management, and environmental and social factors.",
      outcome: "The evaluation helped identify gaps and provided clear areas for improvement across governance, risk, and compliance frameworks, enabling the bank to achieve regulatory excellence.",
      gradient: "from-slate-900 to-blue-900"
    }
  ]

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-20 animate-in slide-in-from-bottom-4 duration-700">
          <span className="text-primary font-semibold text-sm tracking-wider uppercase mb-4 block">Case Studies</span>
          <h1 className="text-5xl md:text-6xl font-light text-foreground mb-8 leading-tight">
            Success Stories That
            <span className="block font-semibold">Drive Results</span>
          </h1>
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-cyan-400 rounded-full mb-8" />
          <p className="text-xl text-muted-foreground max-w-3xl font-light leading-relaxed">
            The firm has delivered successful projects for global organisations, helping them improve governance, risk, and compliance frameworks.
          </p>
        </div>

        {/* Case Studies */}
        <div className="space-y-12">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="group bg-card border border-border rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:border-primary/30"
            >
              <div className="grid lg:grid-cols-5">
                <div className={cn("lg:col-span-2 bg-gradient-to-br p-12 text-white relative overflow-hidden", study.gradient)}>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative">
                    <span className="text-primary text-sm font-semibold tracking-wider uppercase block mb-4">
                      {study.sector}
                    </span>
                    <h3 className="text-3xl font-semibold mb-8 leading-tight">
                      {study.title}
                    </h3>
                    <div className="space-y-3">
                      {study.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-center group/item">
                          <CheckCircle2 className="w-5 h-5 text-primary mr-3 flex-shrink-0 transition-transform duration-300 group-hover/item:scale-110" />
                          <span className="font-light">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-3 p-12">
                  <div className="space-y-8">
                    <div className="group/section">
                      <h4 className="text-sm font-semibold text-primary tracking-wider uppercase mb-3 flex items-center">
                        <span className="w-8 h-0.5 bg-primary mr-3 transition-all duration-300 group-hover/section:w-12" />
                        Challenge
                      </h4>
                      <p className="text-muted-foreground font-light leading-relaxed">
                        {study.challenge}
                      </p>
                    </div>
                    <div className="group/section">
                      <h4 className="text-sm font-semibold text-primary tracking-wider uppercase mb-3 flex items-center">
                        <span className="w-8 h-0.5 bg-primary mr-3 transition-all duration-300 group-hover/section:w-12" />
                        Solution
                      </h4>
                      <p className="text-muted-foreground font-light leading-relaxed">
                        {study.solution}
                      </p>
                    </div>
                    <div className="group/section">
                      <h4 className="text-sm font-semibold text-primary tracking-wider uppercase mb-3 flex items-center">
                        <span className="w-8 h-0.5 bg-primary mr-3 transition-all duration-300 group-hover/section:w-12" />
                        Outcome
                      </h4>
                      <p className="text-muted-foreground font-light leading-relaxed">
                        {study.outcome}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ContactPage Component
function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      alert('Thank you for your message. We will contact you shortly!')
      setFormData({ name: '', company: '', email: '', phone: '', message: '' })
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-20 animate-in slide-in-from-bottom-4 duration-700">
          <span className="text-primary font-semibold text-sm tracking-wider uppercase mb-4 block">Contact Us</span>
          <h1 className="text-5xl md:text-6xl font-light text-foreground mb-8 leading-tight">
            {"Let's"} Start a
            <span className="block font-semibold">Conversation</span>
          </h1>
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-cyan-400 rounded-full mb-8" />
          <p className="text-xl text-muted-foreground max-w-3xl font-light leading-relaxed">
            Ready to transform your organization? Get in touch with our team to discuss
            how we can help you achieve your goals.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="animate-in slide-in-from-left duration-700 delay-200">
            <h2 className="text-2xl font-semibold text-foreground mb-8">Send Us a Message</h2>
            <div className="space-y-6">
              {[
                { label: 'Your Name', key: 'name', type: 'text', placeholder: 'John Doe' },
                { label: 'Company Name', key: 'company', type: 'text', placeholder: 'Your Organization' },
                { label: 'Email Address', key: 'email', type: 'email', placeholder: 'john@example.com' },
                { label: 'Contact Number', key: 'phone', type: 'tel', placeholder: '+65 XXXX XXXX' }
              ].map((field) => (
                <div key={field.key} className="group">
                  <label className="block text-sm font-medium text-foreground mb-2">{field.label}</label>
                  <input
                    type={field.type}
                    value={formData[field.key as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    className="w-full px-4 py-4 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 hover:border-primary/50 text-foreground"
                    placeholder={field.placeholder}
                  />
                </div>
              ))}
              <div className="group">
                <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-4 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none hover:border-primary/50 text-foreground"
                  placeholder="Tell us about your needs..."
                />
              </div>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center group disabled:opacity-70 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : (
                  <>
                    Send Message
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="animate-in slide-in-from-right duration-700 delay-300">
            <h2 className="text-2xl font-semibold text-foreground mb-8">Get In Touch</h2>

            <div className="relative group mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-cyan-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-10 text-white border border-slate-800">
                <p className="text-lg font-light leading-relaxed mb-10 text-slate-300">
                  {"Whether you're looking to enhance your governance framework, strengthen compliance,"}
                  {" or explore innovative technology solutions, we're here to help."}
                </p>

                <div className="space-y-6">
                  {[
                    { icon: <MapPin className="w-6 h-6" />, label: 'Address', value: '8 Alexandra View, #12-08, Singapore 158747' },
                    { icon: <Phone className="w-6 h-6" />, label: 'Phone', value: '+65 9154 3784' },
                    { icon: <Mail className="w-6 h-6" />, label: 'Email', value: 'info@zsmerchant.com' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start group/item">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mr-4 flex-shrink-0 transition-all duration-300 group-hover/item:bg-primary group-hover/item:text-primary-foreground group-hover/item:scale-105">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{item.label}</h4>
                        <p className="text-slate-400 font-light">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:border-primary/30">
              <h3 className="text-lg font-semibold text-foreground mb-4">Office Hours</h3>
              <div className="space-y-2 text-muted-foreground font-light">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday - Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Footer Component
function Footer({ navigateTo }: { navigateTo: (page: string) => void }) {
  return (
    <footer className="bg-slate-950 text-white py-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-semibold mb-4">
              Z S Merchant <span className="font-light text-primary">& Co.</span>
            </h3>
            <p className="text-slate-400 font-light leading-relaxed mb-6 max-w-md">
              A consulting and advisory firm based in Singapore that provides client solutions delivered by experienced C-suite professionals.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <div className="space-y-3">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About Us' },
                { id: 'services', label: 'Services' },
                { id: 'case-studies', label: 'Case Studies' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className="block text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-300 font-light"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <div className="space-y-3 text-slate-400 font-light">
              <p>8 Alexandra View, #12-08, Singapore 158747</p>
              <p>info@zsmerchant.com</p>
              <p>+65 9154 3784</p>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 text-center">
          <p className="text-slate-500 font-light text-sm">
            © 2024 Z S Merchant & Co. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
