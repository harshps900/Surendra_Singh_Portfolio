"use client";

import { useEffect, useRef } from "react";
import { Quote, Shield, Users, Award } from "lucide-react";
import gsap from "react"; // Wait, earlier I imported from "gsap"!
import gsapLib from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsapLib.registerPlugin(ScrollTrigger);
}

export default function Objective() {
  const containerRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsapLib.context(() => {
      // Animate the main card scaling up and fading in
      gsapLib.fromTo(
        cardRef.current,
        { opacity: 0, y: 50, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // Animate pillars staggered
      gsapLib.fromTo(
        ".pillar-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".pillar-grid",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="about" className="bg-slate-50 py-24 relative">
      <div className="max-w-[1200px] mx-auto px-6">
        <div ref={cardRef} className="bg-white rounded-[2rem] p-8 md:p-16 shadow-[0_10px_40px_rgba(30,58,138,0.03)] border border-slate-200/80 max-w-[950px] mx-auto relative text-center overflow-hidden after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-1 after:bg-gradient-to-r after:from-gold-accent after:to-brand-blue">
          
          <Quote size={50} className="text-gold-accent opacity-20 mx-auto mb-6 block" strokeWidth={1.5} />
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-brand-blue mb-6">Executive Vision & Objective</h2>
          <p className="font-heading text-xl md:text-2xl text-slate-dark font-medium leading-relaxed mb-12 relative z-10 italic max-w-[800px] mx-auto">
            "To continue my career with an organization that will utilize my MANAGEMENT, SUPERVISION & ADMINISTRATIVE skills to benefit mutual growth and success."
          </p>

          <div className="pillar-grid grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-8">
            
            <div className="pillar-card bg-slate-50 hover:bg-white border border-slate-200/60 rounded-[1.2rem] p-6 md:p-8 shadow-[0_8px_25px_rgba(30,58,138,0.01)] hover:shadow-[0_12px_30px_rgba(30,58,138,0.05)] hover:border-brand-blue/15 hover:-translate-y-1 transition-all duration-300 cursor-default">
              <Users size={24} className="text-brand-blue bg-brand-blue/5 p-2.5 rounded-xl mb-5 inline-block box-content" />
              <h3 className="text-lg font-bold text-brand-blue mb-2.5">Strategic Management</h3>
              <p className="text-sm text-slate-muted leading-relaxed">
                Guiding hotel operations with a focus on profitability, guest experience, and brand reputation.
              </p>
            </div>

            <div className="pillar-card bg-slate-50 hover:bg-white border border-slate-200/60 rounded-[1.2rem] p-6 md:p-8 shadow-[0_8px_25px_rgba(30,58,138,0.01)] hover:shadow-[0_12px_30px_rgba(30,58,138,0.05)] hover:border-brand-blue/15 hover:-translate-y-1 transition-all duration-300 cursor-default">
              <Shield size={24} className="text-brand-blue bg-brand-blue/5 p-2.5 rounded-xl mb-5 inline-block box-content" />
              <h3 className="text-lg font-bold text-brand-blue mb-2.5">Operational Supervision</h3>
              <p className="text-sm text-slate-muted leading-relaxed">
                Maintaining strict standards of excellence across front office, F&B, banquets, and housekeeping.
              </p>
            </div>

            <div className="pillar-card bg-slate-50 hover:bg-white border border-slate-200/60 rounded-[1.2rem] p-6 md:p-8 shadow-[0_8px_25px_rgba(30,58,138,0.01)] hover:shadow-[0_12px_30px_rgba(30,58,138,0.05)] hover:border-brand-blue/15 hover:-translate-y-1 transition-all duration-300 cursor-default">
              <Award size={24} className="text-brand-blue bg-brand-blue/5 p-2.5 rounded-xl mb-5 inline-block box-content" />
              <h3 className="text-lg font-bold text-brand-blue mb-2.5">Executive Administration</h3>
              <p className="text-sm text-slate-muted leading-relaxed">
                Organizing conferences, managing financial accounts, and fostering cooperative staff environments.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
