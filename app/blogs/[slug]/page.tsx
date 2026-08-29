import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getSiteContent } from "@/lib/server-content";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = (await getSiteContent()).blogs.find((item) => item.slug === slug && item.status === "Published");
  return { title: post?.metaTitle || "LWS Blog", description: post?.metaDescription || post?.excerpt };
}

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = (await getSiteContent()).blogs.find((item) => item.slug === slug && item.status === "Published");
  if (!post) notFound();

  return <main className="blog-article"><div className="blog-article-inner"><Link href="/" className="article-back"><ArrowLeft size={16} /> Back to LWS</Link><p className="article-category">{post.category} / {post.date}</p><h1>{post.title}</h1><p className="article-excerpt">{post.excerpt}</p><div className="article-meta">By {post.author} {post.keywords && ` · ${post.keywords}`}</div><div className="article-body">{post.body.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div></main>;
}