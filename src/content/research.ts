import type { LucideIcon } from "lucide-react";
import { Aperture, BrainCircuit, HeartPulse, MessageSquareText, ScanEye, ShieldCheck, Sparkles } from "lucide-react";

/** Status labels for research. Keep these honest: an interest is never shown as completed work. */
export type WorkStatus = "ongoing" | "interest";

export const statusMeta: Record<WorkStatus, { label: string; description: string }> = {
  ongoing: { label: "Ongoing Research", description: "Actively in progress — no results claimed yet." },
  interest: { label: "Research Interest", description: "An area I want to explore — not completed work." },
};

export const researchIntro =
  "My research interests focus on applying Artificial Intelligence and Machine Learning to real-world problems, with particular interest in explainability, healthcare AI, NLP, generative AI, and data-driven systems.";

export const featuredResearch = {
  title:
    "An Explainable Machine Learning Framework for Predicting the Impact of Generative AI on Student Skill Development in Higher Education",
  area: ["Generative AI", "Education", "Machine Learning"],
  status: "ongoing" as WorkStatus,
  description:
    "A research-oriented study investigating how the use of Generative AI may relate to student skill development in higher education through structured survey data and machine learning analysis.",
  methodology: [
    "Survey Data",
    "Data Preprocessing",
    "Feature Engineering",
    "Machine Learning",
    "Explainable AI",
    "Model Evaluation",
  ],
  /** Study design as described — inputs, method and intended output. No results are claimed. */
  design: [
    { label: "Input", value: "Structured survey responses on Generative AI use" },
    { label: "Method", value: "Machine learning models, interpreted with explainable AI" },
    { label: "Goal", value: "Understand how GenAI use may relate to skill development" },
  ],
  note: "Results are not yet available. This page will be updated as the study progresses.",
};

export type ResearchArea = {
  title: string;
  description: string;
  icon: LucideIcon;
  wide?: boolean;
};

export const researchAreas: ResearchArea[] = [
  {
    title: "Artificial Intelligence & Machine Learning",
    description:
      "Machine learning algorithms, predictive modeling, model evaluation, and intelligent systems.",
    icon: BrainCircuit,
    wide: true,
  },
  {
    title: "Generative AI",
    description:
      "Exploring the impact and application of generative AI, particularly in education and student skill development.",
    icon: Sparkles,
  },
  {
    title: "Explainable AI",
    description: "Understanding model decisions using interpretable and explainable machine learning techniques.",
    icon: ScanEye,
  },
  {
    title: "Healthcare AI",
    description: "Machine learning applications in healthcare and computational biology.",
    icon: HeartPulse,
  },
  {
    title: "Natural Language Processing",
    description: "Text classification, language analysis, and knowledge-based systems.",
    icon: MessageSquareText,
  },
  {
    title: "Computer Vision",
    description: "Interest in visual recognition, image-based learning, and computer vision research.",
    icon: Aperture,
  },
  {
    title: "Cybersecurity",
    description: "Machine learning applications in network and security-related problems.",
    icon: ShieldCheck,
  },
];
