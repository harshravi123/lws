"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { defaultSiteContent, type SiteContent } from "@/lib/site-content";
import Header, { Logo } from "@/components/Header";
import Hero from "@/components/Hero";
import CoursesSection from "@/components/CoursesSection";

const programs = [
  { title: "NDA Foundation", type: "School aspirants", detail: "Integrated school support with NDA preparation", image: "/images/lws-hero.webp", slug: "nda-foundation" },
  { title: "NDA Coaching", type: "Defence entrance", detail: "Written exam, current affairs and SSB guidance", image: "/images/rankers/18.webp", slug: "nda-coaching" },
  { title: "CDS & AFCAT", type: "Graduate aspirants", detail: "Focused preparation for officers entry exams", image: "/images/rankers/24.webp", slug: "cds-afcat-coaching" },
];

const students = [
  { name: "Himanshu Singh", role: "NDA 2025 achiever", image: "/images/rankers/1.webp", quote: "Daily practice and the right guidance made the difference." },
  { name: "Sakshi Yadav", role: "NDA Foundation student", image: "/images/rankers/7.webp", quote: "LWS gave my preparation a clear routine." },
  { name: "Aditi Sharma", role: "CDS aspirant", image: "/images/rankers/12.webp", quote: "The mentors helped me stay consistent until the exam." },
];

const faqs = [
  ["Who can join LWS defence coaching?", "School students, graduates and defence aspirants can choose a preparation path for NDA, CDS, AFCAT or SSB interview training."],
  ["Are classes online or offline?", "LWS offers structured online learning with live classes, recorded revision support, doubt solving and regular test practice."],
  ["Does LWS provide SSB interview preparation?", "Yes. Our SSB guidance covers screening, psychology tests, GTO tasks, personal interview and confidence-building practice."],
  ["How do I choose the right defence course?", "Choose NDA Foundation or NDA after school, and CDS or AFCAT after graduation. Our counsellors can help you select the right batch."],
];

export default function LandingPage({ coursesOnly = false }: { coursesOnly?: boolean }) {
  const [activeFaq, setActiveFaq] = useState(0);
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);

  useEffect(() => {
    fetch("/api/content").then((response) => response.json()).then(setContent).catch(() => undefined);
  }, []);

  return (
    <div className="lws-site">
      <Header />

      {coursesOnly ? <CoursesView /> : <>
        <main>
          <Hero content={content} />

          <section className="signal-bar" aria-label="LWS defence preparation promise"><div className="lws-container signal-inner"><span>Concepts</span><i>+</i><span>Practice</span><i>+</i><span>Guidance</span><i>+</i><span>Selection</span><Link href="/about">Why LWS <ArrowRight size={15} /></Link></div></section>

          <CoursesSection />

          <section className="ink-section" id="experience"><div className="lws-container experience-grid"><div className="experience-intro"><p className="eyebrow">The LWS preparation method</p><h2>{content.experienceTitle}<br /><em>{content.experienceAccent}</em></h2><p>{content.experienceBody}</p><Link href="/about" className="button button-light">Our approach <ArrowRight size={17} /></Link></div><div className="method-list"><article><span>01</span><div><h3>Strengthen fundamentals</h3><p>Build command over mathematics, English, reasoning and general knowledge.</p></div></article><article><span>02</span><div><h3>Practise with purpose</h3><p>Regular sectional tests, mock exams and detailed performance analysis.</p></div></article><article><span>03</span><div><h3>Prepare for SSB</h3><p>Develop communication, confidence and officer-like qualities with expert guidance.</p></div></article></div></div></section>

          <section className="lws-section bento-section"><div className="lws-container"><div className="section-top compact"><div><p className="eyebrow red-eyebrow">Inside your preparation</p><h2>{content.bentoTitle}<br /><em>{content.bentoAccent}</em></h2></div><p className="section-side-copy">{content.bentoCopy}</p></div><div className="bento-grid"><div className="bento-feature"><span className="bento-number">01 / 04</span><h3>Mocks that<br /><em>measure.</em></h3><p>Track your accuracy, speed and progress with an exam-ready test routine.</p><Link href="/courses" aria-label="Explore defence preparation courses"><ArrowRight /></Link></div><div className="bento-stat"><strong>20+</strong><span>experienced faculty<br />and SSB mentors</span></div><div className="bento-photo"><Image src={content.bentoImage} alt="LWS defence aspirant" fill sizes="33vw" /></div><div className="bento-quote"><span>“</span><p>Consistency became easier when my daily preparation had a clear direction.</p><small>— LWS NDA achiever</small></div></div></div></section>

          <section className="stories-section" id="stories"><div className="lws-container"><div className="section-top light-top"><div><p className="eyebrow">NDA 2025 results</p><h2>Our achievers are<br /><em>our pride.</em></h2></div><Link href="/success-stories" className="outline-link light-link">View all results <ArrowRight size={16} /></Link></div><div className="student-grid">{students.map((student) => <Link href="/success-stories" className="student-card" key={student.name}><div className="student-image"><Image src={student.image} alt={student.name} fill sizes="(max-width: 800px) 100vw, 33vw" /></div><div className="student-info"><span>{student.role}</span><h3>{student.name}</h3><p>“{student.quote}”</p><ArrowRight size={18} /></div></Link>)}</div></div></section>

          <section className="lws-section faq-section"><div className="lws-container faq-grid"><div><p className="eyebrow red-eyebrow">Know before you enrol</p><h2>Your defence<br /><em>questions, answered.</em></h2><p className="faq-intro">Speak with our counselling team about batches, exams and preparation plans.</p><Link href="/contact" className="text-link red-link">Talk to LWS <ArrowRight size={16} /></Link></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item ${activeFaq === index ? "active" : ""}`} key={question}><button type="button" onClick={() => setActiveFaq(activeFaq === index ? -1 : index)} aria-expanded={activeFaq === index}><span>0{index + 1}</span><strong>{question}</strong><ChevronDown size={18} /></button>{activeFaq === index && <p>{answer}</p>}</div>)}</div></div></section>

          <section className="final-cta" id="contact"><div className="lws-container final-cta-inner"><p className="eyebrow">Your selection journey starts here</p><h2>{content.finalCtaTitle}<br /><em>{content.finalCtaAccent}</em></h2><Link href="/courses" className="button button-red">Explore defence courses <ArrowRight size={17} /></Link></div></section>
        </main>
      </>}
      <footer className="lws-footer" id="about"><div className="lws-container footer-grid"><div><Logo /><p>Trusted NDA, CDS, AFCAT and SSB coaching for aspirants who want to serve the nation.</p></div><div><span className="footer-label">Defence exams</span><Link href="/courses">NDA Foundation</Link><Link href="/courses">NDA Coaching</Link><Link href="/courses">CDS & AFCAT</Link></div><div><span className="footer-label">Contact LWS</span><a href="mailto:learnwithsumitsir@gmail.com">learnwithsumitsir@gmail.com</a><a href="tel:+918047137368">+91 80 4713 7368</a><span className="footer-location">New Delhi, India</span></div></div><div className="lws-container footer-bottom"><span>© 2026 Learn With Sumit. All rights reserved.</span><span>Privacy · Terms</span></div></footer>
    </div>
  );
}

function CoursesView() {
  return <main className="courses-page"><div className="lws-container courses-heading"><p className="eyebrow red-eyebrow">LWS defence academy</p><h1>Choose your<br /><em>officer&apos;s entry.</em></h1><p>Focused preparation, experienced faculty and a disciplined study system for NDA, CDS, AFCAT and SSB aspirants.</p></div><div className="lws-container all-programs">{programs.map((program) => <Link href={`/courses/${program.slug}`} className="course-row" key={program.slug}><div className="course-row-image"><Image src={program.image} alt="" fill sizes="180px" /></div><span>{program.type}</span><h2>{program.title}</h2><p>{program.detail}</p><ArrowRight /></Link>)}</div></main>;
}
