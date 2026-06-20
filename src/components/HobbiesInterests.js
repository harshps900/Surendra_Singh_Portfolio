"use client";

import { useEffect, useRef } from "react";
import { BookOpen, Compass, Search, Star } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HobbiesInterests() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hobby-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.25,
          ease: "power3.out",
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
    <section ref={containerRef} className="bg-brand-light py-24 relative">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-brand-blue text-center mb-4 relative inline-block left-1/2 -translate-x-1/2 after:content-[''] after:absolute after:bottom-[-8px] after:left-1/2 after:-translate-x-1/2 after:w-[60px] after:h-[3px] after:bg-gradient-to-r after:from-brand-blue after:to-gold-accent after:rounded">
          Interests & Hobbies
        </h2>
        <p className="text-center text-slate-muted text-[1.1rem] max-w-[600px] mx-auto mb-16 mt-6">
          Fostering personal growth and administrative curiosity outside the operational daily tasks.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Interests Card */}
          <div className="hobby-card bg-white border border-slate-200/80 rounded-[1.5rem] p-8 md:p-12 flex flex-col gap-6 relative overflow-hidden shadow-[0_10px_25px_rgba(30,58,138,0.01)] hover:shadow-[0_15px_35px_rgba(30,58,138,0.05)] hover:border-brand-blue/15 hover:-translate-y-1 transition-all duration-300 cursor-default after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-1.5 after:bg-gradient-to-r after:from-brand-blue after:to-gold-accent">
            <div className="text-brand-blue bg-brand-light p-3.5 rounded-2xl w-fit">
              <Compass size={28} />
            </div>
            <h3 className="font-heading text-2xl font-bold text-brand-blue">Professional Focus</h3>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200/80 rounded-xl hover:bg-white hover:border-brand-blue/10 hover:translate-x-1.5 transition-all duration-300">
                <Star size={20} className="text-gold-accent shrink-0" />
                <div className="flex flex-col">
                  <span className="text-base font-bold text-brand-blue">Front Office Management</span>
                  <span className="text-xs text-slate-muted mt-0.5">Studying modern digital checking systems, CRM tools, and front-desk visual designs.</span>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200/80 rounded-xl hover:bg-white hover:border-brand-blue/10 hover:translate-x-1.5 transition-all duration-300">
                <BookOpen size={20} className="text-gold-accent shrink-0" />
                <div className="flex flex-col">
                  <span className="text-base font-bold text-brand-blue">Reading Literature</span>
                  <span className="text-xs text-slate-muted mt-0.5">Analyzing leadership bios, operational case studies, and hospitality philosophy.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hobbies Card */}
          <div className="hobby-card bg-white border border-slate-200/80 rounded-[1.5rem] p-8 md:p-12 flex flex-col gap-6 relative overflow-hidden shadow-[0_10px_25px_rgba(30,58,138,0.01)] hover:shadow-[0_15px_35px_rgba(30,58,138,0.05)] hover:border-brand-blue/15 hover:-translate-y-1 transition-all duration-300 cursor-default after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-1.5 after:bg-gradient-to-r after:from-brand-blue after:to-gold-accent">
            <div className="text-brand-blue bg-brand-light p-3.5 rounded-2xl w-fit">
              <BookOpen size={28} />
            </div>
            <h3 className="font-heading text-2xl font-bold text-brand-blue">Personal Pursuits</h3>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200/80 rounded-xl hover:bg-white hover:border-brand-blue/10 hover:translate-x-1.5 transition-all duration-300">
                <BookOpen size={20} className="text-gold-accent shrink-0" />
                <div className="flex flex-col">
                  <span className="text-base font-bold text-brand-blue">Reading Books</span>
                  <span className="text-xs text-slate-muted mt-0.5">A lifetime reader of motivational essays, management philosophy, and historical narratives.</span>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200/80 rounded-xl hover:bg-white hover:border-brand-blue/10 hover:translate-x-1.5 transition-all duration-300">
                <Search size={20} className="text-gold-accent shrink-0" />
                <div className="flex flex-col">
                  <span className="text-base font-bold text-brand-blue">Hotel Design Reviews</span>
                  <span className="text-xs text-slate-muted mt-0.5">Exploring architecture, ambient lighting, and layout designs of global boutique hotels.</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
