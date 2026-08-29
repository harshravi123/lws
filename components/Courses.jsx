"use client";

import {
  Award,
  BookOpenCheck,
  Crosshair,
  PlaneTakeoff,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const courses = [
  {
    icon: BookOpenCheck,
    category: "Foundation program",
    title: "NDA Foundation",
    text:
      "Build strong academic fundamentals and prepare for NDA from an early stage.",
  },
  {
    icon: Award,
    category: "Written + SSB",
    title: "NDA",
    text:
      "Complete NDA preparation with expert faculty, regular tests and mentorship.",
  },
  {
    icon: Crosshair,
    category: "15-day intensive",
    title: "SSB Interview",
    text:
      "Specialised SSB preparation including psychology, GTO and personal interview.",
  },
  {
    icon: PlaneTakeoff,
    category: "Defence entrance",
    title: "CDS & AFCAT",
    text:
      "Comprehensive preparation for CDS and AFCAT with structured learning.",
  },
];

export default function Courses() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [slideStep, setSlideStep] = useState(0);
  const [isSliding, setIsSliding] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isCarouselViewport, setIsCarouselViewport] = useState(false);
  const carouselRef = useRef(null);
  const carouselCourses = [...courses, ...courses];

  useEffect(() => {
    const updateSlideStep = () => {
      const carouselViewport = window.innerWidth <= 1050;
      setIsCarouselViewport(carouselViewport);
      const firstCard = carouselRef.current?.querySelector(".course-card");
      if (!firstCard) return;

      const styles = window.getComputedStyle(firstCard.parentElement);
      const gap = parseFloat(styles.columnGap) || 0;
      setSlideStep(firstCard.getBoundingClientRect().width + gap);
    };

    updateSlideStep();
    window.addEventListener("resize", updateSlideStep);
    return () => window.removeEventListener("resize", updateSlideStep);
  }, []);

  useEffect(() => {
    if (!slideStep || !isCarouselViewport || isPaused) return undefined;

    const timer = window.setInterval(() => {
      setSlideIndex((currentIndex) => currentIndex + 1);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [isCarouselViewport, isPaused, slideStep]);

  useEffect(() => {
    if (slideIndex < courses.length) return undefined;

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
      return nextIndex < 0 ? courses.length - 1 : nextIndex % courses.length;
    });
  };

  return (
    <section className="section courses" id="courses">

      <div className="container">

        <div className="section-heading">

          <span className="section-tag">
            OUR PROGRAMS
          </span>

          <h2>
            Courses We <span>Offer</span>
          </h2>

          <p>
            Choose the right defence preparation program
            according to your goal.
          </p>

        </div>

        <div
          className="course-carousel"
          ref={carouselRef}
          onMouseEnter={() => {
            setIsPaused(true);
            setIsSliding(false);
          }}
          onMouseLeave={() => {
            setIsPaused(false);
            setIsSliding(true);
          }}
          onFocus={() => {
            setIsPaused(true);
            setIsSliding(false);
          }}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setIsPaused(false);
              setIsSliding(true);
            }
          }}
        >
          <div
            className="course-grid"
            style={{
              transform: isCarouselViewport
                ? `translateX(-${slideIndex * slideStep}px)`
                : "none",
              transition: isSliding ? "transform .5s ease" : "none",
            }}
          >

          {carouselCourses.map((course, index) => {

            const Icon = course.icon;

            return (
              <article
                className="course-card"
                key={`${course.title}-${index}`}
              >

                <div className="course-icon">
                  <Icon size={30} />
                </div>

                <span className="course-category">{course.category}</span>

                <h3>{course.title}</h3>

                <p>{course.text}</p>

                <div className="course-actions">

                  <a href="#courses">
                    View details <ArrowUpRight size={15} />
                  </a>

                  <a
                    href="https://pages.razorpay.com/OnlineRegistration2024"
                    className="small-btn"
                  >
                    Enroll Now
                  </a>

                </div>

              </article>
            );

          })}

          </div>
        </div>

        <div className="course-carousel-controls" aria-label="Course carousel controls">
          <button
            type="button"
            className="course-carousel-arrow"
            onClick={() => moveToSlide(-1)}
            aria-label="Previous course"
          >
            <ChevronLeft size={19} />
          </button>

          <div className="course-carousel-dots">
            {courses.map((course, index) => (
              <button
                type="button"
                className={index === slideIndex % courses.length ? "active" : ""}
                onClick={() => {
                  setIsSliding(true);
                  setSlideIndex(index);
                }}
                aria-label={`Show ${course.title}`}
                key={course.title}
              />
            ))}
          </div>

          <button
            type="button"
            className="course-carousel-arrow"
            onClick={() => moveToSlide(1)}
            aria-label="Next course"
          >
            <ChevronRight size={19} />
          </button>
        </div>

        <div className="courses-more">
          <a href="/courses" className="btn btn-course-more">
            Explore All Courses <ArrowUpRight size={17} />
          </a>
        </div>

      </div>

    </section>
  );
}