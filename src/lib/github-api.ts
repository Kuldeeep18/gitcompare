import { GitHubUser, GitHubRepo, RepoLanguages } from '@/types/github';

const GITHUB_API_BASE = 'https://api.github.com';

function getHeaders(): HeadersInit {
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
}

async function fetchGitHub<T>(endpoint: string, options?: { revalidate?: number }): Promise<T> {
  const url = `${GITHUB_API_BASE}${endpoint}`;
  
  const res = await fetch(url, {
    headers: getHeaders(),
    next: { revalidate: options?.revalidate ?? 300 }, // Cache for 5 minutes
  });
  
  if (!res.ok) {
    if (res.status === 404) {
      throw new Error(`Not found: ${endpoint}`);
    }
    if (res.status === 403) {
      const rateLimitReset = res.headers.get('x-ratelimit-reset');
      throw new Error(`Rate limited. Resets at ${rateLimitReset ? new Date(Number(rateLimitReset) * 1000).toISOString() : 'unknown'}`);
    }
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  }
  
  return res.json();
}

export async function getUser(username: string): Promise<GitHubUser> {
  return fetchGitHub<GitHubUser>(`/users/${encodeURIComponent(username)}`);
}

export async function getUserRepos(username: string): Promise<GitHubRepo[]> {
  const allRepos: GitHubRepo[] = [];
  let page = 1;
  const perPage = 100;
  
  while (true) {
    const repos = await fetchGitHub<GitHubRepo[]>(
      `/users/${encodeURIComponent(username)}/repos?per_page=${perPage}&page=${page}&sort=updated&type=owner`
    );
    allRepos.push(...repos);
    if (repos.length < perPage) break;
    page++;
    if (page > 5) break; // Safety limit: max 500 repos
  }
  
  return allRepos;
}

export async function getRepoDetails(owner: string, repo: string): Promise<GitHubRepo> {
  return fetchGitHub<GitHubRepo>(`/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`);
}

export async function getRepoLanguages(owner: string, repo: string): Promise<RepoLanguages> {
  return fetchGitHub<RepoLanguages>(`/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/languages`);
}

export async function getRepoContributors(owner: string, repo: string): Promise<{ login: string; contributions: number; avatar_url: string }[]> {
  return fetchGitHub(`/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contributors?per_page=30`);
}

export async function getRateLimit(): Promise<{ rate: { limit: number; remaining: number; reset: number } }> {
  return fetchGitHub('/rate_limit');
}
