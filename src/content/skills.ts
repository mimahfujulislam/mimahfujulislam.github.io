import type { LucideIcon } from "lucide-react";
import { Braces, BrainCircuit, CircuitBoard, Container, Database, Globe, Wrench } from "lucide-react";

export type SkillGroup = {
  title: string;
  icon: LucideIcon;
  blurb: string;
  items: { name: string; core?: boolean }[];
  /** Wider card in the bento grid. */
  wide?: boolean;
  featured?: boolean;
};

export const skillGroups: SkillGroup[] = [
  {
    title: "AI / Machine Learning",
    icon: BrainCircuit,
    blurb: "Working with data end-to-end — from exploration to evaluated, explainable models.",
    featured: true,
    wide: true,
    items: [
      { name: "Machine Learning" },
      { name: "Data Science" },
      { name: "Exploratory Data Analysis" },
      { name: "Classification" },
      { name: "Regression" },
      { name: "Model Evaluation" },
      { name: "Feature Engineering" },
      { name: "Explainable AI" },
    ],
  },
  {
    title: "Programming",
    icon: Braces,
    blurb: "Python for data work; C, C++ and Java for fundamentals.",
    items: [
      { name: "Python", core: true },
      { name: "C" },
      { name: "C++" },
      { name: "Java" },
      { name: "JavaScript" },
    ],
  },
  {
    title: "Web Development",
    icon: Globe,
    blurb: "Building usable interfaces and server-side applications.",
    items: [{ name: "HTML" }, { name: "CSS" }, { name: "JavaScript" }, { name: "PHP" }],
  },
  {
    title: "Databases",
    icon: Database,
    blurb: "Relational and document data stores.",
    items: [{ name: "MySQL" }, { name: "MongoDB" }],
  },
  {
    title: "Tools",
    icon: Wrench,
    blurb: "Everyday development and design tooling.",
    items: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "VS Code" },
      { name: "Visual Studio" },
      { name: "Figma" },
    ],
  },
  {
    title: "Systems / DevOps",
    icon: Container,
    blurb: "Working in Linux environments and shipping software reliably.",
    wide: true,
    items: [{ name: "Linux" }, { name: "Ubuntu" }, { name: "Docker" }, { name: "CI/CD" }],
  },
  {
    title: "Other",
    icon: CircuitBoard,
    blurb: "Hardware tinkering and how networks fit together.",
    items: [{ name: "Arduino" }, { name: "Networking fundamentals" }],
  },
];
