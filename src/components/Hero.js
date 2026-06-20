"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Download } from "lucide-react";
import gsap from "gsap";

export default function Hero({ isLoading }) {
  const containerRef = useRef(null);
  const expRef = useRef(null);
  const standardsRef = useRef(null);

  useEffect(() => {
    if (isLoading) return;

    // Entrance animations
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".experience-badge",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      gsap.fromTo(
        ".hero-title",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );

      gsap.fromTo(
        ".hero-tagline",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.4 }
      );

      gsap.fromTo(
        ".hero-quote-card",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.5 }
      );

      gsap.fromTo(
        ".hero-ctas",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.6 }
      );

      gsap.fromTo(
        ".hero-stats-card",
        { opacity: 0, scale: 0.95, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: "back.out(1.2)", delay: 0.5 }
      );

      // Counters animation
      const stats = [
        { ref: expRef, value: 30 },
        { ref: standardsRef, value: 5 }
      ];

      stats.forEach((stat) => {
        if (stat.ref.current) {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: stat.value,
            duration: 1.8,
            ease: "power2.out",
            delay: 0.8,
            onUpdate: () => {
              if (stat.ref.current) {
                stat.ref.current.innerText = Math.floor(obj.val);
              }
            }
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading]);

  const handleScrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = contactSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef} id="hero" className="relative min-h-[calc(100vh-85px)] flex items-center bg-cover bg-center overflow-hidden" style={{ backgroundImage: "url('/images/hotel_lobby_bg.png')" }}>
      {/* Light gradient overlay to ensure readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/35 via-40% to-white/25 lg:to-transparent z-0"></div>

      <div className="max-w-[1200px] mx-auto px-6 w-full py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] gap-12 items-center">
          
          {/* Text Column */}
          <div className="flex flex-col gap-5 text-left items-start">
            <div className="experience-badge text-[#856424] font-bold text-xs tracking-[2px] uppercase">
              ESTABLISHED LEADERSHIP
            </div>
            
            <h1 className="hero-title text-4xl sm:text-5xl md:text-[3.8rem] font-heading font-bold text-[#0c1e36] leading-[1.1] tracking-tight">
              SURENDRA <span className="text-[#856424]">SINGH</span>
            </h1>
            
            <p className="hero-tagline text-[1.2rem] md:text-[1.35rem] font-heading font-medium text-[#0c1e36] leading-relaxed italic">
              Senior General Manager | 30+ Years of Hospitality Excellence
            </p>


            {/* Action Buttons */}
            <div className="hero-ctas flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
              <a 
                href="/files/Surendra_Singh_Resume.pdf" 
                download
                className="px-8 py-3.5 bg-[#0c1e36] hover:bg-[#152e50] text-white text-[0.8rem] font-bold uppercase tracking-wider rounded flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 shadow-[0_4px_12px_rgba(12,30,54,0.15)]"
              >
                <Download size={16} /> DOWNLOAD CV
              </a>
              <button 
                onClick={handleScrollToContact} 
                className="px-8 py-3.5 bg-transparent hover:bg-[#856424] hover:text-white border border-[#856424] text-[#856424] text-[0.8rem] font-bold uppercase tracking-wider rounded flex items-center justify-center gap-2 cursor-pointer transition-all duration-300"
              >
                GET IN TOUCH <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Floating Stats Card Column */}
          <div className="hero-stats-card flex justify-center lg:justify-end items-center z-10 w-full">
            <div className="bg-white border border-slate-200/80 shadow-[0_15px_40px_rgba(15,23,42,0.08)] rounded-[1rem] p-8 md:p-10 flex items-center justify-center gap-8 md:gap-12 divide-x divide-slate-100 max-w-[400px] w-full">
              <div className="flex flex-col items-center justify-center flex-1 text-center">
                <span className="font-heading text-4xl md:text-5xl font-bold text-[#856424] leading-none mb-2">
                  <span ref={expRef}>0</span>+
                </span>
                <span className="text-[0.7rem] font-bold text-[#0c1e36] tracking-[1px] uppercase">Years Exp</span>
              </div>
              <div className="flex flex-col items-center justify-center flex-1 text-center pl-8 md:pl-12">
                <span className="font-heading text-4xl md:text-5xl font-bold text-[#856424] leading-none mb-2 flex items-center justify-center">
                  <span ref={standardsRef}>0</span><span className="text-2xl md:text-3xl ml-0.5 align-middle">★</span>
                </span>
                <span className="text-[0.7rem] font-bold text-[#0c1e36] tracking-[1px] uppercase">Standards</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
