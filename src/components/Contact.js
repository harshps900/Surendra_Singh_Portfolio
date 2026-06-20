"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, Calendar, Send, ArrowUp, CheckCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as yup from "yup";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Contact() {
  const containerRef = useRef(null);
  const infoColRef = useRef(null);
  const formColRef = useRef(null);
  const decRef = useRef(null);
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const contactSchema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .required("Please enter your name")
      .min(2, "Name must be at least 2 characters"),
    email: yup
      .string()
      .trim()
      .required("Please enter your email address")
      .email("Please enter a valid email address"),
    subject: yup
      .string()
      .trim()
      .required("Please enter a subject")
      .min(3, "Subject must be at least 3 characters"),
    message: yup
      .string()
      .trim()
      .required("Please enter message details")
      .min(10, "Message details must be at least 10 characters")
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Info column slide in
      gsap.fromTo(
        infoColRef.current,
        { opacity: 0, x: -30 },
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

      // Form column slide in
      gsap.fromTo(
        formColRef.current,
        { opacity: 0, x: 30 },
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

      // Declaration border draw and fade in
      gsap.fromTo(
        decRef.current,
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: decRef.current,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    try {
      await contactSchema.validate(formState, { abortEarly: false });
      setErrors({});
      setIsSubmitting(true);

      const formspreeUrl = process.env.NEXT_PUBLIC_FORMSPREE_URL || "https://formspree.io/f/mkoaalow";
      
      const payload = {
        name: formState.name,
        email: formState.email,
        subject: formState.subject,
        message: formState.message,
      };

      const response = await fetch(formspreeUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormState({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        const result = await response.json();
        const errorMsg = result.errors && result.errors.length > 0 
          ? result.errors.map(e => e.message).join(", ") 
          : "Failed to send message. Please try again.";
        setSubmitError(errorMsg);
      }
    } catch (err) {
      if (err.inner) {
        const newErrors = {};
        err.inner.forEach((validationError) => {
          newErrors[validationError.path] = validationError.message;
        });
        setErrors(newErrors);
      } else {
        console.error("Submission error:", err);
        setSubmitError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section ref={containerRef} id="contact" className="bg-slate-50 pt-24 pb-12 border-t border-slate-200">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-brand-blue text-center mb-4 relative inline-block left-1/2 -translate-x-1/2 after:content-[''] after:absolute after:bottom-[-8px] after:left-1/2 after:-translate-x-1/2 after:w-[60px] after:h-[3px] after:bg-gradient-to-r after:from-brand-blue after:to-gold-accent after:rounded">
          Inquiries & Contact
        </h2>
        <p className="text-center text-slate-muted text-[1.1rem] max-w-[600px] mx-auto mb-16 mt-6">
          Interested in executive hospitality consulting or recruitments? Reach out via phone, email, or contact form.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 mt-8">
          {/* Information Column */}
          <div ref={infoColRef} className="flex flex-col gap-8">
            <div>
              <h3 className="font-heading text-2xl font-bold text-brand-blue mb-2">Get In Touch</h3>
              <p className="text-sm text-slate-muted leading-relaxed">
                Direct lines of communication for boards of directors, hotel owners, and executive management search committees.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex gap-4 items-start">
                <div className="text-brand-blue bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-center shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-[0.75rem] font-bold text-gold-accent uppercase tracking-wider">Email Address</div>
                  <a href="mailto:pintoosingh467@gmail.com" className="text-[0.95rem] text-slate-dark font-semibold hover:text-brand-accent transition-colors duration-300">
                    pintoosingh467@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="text-brand-blue bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-center shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="text-[0.75rem] font-bold text-gold-accent uppercase tracking-wider">Mobile Line</div>
                  <a href="tel:9713898349" className="text-[0.95rem] text-slate-dark font-semibold hover:text-brand-accent transition-colors duration-300">
                    +91 97138 98349
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="text-brand-blue bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-center shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="text-[0.75rem] font-bold text-gold-accent uppercase tracking-wider">Location / Address</div>
                  <div className="text-[0.95rem] text-slate-dark font-semibold leading-relaxed">
                    E-29 Housing Board Colony UTAILY,<br />
                    Satna, Madhya Pradesh, India
                  </div>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="text-brand-blue bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-center shrink-0">
                  <Calendar size={20} />
                </div>
                <div>
                  <div className="text-[0.75rem] font-bold text-gold-accent uppercase tracking-wider">Date of Birth</div>
                  <div className="text-[0.95rem] text-slate-dark font-semibold">01-01-1969</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div ref={formColRef} className="bg-white border border-slate-200/80 rounded-[1.5rem] p-8 md:p-12 shadow-[0_10px_30px_rgba(30,58,138,0.01)]">
            {isSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle size={50} className="text-gold-accent mx-auto mb-4 block" />
                <h3 className="font-heading text-2xl font-bold text-brand-blue mb-2">Message Sent!</h3>
                <p className="text-sm text-slate-muted leading-relaxed">Thank you for contacting. I will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-bold text-brand-blue uppercase tracking-wider">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border bg-slate-50 text-[0.95rem] outline-none focus:bg-white focus:border-brand-accent focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] transition-all duration-300 ${
                      errors.name ? "border-red-500 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]" : "border-slate-200"
                    }`}
                    placeholder="Enter name"
                  />
                  {errors.name && <span className="text-xs font-semibold text-red-500 mt-0.5">{errors.name}</span>}
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-bold text-brand-blue uppercase tracking-wider">Email Address</label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border bg-slate-50 text-[0.95rem] outline-none focus:bg-white focus:border-brand-accent focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] transition-all duration-300 ${
                      errors.email ? "border-red-500 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]" : "border-slate-200"
                    }`}
                    placeholder="Enter email"
                  />
                  {errors.email && <span className="text-xs font-semibold text-red-500 mt-0.5">{errors.email}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="subject" className="text-xs font-bold text-brand-blue uppercase tracking-wider">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border bg-slate-50 text-[0.95rem] outline-none focus:bg-white focus:border-brand-accent focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] transition-all duration-300 ${
                      errors.subject ? "border-red-500 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]" : "border-slate-200"
                    }`}
                    placeholder="Enter subject"
                  />
                  {errors.subject && <span className="text-xs font-semibold text-red-500 mt-0.5">{errors.subject}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs font-bold text-brand-blue uppercase tracking-wider">Message Details</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border bg-slate-50 text-[0.95rem] outline-none focus:bg-white focus:border-brand-accent focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] transition-all duration-300 min-h-[120px] resize-y ${
                      errors.message ? "border-red-500 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]" : "border-slate-200"
                    }`}
                    placeholder="Enter message details"
                  />
                  {errors.message && <span className="text-xs font-semibold text-red-500 mt-0.5">{errors.message}</span>}
                </div>

                {submitError && (
                  <div className="p-3.5 bg-red-50 text-red-600 rounded-lg text-xs font-semibold border border-red-200">
                    {submitError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3.5 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_4px_12px_rgba(30,58,138,0.15)] ${
                    isSubmitting
                      ? "bg-slate-400 cursor-not-allowed"
                      : "bg-brand-blue hover:bg-brand-accent hover:-translate-y-0.5 cursor-pointer hover:shadow-[0_6px_16px_rgba(30,58,138,0.25)]"
                  }`}
                >
                  {isSubmitting ? "Sending..." : "Send Message"} <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Verification Declaration */}
        {/* <div ref={decRef} className="mt-20 p-8 md:p-10 rounded-[1.5rem] bg-white border border-dashed border-gold-accent text-center relative max-w-[900px] mx-auto shadow-[0_4px_20px_rgba(197,168,128,0.03)]">
          <p className="font-heading text-lg md:text-xl text-brand-blue font-semibold leading-relaxed italic max-w-[750px] mx-auto">
            "I hereby declare that the above furnished information is authentic to the best of my knowledge."
          </p>
          <h4 className="mt-6 font-heading text-2xl font-bold text-gold-dark">Surendra Singh</h4>
          <span className="text-[0.75rem] font-bold text-slate-muted uppercase tracking-widest mt-1 block">General Manager / Hospitality Executive</span>
        </div> */}

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-xs text-slate-muted font-medium">
            © {new Date().getFullYear()} Surendra Singh Portfolio. All rights reserved.
          </span>
          {/* <button onClick={scrollToTop} className="bg-none border-none text-brand-blue font-bold text-xs uppercase tracking-wider cursor-pointer flex items-center gap-2 hover:text-brand-accent transition-colors duration-300">
            Back to top <ArrowUp size={16} />
          </button> */}
        </div>
      </div>
    </section>
  );
}
