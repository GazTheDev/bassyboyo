"use client";

import Link from "next/link";
import { ArrowLeft, Box, Zap, Layers, Maximize2, Lock } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";

export default function StadiumPackPage() {
  return (
    <main className="min-h-screen bg-[#022c22] text-white overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <div className="relative min-h-[90vh] flex flex-col items-center justify-center p-4 overflow-hidden">
        
        {/* Animated Background Gradients */}
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[#064E3B] rounded-full blur-[120px] opacity-40 animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-[#F97316] rounded-full blur-[120px] opacity-20 animate-pulse delay-1000"></div>
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)", backgroundSize: "40px 40px" }}></div>

        <div className="relative z-10 text-center max-w-5xl mx-auto space-y-8">
          
         

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#F97316]/30 bg-[#F97316]/10 text-[#F97316] text-xs font-bold uppercase tracking-[0.2em] mb-4 shadow-[0_0_15px_rgba(249,115,22,0.3)]">
            Coming to FM26
          </div>

          {/* Main Title with Text Gradient */}
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">
            MATCHDAY <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">REIMAGINED</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light">
            The most realistic <span className="text-[#F97316] font-bold">3D Stadium Pack</span> ever created. <br className="hidden md:block" /> 
            Ultra-HD textures, dynamic lighting, and authentic atmosphere.
          </p>

          {/* CTA Area */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-center gap-6">
            
            {/* The "Coming Soon" Button */}
            <button disabled className="group relative px-8 py-4 bg-gray-800 rounded-xl font-bold text-gray-400 cursor-not-allowed border border-gray-700 overflow-hidden">
              <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.2)_10px,rgba(0,0,0,0.2)_20px)] opacity-50"></div>
              <span className="relative flex items-center gap-2">
                <Lock size={18} /> Download Coming Soon
              </span>
            </button>

            {/* Notify Button */}
            <a href="#notify" className="text-white hover:text-[#F97316] font-medium transition-colors underline decoration-transparent hover:decoration-[#F97316] underline-offset-4">
              Get notified when it drops
            </a>
          </div>

        </div>
      </div>

      {/* --- 3D SHOWCASE SECTION --- */}
      <section className="py-32 px-4 relative z-20 bg-gradient-to-b from-[#022c22] to-black">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">
            
            <FeatureCard 
              icon={<Maximize2 size={32} />}
              title="4K Textures"
              desc="Every blade of grass, every seat, and every flag rendered in stunning ultra-high definition."
              delay="0"
            />
            
            <FeatureCard 
              icon={<Zap size={32} />}
              title="Crowds & Atmosphere"
              desc="Experience crowds  like never before."
              delay="100"
              highlight
            />

            <FeatureCard 
              icon={<Box size={32} />}
              title="300+ Stadiums"
              desc="From the Premier League to the Vanarama North. No ground left behind."
              delay="200"
            />

          </div>

          {/* Mockup Image Container */}
          <div className="mt-20 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#064E3B] to-[#F97316] rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-gray-900 rounded-2xl aspect-video overflow-hidden border border-white/10 flex items-center justify-center">
              
              {/* Actual Image inserted here, filling the container */}
              <img 
                src="https://i.ibb.co/pTW5nfn/G73w41s-Wc-AAg6j8.jpg" 
                alt="Gameplay Preview" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Optional: Overlay Text */}
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/50 to-transparent">
                <h3 className="text-2xl font-bold text-white">St James's Park (Updated 2026)</h3>
                <p className="text-[#F97316]">Coming Q4 2025</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- NOTIFICATION SECTION --- */}
      <section id="notify" className="py-24 px-4 bg-[#064E3B] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F97316] rounded-full blur-[100px] opacity-20"></div>
        
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4">Don't Miss Kick Off</h2>
          <p className="text-gray-300 mb-8 text-lg">
            This pack will be huge (approx 4GB). Join the Scouting Report to get the direct magnet link the second it goes live.
          </p>
          
          <div className="bg-black/20 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
            <NewsletterForm />
          </div>
        </div>
      </section>

    </main>
  );
}

// Helper Component for the Grid
function FeatureCard({ icon, title, desc, delay, highlight }: any) {
  return (
    <div 
      className={`p-8 rounded-2xl border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group ${
        highlight 
          ? "bg-white/5 border-[#F97316]/50 shadow-[0_0_30px_rgba(249,115,22,0.1)]" 
          : "bg-white/5 border-white/10 hover:border-white/20"
      }`}
    >
      <div className={`mb-6 p-4 rounded-xl inline-block ${
        highlight ? "bg-[#F97316] text-white" : "bg-white/10 text-white group-hover:bg-[#064E3B] transition-colors"
      }`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-gray-400 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}