import { ComparisonResult, MetricComparison } from '@/types/comparison';
import { formatNumber } from '@/utils/format';

interface StatsComparisonProps {
  result: ComparisonResult;
}

export function StatsComparison({ result }: StatsComparisonProps) {
  const { userA, userB } = result;

  const metrics: MetricComparison[] = [
    { label: 'Followers', valueA: userA.user.followers, valueB: userB.user.followers },
    { label: 'Public Repositories', valueA: userA.user.public_repos, valueB: userB.user.public_repos },
    { label: 'Total Stars', valueA: userA.stats.totalStars, valueB: userB.stats.totalStars },
    { label: 'Total Forks', valueA: userA.stats.totalForks, valueB: userB.stats.totalForks },
    { label: 'Contributions', valueA: userA.stats.totalContributions, valueB: userB.stats.totalContributions },
    { label: 'Max Streak', valueA: userA.stats.contributionStreak, valueB: userB.stats.contributionStreak, format: 'days' },
    { label: 'Pull Requests', valueA: userA.stats.totalPRs, valueB: userB.stats.totalPRs },
    { label: 'Issues Created', valueA: userA.stats.totalIssues, valueB: userB.stats.totalIssues },
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-card/30 backdrop-blur-md p-6">
      <h3 className="text-xl font-bold mb-6">Head-to-Head Comparison</h3>
      <div className="space-y-6">
        {metrics.map((metric, i) => {
          const total = metric.valueA + metric.valueB;
          const pctA = total > 0 ? (metric.valueA / total) * 100 : 50;
          const pctB = total > 0 ? (metric.valueB / total) * 100 : 50;

          const isWinA = metric.valueA > metric.valueB;
          const isWinB = metric.valueB > metric.valueA;

          const formatVal = (val: number) => {
            if (metric.format === 'days') return `${val} days`;
            return formatNumber(val);
          };

          return (
            <div key={i} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className={`font-semibold ${isWinA ? 'text-indigo-400 font-bold' : 'text-muted-foreground'}`}>
                  {formatVal(metric.valueA)}
                </span>
                <span className="font-medium text-center text-xs uppercase tracking-wider text-muted-foreground">
                  {metric.label}
                </span>
                <span className={`font-semibold ${isWinB ? 'text-purple-400 font-bold' : 'text-muted-foreground'}`}>
                  {formatVal(metric.valueB)}
                </span>
              </div>
              
              <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-white/5 flex">
                <div
                  className={`h-full transition-all duration-500 bg-gradient-to-r from-indigo-600 to-indigo-500`}
                  style={{ width: `${pctA}%` }}
                />
                <div
                  className={`h-full transition-all duration-500 bg-gradient-to-r from-purple-500 to-purple-600`}
                  style={{ width: `${pctB}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
