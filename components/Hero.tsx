import Link from "next/link";
import { ArrowDown, ArrowRight, Sparkles } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import type { SiteContent } from "@/lib/site-content";

const heroSlides = [
  { image: "/images/lws-s-1.jpg", alt: "LWS students preparing for defence examinations" },
  { image: "/images/lws-s-2.webp", alt: "LWS defence preparation classroom" },
  { image: "/images/lws-s-3.jpg", alt: "LWS aspirants building their selection journey" },
];

const courses = ["NDA Foundation", "AFCAT", "CDS", "SSB Interview"];
const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
];

export default function Hero({ content }: { content: SiteContent }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => setActiveSlide((slide) => (slide + 1) % heroSlides.length), 6500);
    return () => window.clearInterval(timer);
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormSubmitted(true);
    window.alert("Successfully submitted! Our admissions team will contact you soon.");
    event.currentTarget.reset();
  }

  return <section className="lws-hero redesigned-hero" id="home">
    <div className="hero-slides" aria-hidden="true">{heroSlides.map((slide, index) => <div className={`hero-slide ${index === activeSlide ? "is-active" : ""}`} key={slide.image} style={{ backgroundImage: `url(${slide.image})` }} />)}</div>
    <div className="hero-background-overlay" aria-hidden="true" />
    <div className="redesigned-hero-grid form-hero-grid">
      <div className="hero-copy form-hero-copy">
        <p className="hero-kicker"><span className="hero-kicker-line" /><Sparkles size={14} /> INDIA&apos;S DEFENCE PREPARATION STUDIO <span className="hero-kicker-line" /></p>
        <h1>{content.heroTitle}<br /><span>{content.heroAccent}</span></h1>
        <p className="hero-lede">{content.heroLede}</p>
        <div className="hero-actions"><Link href="/courses" className="button button-red">{content.heroPrimaryCta} <ArrowRight size={17} /></Link><Link href="#experience" className="hero-scroll-link">Discover LWS <ArrowDown size={16} /></Link></div>
        <div className="centered-hero-proof">{content.proof.map((item) => <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}</div>
      </div>
      <form className="admission-form" onSubmit={handleSubmit}>
        <div className="admission-form-heading"><span>Start your journey</span><strong>Get admission<br /><em>guidance.</em></strong></div>
        <label><span>Name <b>*</b></span><input required name="name" placeholder="Enter your name" /></label>
        <label><span>Phone No. <b>*</b></span><input required name="phone" type="tel" pattern="[0-9 +()-]{10,}" placeholder="Enter your phone no." /></label>
        <label><span>Email ID <b>*</b></span><input required name="email" type="email" placeholder="Enter your email ID" /></label>
        <label><span>State <b>*</b></span><select required name="state" defaultValue=""><option value="" disabled>Select a state</option>{states.map((state) => <option key={state}>{state}</option>)}</select></label>
        <label><span>Course <b>*</b></span><select required name="course" defaultValue=""><option value="" disabled>Select a course</option>{courses.map((course) => <option key={course}>{course}</option>)}</select></label>
        <button type="submit">Submit <ArrowRight size={16} /></button>
        {formSubmitted && <small className="admission-success">Details submitted successfully.</small>}
      </form>
      <div className="hero-slide-controls" aria-label="Hero background slides">{heroSlides.map((slide, index) => <button className={index === activeSlide ? "is-active" : ""} type="button" onClick={() => setActiveSlide(index)} aria-label={`Show slide ${index + 1}: ${slide.alt}`} key={slide.image}><span>{String(index + 1).padStart(2, "0")}</span></button>)}</div>
    </div>
  </section>;
}
