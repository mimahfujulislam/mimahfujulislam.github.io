/** Browser-side GitHub helpers. Every call can fail (rate limits, offline) — callers must fall back. */

/** The fields this site reads from the GitHub repos API. */
export type GitHubRepo = {
  name: string;
  language: string | null;
  fork: boolean;
};

export type ContributionDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
export type Contributions = { total: number; days: ContributionDay[] };

const TTL_MS = 60 * 60 * 1000;

function readCache<T>(key: string): T | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const { at, data } = JSON.parse(raw) as { at: number; data: T };
    return Date.now() - at < TTL_MS ? data : null;
  } catch {
    return null;
  }
}

function writeCache<T>(key: string, data: T) {
  try {
    sessionStorage.setItem(key, JSON.stringify({ at: Date.now(), data }));
  } catch {
    /* storage full or unavailable — caching is optional */
  }
}

async function getJSON<T>(url: string, signal: AbortSignal): Promise<T> {
  const res = await fetch(url, { signal, headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return (await res.json()) as T;
}

export async function fetchRepos(user: string, signal: AbortSignal): Promise<GitHubRepo[]> {
  const key = `gh:repos:${user}`;
  const cached = readCache<GitHubRepo[]>(key);
  if (cached) return cached;
  const repos = await getJSON<GitHubRepo[]>(
    `https://api.github.com/users/${encodeURIComponent(user)}/repos?per_page=100&sort=updated`,
    signal,
  );
  writeCache(key, repos);
  return repos;
}

/** Public contribution calendar via github-contributions-api.jogruber.de (no auth needed). */
export async function fetchContributions(user: string, signal: AbortSignal): Promise<Contributions> {
  const key = `gh:contrib:${user}`;
  const cached = readCache<Contributions>(key);
  if (cached) return cached;
  const data = await getJSON<{ total: Record<string, number>; contributions: ContributionDay[] }>(
    `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(user)}?y=last`,
    signal,
  );
  if (!Array.isArray(data.contributions) || data.contributions.length === 0) throw new Error("No data");
  const result = { total: data.total?.lastYear ?? 0, days: data.contributions };
  writeCache(key, result);
  return result;
}
