/**
 * Projects — all four source-verified projects (WEB-PORTO-SPEC.md §6.2, §7).
 *
 * Accuracy rules (IDEA.md §6):
 *  - The ETIC project is a supporting tool, never an official item-generation
 *    or approval system. Do not claim production deployment or measurable
 *    institutional efficiency gains.
 *  - Sectors Copilot's stack is Blade + Alpine.js + Preline UI + Tailwind v4.
 *    That project's own IDEA.md is a PRD and must never be used as fact.
 *  - Role is "Front end" for both Laravel projects: a teammate built the backend.
 */

export type ProjectCategory = "AI / LLM" | "AI Agent · Web" | "Web · Freelance" | "Embedded";

export interface Project {
  slug: string;
  title: string;
  period: string;
  category: ProjectCategory;
  role: string;
  summary: string;
  stack: string[];
  /** Omit rather than guess; the case-study page hides the link when absent. */
  repo?: string;
  live?: string;
  featured: boolean;
  image: string;
}

export const projects: Project[] = [
  {
    slug: "etic-question-generator",
    title: "ETIC Question Generator",
    period: "2026",
    category: "AI / LLM",
    role: "Fine-tuning & evaluation",
    summary:
      "Undergraduate thesis: fine-tuned LLaMA 3.1 8B Instruct with LoRA to generate ETIC Structure-section multiple-choice simulation questions, then evaluated output quality across two prompt scenarios.",
    stack: ["Python", "PyTorch", "Transformers", "PEFT", "TRL", "Unsloth", "LLaMA 3.1"],
    featured: true,
    image: "/projects/etic-question-generator.jpg",
  },
  {
    slug: "sectors-copilot",
    title: "Sectors Copilot",
    period: "2026",
    category: "AI Agent · Web",
    role: "Front end",
    summary:
      "Hackathon-built multi-step AI research agent: a Laravel application where the agent's execution steps stream to a live workspace panel as they run.",
    stack: ["Laravel", "Blade", "Alpine.js", "Preline UI", "Tailwind CSS v4", "Server-Sent Events"],
    featured: true,
    image: "/projects/sectors-copilot.jpg",
  },
  {
    slug: "koperasi-financial-system",
    title: "Cooperative Financial Management System",
    period: "February – March 2025",
    category: "Web · Freelance",
    role: "Front end",
    summary:
      "Freelance build for a savings-and-loan cooperative: cash income, expense and transfer transactions, member savings (simpanan), loan records (pinjaman), and an operational dashboard.",
    stack: ["Laravel", "MySQL", "Blade", "Tailwind CSS", "Alpine.js"],
    repo: "https://gitlab.com/jakewd7/koperasilaravel",
    featured: true,
    image: "/projects/koperasi-financial-system.jpg",
  },
  {
    slug: "esp32-grain-dryer",
    title: "Grain Dryer Automation Prototype",
    period: "2026",
    category: "Embedded",
    role: "Firmware & control logic",
    summary:
      "Embedded Systems course project: an ESP32 in C reads temperature, humidity, light, and rain sensors, then drives a relay-controlled heater through threshold-based conditional logic.",
    stack: ["C", "ESP32", "DHT22", "BH1750", "Relay Control"],
    featured: true,
    image: "/projects/esp32-grain-dryer.jpg",
  },
];
