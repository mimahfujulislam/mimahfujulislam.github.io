export const education = {
  degree: "BSc in Computer Science and Engineering",
  institution: "American International University-Bangladesh (AIUB)",
  institutionUrl: "https://www.aiub.edu",
  location: "Dhaka, Bangladesh",
  status: "In progress",
  /** Edit when your graduation date is confirmed. */
  expectedGraduation: "2026/27",
  /** Add only if you want it shown, e.g. "3.75 / 4.00". Hidden while empty. */
  gpa: undefined as string | undefined,
  focus:
    "Completing my undergraduate degree while building depth in machine learning, data science, and research methods.",
  next: "Planning toward graduate study in artificial intelligence, machine learning, or data science research.",
  areas: [
    "Artificial Intelligence",
    "Machine Learning",
    "Data Science",
    "Computer Vision",
    "Natural Language Processing",
    "Cybersecurity",
    "Database Systems",
    "Software Engineering",
  ],
};

export type SchoolEntry = {
  degree: string;
  institution: string;
  location: string;
  /** Optional — each one is hidden while empty, e.g. year: "2021", result: "GPA 5.00". */
  year?: string;
  result?: string;
};

/** Earlier education, most recent first. */
export const schooling: SchoolEntry[] = [
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Murari Chand College",
    location: "Sylhet, Bangladesh",
    year: "2021",
    result: "GPA 5.00",
  },
  {
    degree: "Secondary School Certificate (SSC)",
    institution: "Habiganj Govt. High School",
    location: "Habiganj, Bangladesh",
    year: "2019",
    result: "GPA 5.00",
  },
];
