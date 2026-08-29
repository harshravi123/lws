import Link from "next/link";
import { ArrowRight, GraduationCap, Plane, Shield, Users } from "lucide-react";

const courses = [
  { title: "NDA Foundation", label: "Classes 9-12", description: "Build strong fundamentals early with a disciplined path toward NDA.", icon: GraduationCap, accent: "amber", slug: "nda-foundation" },
  { title: "NDA Coaching", label: "School & college aspirants", description: "Complete written-exam preparation with focused practice and expert guidance.", icon: Shield, accent: "navy", slug: "nda-coaching" },
  { title: "SSB Interview", label: "15-day intensive", description: "Develop confidence, communication and officer-like qualities for SSB.", icon: Users, accent: "coral", slug: "ssb-interview" },
  { title: "CDS & AFCAT", label: "Graduate aspirants", description: "A structured preparation system for your next officers-entry attempt.", icon: Plane, accent: "blue", slug: "cds-afcat-coaching" },
];

export default function CoursesSection() {
  return <section className="courses-showcase" id="courses">
    <div className="lws-container">
      <div className="courses-showcase-heading"><div><p className="eyebrow red-eyebrow">Choose your route</p><h2>Courses <em>we offer.</em></h2></div><p>Clear preparation paths for every stage of your defence journey.</p></div>
      <div className="courses-showcase-grid">{courses.map(({ title, label, description, icon: Icon, accent, slug }, index) => <Link href={`/courses/${slug}`} className={`course-tile course-tile-${accent}`} key={slug}><div className="course-tile-top"><span>0{index + 1}</span><div className="course-icon"><Icon size={25} strokeWidth={1.8} /></div></div><div className="course-tile-content"><span className="course-label">{label}</span><h3>{title}</h3><p>{description}</p></div><span className="course-tile-link">Explore course <ArrowRight size={16} /></span></Link>)}</div>
      <div className="courses-showcase-action"><Link href="/courses" className="button button-red">Explore more courses <ArrowRight size={17} /></Link></div>
    </div>
  </section>;
}
