"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Medal } from "lucide-react";

const experts = [
  ["/images/Faculty/ak-sahgal.webp", "Lt Gen A K Sahgal", "Interviewing Officer", "Former DG, Army Air Defence"],
  ["/images/Faculty/ramit.webp", "Brigadier Ramit Mehta", "Interviewing Officer", "Ex President, SSB"],
  ["/images/Faculty/rabi.webp", "Col Rabi Mukerjee", "GTO Expert", "Experienced SSB Professional"],
  ["/images/Faculty/ashivini.webp", "Col Ashwini Thakur", "GTO Expert", "Former GTO in Indian Army"],
  ["/images/Faculty/vikas.jpg", "Cdr Vikas Yadav", "Co-Founder, SSB Wing", "Former Senior GTO"],
  ["/images/Faculty/daman.webp", "Gp Capt Daman Vermani", "Interviewing Officer", "Former IO at AFSB"],
  ["/images/Faculty/ak-sharma.webp", "Col A K Sharma", "SSB Mentor", "Defence Services Mentor"],
  ["/images/Faculty/dhramveer.webp", "Col Dhramveer", "GTO Expert", "Leadership Development Coach"],
  ["/images/Faculty/manoj.webp", "Col Manoj", "SSB Mentor", "Specialist Defence Educator"],
  ["/images/Faculty/rajan.webp", "Col Rajan", "Interviewing Officer", "Seasoned SSB Professional"],
  ["/images/Faculty/rajesh.webp", "Col Rajesh", "GTO Expert", "Former Defence Trainer"],
  ["/images/Faculty/seema.webp", "Seema Ma'am", "Psychology Expert", "SSB Psychology Specialist"],
].map(([image, name, role, info]) => ({ image, name, role, info }));

export default function Experts() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [slideStep, setSlideStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isSliding, setIsSliding] = useState(true);
  const carouselRef = useRef(null);
  const carouselExperts = [...experts, ...experts];

  useEffect(() => {
    const updateCarousel = () => {
      const firstCard = carouselRef.current?.querySelector(".expert-card");
      if (!firstCard) return;
      const gap = parseFloat(window.getComputedStyle(firstCard.parentElement).columnGap) || 0;
      setSlideStep(firstCard.getBoundingClientRect().width + gap);
    };

    updateCarousel();
    window.addEventListener("resize", updateCarousel);
    return () => window.removeEventListener("resize", updateCarousel);
  }, []);

  useEffect(() => {
    if (!slideStep || isPaused) return undefined;
    const timer = window.setInterval(() => {
      setSlideIndex((currentIndex) => currentIndex + 1);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [isPaused, slideStep]);

  useEffect(() => {
    if (slideIndex !== experts.length) return undefined;
    const resetTimer = window.setTimeout(() => {
      setIsSliding(false);
      setSlideIndex(0);
      window.requestAnimationFrame(() => setIsSliding(true));
    }, 500);
    return () => window.clearTimeout(resetTimer);
  }, [slideIndex]);

  const moveToSlide = (direction) => {
    setIsSliding(true);
    setSlideIndex((currentIndex) => {
      const nextIndex = currentIndex + direction;
      if (nextIndex < 0) return experts.length - 1;
      if (nextIndex >= experts.length) return 0;
      return nextIndex;
    });
  };

  return (
    <section className="section experts faculty-showcase">
      <div className="container">
        <div className="faculty-header">
          <div className="section-heading faculty-heading">
            <span className="section-tag">OUR FACULTY</span>
            <h2>
              Guided by those who have
              <span> lived the journey</span>
            </h2>
            <p>
              Learn from accomplished defence professionals who bring real
              board-room experience to every stage of your preparation.
            </p>
          </div>
          <div className="faculty-badge">
            <Medal size={19} />
            <span><strong>12</strong> specialist mentors</span>
          </div>
        </div>

        <div
          className="expert-carousel"
          ref={carouselRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
          }}
        >
          <div
            className="experts-grid"
            style={{
              transform: `translateX(-${slideIndex * slideStep}px)`,
              transition: isSliding ? "transform .5s ease" : "none",
            }}
          >
            {carouselExperts.map((expert, index) => (
              <article className="expert-card" key={`${expert.name}-${index}`}>
                <div className="expert-portrait">
                  <img src={expert.image} alt={expert.name} />
                  <span className="expert-index">{String((index % experts.length) + 1).padStart(2, "0")}</span>
                </div>
                <div className="expert-info">
                  <span>{expert.role}</span>
                  <h3>{expert.name}</h3>
                  <p>{expert.info}</p>
                  <ArrowUpRight size={17} aria-hidden="true" />
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="expert-controls" aria-label="Faculty carousel controls">
          <button type="button" onClick={() => moveToSlide(-1)} aria-label="Previous faculty member">
            <ChevronLeft size={19} />
          </button>
          <div className="expert-progress"><span style={{ width: `${((slideIndex % experts.length) + 1) / experts.length * 100}%` }} /></div>
          <button type="button" onClick={() => moveToSlide(1)} aria-label="Next faculty member">
            <ChevronRight size={19} />
          </button>
        </div>
      </div>
    </section>
  );
}
