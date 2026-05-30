export interface DeveloperScore {
  overall: number;
  breakdown: {
    code: number;
    community: number;
    consistency: number;
    diversity: number;
    impact: number;
    growth: number;
  };
}

export interface AchievementBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  earned: boolean;
}

export interface RepoHealthScore {
  overall: number;
  documentation: number;
  maintenance: number;
  community: number;
  activity: number;
}

export interface LeaderboardEntry {
  username: string;
  avatarUrl: string;
  score: number;
  stars: number;
  followers: number;
  repos: number;
  contributions: number;
  addedAt: string;
}
