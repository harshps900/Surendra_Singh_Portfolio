"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function Preloader({ finishLoading }) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const circleRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const subtitleRef = useRef(null);
  const percentageRef = useRef(null);

  useEffect(() => {
    // Disable body scroll during preload
    document.body.style.overflow = "hidden";

    // Set initial stroke-dashoffset for the progress circle
    // Circumference = 2 * PI * r = 2 * PI * 44 = 276.46
    const circumference = 276.46;
    if (circleRef.current) {
      circleRef.current.style.strokeDasharray = circumference;
      circleRef.current.style.strokeDashoffset = circumference;
    }

    const ctx = gsap.context(() => {
      // 1. Initial fade-in of elements
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
      );

      gsap.fromTo(
        [textRef.current, subtitleRef.current, percentageRef.current],
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out", delay: 0.3 }
      );

      // 2. Animate the progress percentage and circle stroke
      const progressObj = { value: 0 };
      gsap.to(progressObj, {
        value: 100,
        duration: 2.2, // Premium, steady load duration
        ease: "power2.out",
        onUpdate: () => {
          const currentProgress = Math.floor(progressObj.value);
          setProgress(currentProgress);
          
          if (circleRef.current) {
            const offset = circumference - (currentProgress / 100) * circumference;
            circleRef.current.style.strokeDashoffset = offset;
          }
        },
        onComplete: () => {
          // 3. Exit animations once 100% is reached
          const exitTl = gsap.timeline({
            onComplete: () => {
              // Re-enable scroll and trigger parent loaded state
              document.body.style.overflow = "";
              finishLoading();
            }
          });

          exitTl
            .to([logoRef.current, textRef.current, subtitleRef.current, percentageRef.current], {
              opacity: 0,
              y: -30,
              duration: 0.5,
              stagger: 0.05,
              ease: "power3.in"
            })
            .to(containerRef.current, {
              yPercent: -100,
              duration: 0.8,
              ease: "power4.inOut"
            }, "-=0.2");
        }
      });
    }, containerRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, [finishLoading]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#0c1e36] flex flex-col items-center justify-center select-none"
    >
      {/* Decorative Elegant Background Gradients */}
      <div className="absolute inset-0 bg-radial-gradient from-white/[0.03] to-transparent pointer-events-none"></div>
      
      <div className="flex flex-col items-center justify-center text-center px-4 relative z-10">
        {/* Luxury Gold Monogram Circle */}
        <div ref={logoRef} className="relative w-28 h-28 mb-8 flex items-center justify-center">
          {/* SVG Circle Progress */}
          <svg className="absolute inset-0 w-full h-full transform -rotate-90">
            {/* Background thin circle */}
            <circle
              cx="56"
              cy="56"
              r="44"
              className="stroke-white/[0.04]"
              strokeWidth="2"
              fill="transparent"
            />
            {/* Active gold progress circle */}
            <circle
              ref={circleRef}
              cx="56"
              cy="56"
              r="44"
              className="stroke-[#c5a880]"
              strokeWidth="2"
              fill="transparent"
              strokeLinecap="round"
              style={{
                transition: "stroke-dashoffset 0.1s linear",
              }}
            />
          </svg>
          
          {/* Monogram Letters */}
          <div className="font-heading text-3xl font-light tracking-[2px] text-[#c5a880] select-none pl-1">
            SS
          </div>
        </div>

        {/* Brand Name */}
        <h2
          ref={textRef}
          className="font-heading text-xl md:text-2xl font-bold text-white tracking-[6px] uppercase leading-none mb-3"
        >
          SURENDRA SINGH
        </h2>

        {/* Subtitle / Designation */}
        <p
          ref={subtitleRef}
          className="font-body text-xs text-white/50 tracking-[3px] uppercase font-medium mb-6 max-w-[280px] md:max-w-md mx-auto"
        >
          Hospitality Executive Portfolio
        </p>

        {/* Progress Percentage Display */}
        <div
          ref={percentageRef}
          className="font-heading text-2xl font-light text-[#c5a880] w-12 tracking-wide"
        >
          {String(progress).padStart(2, "0")}%
        </div>
      </div>

      {/* Aesthetic bottom bar accent */}
      <div className="absolute bottom-10 left-10 text-[9px] font-body text-white/20 tracking-[4px] uppercase pointer-events-none">
        Est. 1994
      </div>
      <div className="absolute bottom-10 right-10 text-[9px] font-body text-white/20 tracking-[4px] uppercase pointer-events-none">
        Leadership & Standards
      </div>
    </div>
  );
}
