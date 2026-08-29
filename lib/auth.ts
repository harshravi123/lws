import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const sessionCookie = "lws-admin-session";
const sessionSecret = process.env.SESSION_SECRET || "local-development-session-secret";
const adminEmail = process.env.ADMIN_EMAIL || "admin@lws.in";
const adminPassword = process.env.ADMIN_PASSWORD || "LWS@1234";

function signature(value: string) {
  return createHmac("sha256", sessionSecret).update(value).digest("hex");
}

export function isValidLogin(email: string, password: string) {
  return email === adminEmail && password === adminPassword;
}

export function createSession() {
  const value = `admin:${Date.now()}`;
  return `${value}.${signature(value)}`;
}

export function isValidSession(value: string | undefined) {
  if (!value) return false;
  const separator = value.lastIndexOf(".");
  if (separator < 1) return false;
  const payload = value.slice(0, separator);
  const provided = Buffer.from(value.slice(separator + 1));
  const expected = Buffer.from(signature(payload));
  return provided.length === expected.length && timingSafeEqual(provided, expected) && payload.startsWith("admin:");
}

export async function hasAdminSession() {
  return isValidSession((await cookies()).get(sessionCookie)?.value);
}

export { adminEmail, sessionCookie };