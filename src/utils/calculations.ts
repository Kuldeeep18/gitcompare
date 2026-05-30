import { UserProfile, UserStats } from '@/types/comparison';
import { DeveloperScore, AchievementBadge } from '@/types/analytics';
import { GitHubRepo, LanguageBreakdown, ContributionsCollection } from '@/types/github';
import { BADGE_DEFINITIONS, LANGUAGE_COLORS } from './constants';

export function calculateUserStats(repos: GitHubRepo[], contributions: ContributionsCollection | null, streak: number): UserStats {
  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
  const totalForks = repos.reduce((sum, r) => sum + r.forks_count, 0);
  const totalWatchers = repos.reduce((sum, r) => sum + r.watchers_count, 0);
  
  const sortedByStars = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count);
  const sortedByForks = [...repos].sort((a, b) => b.forks_count - a.forks_count);
  
  return {
    totalStars,
    totalForks,
    totalWatchers,
    avgStarsPerRepo: repos.length > 0 ? Math.round(totalStars / repos.length * 10) / 10 : 0,
    mostStarredRepo: sortedByStars[0] ? { name: sortedByStars[0].name, stars: sortedByStars[0].stargazers_count } : null,
    mostForkedRepo: sortedByForks[0] ? { name: sortedByForks[0].name, forks: sortedByForks[0].forks_count } : null,
    accountAgeDays: 0, // Will be set by caller
    totalContributions: contributions?.contributionCalendar.totalContributions ?? 0,
    contributionStreak: streak,
    totalPRs: contributions?.totalPullRequestContributions ?? 0,
    totalIssues: contributions?.totalIssueContributions ?? 0,
    reposContributedTo: contributions?.totalRepositoryContributions ?? 0,
  };
}

export function calculateLanguageBreakdown(repos: GitHubRepo[]): LanguageBreakdown[] {
  const langMap = new Map<string, number>();
  
  for (const repo of repos) {
    if (repo.language) {
      langMap.set(repo.language, (langMap.get(repo.language) || 0) + 1);
    }
  }
  
  const total = Array.from(langMap.values()).reduce((sum, count) => sum + count, 0);
  
  return Array.from(langMap.entries())
    .map(([name, count]) => ({
      name,
      bytes: count,
      percentage: Math.round((count / total) * 1000) / 10,
      color: LANGUAGE_COLORS[name] || LANGUAGE_COLORS.default,
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 10);
}

export function calculateDeveloperScore(profile: UserProfile): DeveloperScore {
  const { stats, languages } = profile;
  
  const code = Math.min(100, (stats.totalContributions / 1000) * 50 + (stats.totalPRs / 50) * 50);
  const community = Math.min(100, (profile.user.followers / 100) * 40 + (stats.totalStars / 500) * 60);
  const consistency = Math.min(100, (stats.contributionStreak / 30) * 50 + (stats.totalContributions / 500) * 50);
  const diversity = Math.min(100, (languages.length / 5) * 100);
  const impact = Math.min(100, (stats.totalStars / 100) * 40 + (stats.totalForks / 50) * 30 + (stats.totalContributions / 200) * 30);
  const growth = Math.min(100, (profile.user.public_repos / 20) * 40 + (stats.reposContributedTo / 10) * 60);
  
  const overall = Math.round(
    code * 0.25 + community * 0.15 + consistency * 0.25 + diversity * 0.1 + impact * 0.15 + growth * 0.1
  );
  
  return {
    overall: Math.min(100, overall),
    breakdown: {
      code: Math.round(code),
      community: Math.round(community),
      consistency: Math.round(consistency),
      diversity: Math.round(diversity),
      impact: Math.round(impact),
      growth: Math.round(growth),
    },
  };
}

export function calculateBadges(profile: UserProfile): AchievementBadge[] {
  const { stats, languages } = profile;
  
  const metricValues: Record<string, number> = {
    totalStars: stats.totalStars,
    totalForks: stats.totalForks,
    contributions: stats.totalContributions,
    followers: profile.user.followers,
    repos: profile.user.public_repos,
    languages: languages.length,
    streak: stats.contributionStreak,
    issues: stats.totalIssues,
    prs: stats.totalPRs,
  };
  
  return BADGE_DEFINITIONS.map(badge => {
    const value = metricValues[badge.metric] ?? 0;
    const earned = value >= badge.threshold;
    
    let tier: AchievementBadge['tier'] = 'bronze';
    if (value >= badge.threshold * 10) tier = 'platinum';
    else if (value >= badge.threshold * 5) tier = 'gold';
    else if (value >= badge.threshold * 2) tier = 'silver';
    
    return {
      id: badge.id,
      name: badge.name,
      description: badge.description,
      icon: badge.icon,
      tier: earned ? tier : 'bronze',
      earned,
    };
  });
}
