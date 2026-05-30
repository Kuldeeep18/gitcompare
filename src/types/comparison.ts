import { GitHubUser, GitHubRepo, ContributionsCollection, LanguageBreakdown } from './github';

export interface UserProfile {
  user: GitHubUser;
  repos: GitHubRepo[];
  contributions: ContributionsCollection | null;
  languages: LanguageBreakdown[];
  stats: UserStats;
}

export interface UserStats {
  totalStars: number;
  totalForks: number;
  totalWatchers: number;
  avgStarsPerRepo: number;
  mostStarredRepo: { name: string; stars: number } | null;
  mostForkedRepo: { name: string; forks: number } | null;
  accountAgeDays: number;
  totalContributions: number;
  contributionStreak: number;
  totalPRs: number;
  totalIssues: number;
  reposContributedTo: number;
}

export interface ComparisonResult {
  userA: UserProfile;
  userB: UserProfile;
  insights: ComparisonInsight[];
  winner: {
    category: string;
    winner: string;
  }[];
}

export interface ComparisonInsight {
  title: string;
  description: string;
  winner: 'A' | 'B' | 'tie';
  icon: string;
}

export type MetricComparison = {
  label: string;
  valueA: number;
  valueB: number;
  format?: 'number' | 'percentage' | 'days';
};
