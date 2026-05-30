import { getUser, getUserRepos } from '@/lib/github-api';
import { getUserContributions, calculateContributionStreak } from '@/lib/github-graphql';
import { UserProfile, ComparisonResult, ComparisonInsight, MetricComparison } from '@/types/comparison';
import { calculateUserStats, calculateLanguageBreakdown } from '@/utils/calculations';
import { getDaysBetween } from '@/utils/format';

export async function fetchUserProfile(username: string): Promise<UserProfile> {
  const [user, repos] = await Promise.all([
    getUser(username),
    getUserRepos(username),
  ]);

  let contributions = null;
  let streak = 0;

  try {
    const graphqlData = await getUserContributions(username);
    contributions = graphqlData.contributionsCollection;
    streak = calculateContributionStreak(contributions);
  } catch {
    // GraphQL might fail without token - continue with REST data only
    console.warn(`Could not fetch contribution data for ${username} (requires GITHUB_TOKEN)`);
  }

  const stats = calculateUserStats(repos, contributions, streak);
  stats.accountAgeDays = getDaysBetween(user.created_at, new Date().toISOString());
  const languages = calculateLanguageBreakdown(repos);

  return { user, repos, contributions, languages, stats };
}

export async function compareUsers(usernameA: string, usernameB: string): Promise<ComparisonResult> {
  const [userA, userB] = await Promise.all([
    fetchUserProfile(usernameA),
    fetchUserProfile(usernameB),
  ]);

  const metrics: MetricComparison[] = [
    { label: 'Followers', valueA: userA.user.followers, valueB: userB.user.followers },
    { label: 'Public Repos', valueA: userA.user.public_repos, valueB: userB.user.public_repos },
    { label: 'Total Stars', valueA: userA.stats.totalStars, valueB: userB.stats.totalStars },
    { label: 'Total Forks', valueA: userA.stats.totalForks, valueB: userB.stats.totalForks },
    { label: 'Contributions', valueA: userA.stats.totalContributions, valueB: userB.stats.totalContributions },
    { label: 'Streak', valueA: userA.stats.contributionStreak, valueB: userB.stats.contributionStreak, format: 'days' },
    { label: 'Pull Requests', valueA: userA.stats.totalPRs, valueB: userB.stats.totalPRs },
    { label: 'Issues', valueA: userA.stats.totalIssues, valueB: userB.stats.totalIssues },
  ];

  const winner = metrics.map(m => ({
    category: m.label,
    winner: m.valueA > m.valueB ? usernameA : m.valueB > m.valueA ? usernameB : 'tie',
  }));

  const insights = generateInsights(userA, userB, usernameA, usernameB);

  return { userA, userB, insights, winner };
}

function generateInsights(
  userA: UserProfile,
  userB: UserProfile,
  nameA: string,
  nameB: string
): ComparisonInsight[] {
  const insights: ComparisonInsight[] = [];

  // Stars comparison
  if (userA.stats.totalStars !== userB.stats.totalStars) {
    const starWinner = userA.stats.totalStars > userB.stats.totalStars ? nameA : nameB;
    const starDiff = Math.abs(userA.stats.totalStars - userB.stats.totalStars);
    insights.push({
      title: 'Star Power',
      description: `${starWinner} has ${starDiff} more stars across their repositories`,
      winner: userA.stats.totalStars > userB.stats.totalStars ? 'A' : 'B',
      icon: '⭐',
    });
  }

  // Contribution activity
  if (userA.stats.totalContributions !== userB.stats.totalContributions) {
    const contribWinner = userA.stats.totalContributions > userB.stats.totalContributions ? nameA : nameB;
    insights.push({
      title: 'Most Active Developer',
      description: `${contribWinner} is more active with ${Math.max(userA.stats.totalContributions, userB.stats.totalContributions)} contributions`,
      winner: userA.stats.totalContributions > userB.stats.totalContributions ? 'A' : 'B',
      icon: '🔥',
    });
  }

  // Language diversity
  if (userA.languages.length !== userB.languages.length) {
    const langWinner = userA.languages.length > userB.languages.length ? nameA : nameB;
    insights.push({
      title: 'Language Diversity',
      description: `${langWinner} is more diverse, using ${Math.max(userA.languages.length, userB.languages.length)} languages`,
      winner: userA.languages.length > userB.languages.length ? 'A' : 'B',
      icon: '🌐',
    });
  }

  // Community engagement
  const engagementA = userA.user.followers + userA.stats.totalStars;
  const engagementB = userB.user.followers + userB.stats.totalStars;
  if (engagementA !== engagementB) {
    const engagementWinner = engagementA > engagementB ? nameA : nameB;
    insights.push({
      title: 'Community Engagement',
      description: `${engagementWinner} has stronger community engagement`,
      winner: engagementA > engagementB ? 'A' : 'B',
      icon: '👥',
    });
  }

  // Consistency
  if (userA.stats.contributionStreak !== userB.stats.contributionStreak) {
    const streakWinner = userA.stats.contributionStreak > userB.stats.contributionStreak ? nameA : nameB;
    insights.push({
      title: 'Consistency King',
      description: `${streakWinner} has a ${Math.max(userA.stats.contributionStreak, userB.stats.contributionStreak)}-day streak`,
      winner: userA.stats.contributionStreak > userB.stats.contributionStreak ? 'A' : 'B',
      icon: '📈',
    });
  }

  return insights;
}
