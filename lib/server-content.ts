import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { defaultSiteContent, type SiteContent } from "./site-content";

const contentPath = path.join(process.cwd(), "data", "site-content.json");

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const file = await readFile(contentPath, "utf8");
    return { ...defaultSiteContent, ...JSON.parse(file) };
  } catch {
    return defaultSiteContent;
  }
}

export async function updateSiteContent(content: SiteContent): Promise<SiteContent> {
  await writeFile(contentPath, `${JSON.stringify(content, null, 2)}\n`, "utf8");
  return content;
}