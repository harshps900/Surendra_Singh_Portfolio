"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Journey() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);

  const hotels = [
    {
      name: "Hotel Radha Residency, Satna",
      role: "General Manager (GM)",
      period: "10-10-2021 - Present",
      description: "Managing overall operations and administration. Directing strategic guest relations, brand development, and managing department-wide budgets.",
      side: "left"
    },
    {
      name: "Hotel Sai Chhaya Inn, Satna",
      role: "General Manager (GM)",
      period: "13-11-2013 - 01-10-2021",
      description: "Directed overall operational strategy and administration. Overseeing front office excellence, billing procedures, staff management, corporate partnerships, and coordinating high-volume banquet bookings.",
      side: "right"
    },
    {
      name: "Hotel Mahamaya, Satna",
      role: "General Manager (GM)",
      period: "10-07-2004 - 31-12-2012",
      description: "Directed daily operations and administrative staff. Maintained customer dealing logs, oversaw F&B services, organized key conferences, and managed accounts.",
      side: "left"
    },
    {
      name: "Hotel Green Park, Korba",
      role: "General Manager (GM)",
      period: "10-07-2000 - 30-06-2004",
      description: "Supervised comprehensive hotel affairs. Led conference planning, optimized food & beverage operations, trained room service/front office teams, and streamlined vendor coordination.",
      side: "right"
    },
    {
      name: "Hotel Uma Residency, Satna",
      role: "General Manager (GM)",
      period: "10-07-1996 - 30-06-2000",
      description: "Administered guest relations, account balancing, staff rotas, and overall hospitality workflow. Focused on front desk client greeting excellence and conference services.",
      side: "left"
    },
    {
      name: "Hotel Savera, Satna",
      role: "General Manager (GM)",
      period: "10-07-1993 - 30-06-1996",
      description: "Managed front office and guest satisfaction records. Facilitated large banquets, oversaw maintenance budgets, and supervised kitchen service quality.",
      side: "right"
    },
    {
      name: "Hotel Yogesh, Satna",
      role: "General Manager (GM)",
      period: "01-07-1990 - 30-06-1993",
      description: "Pioneered early hospitality leadership. Spearheaded customer service standards, handled accounting files, and managed daily administrative support.",
      side: "left"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline Track Progress Animation
      gsap.fromTo(
        progressRef.current,
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: trackRef.current,
            start: "top 70%",
            end: "bottom 60%",
            scrub: true
          }
        }
      );

      // Cards & Dots Reveal Animations
      const cards = gsap.utils.toArray(".timeline-card");
      const dots = gsap.utils.toArray(".timeline-dot");

      cards.forEach((card, i) => {
        const item = card.closest(".timeline-item");
        const dot = dots[i];
        const isLeft = item.classList.contains("timeline-item-left");

        const isMobile = window.innerWidth < 768;

        // Card Slide and Fade
        gsap.fromTo(
          card,
          { opacity: 0, x: isMobile ? 30 : (isLeft ? -50 : 50) },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );

        // Dot Glow Activation
        gsap.to(dot, {
          scrollTrigger: {
            trigger: card,
            start: "top 60%",
            toggleActions: "play reverse play reverse",
            onEnter: () => dot.classList.add("timeline-dot-active"),
            onLeaveBack: () => dot.classList.remove("timeline-dot-active")
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="journey" className="bg-white py-24 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-brand-blue text-center mb-4 relative inline-block left-1/2 -translate-x-1/2 after:content-[''] after:absolute after:bottom-[-8px] after:left-1/2 after:-translate-x-1/2 after:w-[60px] after:h-[3px] after:bg-gradient-to-r after:from-brand-blue after:to-gold-accent after:rounded">
          Leadership Journey
        </h2>
        <p className="text-center text-slate-muted text-[1.1rem] max-w-[600px] mx-auto mb-16 mt-6">
          Over 30 years of hospitality experience in upper management, guiding operations and admin for Satna and Korba's finest hotels.
        </p>

        <div className="relative max-w-[1000px] mx-auto mt-16 py-8">
          {/* Vertical Progress Line */}
          <div ref={trackRef} className="absolute top-0 bottom-0 left-[20px] md:left-1/2 w-1 -translate-x-1/2 bg-slate-200 rounded">
            <div ref={progressRef} className="absolute top-0 left-0 w-full h-0 bg-gradient-to-b from-brand-blue to-gold-accent rounded" />
          </div>

          {/* Timeline Items */}
          {hotels.map((hotel, index) => (
            <div
              key={index}
              className={`timeline-item relative w-full md:w-1/2 py-8 pl-12 pr-4 md:px-12 box-border ${
                hotel.side === "left" 
                  ? "timeline-item-left md:left-0 md:text-right" 
                  : "timeline-item-right md:left-1/2 md:text-left"
              }`}
            >
              {/* Connector Dot */}
              <div className={`timeline-dot absolute top-10 w-5 h-5 rounded-full bg-white border-4 border-brand-blue -translate-x-1/2 z-10 transition-all duration-300 ${
                hotel.side === "left" 
                  ? "left-[20px] md:left-full" 
                  : "left-[20px] md:left-0"
              }`} />

              {/* Timeline Card */}
              <div className="timeline-card bg-slate-50 border border-slate-200/80 rounded-[1.5rem] p-6 md:p-8 shadow-[0_10px_25px_rgba(30,58,138,0.01)] hover:bg-white hover:border-brand-blue/15 hover:shadow-[0_15px_35px_rgba(30,58,138,0.05)] transition-all duration-300 text-left cursor-default">
                <span className={`inline-block px-4 py-1.5 font-bold text-xs rounded-full mb-4 tracking-wider ${
                  hotel.side === "left" 
                    ? "bg-gold-accent/10 text-gold-dark" 
                    : "bg-brand-light text-brand-blue"
                }`}>{hotel.period}</span>
                <h3 className="text-xl md:text-2xl font-bold font-heading text-brand-blue mb-1">{hotel.name}</h3>
                <h4 className="text-xs font-bold text-gold-accent uppercase tracking-wider mb-4">{hotel.role}</h4>
                <p className="text-sm text-slate-muted leading-relaxed">{hotel.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
