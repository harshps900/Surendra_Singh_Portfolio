"use client";

import { useEffect, useRef } from "react";
import { GraduationCap, Languages } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function EducationLanguages() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Slide left column from left
      gsap.fromTo(
        ".edu-col",
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // Slide right column from right
      gsap.fromTo(
        ".lang-col",
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="education" className="bg-white py-24 border-b border-slate-200">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Education Column */}
          <div className="edu-col flex flex-col gap-6">
            <h2 className="font-heading text-3xl font-bold text-brand-blue relative inline-block pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-gold-accent">
              Academic Credentials
            </h2>
            
            <div className="bg-slate-50 border border-slate-200/80 rounded-[1.5rem] p-6 md:p-8 flex gap-6 hover:bg-white hover:border-brand-blue/15 hover:shadow-[0_15px_35px_rgba(30,58,138,0.05)] transition-all duration-300 cursor-default">
              <div className="text-brand-blue bg-brand-blue/5 p-3 rounded-2xl flex items-center justify-center h-fit">
                <GraduationCap size={28} />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-gold-dark uppercase tracking-wider">1990 Passing Year</span>
                <h3 className="font-heading text-xl md:text-2xl font-bold text-brand-blue leading-tight">Bachelor of Commerce (B.Com)</h3>
                <h4 className="text-sm font-semibold text-slate-dark">APSV University, Satna</h4>
                <p className="text-sm text-slate-muted leading-relaxed">Graduated with a first-class equivalent percentage of 60%</p>
              </div>
            </div>
          </div>

          {/* Languages Column */}
          <div className="lang-col flex flex-col gap-4">
            <h2 className="font-heading text-3xl font-bold text-brand-blue relative inline-block pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-gold-accent">
              <Languages size={20} className="inline-block mr-2 align-middle" />
              Languages Spoken
            </h2>

            <div className="bg-slate-50 border border-slate-200/80 rounded-[1.2rem] p-5 md:p-6 flex justify-between items-center hover:bg-white hover:border-brand-blue/15 hover:shadow-[0_10px_25px_rgba(30,58,138,0.04)] transition-all duration-300 cursor-default">
              <span className="font-heading text-lg md:text-xl font-bold text-brand-blue">English</span>
              <span className="text-[0.75rem] font-bold bg-brand-light text-brand-blue px-3 py-1.5 rounded-full uppercase tracking-wider">Professional</span>
            </div>
            
            <div className="bg-slate-50 border border-slate-200/80 rounded-[1.2rem] p-5 md:p-6 flex justify-between items-center hover:bg-white hover:border-brand-blue/15 hover:shadow-[0_10px_25px_rgba(30,58,138,0.04)] transition-all duration-300 cursor-default">
              <span className="font-heading text-lg md:text-xl font-bold text-brand-blue">Hindi</span>
              <span className="text-[0.75rem] font-bold bg-brand-light text-brand-blue px-3 py-1.5 rounded-full uppercase tracking-wider">Native / Bilingual</span>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-[1.2rem] p-5 md:p-6 flex justify-between items-center hover:bg-white hover:border-brand-blue/15 hover:shadow-[0_10px_25px_rgba(30,58,138,0.04)] transition-all duration-300 cursor-default">
              <span className="font-heading text-lg md:text-xl font-bold text-brand-blue">Punjabi</span>
              <span className="text-[0.75rem] font-bold bg-brand-light text-brand-blue px-3 py-1.5 rounded-full uppercase tracking-wider">Bilingual</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
