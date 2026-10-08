/**
 * “Code & Open Source” settings. Repository languages and the contribution
 * calendar are fetched live in the browser; these values are the fallback.
 */
export const githubUser = "mimahfujulislam";

/** Shown if the GitHub API can’t be reached. */
export const fallbackLanguages = ["PHP", "HTML", "Jupyter Notebook", "C++", "R"];

/** GitHub’s linguist colours for the languages that appear in the repos. */
export const languageColors: Record<string, string> = {
  PHP: "#4F5D95",
  HTML: "#e34c26",
  CSS: "#663399",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  "Jupyter Notebook": "#DA5B0B",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  Java: "#b07219",
  R: "#198CE7",
};
