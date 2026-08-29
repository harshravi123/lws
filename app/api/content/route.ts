import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/auth";
import { getSiteContent, updateSiteContent } from "@/lib/server-content";

export async function GET() {
  return NextResponse.json(await getSiteContent());
}

export async function PUT(request: Request) {
  if (!(await hasAdminSession())) return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  const content = await request.json();
  if (!content || typeof content.heroTitle !== "string" || !Array.isArray(content.blogs)) {
    return NextResponse.json({ error: "Invalid content payload" }, { status: 400 });
  }
  return NextResponse.json(await updateSiteContent(content));
}