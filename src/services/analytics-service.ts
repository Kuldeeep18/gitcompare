import { UserProfile } from '@/types/comparison';
import { DeveloperScore, AchievementBadge, LeaderboardEntry } from '@/types/analytics';
import { calculateDeveloperScore, calculateBadges } from '@/utils/calculations';

export function getAnalytics(profile: UserProfile) {
  const score = calculateDeveloperScore(profile);
  const badges = calculateBadges(profile);
  
  return {
    score,
    badges,
    insights: generateAnalyticsInsights(profile, score, badges),
  };
}

function generateAnalyticsInsights(
  profile: UserProfile,
  score: DeveloperScore,
  badges: AchievementBadge[]
) {
  const insights: { title: string; value: string; description: string; trend: 'up' | 'down' | 'neutral' }[] = [];
  
  insights.push({
    title: 'Developer Score',
    value: `${score.overall}/100`,
    description: score.overall >= 70 ? 'Outstanding developer profile!' : score.overall >= 40 ? 'Growing developer profile' : 'Emerging developer profile',
    trend: score.overall >= 50 ? 'up' : 'neutral',
  });
  
  const earnedBadges = badges.filter(b => b.earned);
  insights.push({
    title: 'Achievements',
    value: `${earnedBadges.length}/${badges.length}`,
    description: `Earned ${earnedBadges.length} out of ${badges.length} achievement badges`,
    trend: earnedBadges.length > 3 ? 'up' : 'neutral',
  });
  
  insights.push({
    title: 'Top Language',
    value: profile.languages[0]?.name || 'N/A',
    description: profile.languages[0] ? `${profile.languages[0].percentage}% of repositories` : 'No language data',
    trend: 'neutral',
  });
  
  const repoQuality = profile.stats.totalStars / Math.max(1, profile.user.public_repos);
  insights.push({
    title: 'Repo Quality',
    value: repoQuality.toFixed(1),
    description: `Average ${repoQuality.toFixed(1)} stars per repository`,
    trend: repoQuality >= 5 ? 'up' : repoQuality >= 1 ? 'neutral' : 'down',
  });
  
  return insights;
}

export function createLeaderboardEntry(profile: UserProfile): LeaderboardEntry {
  return {
    username: profile.user.login,
    avatarUrl: profile.user.avatar_url,
    score: calculateDeveloperScore(profile).overall,
    stars: profile.stats.totalStars,
    followers: profile.user.followers,
    repos: profile.user.public_repos,
    contributions: profile.stats.totalContributions,
    addedAt: new Date().toISOString(),
  };
}

const LEADERBOARD_KEY = 'gitcompare_leaderboard';

export function getLeaderboard(): LeaderboardEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(LEADERBOARD_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addToLeaderboard(entry: LeaderboardEntry): LeaderboardEntry[] {
  const current = getLeaderboard();
  const existingIndex = current.findIndex(e => e.username === entry.username);
  
  if (existingIndex >= 0) {
    current[existingIndex] = entry;
  } else {
    current.push(entry);
  }
  
  const sorted = current.sort((a, b) => b.score - a.score);
  
  if (typeof window !== 'undefined') {
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(sorted));
  }
  
  return sorted;
}

export function removeFromLeaderboard(username: string): LeaderboardEntry[] {
  const current = getLeaderboard().filter(e => e.username !== username);
  if (typeof window !== 'undefined') {
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(current));
  }
  return current;
}
