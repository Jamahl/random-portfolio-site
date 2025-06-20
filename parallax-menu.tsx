"use client"

import { useEffect, useState } from "react"
import { ChevronRight, Home, User, Briefcase, Mail, Star, Code } from "lucide-react"

const sections = [
  { id: "hero", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "services", label: "Services", icon: Star },
  { id: "portfolio", label: "Portfolio", icon: Briefcase },
  { id: "skills", label: "Skills", icon: Code },
  { id: "contact", label: "Contact", icon: Mail },
]

export default function ParallaxMenu() {
  const [activeSection, setActiveSection] = useState("hero")
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      // Find the current section in view
      const sectionElements = sections.map((section) => document.getElementById(section.id)).filter(Boolean)

      const currentSection = sectionElements.find((section) => {
        if (!section) return false
        const rect = section.getBoundingClientRect()
        return rect.top <= 100 && rect.bottom >= 100
      })

      if (currentSection) {
        setActiveSection(currentSection.id)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Sidebar Menu */}
      <div className="fixed left-0 top-0 w-1/5 h-screen z-50">
        <div
          className="h-full bg-black/20 backdrop-blur-xl border-r border-white/10"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        >
          {/* Logo/Brand */}
          <div className="p-8 border-b border-white/10">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <h2 className="text-white font-bold text-xl">Portfolio</h2>
            <p className="text-white/60 text-sm">Creative Developer</p>
          </div>

          {/* Navigation */}
          <nav className="p-6">
            <ul className="space-y-2">
              {sections.map((section, index) => {
                const Icon = section.icon
                const isActive = activeSection === section.id

                return (
                  <li key={section.id}>
                    <button
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group ${
                        isActive
                          ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30"
                          : "hover:bg-white/5"
                      }`}
                      style={{
                        transform: `translateX(${scrollY * 0.02 * (index + 1)}px)`,
                      }}
                    >
                      <div
                        className={`p-2 rounded-lg transition-all duration-300 ${
                          isActive
                            ? "bg-gradient-to-r from-purple-500 to-pink-500"
                            : "bg-white/10 group-hover:bg-white/20"
                        }`}
                      >
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span
                        className={`font-medium transition-all duration-300 ${
                          isActive ? "text-white" : "text-white/70 group-hover:text-white"
                        }`}
                      >
                        {section.label}
                      </span>
                      <ChevronRight
                        className={`w-4 h-4 ml-auto transition-all duration-300 ${
                          isActive ? "text-purple-400 translate-x-1" : "text-white/30 group-hover:text-white/60"
                        }`}
                      />
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Progress Indicator */}
          <div className="absolute bottom-8 left-6 right-6">
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                style={{
                  width: `${Math.min((scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100)}%`,
                }}
              />
            </div>
            <p className="text-white/40 text-xs mt-2 text-center">Scroll Progress</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-[20%] relative">
        {/* Hero Section */}
        <section id="hero" className="h-screen flex items-center justify-center relative overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          />
          <div className="text-center z-10">
            <h1
              className="text-6xl font-bold text-white mb-6"
              style={{
                transform: `translateY(${scrollY * 0.3}px)`,
              }}
            >
              Creative Developer
            </h1>
            <p
              className="text-xl text-white/80 max-w-2xl mx-auto"
              style={{
                transform: `translateY(${scrollY * 0.2}px)`,
              }}
            >
              Crafting beautiful digital experiences with modern web technologies
            </p>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="min-h-screen flex items-center justify-center p-16 relative">
          <div
            className="absolute inset-0 bg-gradient-to-l from-blue-600/10 to-purple-600/10"
            style={{
              transform: `translateY(${(scrollY - 800) * 0.3}px)`,
            }}
          />
          <div className="max-w-4xl mx-auto text-center z-10">
            <h2 className="text-5xl font-bold text-white mb-8">About Me</h2>
            <p className="text-lg text-white/80 leading-relaxed">
              I'm a passionate developer with expertise in modern web technologies. I love creating innovative solutions
              that combine beautiful design with powerful functionality.
            </p>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="min-h-screen flex items-center justify-center p-16 relative">
          <div
            className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-blue-600/10"
            style={{
              transform: `translateY(${(scrollY - 1600) * 0.4}px)`,
            }}
          />
          <div className="max-w-6xl mx-auto z-10">
            <h2 className="text-5xl font-bold text-white mb-12 text-center">Services</h2>
            <div className="grid grid-cols-3 gap-8">
              {["Web Development", "UI/UX Design", "Mobile Apps"].map((service, index) => (
                <div
                  key={service}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center"
                  style={{
                    transform: `translateY(${(scrollY - 1400) * 0.1 * (index + 1)}px)`,
                  }}
                >
                  <h3 className="text-2xl font-bold text-white mb-4">{service}</h3>
                  <p className="text-white/70">Professional {service.toLowerCase()} solutions</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="min-h-screen flex items-center justify-center p-16 relative">
          <div
            className="absolute inset-0 bg-gradient-to-l from-pink-600/10 to-purple-600/10"
            style={{
              transform: `translateY(${(scrollY - 2400) * 0.2}px)`,
            }}
          />
          <div className="max-w-6xl mx-auto z-10">
            <h2 className="text-5xl font-bold text-white mb-12 text-center">Portfolio</h2>
            <div className="grid grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((item, index) => (
                <div
                  key={item}
                  className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-white/10 flex items-center justify-center"
                  style={{
                    transform: `translateY(${(scrollY - 2200) * 0.05 * (index + 1)}px)`,
                  }}
                >
                  <span className="text-white/60 text-lg">Project {item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="min-h-screen flex items-center justify-center p-16 relative">
          <div
            className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 to-blue-600/10"
            style={{
              transform: `translateY(${(scrollY - 3200) * 0.3}px)`,
            }}
          />
          <div className="max-w-4xl mx-auto z-10">
            <h2 className="text-5xl font-bold text-white mb-12 text-center">Skills</h2>
            <div className="grid grid-cols-4 gap-6">
              {["React", "TypeScript", "Node.js", "Python", "Next.js", "Tailwind", "GraphQL", "AWS"].map(
                (skill, index) => (
                  <div
                    key={skill}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center"
                    style={{
                      transform: `translateY(${(scrollY - 3000) * 0.02 * (index + 1)}px)`,
                    }}
                  >
                    <span className="text-white font-medium">{skill}</span>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen flex items-center justify-center p-16 relative">
          <div
            className="absolute inset-0 bg-gradient-to-l from-purple-600/10 to-pink-600/10"
            style={{
              transform: `translateY(${(scrollY - 4000) * 0.1}px)`,
            }}
          />
          <div className="max-w-2xl mx-auto text-center z-10">
            <h2 className="text-5xl font-bold text-white mb-8">Get In Touch</h2>
            <p className="text-lg text-white/80 mb-8">
              Ready to start your next project? Let's create something amazing together.
            </p>
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-medium hover:scale-105 transition-transform duration-300">
              Contact Me
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
