/**
 * Case-study loader.
 *
 * Reads Markdown files once at build time, validates their front matter, and
 * returns typed objects. A malformed file throws during the build rather than
 * shipping a broken page — a missing `role` should fail loudly, not silently
 * render an empty line.
 */

import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const DIR = join(process.cwd(), "src", "content", "case-studies");

export interface CaseStudy {
  slug: string;
  title: string;
  period: string;
  category: string;
  role: string;
  stack: string[];
  repo?: string;
  live?: string;
  summary: string;
  body: string;
}

const REQUIRED_FIELDS = ["slug", "title", "period", "category", "role"] as const;

export function getAllCaseStudies(): CaseStudy[] {
  const files = readdirSync(DIR).filter((file) => file.endsWith(".md"));

  return files.map((file) => {
    const raw = readFileSync(join(DIR, file), "utf8");
    const { data, content } = matter(raw);

    const missing = REQUIRED_FIELDS.filter((field) => !data[field]);
    if (missing.length > 0) {
      throw new Error(
        `Case study "${file}" is missing required front matter: ${missing.join(", ")}`
      );
    }

    if (!Array.isArray(data.stack)) {
      throw new Error(`Case study "${file}" must declare stack as a YAML list.`);
    }

    return {
      slug: String(data.slug),
      title: String(data.title),
      period: String(data.period),
      category: String(data.category),
      role: String(data.role),
      stack: data.stack.map(String),
      repo: data.repo ? String(data.repo) : undefined,
      live: data.live ? String(data.live) : undefined,
      summary: String(data.summary ?? ""),
      body: marked.parse(content, { async: false }) as string,
    };
  });
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return getAllCaseStudies().find((study) => study.slug === slug);
}
