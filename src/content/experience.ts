import type { LucideIcon } from "lucide-react";
import { HandHeart, PenTool } from "lucide-react";

export type Experience = {
  role: string;
  organization: string;
  type: string;
  icon: LucideIcon;
  /** Add when you want dates shown, e.g. "2023 — Present". Hidden while empty. */
  period?: string;
  summary: string;
  points: string[];
  tags: string[];
};

export const experiences: Experience[] = [
  {
    role: "Co-Founder",
    organization: "Rise for Hope",
    type: "Organization · Leadership",
    icon: HandHeart,
    summary:
      "Co-founded Rise for Hope, an initiative focused on creating positive social impact, and helped turn shared ideas into organized action.",
    points: [
      "Took initiative in establishing the organization and shaping its early direction",
      "Coordinated with team members to plan and carry out activities",
      "Collaborated with peers toward shared social-impact goals",
    ],
    tags: ["Leadership", "Collaboration", "Initiative", "Social Impact", "Team Coordination"],
  },
  {
    role: "Creative / Design Work",
    organization: "Remote client work",
    type: "Remote · Client projects",
    icon: PenTool,
    summary:
      "Completed remote creative and design work for clients — translating requirements into visual deliverables.",
    points: [
      "Worked with clients remotely to understand what they needed",
      "Delivered design work and refined it based on feedback",
    ],
    tags: ["Visual Design", "Client Communication", "Remote Collaboration"],
  },
];
