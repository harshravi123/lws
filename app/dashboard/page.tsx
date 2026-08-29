"use client";

import Link from "next/link";
import { ArrowLeft, Check, FileText, ImagePlus, LayoutDashboard, LogOut, Pencil, Plus, Save, Trash2, Upload, X } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { defaultSiteContent, type BlogPost, type SiteContent } from "@/lib/site-content";
import "./dashboard.css";

type Tab = "overview" | "content" | "blogs";

const emptyPost: Omit<BlogPost, "id"> = {
  title: "",
  excerpt: "",
  body: "",
  slug: "",
  metaTitle: "",
  metaDescription: "",
  keywords: "",
  category: "NDA preparation",
  author: "LWS Faculty",
  date: new Date().toISOString().slice(0, 10),
  image: "/images/lws-hero.webp",
  status: "Draft",
};

export default function DashboardPage() {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [tab, setTab] = useState<Tab>("overview");
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [postForm, setPostForm] = useState(emptyPost);
  const [notice, setNotice] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loginError, setLoginError] = useState("");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  useEffect(() => {
    async function loadDashboard() {
      const session = await fetch("/api/auth/session");
      const sessionData = await session.json();
      setAuthenticated(sessionData.authenticated);
      if (sessionData.authenticated) {
        const response = await fetch("/api/content");
        setContent(await response.json());
      }
      setLoading(false);
    }
    void loadDashboard();
  }, []);

  async function persist(nextContent: SiteContent, message: string) {
    const response = await fetch("/api/content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(nextContent) });
    if (response.status === 401) {
      setAuthenticated(false);
      return;
    }
    const savedContent = await response.json();
    setContent(savedContent);
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  }

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginError("");
    const response = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(loginForm) });
    if (!response.ok) {
      setLoginError("The email or password is incorrect.");
      return;
    }
    const contentResponse = await fetch("/api/content");
    setContent(await contentResponse.json());
    setAuthenticated(true);
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setAuthenticated(false);
  }

  function updateProof(index: number, key: "value" | "label", value: string) {
    const proof = content.proof.map((item, itemIndex) => itemIndex === index ? { ...item, [key]: value } : item);
    setContent({ ...content, proof });
  }

  function saveContent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    persist(content, "Homepage content saved");
  }

  function startNewPost() {
    setEditingPost(null);
    setPostForm({ ...emptyPost, date: new Date().toISOString().slice(0, 10) });
    setTab("blogs");
  }

  function editPost(post: BlogPost) {
    setEditingPost(post);
    setPostForm(post);
    setTab("blogs");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function removePost(id: string) {
    if (!window.confirm("Delete this blog post?")) return;
    persist({ ...content, blogs: content.blogs.filter((post) => post.id !== id) }, "Blog post deleted");
  }

  function savePost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const post = { ...postForm, id: editingPost?.id ?? `${Date.now()}` };
    const blogs = editingPost ? content.blogs.map((item) => item.id === post.id ? post : item) : [post, ...content.blogs];
    persist({ ...content, blogs }, editingPost ? "Blog post updated" : "Blog post saved");
    setEditingPost(post);
  }

  function uploadImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPostForm((form) => ({ ...form, image: String(reader.result) }));
    reader.readAsDataURL(file);
  }

  if (loading) return <div className="dashboard-login"><p className="dashboard-kicker">LWS Content Studio</p><h1>Loading workspace...</h1></div>;
  if (!authenticated) return <LoginView form={loginForm} error={loginError} onChange={setLoginForm} onSubmit={login} />;

  return <div className="dashboard-shell">
    <aside className="dashboard-sidebar">
      <Link href="/" className="dashboard-brand"><span>LWS</span><small>CONTENT STUDIO</small></Link>
      <nav className="dashboard-nav" aria-label="Dashboard navigation">
        <button className={tab === "overview" ? "active" : ""} onClick={() => setTab("overview")}><LayoutDashboard size={17} /> Overview</button>
        <button className={tab === "content" ? "active" : ""} onClick={() => setTab("content")}><Pencil size={17} /> Homepage content</button>
        <button className={tab === "blogs" ? "active" : ""} onClick={() => setTab("blogs")}><FileText size={17} /> Blog posts <span>{content.blogs.length}</span></button>
      </nav>
      <Link href="/" className="back-home"><ArrowLeft size={16} /> View website</Link>
    </aside>

    <main className="dashboard-main">
      <header className="dashboard-header"><div><p className="dashboard-kicker">Learn With Sumit / Admin</p><h1>{tab === "overview" ? "Good morning, Sumit." : tab === "content" ? "Homepage content" : "Blog posts"}</h1></div><div className="header-actions"><button className="logout-button" onClick={logout}><LogOut size={16} /> Log out</button><button className="new-post-button" onClick={startNewPost}><Plus size={17} /> New blog post</button></div></header>
      {notice && <div className="save-notice"><Check size={16} /> {notice}</div>}

      {tab === "overview" && <section className="dashboard-view"><div className="welcome-panel"><div><p className="dashboard-kicker">Content studio</p><h2>Keep the front door fresh.</h2><p>Update the words students see first, or publish a new resource for your defence community.</p></div><button className="button-dark" onClick={() => setTab("content")}>Edit homepage <Pencil size={16} /></button></div><div className="metric-grid"><div><span>Published posts</span><strong>{content.blogs.filter((post) => post.status === "Published").length}</strong><small>Live on your content list</small></div><div><span>Total posts</span><strong>{content.blogs.length}</strong><small>Drafts and published</small></div><div><span>Proof points</span><strong>{content.proof.length}</strong><small>Homepage metrics</small></div></div><div className="recent-heading"><h2>Recent posts</h2><button className="plain-button" onClick={() => setTab("blogs")}>Manage all <ArrowLeft size={15} /></button></div><PostTable posts={content.blogs.slice(0, 4)} onEdit={editPost} onDelete={removePost} /></section>}

      {tab === "content" && <section className="dashboard-view"><form className="editor-form" onSubmit={saveContent}><div className="form-heading"><div><p className="dashboard-kicker">Homepage / Sections</p><h2>Shape the first impression</h2><p>Update homepage copy and image paths without editing code.</p></div><button className="button-dark" type="submit"><Save size={16} /> Save changes</button></div><label>Headline<input value={content.heroTitle} onChange={(event) => setContent({ ...content, heroTitle: event.target.value })} /></label><label>Accent line<input value={content.heroAccent} onChange={(event) => setContent({ ...content, heroAccent: event.target.value })} /></label><label>Supporting copy<textarea rows={4} value={content.heroLede} onChange={(event) => setContent({ ...content, heroLede: event.target.value })} /></label><div className="two-fields"><label>Hero image URL<input value={content.heroImage} onChange={(event) => setContent({ ...content, heroImage: event.target.value })} /></label><label>Hero image alt text<input value={content.heroImageAlt} onChange={(event) => setContent({ ...content, heroImageAlt: event.target.value })} /></label></div><label>Primary button label<input value={content.heroPrimaryCta} onChange={(event) => setContent({ ...content, heroPrimaryCta: event.target.value })} /></label><div className="content-subsection"><div className="field-label">Preparation method</div><div className="two-fields"><input aria-label="Method title" value={content.experienceTitle} onChange={(event) => setContent({ ...content, experienceTitle: event.target.value })} /><input aria-label="Method accent" value={content.experienceAccent} onChange={(event) => setContent({ ...content, experienceAccent: event.target.value })} /></div><textarea aria-label="Method copy" rows={3} value={content.experienceBody} onChange={(event) => setContent({ ...content, experienceBody: event.target.value })} /></div><div className="content-subsection"><div className="field-label">Preparation feature</div><div className="two-fields"><input aria-label="Feature title" value={content.bentoTitle} onChange={(event) => setContent({ ...content, bentoTitle: event.target.value })} /><input aria-label="Feature accent" value={content.bentoAccent} onChange={(event) => setContent({ ...content, bentoAccent: event.target.value })} /></div><div className="two-fields"><input aria-label="Feature copy" value={content.bentoCopy} onChange={(event) => setContent({ ...content, bentoCopy: event.target.value })} /><input aria-label="Feature image URL" value={content.bentoImage} onChange={(event) => setContent({ ...content, bentoImage: event.target.value })} /></div></div><div className="content-subsection"><div className="field-label">Final call to action</div><div className="two-fields"><input aria-label="Final CTA title" value={content.finalCtaTitle} onChange={(event) => setContent({ ...content, finalCtaTitle: event.target.value })} /><input aria-label="Final CTA accent" value={content.finalCtaAccent} onChange={(event) => setContent({ ...content, finalCtaAccent: event.target.value })} /></div></div><div className="proof-editor"><div className="field-label">Proof points</div>{content.proof.map((item, index) => <div className="proof-row" key={index}><input aria-label={`Proof value ${index + 1}`} value={item.value} onChange={(event) => updateProof(index, "value", event.target.value)} /><input aria-label={`Proof label ${index + 1}`} value={item.label} onChange={(event) => updateProof(index, "label", event.target.value)} /></div>)}</div></form></section>}

      {tab === "blogs" && <section className="dashboard-view blog-view"><div className="blog-layout"><form className="editor-form blog-form" onSubmit={savePost}><div className="form-heading"><div><p className="dashboard-kicker">Blog / Editor</p><h2>{editingPost ? "Edit post" : "Write a new post"}</h2></div>{editingPost && <button type="button" className="icon-button" onClick={startNewPost} aria-label="Clear editor"><X size={18} /></button>}</div><label>Title<input required value={postForm.title} onChange={(event) => setPostForm({ ...postForm, title: event.target.value })} /></label><label>Excerpt<textarea required rows={4} value={postForm.excerpt} onChange={(event) => setPostForm({ ...postForm, excerpt: event.target.value })} /></label><label>Complete article<textarea required rows={12} value={postForm.body} onChange={(event) => setPostForm({ ...postForm, body: event.target.value })} /></label><div className="two-fields"><label>URL slug<input required value={postForm.slug} onChange={(event) => setPostForm({ ...postForm, slug: event.target.value })} /></label><label>Keywords<input value={postForm.keywords} onChange={(event) => setPostForm({ ...postForm, keywords: event.target.value })} /></label></div><label>Meta title<input value={postForm.metaTitle} onChange={(event) => setPostForm({ ...postForm, metaTitle: event.target.value })} /></label><label>Meta description<textarea rows={3} value={postForm.metaDescription} onChange={(event) => setPostForm({ ...postForm, metaDescription: event.target.value })} /></label><div className="two-fields"><label>Category<input value={postForm.category} onChange={(event) => setPostForm({ ...postForm, category: event.target.value })} /></label><label>Author<input value={postForm.author} onChange={(event) => setPostForm({ ...postForm, author: event.target.value })} /></label></div><div className="two-fields"><label>Publish date<input type="date" value={postForm.date} onChange={(event) => setPostForm({ ...postForm, date: event.target.value })} /></label><label>Status<select value={postForm.status} onChange={(event) => setPostForm({ ...postForm, status: event.target.value as BlogPost["status"] })}><option>Draft</option><option>Published</option></select></label></div><label>Cover image<div className="upload-box"><Upload size={18} /><span>Choose an image from your computer</span><input type="file" accept="image/*" onChange={uploadImage} /></div></label><button className="button-dark full-button" type="submit"><Save size={16} /> {editingPost ? "Update post" : "Save post"}</button></form><div className="post-list"><div className="list-heading"><h2>All posts</h2><span>{content.blogs.length} total</span></div><PostTable posts={content.blogs} onEdit={editPost} onDelete={removePost} /></div></div></section>}
    </main>
  </div>;
}

function PostTable({ posts, onEdit, onDelete }: { posts: BlogPost[]; onEdit: (post: BlogPost) => void; onDelete: (id: string) => void }) {
  return <div className="post-table">{posts.length === 0 ? <div className="empty-state"><FileText size={22} /><p>No posts yet. Start writing your first resource.</p></div> : posts.map((post) => <article className="post-row" key={post.id}><div className="post-thumb">{post.image ? <img src={post.image} alt="" /> : <ImagePlus size={18} />}</div><div className="post-details"><strong>{post.title || "Untitled post"}</strong><span>{post.category} · {post.date}</span></div><span className={`status status-${post.status.toLowerCase()}`}>{post.status}</span><div className="row-actions"><button onClick={() => onEdit(post)} aria-label={`Edit ${post.title}`}><Pencil size={15} /></button><button onClick={() => onDelete(post.id)} aria-label={`Delete ${post.title}`}><Trash2 size={15} /></button></div></article>)}</div>;
}

function LoginView({ form, error, onChange, onSubmit }: { form: { email: string; password: string }; error: string; onChange: (form: { email: string; password: string }) => void; onSubmit: (event: FormEvent<HTMLFormElement>) => void }) {
  return <div className="dashboard-login"><div className="login-panel"><Link href="/" className="dashboard-brand"><span>LWS</span><small>CONTENT STUDIO</small></Link><p className="dashboard-kicker">Admin access</p><h1>Sign in to manage LWS.</h1><p className="login-copy">Update the homepage and publish resources from one private workspace.</p><form onSubmit={onSubmit}><label>Email<input required type="email" value={form.email} onChange={(event) => onChange({ ...form, email: event.target.value })} /></label><label>Password<input required type="password" value={form.password} onChange={(event) => onChange({ ...form, password: event.target.value })} /></label>{error && <p className="login-error">{error}</p>}<button className="button-dark full-button" type="submit">Sign in <ArrowLeft size={16} className="login-arrow" /></button></form><Link href="/" className="back-home login-back"><ArrowLeft size={16} /> Return to website</Link></div></div>;
}