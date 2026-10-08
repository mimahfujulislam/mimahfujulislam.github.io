/**
 * Single source of truth for personal details.
 * Every section of the site reads from the files in /src/content —
 * edit these instead of the components.
 */

export const profile = {
  name: "Mahfujul Islam",
  firstName: "Mahfujul",
  initials: "MI",
  roles: ["CSE Undergraduate", "AI/ML & Data Science Enthusiast", "Researcher", "Developer"],
  tagline: "CSE Undergraduate | AI/ML | Research | Development",
  headline: {
    lead: "Computer Science Undergraduate building with",
    highlight: "AI, Machine Learning & Data.",
  },
  intro:
    "I’m a CSE undergraduate at AIUB with a strong interest in Artificial Intelligence, Machine Learning, Data Science, and research-driven software development. I enjoy turning real-world problems into practical, data-driven solutions.",
  email: "mi.mahfujulislam@gmail.com",
  /** Put your resume at public/resume.pdf — every “Resume” button links here. */
  resumePath: "/resume.pdf",
  resumeFileName: "Mahfujul-Islam-Resume.pdf",
  university: {
    name: "American International University-Bangladesh",
    short: "AIUB",
    url: "https://www.aiub.edu",
  },
} as const;

export const socials = {
  github: {
    label: "GitHub",
    handle: "mimahfujulislam",
    display: "github.com/mimahfujulislam",
    url: "https://github.com/mimahfujulislam",
  },
  linkedin: {
    label: "LinkedIn",
    handle: "mimahfujulislam",
    display: "linkedin.com/in/mimahfujulislam",
    url: "https://linkedin.com/in/mimahfujulislam",
  },
  facebook: {
    label: "Facebook",
    handle: "mimahfujulislam",
    display: "facebook.com/mimahfujulislam",
    url: "https://facebook.com/mimahfujulislam",
  },
} as const;

export const site = {
  /** Used for canonical URLs, Open Graph and the sitemap. Override with NEXT_PUBLIC_SITE_URL. */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://mimahfujulislam.github.io").replace(/\/$/, ""),
  title: "Mahfujul Islam",
  description:
    "Mahfujul Islam is a Computer Science and Engineering undergraduate at AIUB interested in Artificial Intelligence, Machine Learning, Data Science, research, and software development.",
  keywords: [
    "Mahfujul Islam",
    "CSE undergraduate",
    "AIUB",
    "Machine Learning",
    "Artificial Intelligence",
    "Data Science",
    "Explainable AI",
    "Research",
    "Portfolio",
  ],
  /**
   * Optional form endpoint (e.g. Formspree: https://formspree.io/f/xxxx).
   * When empty, the contact form opens the visitor's email app instead.
   */
  contactEndpoint: process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "",
} as const;

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "research", label: "Research" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;

export type NavId = (typeof navItems)[number]["id"];
