"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Simple active section detection based on scroll position
      const sections = ["about", "journey", "expertise", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = (id) => {
    setIsMobileMenuOpen(false);
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: id === "hero" ? 0 : offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const navItems = [
    { id: "about", label: "EXECUTIVE PROFILE" },
    { id: "journey", label: "PROFESSIONAL JOURNEY" },
    { id: "expertise", label: "CORE COMPETENCIES" },
    { id: "contact", label: "CONTACT" }
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
      isScrolled 
        ? "h-[70px] bg-white/95 shadow-[0_10px_30px_rgba(30,58,138,0.04)] border-b border-slate-200/50" 
        : "h-[85px] bg-white/90 border-b border-slate-200/20"
    }`}>
      <div className="max-w-[1200px] mx-auto h-full px-8 flex justify-between items-center relative">
        {/* Brand Logo */}
        <div className="flex flex-col cursor-pointer" onClick={() => handleLinkClick("hero")}>
          <span className="font-heading text-[1.45rem] font-bold text-brand-blue tracking-[1.5px] leading-none">
            SURENDRA SINGH
          </span>
        </div>

        {/* Desktop Links & Button */}
        <div className="hidden lg:flex gap-8 items-center">
          {navItems.map((item) => (
            <span 
              key={item.id}
              onClick={() => handleLinkClick(item.id)} 
              className={`text-[0.78rem] font-bold tracking-[0.8px] uppercase relative py-2 cursor-pointer transition-all duration-300 ${
                activeSection === item.id 
                  ? "text-[#856424] after:w-full" 
                  : "text-slate-muted hover:text-[#856424] after:w-0"
              } after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#856424] after:transition-all after:duration-300 hover:after:w-full`}
            >
              {item.label}
            </span>
          ))}
          {/* <button 
            onClick={() => handleLinkClick("contact")}
            className="ml-2 px-6 py-2 bg-[#856424] hover:bg-[#6e521d] text-white text-[0.8rem] font-bold uppercase tracking-wider rounded transition-all duration-300 cursor-pointer shadow-[0_2px_10px_rgba(133,100,36,0.15)]"
          >
            INQUIRE
          </button> */}
        </div>

        {/* Mobile Toggle Button */}
        <button 
          className="lg:hidden flex items-center justify-center p-2 text-brand-blue hover:text-gold-accent outline-none transition-colors duration-300"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation Panel */}
        <div className={`absolute top-full left-0 w-full h-[calc(100vh-100%)] bg-white/98 backdrop-blur-xl p-12 flex flex-col gap-6 items-center shadow-[-10px_20px_40px_rgba(0,0,0,0.03)] lg:hidden transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isMobileMenuOpen ? "translate-x-0 opacity-100 visible" : "translate-x-full opacity-0 invisible"
        }`}>
          {navItems.map((item) => (
            <span 
              key={item.id}
              onClick={() => handleLinkClick(item.id)} 
              className={`text-[1.1rem] font-heading font-bold uppercase tracking-[1px] cursor-pointer transition-colors duration-300 ${
                activeSection === item.id ? "text-[#856424]" : "text-brand-blue hover:text-[#856424]"
              }`}
            >
              {item.label}
            </span>
          ))}
          {/* <button 
            onClick={() => handleLinkClick("contact")}
            className="mt-4 px-8 py-3 bg-[#856424] text-white text-[0.9rem] font-bold uppercase tracking-wider rounded w-full max-w-[240px] cursor-pointer text-center"
          >
            INQUIRE
          </button> */}
        </div>
      </div>
    </nav>
  );
}

