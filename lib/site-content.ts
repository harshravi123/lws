export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  category: string;
  author: string;
  date: string;
  image: string;
  status: "Published" | "Draft";
};

export type SiteContent = {
  heroTitle: string;
  heroAccent: string;
  heroLede: string;
  heroPrimaryCta: string;
  heroImage: string;
  heroImageAlt: string;
  experienceTitle: string;
  experienceAccent: string;
  experienceBody: string;
  bentoTitle: string;
  bentoAccent: string;
  bentoCopy: string;
  bentoImage: string;
  finalCtaTitle: string;
  finalCtaAccent: string;
  proof: Array<{ value: string; label: string }>;
  blogs: BlogPost[];
};

export const defaultSiteContent: SiteContent = {
  heroTitle: "Prepare with purpose.",
  heroAccent: "Serve with pride.",
  heroLede: "Structured NDA, CDS, AFCAT and SSB coaching for determined aspirants. Learn from experienced faculty, practise every day and walk into your selection journey ready.",
  heroPrimaryCta: "Explore courses",
  heroImage: "/images/lws-hero.webp",
  heroImageAlt: "LWS defence aspirants preparing together",
  experienceTitle: "Study with discipline.",
  experienceAccent: "Arrive prepared.",
  experienceBody: "From concept clarity to full-length mocks, every part of LWS is built around the habits and confidence required for defence selection.",
  bentoTitle: "Everything for",
  bentoAccent: "the next attempt.",
  bentoCopy: "One focused ecosystem for exam preparation, revision, doubt solving and SSB readiness.",
  bentoImage: "/images/rankers/22.webp",
  finalCtaTitle: "Prepare today.",
  finalCtaAccent: "Lead tomorrow.",
  proof: [
    { value: "10k+", label: "defence aspirants" },
    { value: "95%", label: "student satisfaction" },
    { value: "20+", label: "expert faculty" },
  ],
  blogs: [
    {
      id: "nda-preparation-plan",
      title: "How to build a consistent NDA preparation plan",
      excerpt: "A practical weekly rhythm for balancing concepts, practice and revision.",
      body: "A strong NDA preparation plan is built on consistency. Start with a weekly cycle that gives every subject a focused block, then protect time for mock tests and error review.\n\nBegin each week by choosing three measurable goals. Review your progress at the weekend and adjust the next cycle around the topics that need more attention.",
      slug: "nda-preparation-plan",
      metaTitle: "How to build a consistent NDA preparation plan | LWS",
      metaDescription: "Build a practical NDA preparation routine with focused concepts, daily practice and weekly revision.",
      keywords: "NDA preparation, NDA study plan, defence exam preparation",
      category: "NDA preparation",
      author: "LWS Faculty",
      date: "2026-08-14",
      image: "/images/lws-hero.webp",
      status: "Published",
    },
  ],
};

export const siteContentKey = "lws-site-content";

export function readSiteContent(): SiteContent {
  if (typeof window === "undefined") return defaultSiteContent;

  try {
    const saved = window.localStorage.getItem(siteContentKey);
    return saved ? { ...defaultSiteContent, ...JSON.parse(saved) } : defaultSiteContent;
  } catch {
    return defaultSiteContent;
  }
}

export function saveSiteContent(content: SiteContent) {
  window.localStorage.setItem(siteContentKey, JSON.stringify(content));
}