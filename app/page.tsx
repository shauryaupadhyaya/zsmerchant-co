"use client"

import React from "react"

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Menu, X, ChevronRight, Shield, Users, Mail, Phone, MapPin, CheckCircle2, TrendingUp, Target, Zap, Sparkles, Linkedin } from 'lucide-react'
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
                currentPage === 'home' && !scrolled ? "text-slate-900" : "text-foreground"
              )}>
                Z S Merchant{' '}
                <span className={cn(
                  "font-light transition-colors duration-300",
                  currentPage === 'home' && !scrolled ? "text-primary" : "text-primary"
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
                        ? "text-blue-900/80 hover:text-blue-900"
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
                  ? "text-blue-900 hover:bg-blue-100/50" 
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
              ? "bg-blue-50/95 backdrop-blur-xl border-blue-200"
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
                      ? "text-blue-900/80 hover:text-blue-900 hover:bg-blue-100/50"
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
        {currentPage === 'services' && <ServicesPage />}
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
      title: "Technology Supported",
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
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-blue-50 via-sky-50 to-blue-50">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-32">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-light text-slate-900 mb-8 leading-[1.1] animate-in slide-in-from-bottom-6 duration-700 delay-100">
              Strategic Compliance & Risk Management
              <span className="block font-semibold mt-2 bg-gradient-to-r from-primary via-blue-600 to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                Solutions for Future-Ready Organizations
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-blue-900/80 mb-12 leading-relaxed font-light max-w-3xl animate-in slide-in-from-bottom-8 duration-700 delay-200 text-pretty">
              Powered by AI-Based Systems, Advisory & Shared Services
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-in slide-in-from-bottom-10 duration-700 delay-300">
              <button
                onClick={() => navigateTo('services')}
                className="group relative px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium transition-all duration-300 flex items-center justify-center overflow-hidden shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                <span className="relative z-10 flex items-center">
                  Explore Our Services
                  <ChevronRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </button>
              <button
                onClick={() => navigateTo('contact')}
                className="px-8 py-4 bg-blue-100/50 backdrop-blur-sm border border-blue-300 hover:border-blue-400 hover:bg-blue-100/80 text-blue-900 rounded-xl font-medium transition-all duration-300 hover:-translate-y-0.5"
              >
                <span className="flex items-center">
                  Get In Touch
                  <ChevronRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
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
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-sky-50 to-blue-100" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6 text-balance">
            Ready to Transform Your Organization?
          </h2>
          <p className="text-xl text-blue-900/80 mb-12 font-light max-w-2xl mx-auto">
            {"Let's discuss how our expertise can help you achieve your goals"}
          </p>
          <button
            onClick={() => navigateTo('contact')}
            className="group px-10 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 inline-flex items-center shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Start a Conversation
            <ChevronRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </section>
    </div>
  )
}

// Generic Modal Component
function Modal({
  isOpen,
  onClose,
  children
}: {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
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
  
  if (!isOpen || !mounted) return null
  
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
        className="relative bg-card border border-border rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 max-w-6xl w-full max-h-[85vh] overflow-y-auto animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-300"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        {children}
      </div>
    </div>
  )
  
  return createPortal(modalContent, document.body)
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
  if (!member) return null
  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
    </Modal>
  )
}

// Service Modal Component
function ServiceModal({
  isOpen,
  onClose,
  service
}: {
  isOpen: boolean
  onClose: () => void
  service: {
    title: string
    type: 'image' | 'text'
    content?: string[]
  } | null
}) {
  if (!service) return null
  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-6 pr-8">{service.title}</h3>
      
      {service.type === 'image' && service.title === "AI Powered Technology Solutions" && (
        <div className="space-y-8">
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-6 border border-slate-800">
            <p className="text-primary font-semibold text-sm mb-6">Modules available on the platform:</p>
            
            {/* Regulatory Compliance Platform */}
            <div className="mb-8">
              <h4 className="text-white font-semibold text-lg mb-4">Regulatory Compliance Platform</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-primary font-bold text-lg">1</span>
                    <h5 className="text-white font-semibold text-sm">Regulations</h5>
              </div>
                  <p className="text-primary text-xs font-medium mb-2">Fast & Complete</p>
                  <ul className="text-slate-300 text-xs space-y-1">
                    <li>• Identify every applicable regulation</li>
                    <li>• Multiple jurisdictions & languages</li>
                  </ul>
                </div>
                
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-primary font-bold text-lg">2</span>
                    <h5 className="text-white font-semibold text-sm">Obligations</h5>
                  </div>
                  <p className="text-primary text-xs font-medium mb-2">Comprehensive & Risk based</p>
                  <ul className="text-slate-300 text-xs space-y-1">
                    <li>• Regulations with one or multiple obligations</li>
                    <li>• Risk based approach</li>
                  </ul>
                </div>
                
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-primary font-bold text-lg">3</span>
                    <h5 className="text-white font-semibold text-sm">Policy, Procedure & Controls</h5>
                  </div>
                  <p className="text-primary text-xs font-medium mb-2">Upgrade</p>
                  <ul className="text-slate-300 text-xs space-y-1">
                    <li>• Map current policy & controls for identified obligations</li>
                    <li>• Generate updated policy & controls</li>
                  </ul>
                </div>
                
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-primary font-bold text-lg">4</span>
                    <h5 className="text-white font-semibold text-sm">Gap Analysis & Remediation</h5>
                  </div>
                  <p className="text-primary text-xs font-medium mb-2">Robust</p>
                  <ul className="text-slate-300 text-xs space-y-1">
                    <li>• Rapid analysis of current policy & controls against obligations</li>
                    <li>• Rationalize, suggest remediation & responsibilities for gaps</li>
                  </ul>
                </div>
                
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-primary font-bold text-lg">5</span>
                    <h5 className="text-white font-semibold text-sm">Change Management</h5>
                  </div>
                  <p className="text-primary text-xs font-medium mb-2">Seamless</p>
                  <ul className="text-slate-300 text-xs space-y-1">
                    <li>• Obligations assessments of new & changed</li>
                    <li>• Gap analysis with existing policy & controls</li>
                    <li>• Cross border & multi-language auto translation and auto mapping</li>
                    <li>• Proactive training for upcoming standards</li>
                  </ul>
                </div>
                
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-primary font-bold text-lg">6</span>
                    <h5 className="text-white font-semibold text-sm">Regulatory Reporting</h5>
                  </div>
                  <p className="text-primary text-xs font-medium mb-2">Timely & Accurate</p>
                  <ul className="text-slate-300 text-xs space-y-1">
                    <li>• Automatic generation & submission</li>
                    <li>• Self attested</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Enterprise Risk Management Platform */}
            <div className="mb-6">
              <h4 className="text-white font-semibold text-lg mb-4">Enterprise Risk Management Platform</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-primary font-bold text-lg">1</span>
                    <h5 className="text-white font-semibold text-sm">Risk Management Framework</h5>
                  </div>
                  <p className="text-primary text-xs font-medium mb-2">Framework</p>
                  <ul className="text-slate-300 text-xs space-y-1">
                    <li>• Identify enterprise risks</li>
                    <li>• Risk registry & taxonomy</li>
                    <li>• Inherent Risk Assessments</li>
                    <li>• Residual risk. Risk appetite & remediation plans</li>
                    <li>• Heatmaps & management reports</li>
                  </ul>
                </div>
                
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-primary font-bold text-lg">2</span>
                    <h5 className="text-white font-semibold text-sm">Issues Management</h5>
                  </div>
                  <p className="text-primary text-xs font-medium mb-2">Permanent Resolve</p>
                  <ul className="text-slate-300 text-xs space-y-1">
                    <li>• Integrated items & root case remediation</li>
                    <li>• Analysis & Permanent fixes</li>
                  </ul>
                </div>
                
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-primary font-bold text-lg">3</span>
                    <h5 className="text-white font-semibold text-sm">Audit</h5>
                  </div>
                  <p className="text-primary text-xs font-medium mb-2">Planning & Execution</p>
                  <ul className="text-slate-300 text-xs space-y-1">
                    <li>• Risk based audit plan & testing strategies- design & operating effectiveness</li>
                    <li>• Reporting & remediation plans</li>
                  </ul>
                </div>
                
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-primary font-bold text-lg">4</span>
                    <h5 className="text-white font-semibold text-sm">Third Party Management</h5>
                  </div>
                  <p className="text-primary text-xs font-medium mb-2">Robust Oversight</p>
                  <ul className="text-slate-300 text-xs space-y-1">
                    <li>• Analysis based on vendor documents</li>
                    <li>• Designing sending site controls, periodic testing & remediation</li>
                  </ul>
                </div>
                
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-primary font-bold text-lg">5</span>
                    <h5 className="text-white font-semibold text-sm">Business Continuity & Resilience</h5>
                  </div>
                  <p className="text-primary text-xs font-medium mb-2">Ready 20x?</p>
                  <ul className="text-slate-300 text-xs space-y-1">
                    <li>• Autonomous business impact analysis</li>
                    <li>• Resilience plans, testing & reporting</li>
                  </ul>
                </div>
                
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-primary font-bold text-lg">6</span>
                    <h5 className="text-white font-semibold text-sm">Risk & Control Self Assessment (RCSA)</h5>
                  </div>
                  <p className="text-primary text-xs font-medium mb-2">Risk Identification & Improvement</p>
                  <ul className="text-slate-300 text-xs space-y-1">
                    <li>• Risk based plans build & testing strategies for controls</li>
                    <li>• Analysis, control gaps & remediation plans</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-slate-700">
              <p className="text-slate-300 text-sm text-center">Platform provided by our partner RiskCognition</p>
            </div>
          </div>
        </div>
      )}

      {service.type === 'image' && service.title === "Managed Services Reimagined" && (
        <div className="space-y-6">
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-6 border border-slate-800">
            <p className="text-slate-300 text-sm mb-6">Our centres of excellence deliver outsourced compliance and risk management through an AI-enabled operating model. Shared service centre is currently located in India.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700 hover:border-primary/50 transition-colors">
                <h4 className="text-white font-semibold mb-3 text-sm">Regulatory Risks</h4>
                <div className="space-y-2">
                  <div className="bg-slate-900/50 rounded-lg p-3">
                    <h5 className="text-primary font-semibold text-xs mb-1">Cognitive Compliance</h5>
                    <ul className="text-slate-300 text-xs space-y-1">
                      <li>• Regulatory Mapping</li>
                      <li>• Assessment/ Gap Analysis</li>
                      <li>• Change Management</li>
                      <li>• Policies & Controls</li>
                      <li>• Remediation</li>
                      <li>• Certifications against Leading Frameworks</li>
                    </ul>
              </div>
            </div>
              </div>
              
              <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700 hover:border-primary/50 transition-colors">
                <h4 className="text-white font-semibold mb-3 text-sm">Vendors/ Third Parties Risks</h4>
                <div className="space-y-2">
                  <div className="bg-slate-900/50 rounded-lg p-3">
                    <h5 className="text-primary font-semibold text-xs mb-1">Cognitive Risk</h5>
                    <ul className="text-slate-300 text-xs space-y-1">
                      <li>• Risk Identification & Assessment</li>
                      <li>• Policies & Controls</li>
                      <li>• Metrics (KRI, KCI)</li>
                      <li>• RCSA & Scenario Analysis</li>
                      <li>• Issue Management</li>
                      <li>• Management Reporting</li>
                    </ul>
            </div>
              </div>
            </div>
              
              <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700 hover:border-primary/50 transition-colors">
                <h4 className="text-white font-semibold mb-3 text-sm">Cyber/ External Threats Risks</h4>
                <div className="space-y-2">
                  <div className="bg-slate-900/50 rounded-lg p-3">
                    <h5 className="text-primary font-semibold text-xs mb-1">Cognitive Dps</h5>
                    <ul className="text-slate-300 text-xs space-y-1">
                      <li>• Business Resilience</li>
                      <li>• Third-Party Risk Management (TPRM)</li>
                      <li>• Contractual Obligation Management</li>
                      <li>• RFP & Questionnaires Management</li>
                      <li>• Internal Audit/ Assurance Services</li>
                    </ul>
          </div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700 hover:border-primary/50 transition-colors">
                <h4 className="text-white font-semibold mb-3 text-sm">Operational Risks</h4>
                <div className="space-y-2">
                  <div className="bg-slate-900/50 rounded-lg p-3">
                    <h5 className="text-primary font-semibold text-xs mb-1">Managed Services</h5>
                    <ul className="text-slate-300 text-xs space-y-1">
                      <li>• Creation- Program, Framework</li>
                      <li>• Maintenance- Policies, Controls, Procedures</li>
                      <li>• Remediation- Issue Management, Updates to Policies, Controls</li>
                      <li>• Reporting</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {service.type === 'text' && service.content && (
        <div className="space-y-6">
          {service.content.map((section, index) => (
            <div key={index} className="bg-card border border-border rounded-xl p-5">
              <p className="text-muted-foreground font-light leading-relaxed text-sm">{section}</p>
            </div>
          ))}
        </div>
      )}
    </Modal>
  )
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
- Singapore Institute of Directors (SID)`,
      linkedin: "https://www.linkedin.com/in/zarsismerchant/"
    },
    {
      name: "Siddharth U.",
      role: "Managing Director, Co-founder & Head Go-to-Market-International",
      initials: "SU",
      gradient: "from-slate-700 to-slate-900",
      shortBio: "Seasoned professional with over 24 years of experience in digital business and ecosystem design, he specializes in building scalable, repeatable commercial models that align partner capabilities with enterprise customer outcomes.",
      fullBio: `Seasoned professional with over 24 years of experience in digital business and ecosystem design, he specializes in building scalable, repeatable commercial models that align partner capabilities with enterprise customer outcomes. His proven track record includes transforming founder-led and direct-sales models into scalable ecosystems, delivering 3X ARR growth and multiple successful exits across APAC, North America, and Europe.

A trusted C-suite operator, he excels at opening executive doors and converting product vision into enterprise pipelines. He works extensively with ecosystem partners and systems integrators - to jointly deliver SaaS-led transformation projects, leading the product discovery process and identifying innovations that enhance competitive positioning.

Known for architecting repeatable growth frameworks and leading cross-border teams through scale, pivots, and acquisitions, he brings deep expertise in SI/MSP alliance building across both mature and emerging markets. He is passionate about delivering value to clients and partners while empowering teams to achieve excellence.`,
      linkedin: "https://www.linkedin.com/in/siddharthupadhyaya/"
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

Directed key regulatory programs under US OCC & FRB Consent Order for KYC and Transaction Monitoring across 17 countries.`,
      linkedin: "https://www.linkedin.com/in/pankaj-jaggi-41862b4"
    },
    {
      name: "Balaji Katakam",
      role: "Senior Advisor",
      initials: "BK",
      gradient: "from-slate-500 to-slate-700",
      shortBio: "Chartered Accountant with 20+ years of experience in Financial Crime, Cyber Security & Internal Audit at Citibank Asia.",
      fullBio: `Chartered Accountant with over 20+ years of experience at Citibank. Was the Head of Services Financial Crime Risk.

He also has strong product and operations knowledge of payments, trade finance & services. He also led a large team at a shared service facility of Citibank in Malaysia. He is also involved in Information Security and items control framework.

Most recently he led cross-functional teams to respond to changes in global sanctions regimes, during the Russia-Ukraine conflict and was consulted extensively by his peers and colleagues.`,
      linkedin: "https://www.linkedin.com/in/balaji-katakam18/"
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
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-blue-500 rounded-full mb-8" />
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
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
                <div className="relative bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-12 text-white border border-slate-800">
                  <h3 className="text-2xl font-semibold mb-8">Our Mission</h3>
                  <p className="text-lg font-light leading-relaxed mb-10 text-slate-300">
                    To help organisations strengthen regulatory compliance and manage risk with confidence, and achieve sustainable growth through intelligent technology, expert advisory and practical execution.
                  </p>
                  <div className="flex justify-end">
                    <div className="group/stat">
                      <div className="text-5xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent mb-2 transition-transform duration-300 group-hover/stat:scale-105">100+</div>
                      <div className="text-sm text-slate-400">Years Experience</div>
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
          <div className="group bg-card border border-border rounded-3xl p-8 md:p-10 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1">
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
              className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors duration-300 group/link"
            >
              Visit our partner website
              <ChevronRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover/link:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Team */}
        <div>
          <h2 className="text-3xl font-semibold text-foreground mb-12">Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="group bg-card border border-border rounded-2xl p-8 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30"
              >
                <div className={cn(
                  "w-20 h-20 bg-gradient-to-br rounded-2xl flex items-center justify-center text-white text-2xl font-semibold mb-6 transition-all duration-300 group-hover:scale-110",
                  member.gradient
                )}>
                  {member.initials}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-4 text-sm">{member.role}</p>
                <p className="text-muted-foreground font-light leading-relaxed text-sm mb-4">
                  {member.shortBio}
                </p>
                <div className="flex items-center gap-4">
                  {member.fullBio && (
                    <button
                      onClick={() => setSelectedMember(member)}
                      className="text-primary font-medium text-sm hover:text-primary/80 inline-flex items-center group/btn transition-all duration-300"
                    >
                      Read More
                      <ChevronRight className="ml-1 w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </button>
                  )}
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                    aria-label={`${member.name}'s LinkedIn`}
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
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
function ServicesPage() {
  const [selectedService, setSelectedService] = useState<{
    title: string
    type: 'image' | 'text'
    content?: string[]
  } | null>(null)

  const services = [
    {
      icon: <Zap className="w-10 h-10" />,
      title: "AI Powered Technology Solutions",
      subtitle: "Speed, Scale, and ROI",
      description: "Intelligent automation that plans, decides and reasons like an expert - while retaining human oversight for control.",
      advantages: [
        {
          title: "3-5X increased assessment speed",
          desc: "AI powered configurable design that standardises assessments, reduces rework, and enables faster approvals across multiple business units."
        },
        {
          title: "60-70% reduction in manual efforts",
          desc: "AI assisted tools that drop implementation time versus traditional approaches by automating reviews, documentation and follow-up actions."
        },
        {
          title: "80-90% reduction in breaches",
          desc: "AI based suggestions on risks, controls and remediation plans that proactively highlight gaps before they turn into real incidents."
        },
        {
          title: "30-40% cost reduction",
          desc: "Measurable reduction in operational spend, with improved productivity and utilisation of specialist resources across the risk lifecycle."
        },
        {
          title: "99% increase in data accuracy",
          desc: "100% traceability that cuts audit preparation time by up to 70%, while improving confidence in the underlying data and reports."
        },
        {
          title: "99% tasks completed timely",
          desc: "AI tools that send alerts, nudges and follow ups automatically, helping owners close actions on time and stay ahead of deadlines."
        }
      ],
      platformAdvantages: [
        "Flexible Architecture - Morphs with use cases, customer needs and regulatory changes without requiring heavy rebuilds or long transformation projects.",
        "AI Agents & AI Teammates - Hyper‑automates the mundane and tedious tasks so teams can focus on judgement, oversight and high‑value decision making.",
        "Modular Consumption - You pick and choose the modules you need, and add new capabilities over time as your organisation and risk profile evolve.",
        "Outcome Based - Gets the job done and delivers value immediately, with pre‑built journeys, dashboards and workflows mapped to real use cases.",
        "Customizable - Custom configurations, dropdowns and values aligned to your taxonomy, internal language and operating model across functions.",
        "Configurable - Configure workflows, notifications and approvals so that responsibilities, hand‑offs and governance are clear and consistently applied."
      ],
      modalType: 'image' as const
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "Advisory Services",
      subtitle: "Solving Challenges, Strengthening Governance, and ROI",
      description: "Partnering with clients to design, implement & operationalise compliance & risk frameworks, enabled by AI-powered systems & managed services. Conducting internal audits & reviews & suggesting corrective action to enhance controls.",
      phases: [
        {
          title: "Understand Existing Environment",
          subtitle: "Establish the Risk & Compliance baseline data, and problem statement",
          points: [
            "Client Environment Assessment: Study business products, processes, policies and controls, existing risk maturity/appetite & regulatory landscape",
            "Identify Problem Statement, Scope and Objectives: Define service standards and SLAs/KPIs",
            "Understand Systems, Dataflow & integration and budgets"
          ]
        },
        {
          title: "Establish Best in Class Framework",
          subtitle: "Design & Implement Risk & Compliance Management Framework",
          points: [
            "Blueprint: Taxonomy, Policy & Procedures, Assessment, Testing, and Governance model",
            "Pilot cycle",
            "Go-live (implement): workflows, modules, system automation. Configure AI Platform and migrate legacy data, Setup client end screens and dashboards and staff trainings"
          ]
        },
        {
          title: "Provide BAU Support",
          subtitle: "Deliver ongoing Risk & Compliance operations, and Improvements",
          points: [
            "Risk updates",
            "RCSA execution",
            "Issue and incident management",
            "Regulatory compliance monitoring",
            "Reporting & Dashboards"
          ]
        }
      ],
      modalType: 'text' as const
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: "Managed Services Reimagined",
      subtitle: "Agility, Expertise, and ROI",
      description: "Our centres of excellence deliver outsourced compliance and risk management through an AI-enabled operating model. Shared service centre is currently located in India.",
      modalType: 'image' as const
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
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-blue-500 rounded-full mb-8" />
        </div>

        {/* Services Grid */}
        <div className="space-y-8">
          {/* Service 1: AI Powered Technology */}
          <div className="group bg-card border border-border rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:border-primary/30 hover:-translate-y-1">
            <div className="grid lg:grid-cols-3">
              <div className="lg:col-span-1 bg-gradient-to-br from-slate-900 to-slate-950 p-10 lg:p-12 flex flex-col justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="w-10 h-10 text-primary mb-6 transition-colors duration-500 group-hover:text-blue-600">
                    {services[0].icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-2">{services[0].title}</h3>
                  <p className="text-primary font-medium text-sm">{services[0].subtitle}</p>
                </div>
              </div>
              <div className="lg:col-span-2 p-10 lg:p-12">
                <p className="text-lg text-foreground mb-6 font-light leading-relaxed">
                  {services[0].description}
                </p>
                <p className="text-muted-foreground font-semibold mb-4">Advantages of our platform:</p>
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  {services[0].advantages.map((adv, i) => (
                    <div key={i} className="group/adv">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-1 transition-transform duration-300 group-hover/adv:scale-110" />
                        <p className="text-sm text-muted-foreground">
                          {adv.title} - {adv.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-muted-foreground font-semibold mb-4">Advantages of AI platforms:</p>
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  {services[0].platformAdvantages.map((adv, i) => (
                    <div key={i} className="flex items-start gap-2 group/adv">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-1 transition-transform duration-300 group-hover/adv:scale-110" />
                      <p className="text-sm text-muted-foreground">{adv}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedService({ title: services[0].title, type: 'image' })}
                  className="text-primary font-semibold hover:text-primary/80 inline-flex items-center group/btn transition-all duration-300"
                >
                  Learn More
                  <ChevronRight className="ml-1 w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-2" />
                </button>
              </div>
            </div>
          </div>

          {/* Service 2: Advisory Services */}
          <div className="group bg-card border border-border rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:border-primary/30 hover:-translate-y-1">
            <div className="grid lg:grid-cols-3">
              <div className="lg:col-span-1 bg-gradient-to-br from-slate-900 to-slate-950 p-10 lg:p-12 flex flex-col justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="w-10 h-10 text-primary mb-6 transition-colors duration-500 group-hover:text-blue-600">
                    {services[1].icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-2">{services[1].title}</h3>
                  <p className="text-primary font-medium text-sm">{services[1].subtitle}</p>
                </div>
              </div>
              <div className="lg:col-span-2 p-10 lg:p-12">
                <p className="text-lg text-foreground mb-8 font-light leading-relaxed">
                  {services[1].description}
                </p>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  {services[1].phases?.map((phase, i) => (
                    <div key={i} className="group/phase">
                      <h4 className="text-sm font-semibold text-foreground mb-1">{phase.title}</h4>
                      <p className="text-xs text-primary mb-3">{phase.subtitle}</p>
                      <ul className="space-y-2">
                        {phase.points.map((point, j) => (
                          <li key={j} className="flex items-start gap-2 group/item">
                            <CheckCircle2 className="w-3 h-3 text-primary flex-shrink-0 mt-1 transition-transform duration-300 group-hover/item:scale-110" />
                            <span className="text-xs text-muted-foreground">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Service 3: Managed Services */}
          <div className="group bg-card border border-border rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:border-primary/30 hover:-translate-y-1">
            <div className="grid lg:grid-cols-3">
              <div className="lg:col-span-1 bg-gradient-to-br from-slate-900 to-slate-950 p-10 lg:p-12 flex flex-col justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="w-10 h-10 text-primary mb-6 transition-colors duration-500 group-hover:text-blue-600">
                    {services[2].icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-2">{services[2].title}</h3>
                  <p className="text-primary font-medium text-sm">{services[2].subtitle}</p>
                </div>
              </div>
              <div className="lg:col-span-2 p-10 lg:p-12">
                <p className="text-lg text-foreground mb-8 font-light leading-relaxed">
                  {services[2].description}
                </p>
                <button
                  onClick={() => setSelectedService({ title: services[2].title, type: 'image' })}
                  className="text-primary font-semibold hover:text-primary/80 inline-flex items-center group/btn transition-all duration-300"
                >
                  Learn More
                  <ChevronRight className="ml-1 w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ServiceModal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        service={selectedService}
      />
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
            Success Stories
          </h1>
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-blue-500 rounded-full mb-8" />
        </div>

        {/* Case Studies */}
        <div className="space-y-12">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="group bg-card border border-border rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:border-primary/30 hover:-translate-y-1"
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
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-blue-500 rounded-full mb-8" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="animate-in slide-in-from-left duration-700 delay-200">
            <h2 className="text-2xl font-semibold text-foreground mb-8">Send Us a Message</h2>
            <div className="space-y-6">
              {[
                { label: 'Your Name', key: 'name', type: 'text', placeholder: 'John Doe' },
                { label: 'Company Name', key: 'company', type: 'text', placeholder: 'XYZ & Co' },
                { label: 'Email Address', key: 'email', type: 'email', placeholder: 'john.doe@xyz.com' },
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
                  placeholder="Dear Z S Merchant & Co."
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
                    <ChevronRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
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
                <div className="space-y-6">
                  {[
                    { icon: <MapPin className="w-6 h-6" />, label: 'Address', value: '8 Alexandra View, #12-08, Singapore 158747' },
                    { icon: <Phone className="w-6 h-6" />, label: 'Phone', value: '+65 9154 3784' },
                    { icon: <Mail className="w-6 h-6" />, label: 'Email', value: 'contact@zsmerchant.co' }
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

            <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:border-primary/30 hover:-translate-y-1">
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
  const currentYear = new Date().getFullYear()
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
            © {currentYear} Z S Merchant & Co. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
