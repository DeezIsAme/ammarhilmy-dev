/**
 * Skills — four groups with honest proficiency labels (WEB-PORTO-SPEC.md §6.5).
 *
 * Labelling rule from IDEA.md §3.5: only skills supported by actual experience,
 * projects, coursework, or certifications appear. "Basic" and "Intermediate"
 * are honest labels, not weaknesses to hide — do not upgrade a label without
 * new evidence.
 *
 * Never claim full-stack ownership: in both Laravel projects the backend was
 * built by a teammate.
 */

export type SkillLevel = "PRIMARY" | "WORKING" | "FAMILIAR";

export interface Skill {
  name: string;
  level: SkillLevel;
}

export interface SkillGroup {
  group: string;
  items: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    group: "Markup & Styling",
    items: [
      { name: "HTML5", level: "PRIMARY" },
      { name: "CSS3", level: "PRIMARY" },
      { name: "Tailwind CSS v4", level: "PRIMARY" },
      { name: "Blade", level: "PRIMARY" },
      { name: "Alpine.js", level: "PRIMARY" },
      { name: "Preline UI", level: "WORKING" },
    ],
  },
  {
    group: "Programming",
    items: [
      { name: "JavaScript (ES6+)", level: "PRIMARY" },
      { name: "PHP", level: "WORKING" },
      { name: "SQL (MySQL)", level: "WORKING" },
      { name: "C / Embedded", level: "FAMILIAR" },
    ],
  },
  {
    group: "Frameworks & Tools",
    items: [
      { name: "Laravel", level: "WORKING" },
      { name: "Git & GitHub", level: "WORKING" },
      { name: "Postman", level: "WORKING" },
      { name: "Figma", level: "WORKING" },
      { name: "VS Code", level: "PRIMARY" },
    ],
  },
  {
    group: "AI / LLM",
    items: [
      { name: "LoRA Fine-Tuning", level: "FAMILIAR" },
      { name: "Model Evaluation (BLEU, BERTScore, ROUGE)", level: "FAMILIAR" },
      { name: "Prompt Engineering", level: "FAMILIAR" },
      { name: "Python (PyTorch, Transformers, PEFT, TRL, Unsloth)", level: "FAMILIAR" },
    ],
  },
];
