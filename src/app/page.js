"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Objective from "@/components/Objective";
import Journey from "@/components/Journey";
import Competencies from "@/components/Competencies";
import EducationLanguages from "@/components/EducationLanguages";
import HobbiesInterests from "@/components/HobbiesInterests";
import Contact from "@/components/Contact";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <Preloader finishLoading={() => setIsLoading(false)} />
      )}
      <div 
        className={`transition-opacity duration-[1200ms] ease-out ${
          isLoading 
            ? "opacity-0 pointer-events-none h-screen overflow-hidden" 
            : "opacity-100"
        }`}
      >
        <Navbar />
        <main style={{ paddingTop: '85px' }}>
          <Hero isLoading={isLoading} />
          <Objective />
          <Journey />
          <Competencies />
          <EducationLanguages />
          <HobbiesInterests />
          <Contact />
        </main>
      </div>
    </>
  );
}
