"use client";

import { useEffect, useRef } from "react";
import { Bell, MessageSquare, Users, CreditCard, Utensils, Armchair } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Competencies() {
  const containerRef = useRef(null);

  const handleMouseMove = (e, cardEl, isDarkCard = false, isGoldCard = false) => {
    if (!cardEl) return;
    const rect = cardEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const tiltX = -((y - rect.height / 2) / (rect.height / 2)) * 8;
    const tiltY = ((x - rect.width / 2) / (rect.width / 2)) * 8;

    const iconWrapper = cardEl.querySelector(".icon-wrapper");

    let hoverShadow = "0 15px 35px rgba(15, 23, 42, 0.08)";
    let hoverBorder = "rgba(133, 100, 36, 0.2)";
    if (isDarkCard) {
      hoverShadow = "0 15px 35px rgba(12, 30, 54, 0.25)";
      hoverBorder = "rgba(255, 255, 255, 0.15)";
    } else if (isGoldCard) {
      hoverShadow = "0 15px 35px rgba(133, 100, 36, 0.25)";
      hoverBorder = "rgba(255, 255, 255, 0.15)";
    }

    gsap.to(cardEl, {
      rotateX: tiltX,
      rotateY: tiltY,
      scale: 1.02,
      transformPerspective: 1000,
      duration: 0.3,
      ease: "power2.out",
      boxShadow: hoverShadow,
      borderColor: hoverBorder
    });

    if (iconWrapper) {
      gsap.to(iconWrapper, {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleMouseLeave = (cardEl, isDarkCard = false, isGoldCard = false) => {
    if (!cardEl) return;
    const iconWrapper = cardEl.querySelector(".icon-wrapper");

    let baseBorder = "rgba(226, 232, 240, 0.8)";
    if (isDarkCard) {
      baseBorder = "#0c1e36";
    } else if (isGoldCard) {
      baseBorder = "#856424";
    }

    gsap.to(cardEl, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
      boxShadow: isDarkCard || isGoldCard ? "none" : "0 10px 25px rgba(15, 23, 42, 0.01)",
      borderColor: baseBorder
    });

    if (iconWrapper) {
      gsap.to(iconWrapper, {
        scale: 1,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".competency-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
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
    <section ref={containerRef} id="expertise" className="bg-slate-50 py-24 relative">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Left-Aligned Redesigned Header */}
        <div className="text-left mb-16">
          <span className="text-[#856424] font-bold text-xs tracking-[2px] uppercase block mb-2">
            PROFESSIONAL MASTERY
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-[#0c1e36] inline-block relative">
            Core Competencies
          </h2>
          <div className="w-[60px] h-[3px] bg-[#856424] mt-4"></div>
        </div>

        {/* Asymmetric Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          
          {/* Card 1: Front Office (2 Columns Width) */}
          <div 
            className="competency-card lg:col-span-2 md:col-span-2 bg-[#f8fafc] border border-slate-200/80 rounded-[1rem] p-8 shadow-[0_10px_25px_rgba(15,23,42,0.01)] flex flex-col justify-between gap-6 transition-all duration-400 ease-out cursor-default preserve-3d will-change-transform relative overflow-hidden"
            onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
            onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
          >
            <div className="absolute right-8 bottom-8 opacity-[0.03] text-slate-800 pointer-events-none">
              <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 4v16" />
                <path d="M2 11h20" />
                <path d="M2 17h20" />
                <path d="M22 4v16" />
                <path d="M2 8h8V4h10v4" />
              </svg>
            </div>
            <div className="relative z-10 flex flex-col gap-4">
              <div className="icon-wrapper w-12 h-12 text-[#856424] bg-white border border-slate-200 rounded-[12px] flex items-center justify-center shadow-sm">
                <Bell size={22} />
              </div>
              <h3 className="text-[1.3rem] font-bold font-heading text-[#0c1e36]">Specialty in Front Office</h3>
              <p className="text-[0.92rem] text-slate-muted leading-relaxed max-w-[550px]">
                Mastery in guest relations, revenue management, and seamless check-in/out experiences for high-end hospitality environments. Proven track record in maintaining exceptional service standards and guest satisfaction scores.
              </p>
            </div>
          </div>

          {/* Card 2: Customer Dealing (Navy Background) */}
          <div 
            className="competency-card bg-[#0c1e36] text-white border border-[#0c1e36] rounded-[1rem] p-8 shadow-[0_10px_25px_rgba(12,30,54,0.05)] flex flex-col justify-between gap-6 transition-all duration-400 ease-out cursor-default preserve-3d will-change-transform"
            onMouseMove={(e) => handleMouseMove(e, e.currentTarget, true, false)}
            onMouseLeave={(e) => handleMouseLeave(e.currentTarget, true, false)}
          >
            <div className="flex flex-col gap-4">
              <div className="icon-wrapper w-12 h-12 text-[#c5a880] bg-white/5 border border-white/10 rounded-[12px] flex items-center justify-center">
                <MessageSquare size={22} />
              </div>
              <h3 className="text-[1.3rem] font-bold font-heading text-[#c5a880]">Customer Dealing</h3>
              <p className="text-[0.92rem] text-slate-200/90 leading-relaxed">
                Strategic conflict resolution and VIP relationship management with a focus on 'Quiet Luxury' service protocols.
              </p>
            </div>
          </div>

          {/* Card 3: Staff Management (Standard Light Gray) */}
          <div 
            className="competency-card bg-[#f8fafc] border border-slate-200/80 rounded-[1rem] p-8 shadow-[0_10px_25px_rgba(15,23,42,0.01)] flex flex-col justify-between gap-6 transition-all duration-400 ease-out cursor-default preserve-3d will-change-transform"
            onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
            onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
          >
            <div className="flex flex-col gap-4">
              <div className="icon-wrapper w-12 h-12 text-[#0c1e36] bg-white border border-slate-200 rounded-[12px] flex items-center justify-center shadow-sm">
                <Users size={22} />
              </div>
              <h3 className="text-[1.3rem] font-bold font-heading text-[#0c1e36]">Staff Management</h3>
              <p className="text-[0.92rem] text-slate-muted leading-relaxed">
                Leadership of multidisciplinary teams, training, and operational excellence across departments.
              </p>
            </div>
          </div>

          {/* Card 4: Accounts Management (Standard Light Gray) */}
          <div 
            className="competency-card bg-[#f8fafc] border border-slate-200/80 rounded-[1rem] p-8 shadow-[0_10px_25px_rgba(15,23,42,0.01)] flex flex-col justify-between gap-6 transition-all duration-400 ease-out cursor-default preserve-3d will-change-transform"
            onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
            onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
          >
            <div className="flex flex-col gap-4">
              <div className="icon-wrapper w-12 h-12 text-[#0c1e36] bg-white border border-slate-200 rounded-[12px] flex items-center justify-center shadow-sm">
                <CreditCard size={22} />
              </div>
              <h3 className="text-[1.3rem] font-bold font-heading text-[#0c1e36]">Accounts Management</h3>
              <p className="text-[0.92rem] text-slate-muted leading-relaxed">
                Rigorous P&L oversight, budgeting, and cost-control measures ensuring maximum operational profitability.
              </p>
            </div>
          </div>

          {/* Card 5: F&B Operations (Gold Background) */}
          <div 
            className="competency-card bg-[#856424] text-white border border-[#856424] rounded-[1rem] p-8 shadow-[0_10px_25px_rgba(133,100,36,0.05)] flex flex-col justify-between gap-6 transition-all duration-400 ease-out cursor-default preserve-3d will-change-transform"
            onMouseMove={(e) => handleMouseMove(e, e.currentTarget, false, true)}
            onMouseLeave={(e) => handleMouseLeave(e.currentTarget, false, true)}
          >
            <div className="flex flex-col gap-4">
              <div className="icon-wrapper w-12 h-12 text-white bg-white/10 border border-white/20 rounded-[12px] flex items-center justify-center">
                <Utensils size={22} />
              </div>
              <h3 className="text-[1.3rem] font-bold font-heading text-white">F&B Operations</h3>
              <p className="text-[0.92rem] text-white/90 leading-relaxed">
                End-to-end management of fine dining, bar services, and culinary standards implementation.
              </p>
            </div>
          </div>

          {/* Card 6: Banquet & Conference (Full Width Horizontal Card) */}
          <div 
            className="competency-card lg:col-span-3 md:col-span-2 lg:col-span-3 bg-white border border-slate-200/80 rounded-[1rem] p-6 md:p-8 shadow-[0_10px_25px_rgba(15,23,42,0.01)] flex flex-col sm:flex-row items-start sm:items-center gap-6 transition-all duration-400 ease-out cursor-default preserve-3d will-change-transform w-full"
            onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
            onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
          >
            <div className="icon-wrapper w-14 h-14 text-[#0c1e36] bg-slate-100 rounded-[12px] flex items-center justify-center shadow-sm shrink-0">
              <Armchair size={26} />
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-[1.3rem] font-bold font-heading text-[#0c1e36]">Banquet & Conference</h3>
              <p className="text-[0.92rem] text-slate-muted leading-relaxed max-w-[900px]">
                Logistical execution of large-scale corporate events and high-profile banquets with precision and elegance.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
