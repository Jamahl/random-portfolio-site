"use client"

import { useEffect, useState, useRef } from "react"
import { Zap, Globe, Cpu, Shield, Rocket, Terminal, Circle } from "lucide-react"

const sections = [
  { id: "intro", label: "INIT", icon: Terminal, color: "from-cyan-400 to-blue-500" },
  { id: "systems", label: "SYSTEMS", icon: Cpu, color: "from-green-400 to-emerald-500" },
  { id: "network", label: "NETWORK", icon: Globe, color: "from-purple-400 to-violet-500" },
  { id: "security", label: "SECURITY", icon: Shield, color: "from-red-400 to-pink-500" },
  { id: "deploy", label: "DEPLOY", icon: Rocket, color: "from-orange-400 to-yellow-500" },
  { id: "terminal", label: "TERMINAL", icon: Zap, color: "from-indigo-400 to-purple-500" },
]

export default function CyberpunkMenu() {
  const [activeSection, setActiveSection] = useState("intro")
  const [scrollY, setScrollY] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      const sectionElements = sections.map((section) => document.getElementById(section.id)).filter(Boolean)
      const currentSection = sectionElements.find((section) => {
        if (!section) return false
        const rect = section.getBoundingClientRect()
        return rect.top <= 200 && rect.bottom >= 200
      })

      if (currentSection) {
        setActiveSection(currentSection.id)
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Animated background grid
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth * 0.2
    canvas.height = window.innerHeight

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.strokeStyle = "rgba(0, 255, 255, 0.1)"
      ctx.lineWidth = 1

      const gridSize = 30
      const offsetX = (scrollY * 0.1) % gridSize
      const offsetY = (scrollY * 0.05) % gridSize

      for (let x = -offsetX; x < canvas.width + gridSize; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      for (let y = -offsetY; y < canvas.height + gridSize; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
    }

    drawGrid()
  }, [scrollY])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const getActiveIndex = () => sections.findIndex((s) => s.id === activeSection)

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        {/* Floating orbs */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-30"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 20}%`,
              transform: `translate(${Math.sin(scrollY * 0.01 + i) * 20}px, ${Math.cos(scrollY * 0.01 + i) * 15}px)`,
              boxShadow: "0 0 20px currentColor",
            }}
          />
        ))}
      </div>

      {/* Sidebar */}
      <div className="fixed left-0 top-0 w-1/5 h-screen z-50 border-r border-cyan-500/20">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        <div className="relative h-full bg-black/80 backdrop-blur-sm">
          {/* Header */}
          <div className="p-6 border-b border-cyan-500/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
              <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
            </div>
            <div className="font-mono">
              <div className="text-cyan-400 text-sm mb-1">SYSTEM_STATUS</div>
              <div className="text-green-400 text-xs">ONLINE</div>
            </div>
          </div>

          {/* Navigation */}
          <div className="p-4">
            <div className="space-y-1">
              {sections.map((section, index) => {
                const Icon = section.icon
                const isActive = activeSection === section.id
                const distance = Math.abs(getActiveIndex() - index)

                return (
                  <div key={section.id} className="relative">
                    {/* Connection line */}
                    {index < sections.length - 1 && (
                      <div
                        className="absolute left-6 top-12 w-0.5 h-8 bg-gradient-to-b from-cyan-500/50 to-transparent"
                        style={{
                          opacity: isActive ? 1 : 0.3,
                          transform: `scaleY(${1 + scrollY * 0.0001})`,
                        }}
                      />
                    )}

                    <button
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full flex items-center gap-4 p-3 rounded-lg transition-all duration-500 group relative overflow-hidden ${
                        isActive ? "bg-cyan-500/10 border border-cyan-500/30" : "hover:bg-white/5"
                      }`}
                      style={{
                        transform: `translateX(${isActive ? 8 : distance * 2}px) translateY(${scrollY * 0.01 * (index + 1)}px)`,
                        filter: `blur(${distance * 0.5}px)`,
                        opacity: 1 - distance * 0.1,
                      }}
                    >
                      {/* Glitch effect background */}
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-transparent animate-pulse" />
                      )}

                      <div
                        className={`relative z-10 p-2 rounded-md bg-gradient-to-r ${section.color} ${isActive ? "shadow-lg" : "opacity-70"}`}
                      >
                        <Icon className="w-4 h-4 text-black" />
                      </div>

                      <div className="flex-1 text-left">
                        <div
                          className={`font-mono text-sm font-bold tracking-wider ${
                            isActive ? "text-cyan-400" : "text-white/70 group-hover:text-white"
                          }`}
                        >
                          {section.label}
                        </div>
                        <div className="text-xs text-white/40 font-mono">{String(index + 1).padStart(2, "0")}</div>
                      </div>

                      {isActive && (
                        <div className="flex flex-col gap-1">
                          <Circle className="w-2 h-2 text-cyan-400 fill-current animate-pulse" />
                          <Circle
                            className="w-1 h-1 text-cyan-400 fill-current animate-pulse"
                            style={{ animationDelay: "0.5s" }}
                          />
                        </div>
                      )}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Status Panel */}
          <div className="absolute bottom-6 left-4 right-4">
            <div className="bg-black/60 border border-cyan-500/30 rounded-lg p-4 font-mono text-xs">
              <div className="flex justify-between items-center mb-2">
                <span className="text-cyan-400">SCROLL_POS</span>
                <span className="text-green-400">{Math.round(scrollY)}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-cyan-400">ACTIVE_SEC</span>
                <span className="text-green-400">{activeSection.toUpperCase()}</span>
              </div>
              <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-green-400 transition-all duration-300"
                  style={{
                    width: `${Math.min((scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-[20%] relative">
        {/* Intro Section */}
        <section id="intro" className="h-screen flex items-center justify-center relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at ${mousePos.x * 0.1}% ${mousePos.y * 0.1}%, rgba(0,255,255,0.1) 0%, transparent 50%)`,
            }}
          />
          <div className="text-center z-10">
            <div
              className="text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
              style={{
                transform: `translateY(${scrollY * 0.3}px) rotateX(${scrollY * 0.05}deg)`,
              }}
            >
              CYBER_SPACE
            </div>
            <div
              className="text-xl text-cyan-400 font-mono tracking-wider"
              style={{
                transform: `translateY(${scrollY * 0.2}px)`,
              }}
            >
              {"> INITIALIZING_NEURAL_INTERFACE..."}
            </div>
          </div>
        </section>

        {/* Systems Section */}
        <section id="systems" className="min-h-screen flex items-center justify-center p-16 relative">
          <div
            className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5"
            style={{
              transform: `translateY(${(scrollY - 800) * 0.4}px) skewY(${(scrollY - 800) * 0.01}deg)`,
            }}
          />
          <div className="max-w-4xl mx-auto z-10">
            <h2 className="text-6xl font-bold text-green-400 mb-8 font-mono">SYSTEMS_ONLINE</h2>
            <div className="grid grid-cols-2 gap-8">
              {["NEURAL_NET", "QUANTUM_CORE", "DATA_STREAM", "AI_MATRIX"].map((system, index) => (
                <div
                  key={system}
                  className="bg-black/40 border border-green-500/30 rounded-lg p-6 backdrop-blur-sm"
                  style={{
                    transform: `translateY(${(scrollY - 600) * 0.1 * (index + 1)}px) rotateY(${(scrollY - 600) * 0.02}deg)`,
                  }}
                >
                  <div className="text-green-400 font-mono text-lg mb-2">{system}</div>
                  <div className="text-white/60 text-sm">STATUS: ACTIVE</div>
                  <div className="mt-4 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-400 to-emerald-500 animate-pulse"
                      style={{ width: "85%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Network Section */}
        <section id="network" className="min-h-screen flex items-center justify-center p-16 relative">
          <div
            className="absolute inset-0 bg-gradient-to-l from-purple-500/5 to-violet-500/5"
            style={{
              transform: `translateY(${(scrollY - 1600) * 0.3}px)`,
            }}
          />
          <div className="max-w-6xl mx-auto z-10">
            <h2 className="text-6xl font-bold text-purple-400 mb-12 font-mono text-center">NETWORK_GRID</h2>
            <div className="relative">
              {/* Network visualization */}
              <div className="grid grid-cols-4 gap-8">
                {[...Array(8)].map((_, index) => (
                  <div
                    key={index}
                    className="aspect-square bg-gradient-to-br from-purple-500/20 to-violet-500/20 border border-purple-500/30 rounded-lg flex items-center justify-center"
                    style={{
                      transform: `translateY(${(scrollY - 1400) * 0.05 * (index + 1)}px) scale(${1 + Math.sin(scrollY * 0.01 + index) * 0.1})`,
                    }}
                  >
                    <div className="w-4 h-4 bg-purple-400 rounded-full animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section id="security" className="min-h-screen flex items-center justify-center p-16 relative">
          <div
            className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-pink-500/5"
            style={{
              transform: `translateY(${(scrollY - 2400) * 0.2}px)`,
            }}
          />
          <div className="max-w-4xl mx-auto text-center z-10">
            <h2 className="text-6xl font-bold text-red-400 mb-8 font-mono">SECURITY_PROTOCOL</h2>
            <div className="text-lg text-red-300 font-mono mb-8">FIREWALL: ACTIVE | ENCRYPTION: 256-BIT</div>
            <div className="grid grid-cols-3 gap-6">
              {["INTRUSION_DETECT", "DATA_ENCRYPT", "ACCESS_CONTROL"].map((protocol, index) => (
                <div
                  key={protocol}
                  className="bg-red-500/10 border border-red-500/30 rounded-lg p-6"
                  style={{
                    transform: `translateY(${(scrollY - 2200) * 0.08 * (index + 1)}px)`,
                  }}
                >
                  <div className="text-red-400 font-mono text-sm">{protocol}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Deploy Section */}
        <section id="deploy" className="min-h-screen flex items-center justify-center p-16 relative">
          <div
            className="absolute inset-0 bg-gradient-to-l from-orange-500/5 to-yellow-500/5"
            style={{
              transform: `translateY(${(scrollY - 3200) * 0.4}px)`,
            }}
          />
          <div className="max-w-4xl mx-auto text-center z-10">
            <h2 className="text-6xl font-bold text-orange-400 mb-8 font-mono">DEPLOY_SEQUENCE</h2>
            <div className="text-lg text-orange-300 font-mono mb-8">LAUNCHING IN T-MINUS 3... 2... 1...</div>
            <button className="bg-gradient-to-r from-orange-500 to-yellow-500 text-black px-12 py-6 rounded-lg font-mono font-bold text-xl hover:scale-105 transition-transform duration-300 shadow-lg">
              EXECUTE_LAUNCH
            </button>
          </div>
        </section>

        {/* Terminal Section */}
        <section id="terminal" className="min-h-screen flex items-center justify-center p-16 relative">
          <div
            className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5"
            style={{
              transform: `translateY(${(scrollY - 4000) * 0.1}px)`,
            }}
          />
          <div className="max-w-4xl mx-auto z-10">
            <h2 className="text-6xl font-bold text-indigo-400 mb-8 font-mono text-center">TERMINAL_ACCESS</h2>
            <div className="bg-black border border-indigo-500/30 rounded-lg p-6 font-mono">
              <div className="text-indigo-400 mb-4">{"> SYSTEM_READY"}</div>
              <div className="text-green-400 mb-2">{"> CONNECTION_ESTABLISHED"}</div>
              <div className="text-yellow-400 mb-2">{"> AWAITING_INPUT..."}</div>
              <div className="flex items-center">
                <span className="text-cyan-400">{"> "}</span>
                <div className="w-2 h-4 bg-cyan-400 ml-1 animate-pulse" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
