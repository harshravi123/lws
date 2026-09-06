import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Users } from "lucide-react";

const courses = {
  foundation: { title: "NDA Foundation", label: "Classes 9-12", description: "Build strong fundamentals early with a disciplined path toward NDA.", slug: "nda-foundation", image: "/NDA.png" },
  nda: { title: "NDA Coaching", label: "School & college aspirants", description: "Complete written-exam preparation with focused practice and expert guidance.", slug: "nda-coaching", image: "/NDA-coaching.webp" },
  cds: { title: "CDS & AFCAT", label: "Graduate aspirants", description: "A structured preparation system for your next officers-entry attempt.", slug: "cds-afcat-coaching", image: "/cds-afcat.webp" },
  ssb: { title: "SSB Interview", label: "15-day intensive", description: "Develop confidence, communication and officer-like qualities for SSB.", slug: "ssb-interview", image: "/ssb.webp" },
};

function CourseOffer({ course, side }: { course: typeof courses.foundation; side: "left" | "right" }) {
  const hasRealImage = !course.image.includes("placeholder");

  return <Link href={`/courses/${course.slug}`} className={`reference-offer reference-offer-${side}`}>
    <div className={`reference-offer-image${hasRealImage ? " has-real-image" : ""}`}><Image src={course.image} alt={`${course.title} course`} fill sizes="(max-width: 800px) 42vw, 220px" />{!hasRealImage && <span>Image coming soon</span>}</div>
    <div className="reference-offer-copy"><span>{course.label}</span><h3>{course.title}</h3><p>{course.description}</p><b>Explore course <ArrowRight size={14} /></b></div>
  </Link>;
}

function ReferencePanel({ tag, mark, children }: { tag: string; mark: string; children: React.ReactNode }) {
  return <div className="reference-panel"><span className="reference-tag">{tag}</span><div className="reference-panel-content">{children}</div><div className="reference-mark">LWS <strong>{mark}</strong></div></div>;
}

export default function CoursesSection() {
  return <section className="courses-showcase" id="courses"><div className="lws-container reference-courses">
    <div className="reference-heading"><p className="eyebrow red-eyebrow">Your preparation starts here</p><h2>One clear path to<br /><em>your next attempt.</em></h2><p>Focused courses, expert guidance and a disciplined system for every LWS defence aspirant.</p></div>
    <ReferencePanel tag="NDA PREPARATION" mark="NDA"><CourseOffer course={courses.foundation} side="left" /><CourseOffer course={courses.nda} side="right" /></ReferencePanel>
    <ReferencePanel tag="OFFICER ENTRY" mark="ENTRY"><CourseOffer course={courses.cds} side="left" /><CourseOffer course={courses.ssb} side="right" /></ReferencePanel>
    <div className="reference-mini-grid">
      <Link href="/courses" className="reference-mini-card"><div className="reference-mini-icon"><BookOpen size={26} /></div><div><span>EVERY SUBJECT, ONE SYSTEM</span><h3>Written exam preparation</h3><p>Concepts, practice and mock tests that keep your preparation moving.</p></div><ArrowRight size={17} /></Link>
      <Link href="/courses/ssb-interview" className="reference-mini-card"><div className="reference-mini-icon"><Users size={26} /></div><div><span>CONFIDENCE FOR THE FINAL STAGE</span><h3>SSB readiness</h3><p>Build communication, confidence and officer-like qualities with LWS.</p></div><ArrowRight size={17} /></Link>
    </div>
    <Link href="/courses" className="reference-all-link"><span>Explore all LWS courses</span><i><ArrowRight size={16} /></i></Link>
  </div></section>;
}
