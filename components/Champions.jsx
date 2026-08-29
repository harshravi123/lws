"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const champions = Array.from({ length: 40 }, (_, index) => ({
  image: `/images/rankers/${index + 1}.webp`,
  title: "LWS Defence Selection",
  rank: `Success Story ${String(index + 1).padStart(2, "0")}`,
}));

export default function Champions() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [slideStep, setSlideStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isSliding, setIsSliding] = useState(true);
  const carouselRef = useRef(null);
  const carouselChampions = [...champions, ...champions];

  useEffect(() => {
    const updateCarousel = () => {
      const carousel = carouselRef.current;
      const firstCard = carousel?.querySelector(".champion-card");
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
    }, 3500);

    return () => window.clearInterval(timer);
  }, [isPaused, slideStep]);

  useEffect(() => {
    if (slideIndex !== champions.length) return undefined;

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
      if (nextIndex < 0) return champions.length - 1;
      if (nextIndex >= champions.length) return 0;
      return nextIndex;
    });
  };

  return (
    <section className="section champions results-gallery">
      <div className="container">
        <div className="results-header">
          <div className="section-heading results-heading">
            <span className="section-tag">OUR RESULTS</span>
            <h2>
              Top Rankers in
              <span> NDA 156</span>
            </h2>
            <p>
              Our students continue to make us proud with outstanding results
              across NDA, TES, NCC, CDS, AFCAT and SSB selections.
            </p>
          </div>

          <div className="results-proof">
            <Sparkles size={20} />
            <strong>500+</strong>
            <span>success stories<br />and counting</span>
          </div>
        </div>

        <div
          className="champion-carousel"
          ref={carouselRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setIsPaused(false);
            }
          }}
        >
          <div
            className="champion-grid"
            style={{
              transform: `translateX(-${slideIndex * slideStep}px)`,
              transition: isSliding ? "transform .5s ease" : "none",
            }}
          >
            {carouselChampions.map((item, index) => (
              <article className="champion-card" key={item.image}>
                <img src={item.image} alt={`${item.title} ${index + 1}`} />
              </article>
            ))}
          </div>
        </div>

        <div className="champion-controls" aria-label="Results carousel controls">
          <button type="button" onClick={() => moveToSlide(-1)} aria-label="Previous result">
            <ChevronLeft size={19} />
          </button>
          <button type="button" onClick={() => moveToSlide(1)} aria-label="Next result">
            <ChevronRight size={19} />
          </button>
        </div>

        <div className="results-footer-line">
          <span />
          <small>Celebrating every step towards the uniform</small>
          <span />
        </div>
      </div>
    </section>
  );
}
