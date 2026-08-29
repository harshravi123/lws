import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/Header";

export default function SiteFooter() {
  return <footer className="site-footer" id="about">
    <div className="site-footer-main lws-container">
      <div className="site-footer-brand"><Logo /><p>Focused NDA, CDS, AFCAT and SSB preparation for aspirants ready to build a career in service.</p><Link href="/courses" className="footer-cta">Find your course <ArrowUpRight size={16} /></Link></div>
      <div className="site-footer-column"><span className="footer-heading">Explore</span><Link href="/#about">About LWS</Link><Link href="/#experience">Our approach</Link><Link href="/#stories">Student results</Link><Link href="/#contact">Contact us</Link></div>
      <div className="site-footer-column"><span className="footer-heading">Courses</span><Link href="/courses/nda-foundation">NDA Foundation</Link><Link href="/courses/nda-coaching">NDA Coaching</Link><Link href="/courses/cds-afcat-coaching">CDS & AFCAT</Link><Link href="/courses/ssb-interview">SSB Interview</Link></div>
      <div className="site-footer-column footer-contact"><span className="footer-heading">Talk to LWS</span><a href="tel:08047137368"><Phone size={15} />08047137368</a><a href="mailto:learnwithsumitsir@gmail.com"><Mail size={15} />learnwithsumitsir@gmail.com</a><span><MapPin size={15} />New Delhi, India</span></div>
    </div>
    <div className="site-footer-bottom lws-container"><span>&copy; 2026 Learn With Sumit</span><span>Built for disciplined preparation</span><div><Link href="/">Privacy</Link><Link href="/">Terms</Link></div></div>
  </footer>;
}
