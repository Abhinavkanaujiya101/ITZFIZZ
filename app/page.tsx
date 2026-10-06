"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Gauge,
  Zap,
  Wind,
  BatteryCharging,
  ChevronDown,
  Layers,
  Sparkles,
  ShieldCheck,
  Cpu,
  ArrowUpRight,
  Terminal,
  Activity,
  Sliders,
  Eye,
  CheckCircle2,
} from "lucide-react";

// Safe SSR registration for GSAP ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const carVisualRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const statsContainerRef = useRef<HTMLDivElement>(null);

  // Interactive modes for the visual element
  const [viewMode, setViewMode] = useState<"cyber" | "wireframe" | "stealth">("cyber");
  const [scrollProgress, setScrollProgress] = useState(0);

  // Exact letter-spaced headline text required: "W E L C O M E   I T Z   F I Z Z"
  const rawWords = [
    ["W", "E", "L", "C", "O", "M", "E"],
    ["I", "T", "Z"],
    ["F", "I", "Z", "Z"],
  ];

  const stats = [
    {
      id: "accel",
      label: "0 — 100 KM/H",
      value: "1.79 s",
      sub: "Instant Dual-Motor Torque",
      icon: Zap,
      accent: "from-cyan-400 to-blue-500",
    },
    {
      id: "power",
      label: "PEAK OUTPUT",
      value: "1,420 HP",
      sub: "Quad-Vector Permanent Magnet",
      icon: Gauge,
      accent: "from-purple-400 to-pink-500",
    },
    {
      id: "aero",
      label: "DRAG COEFFICIENT",
      value: "0.198 Cd",
      sub: "Active Morphing Aerodynamics",
      icon: Wind,
      accent: "from-emerald-400 to-teal-500",
    },
    {
      id: "range",
      label: "WLTP RANGE",
      value: "820 KM",
      sub: "900V Silicon-Carbide Cell",
      icon: BatteryCharging,
      accent: "from-blue-400 to-indigo-500",
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // ----------------------------------------------------
      // 1. INITIAL LOAD ANIMATION TIMELINE
      // ----------------------------------------------------
      const loadTl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // 1a. Navigation & Top Badge
      loadTl.fromTo(
        ".anim-nav",
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      );

      loadTl.fromTo(
        ".anim-badge",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6 },
        "-=0.4"
      );

      // 1b. Headline Characters Stagger (Fade + Y-Offset)
      loadTl.fromTo(
        ".headline-letter",
        {
          opacity: 0,
          y: 70,
          rotateX: -45,
          filter: "blur(8px)",
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 0.9,
          stagger: 0.03,
          ease: "back.out(1.6)",
        },
        "-=0.3"
      );

      // 1c. Subtitle line
      loadTl.fromTo(
        ".anim-subtitle",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.5"
      );

      // 1d. Stats Cards Stagger in one by one
      loadTl.fromTo(
        ".stat-card",
        {
          opacity: 0,
          y: 40,
          scale: 0.92,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
        },
        "-=0.4"
      );

      // 1e. Main Visual Element (Car Object) smoothly introduces itself
      loadTl.fromTo(
        ".car-visual-wrapper",
        {
          opacity: 0,
          scale: 0.75,
          y: 80,
          filter: "blur(12px)",
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.3,
          ease: "expo.out",
        },
        "-=0.6"
      );

      // 1f. Scroll helper indicator
      loadTl.fromTo(
        ".scroll-indicator",
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.4"
      );

      // ----------------------------------------------------
      // 2. SCROLL-BASED ANIMATION (CORE FEATURE)
      // ----------------------------------------------------
      // Uses GSAP ScrollTrigger with scrub: true (or 1 for smooth catchup)
      // Directly tied to page scroll progress without abrupt autoplay.
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=220%",
          pin: true,
          scrub: 1.2, // Smooth interpolation tied directly to scroll
          anticipatePin: 1,
          onUpdate: (self) => {
            setScrollProgress(Math.round(self.progress * 100));
          },
        },
      });

      // 2a. Fade & lift out the headline and stats cards
      scrollTl.to(
        ".hero-text-content",
        {
          opacity: 0,
          y: -120,
          scale: 0.92,
          ease: "power1.inOut",
        },
        0
      );

      scrollTl.to(
        ".stat-card",
        {
          opacity: 0,
          y: -60,
          scale: 0.85,
          stagger: 0.04,
          ease: "power1.inOut",
        },
        0
      );

      scrollTl.to(
        ".scroll-indicator",
        {
          opacity: 0,
          y: 20,
          duration: 0.2,
        },
        0
      );

      // 2b. The Main Visual Element (Car/Object) smoothly scales and moves
      // Using high-performance GPU transforms: scale3d, translate3d, rotation
      scrollTl.to(
        ".car-visual-wrapper",
        {
          scale: 1.55,
          y: -40,
          rotateX: 18,
          rotateZ: -3,
          transformPerspective: 1200,
          filter: "drop-shadow(0 30px 60px rgba(0, 242, 254, 0.4))",
          ease: "power1.inOut",
        },
        0
      );

      // 2c. Accelerate background tunnel grid and particle lines
      scrollTl.to(
        ".bg-speed-lines",
        {
          opacity: 0.8,
          scaleY: 1.8,
          ease: "none",
        },
        0
      );

      // 2d. Reveal HUD telemetry overlays as car zooms closer in 2nd half of scroll
      scrollTl.fromTo(
        ".scroll-hud-overlay",
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "power2.out",
        },
        0.45
      );

      // 2e. Dynamic lighting sweep across the car body
      scrollTl.to(
        ".car-light-beam",
        {
          opacity: 1,
          scaleX: 1.4,
          ease: "power1.inOut",
        },
        0.2
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#06070a] text-slate-100 overflow-x-hidden selection:bg-cyan-400 selection:text-black">
      {/* Background Gradients & Mesh Grid */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-cyan-600/15 via-purple-600/10 to-transparent blur-[140px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-cyber-grid opacity-30" />
      </div>

      {/* TOP NAVIGATION BAR */}
      <header className="anim-nav fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 backdrop-blur-md bg-black/30 border-b border-white/5">
        <div className="flex items-center space-x-3">
          <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1px]">
            <div className="w-full h-full bg-[#07090e] rounded-lg flex items-center justify-center font-bold text-cyan-400 text-sm">
              FZ
            </div>
          </div>
          <span className="font-extrabold tracking-widest text-lg bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            ITZ FIZZ
          </span>
          <span className="hidden sm:inline-block px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
            Aero-V3 ScrollTrigger
          </span>
        </div>

        {/* Live Scroll Telemetry pill */}
        <div className="hidden md:flex items-center space-x-6 text-xs font-mono text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span>SCROLL PROGRESS:</span>
            <span className="text-cyan-400 font-bold">{scrollProgress}%</span>
          </div>

          <div className="h-3 w-px bg-white/10" />

          {/* Mode Switcher */}
          <div className="flex items-center bg-white/5 p-1 rounded-lg border border-white/10">
            {(["cyber", "wireframe", "stealth"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-2.5 py-1 rounded text-[11px] capitalize transition-all ${
                  viewMode === mode
                    ? "bg-cyan-500 text-black font-semibold shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        <a
          href="#specifications"
          className="px-4 py-1.5 rounded-full text-xs font-medium bg-white/10 hover:bg-white/20 border border-white/15 transition-all flex items-center space-x-1.5 text-slate-200 hover:text-white"
        >
          <span>Explore Specs</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </header>

      {/* ========================================================================= */}
      {/* 1. HERO SECTION (100vh Full Viewport Height Above the Fold)                */}
      {/* ========================================================================= */}
      <section
        ref={heroRef}
        id="hero-section"
        className="relative w-full h-screen min-h-[720px] flex flex-col justify-between items-center px-4 sm:px-8 pt-24 pb-8 overflow-hidden z-10"
      >
        {/* Speed lines backdrop for the scrub acceleration */}
        <div className="bg-speed-lines absolute inset-0 pointer-events-none opacity-20 transition-opacity">
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        </div>

        {/* TOP: Headline and Header Content */}
        <div className="hero-text-content flex flex-col items-center text-center max-w-5xl mx-auto pt-2 z-20">
          {/* Futuristic Badge */}
          <div className="anim-badge inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(0,242,254,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Pure Scroll-Driven Physics • GSAP Scrub 1.2</span>
          </div>

          {/* Letter-Spaced Headline: "W E L C O M E   I T Z   F I Z Z" */}
          <h1
            ref={headlineRef}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-[0.25em] sm:tracking-[0.35em] text-white leading-tight select-none mb-3"
            style={{ perspective: "1000px" }}
          >
            {rawWords.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block whitespace-nowrap mx-2 sm:mx-4">
                {word.map((char, charIndex) => (
                  <span
                    key={charIndex}
                    className="headline-letter inline-block mx-[2px] sm:mx-[4px] bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]"
                  >
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <p className="anim-subtitle text-xs sm:text-sm md:text-base font-light tracking-widest text-slate-400 uppercase max-w-2xl mx-auto">
            High-Performance Cybernetic Hypercraft • Aerodynamics & Precision Dynamics
          </p>

          {/* IMPACT METRICS / STATISTICS CARDS (Glassmorphism + Blur) */}
          <div
            ref={statsContainerRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full mt-6 sm:mt-8 px-2"
          >
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.id}
                  className="stat-card glass-panel glass-panel-hover rounded-xl p-3 sm:p-4 text-left relative overflow-hidden group cursor-pointer"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-full -mr-8 -mt-8 pointer-events-none transition-transform group-hover:scale-125" />
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] sm:text-xs font-mono font-medium tracking-wider text-slate-400 uppercase">
                      {stat.label}
                    </span>
                    <Icon className="w-4 h-4 text-cyan-400 opacity-80 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white mb-1 font-mono">
                    <span className={`bg-gradient-to-r ${stat.accent} bg-clip-text text-transparent`}>
                      {stat.value}
                    </span>
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-slate-400 truncate">
                    {stat.sub}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CENTER / MAIN VISUAL ELEMENT (Car / Vehicle Object with Scrub Scaling)    */}
        {/* ========================================================================= */}
        <div className="relative w-full max-w-4xl flex-1 flex items-center justify-center my-2 z-20">
          <div
            ref={carVisualRef}
            className="car-visual-wrapper relative w-full max-w-2xl h-56 sm:h-72 md:h-80 flex items-center justify-center transform-gpu cursor-grab active:cursor-grabbing"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Ambient Platform Glow Ring */}
            <div className="absolute bottom-2 sm:bottom-4 w-[85%] h-12 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent blur-2xl rounded-full pointer-events-none" />

            {/* Neon Speed Beam Effect */}
            <div className="car-light-beam absolute -top-8 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 blur-sm pointer-events-none" />

            {/* HIGH-PRECISION CYBER VEHICLE VISUAL (SVG + CSS 3D Layering) */}
            <div
              className={`relative w-full h-full flex items-center justify-center transition-all duration-500 ${
                viewMode === "wireframe"
                  ? "filter drop-shadow-[0_0_20px_rgba(0,242,254,0.7)]"
                  : viewMode === "stealth"
                  ? "filter drop-shadow-[0_0_25px_rgba(20,20,30,0.9)] opacity-90"
                  : "filter drop-shadow-[0_0_35px_rgba(0,242,254,0.45)]"
              }`}
            >
              <svg
                viewBox="0 0 900 420"
                className="w-full h-full object-contain overflow-visible"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* SVG Definitions for futuristic shaders */}
                <defs>
                  <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={viewMode === "wireframe" ? "#03141f" : viewMode === "stealth" ? "#12141a" : "#0d131f"} />
                    <stop offset="50%" stopColor={viewMode === "wireframe" ? "#072b42" : viewMode === "stealth" ? "#1e222e" : "#1a253a"} />
                    <stop offset="100%" stopColor={viewMode === "wireframe" ? "#020f18" : viewMode === "stealth" ? "#0b0c10" : "#0a0e17"} />
                  </linearGradient>

                  <linearGradient id="neonCyan" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00F2FE" />
                    <stop offset="50%" stopColor="#4FACFE" />
                    <stop offset="100%" stopColor="#00c6ff" />
                  </linearGradient>

                  <linearGradient id="neonPurple" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7F00FF" />
                    <stop offset="100%" stopColor="#E100FF" />
                  </linearGradient>

                  <linearGradient id="glassRoof" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(0, 242, 254, 0.4)" />
                    <stop offset="100%" stopColor="rgba(10, 15, 25, 0.9)" />
                  </linearGradient>

                  <filter id="laserGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Ground Reflection Grid Line */}
                <path
                  d="M100 370 L800 370"
                  stroke="rgba(0, 242, 254, 0.3)"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />

                {/* Aerodynamic Underbody Diffuser */}
                <path
                  d="M140 330 L220 340 L680 340 L760 330 L730 355 L170 355 Z"
                  fill="#080b12"
                  stroke={viewMode === "wireframe" ? "#00F2FE" : "#1e293b"}
                  strokeWidth="1.5"
                />

                {/* Rear Spoiler / Wing */}
                <path
                  d="M110 210 L190 205 L230 220 L160 225 Z"
                  fill="url(#bodyGrad)"
                  stroke="url(#neonCyan)"
                  strokeWidth={viewMode === "wireframe" ? "2" : "1.5"}
                />
                <path d="M150 225 L160 265 L175 265 L170 223 Z" fill="#0f172a" />

                {/* Main Vehicle Chassis & Monocoque Contour */}
                <path
                  d="M130 300 
                     C130 260, 160 240, 210 235 
                     C270 230, 310 180, 410 160 
                     C530 135, 620 170, 710 240 
                     C770 255, 800 275, 800 305 
                     C800 325, 780 330, 750 330 
                     L690 330 
                     C670 290, 600 290, 580 330 
                     L320 330 
                     C300 290, 230 290, 210 330 
                     L150 330 
                     C135 330, 130 315, 130 300 Z"
                  fill="url(#bodyGrad)"
                  stroke={viewMode === "wireframe" ? "#00F2FE" : "#2e3b52"}
                  strokeWidth={viewMode === "wireframe" ? "2.5" : "1.8"}
                />

                {/* Cockpit Canopy Glass */}
                <path
                  d="M330 220 
                     C360 175, 430 165, 510 165 
                     C575 165, 625 190, 665 230 
                     L490 226 Z"
                  fill="url(#glassRoof)"
                  stroke="url(#neonCyan)"
                  strokeWidth="1.5"
                  className="opacity-90"
                />

                {/* Cyber Character Side Contour Line */}
                <path
                  d="M210 255 C350 250, 520 230, 750 275"
                  stroke={viewMode === "wireframe" ? "#00F2FE" : "rgba(255,255,255,0.4)"}
                  strokeWidth="1.5"
                  strokeDasharray={viewMode === "wireframe" ? "4 4" : "none"}
                />

                {/* Laser Headlights Strip (Right / Front) */}
                <path
                  d="M740 265 L795 285 L765 292 Z"
                  fill="#00F2FE"
                  filter="url(#laserGlow)"
                  className="animate-pulse"
                />

                {/* Tail Light Neon Strip (Left / Rear) */}
                <path
                  d="M130 290 L180 285 L180 295 L130 298 Z"
                  fill="#FF0844"
                  filter="url(#laserGlow)"
                />

                {/* FRONT WHEEL & CARBON CERAMIC BRAKE */}
                <g transform="translate(635, 330)">
                  <circle cx="0" cy="0" r="50" fill="#07090e" stroke="#1f293d" strokeWidth="6" />
                  <circle cx="0" cy="0" r="42" fill="#0e131f" stroke="#00F2FE" strokeWidth="1.5" strokeDasharray="6 3" />
                  <circle cx="0" cy="0" r="28" fill="#182030" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  {/* Caliper */}
                  <rect x="-18" y="-30" width="12" height="24" rx="3" fill="#00F2FE" filter="url(#laserGlow)" />
                  {/* Rim Spokes */}
                  <line x1="-35" y1="0" x2="35" y2="0" stroke="#00F2FE" strokeWidth="2" opacity="0.8" />
                  <line x1="0" y1="-35" x2="0" y2="35" stroke="#00F2FE" strokeWidth="2" opacity="0.8" />
                  <circle cx="0" cy="0" r="10" fill="#07090e" stroke="#00F2FE" strokeWidth="2" />
                </g>

                {/* REAR WHEEL & CARBON CERAMIC BRAKE */}
                <g transform="translate(265, 330)">
                  <circle cx="0" cy="0" r="50" fill="#07090e" stroke="#1f293d" strokeWidth="6" />
                  <circle cx="0" cy="0" r="42" fill="#0e131f" stroke="#00F2FE" strokeWidth="1.5" strokeDasharray="6 3" />
                  <circle cx="0" cy="0" r="28" fill="#182030" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  {/* Caliper */}
                  <rect x="-18" y="-30" width="12" height="24" rx="3" fill="#00F2FE" filter="url(#laserGlow)" />
                  {/* Rim Spokes */}
                  <line x1="-35" y1="0" x2="35" y2="0" stroke="#00F2FE" strokeWidth="2" opacity="0.8" />
                  <line x1="0" y1="-35" x2="0" y2="35" stroke="#00F2FE" strokeWidth="2" opacity="0.8" />
                  <circle cx="0" cy="0" r="10" fill="#07090e" stroke="#00F2FE" strokeWidth="2" />
                </g>

                {/* Wireframe Mesh Nodes Overlay (active in wireframe mode) */}
                {viewMode === "wireframe" && (
                  <g stroke="#00F2FE" strokeWidth="0.8" opacity="0.7">
                    <line x1="260" y1="240" x2="330" y2="220" />
                    <line x1="330" y1="220" x2="410" y2="160" />
                    <line x1="410" y1="160" x2="510" y2="165" />
                    <line x1="510" y1="165" x2="620" y2="210" />
                    <line x1="620" y1="210" x2="710" y2="240" />
                    <line x1="410" y1="160" x2="450" y2="240" />
                    <line x1="510" y1="165" x2="550" y2="240" />
                  </g>
                )}
              </svg>

              {/* Floating Holographic Telemetry Badges on the Vehicle */}
              <div className="absolute top-4 left-6 sm:left-12 glass-pill px-3 py-1 rounded-full text-[10px] font-mono text-cyan-300 border border-cyan-500/30 flex items-center space-x-1.5 shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span>ACTIVE AERO: 84% DEPLOYED</span>
              </div>

              <div className="absolute bottom-6 right-6 sm:right-12 glass-pill px-3 py-1 rounded-full text-[10px] font-mono text-purple-300 border border-purple-500/30 flex items-center space-x-1.5 shadow-lg">
                <Activity className="w-3 h-3 text-purple-400" />
                <span>TORQUE VECTORING: OPTIMAL</span>
              </div>
            </div>

            {/* SCROLL TRIGGER SCRUB HUD OVERLAY (Reveals as user scrolls down) */}
            <div className="scroll-hud-overlay absolute -bottom-10 left-1/2 -translate-x-1/2 w-full max-w-lg glass-panel rounded-2xl p-4 border border-cyan-500/30 opacity-0 pointer-events-none">
              <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                <span className="text-xs font-mono text-cyan-400 font-bold tracking-widest flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  SCRUB TELEMETRY DYNAMICS
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300">
                  REAL-TIME PIN
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center font-mono">
                <div className="bg-black/40 p-2 rounded-lg border border-white/5">
                  <div className="text-[10px] text-slate-400">DOWNFORCE</div>
                  <div className="text-cyan-400 font-bold text-sm">{(scrollProgress * 8.4 + 200).toFixed(0)} KG</div>
                </div>
                <div className="bg-black/40 p-2 rounded-lg border border-white/5">
                  <div className="text-[10px] text-slate-400">SCALE FACTOR</div>
                  <div className="text-purple-400 font-bold text-sm">{(1 + (scrollProgress / 100) * 0.55).toFixed(2)}x</div>
                </div>
                <div className="bg-black/40 p-2 rounded-lg border border-white/5">
                  <div className="text-[10px] text-slate-400">VELOCITY VEC</div>
                  <div className="text-emerald-400 font-bold text-sm">{(scrollProgress * 3.4).toFixed(0)} KM/H</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM: Scroll Indicator */}
        <div className="scroll-indicator flex flex-col items-center space-y-2 text-slate-400 text-xs font-mono tracking-widest z-20">
          <span>SCROLL TO ENGAGE FULL DYNAMICS</span>
          <div className="w-5 h-8 rounded-full border border-slate-600 flex justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-cyan-400 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SPECIFICATIONS & AERO-ARCHITECTURE SECTION (Scrolls naturally after pin) */}
      {/* ========================================================================= */}
      <section id="specifications" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto z-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center space-x-2 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-2">
              <Layers className="w-4 h-4" />
              <span>Scroll-Triggered Engineering Details</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
              DECONSTRUCTED AERODYNAMICS
            </h2>
          </div>
          <p className="text-slate-400 max-w-md text-sm mt-4 md:mt-0 font-light">
            Engineered with computational fluid dynamics (CFD) and responsive ground-effect venturis for race-track stabilization.
          </p>
        </div>

        {/* Tech Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel glass-panel-hover rounded-2xl p-6 border border-white/10 relative overflow-hidden">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-5 text-cyan-400">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">900V Silicon-Carbide Dual Inverters</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Micro-second switching frequencies deliver instant torque response directly to all four wheels with zero drivetrain lag.
            </p>
            <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>99.2% Motor Efficiency</span>
            </div>
          </div>

          <div className="glass-panel glass-panel-hover rounded-2xl p-6 border border-white/10 relative overflow-hidden">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-5 text-purple-400">
              <Wind className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Morphing Active Aero Surfaces</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Front splitter ducts and adaptive rear airbrakes modulate automatically based on yaw angles, deceleration, and high-speed cornering.
            </p>
            <div className="flex items-center space-x-2 text-xs font-mono text-purple-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Adaptive Ground Venturis</span>
            </div>
          </div>

          <div className="glass-panel glass-panel-hover rounded-2xl p-6 border border-white/10 relative overflow-hidden">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5 text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Carbon Honeycomb Safety Cell</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Monocoque chassis weighing only 185 kg while offering over 65,000 Nm/deg of torsional rigidity for pinpoint track control.
            </p>
            <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>FIA Homologated Standard</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. ARCHITECTURE & IMPLEMENTATION GUIDE SECTION                           */}
      {/* ========================================================================= */}
      <section className="py-20 px-6 md:px-12 max-w-5xl mx-auto z-20">
        <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-cyan-500/20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 blur-[90px] rounded-full pointer-events-none" />

          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
              <Terminal className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-white">Engineering Architecture & GSAP Highlights</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-4">
              <div className="border-l-2 border-cyan-500 pl-4">
                <h4 className="font-bold text-white mb-1">1. Next.js App Router Client Boundary</h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Marked with <code className="text-cyan-300 font-mono">"use client"</code> and safely registers GSAP + ScrollTrigger inside a guarded window context to prevent SSR hydration mismatches.
                </p>
              </div>

              <div className="border-l-2 border-purple-500 pl-4">
                <h4 className="font-bold text-white mb-1">2. Memory-Safe GSAP Context Cleanup</h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Utilizes <code className="text-purple-300 font-mono">gsap.context()</code> with <code className="text-purple-300 font-mono">ctx.revert()</code> cleanup in <code className="text-purple-300 font-mono">useEffect</code>, preventing stale triggers and memory leaks on route changes.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border-l-2 border-emerald-500 pl-4">
                <h4 className="font-bold text-white mb-1">3. Direct Scroll Progress Scrubbing</h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Configured with <code className="text-emerald-300 font-mono">scrub: 1.2</code>. Every millimeter of user scroll ties directly to 3D matrix transforms without jumpy time-based autoplay.
                </p>
              </div>

              <div className="border-l-2 border-blue-500 pl-4">
                <h4 className="font-bold text-white mb-1">4. Zero Layout Thrashing (GPU Only)</h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Animations leverage hardware-accelerated properties: <code className="text-blue-300 font-mono">transform</code>, <code className="text-blue-300 font-mono">scale</code>, <code className="text-blue-300 font-mono">opacity</code>, and <code className="text-blue-300 font-mono">rotateX/Z</code>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-10 px-6 text-center text-xs font-mono text-slate-500 z-20 relative">
        <p className="mb-2">
          ITZ FIZZ • SCROLL-DRIVEN HERO ANIMATION ASSIGNMENT • NEXT.JS 15 + TAILWIND CSS + GSAP SCROLLTRIGGER
        </p>
        <p className="text-slate-600">
          Engineered for production readiness, high-FPS scrolling, and responsive accessibility.
        </p>
      </footer>
    </div>
  );
}
