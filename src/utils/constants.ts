export const APP_NAME = 'GitCompare';
export const APP_DESCRIPTION = 'Open Source Developer Analytics & GitHub Comparison Platform';
export const APP_URL = 'https://gitcompare.dev';

export const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  Go: '#00ADD8',
  Rust: '#dea584',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  Scala: '#c22d40',
  R: '#198CE7',
  Shell: '#89e051',
  Lua: '#000080',
  Haskell: '#5e5086',
  Elixir: '#6e4a7e',
  Clojure: '#db5855',
  Vim: '#199f4b',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  Vue: '#41b883',
  Svelte: '#ff3e00',
  Jupyter: '#DA5B0B',
  Dockerfile: '#384d54',
  Makefile: '#427819',
  default: '#8b8b8b',
};

export const CHART_COLORS = [
  '#6366f1', '#8b5cf6', '#a855f7', '#d946ef',
  '#ec4899', '#f43f5e', '#ef4444', '#f97316',
  '#eab308', '#84cc16', '#22c55e', '#14b8a6',
  '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1',
];

export const SCORE_WEIGHTS = {
  stars: 0.25,
  followers: 0.15,
  contributions: 0.25,
  repos: 0.1,
  diversity: 0.1,
  consistency: 0.15,
};

export const BADGE_DEFINITIONS = [
  { id: 'star-collector', name: 'Star Collector', description: 'Earned 100+ total stars', threshold: 100, metric: 'totalStars' as const, icon: '⭐' },
  { id: 'star-magnet', name: 'Star Magnet', description: 'Earned 1000+ total stars', threshold: 1000, metric: 'totalStars' as const, icon: '🌟' },
  { id: 'polyglot', name: 'Polyglot', description: 'Uses 5+ programming languages', threshold: 5, metric: 'languages' as const, icon: '🌐' },
  { id: 'prolific', name: 'Prolific Committer', description: '500+ contributions this year', threshold: 500, metric: 'contributions' as const, icon: '🔥' },
  { id: 'community-leader', name: 'Community Leader', description: '100+ followers', threshold: 100, metric: 'followers' as const, icon: '👥' },
  { id: 'open-sourcerer', name: 'Open Sourcerer', description: '50+ public repositories', threshold: 50, metric: 'repos' as const, icon: '🧙' },
  { id: 'fork-master', name: 'Fork Master', description: '100+ total forks', threshold: 100, metric: 'totalForks' as const, icon: '🍴' },
  { id: 'streak-keeper', name: 'Streak Keeper', description: '30+ day contribution streak', threshold: 30, metric: 'streak' as const, icon: '📈' },
  { id: 'issue-hunter', name: 'Issue Hunter', description: '50+ issues created', threshold: 50, metric: 'issues' as const, icon: '🎯' },
  { id: 'pr-machine', name: 'PR Machine', description: '50+ pull requests', threshold: 50, metric: 'prs' as const, icon: '🔄' },
] as const;
