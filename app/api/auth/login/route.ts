import { NextResponse } from "next/server";
import { createSession, isValidLogin, sessionCookie } from "@/lib/auth";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  if (!isValidLogin(String(email || ""), String(password || ""))) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const response = NextResponse.json({ authenticated: true });
  response.cookies.set(sessionCookie, createSession(), { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 24 * 7, path: "/" });
  return response;
}