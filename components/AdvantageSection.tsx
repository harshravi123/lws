import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Crosshair, ShieldCheck, Target } from "lucide-react";

const advantages = [
  {
    title: "Concept clarity\nfor defence exams",
    description: "Understand mathematics, English, reasoning and general knowledge through focused teaching.",
    image: "/2.webp",
    icon: Target,
    accent: "blue",
  },
  {
    title: "A disciplined\npractice system",
    description: "Build exam confidence with daily practice, mock tests and detailed performance review.",
    image: "/1.webp",
    icon: Crosshair,
    accent: "amber",
  },
  {
    title: "Guidance that\nstays personal",
    description: "Get expert direction for your preparation, doubts, interview readiness and next attempt.",
    image: "/3.webp",
    icon: ShieldCheck,
    accent: "red",
  },
];

export default function AdvantageSection() {
  return <section className="advantage-section" aria-labelledby="advantage-heading">
    <div className="lws-container">
      <div className="advantage-heading">
        <p className="eyebrow red-eyebrow">The LWS advantage</p>
        <h2 id="advantage-heading">Prepare with clarity.<br /><em>Move with confidence.</em></h2>
        <p>Everything you need to turn a serious defence goal into a consistent, selection-ready routine.</p>
      </div>
      <div className="advantage-grid">
        {advantages.map(({ title, description, image, icon: Icon, accent }, index) => <Link href="/about" className={`advantage-card advantage-card-${accent}`} key={title}>
          <div className="advantage-visual">
            <Image src={image} alt="" fill sizes="(max-width: 800px) 86vw, 31vw" />
            <div className="advantage-icon"><Icon size={25} strokeWidth={1.8} /></div>
          </div>
          <div className="advantage-copy">
            <span className="advantage-number">0{index + 1}</span>
            <h3>{title.split("\n").map((line) => <span key={line}>{line}<br /></span>)}</h3>
            <p>{description}</p>
            <span className="advantage-link">Discover the LWS method <ArrowRight size={15} /></span>
          </div>
        </Link>)}
      </div>
    </div>
  </section>;
}
