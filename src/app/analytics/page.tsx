'use client';

import { useState } from 'react';
import { Search, Sparkles, Award, TrendingUp, BarChart2 } from 'lucide-react';
import { ErrorState } from '@/components/shared/error-state';
import { ComparisonSkeleton } from '@/components/shared/loading-skeleton';
import { getAnalytics } from '@/services/analytics-service';
import { UserProfile } from '@/types/comparison';

export default function AnalyticsPage() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const handleFetchAnalytics = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setProfile(null);

    const query = username.trim();
    if (!query) {
      setError('Please specify a GitHub username');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/github/user?username=${encodeURIComponent(query)}`);
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Failed to fetch user @${query}`);
      }

      const userProfile: UserProfile = await res.json();
      setProfile(userProfile);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during calculation');
    } finally {
      setLoading(false);
    }
  };

  const analytics = profile ? getAnalytics(profile) : null;

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
          Profile{' '}
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Analytics
          </span>
        </h1>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Generate comprehensive scorecards, quality indicators, and achievements for any developer.
        </p>
      </div>

      <div className="max-w-md mx-auto mb-12">
        <form onSubmit={handleFetchAnalytics} className="flex gap-2">
          <div className="relative flex items-center bg-card/50 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 flex-1">
            <Search className="h-5 w-5 text-muted-foreground mr-3" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username (e.g. torvalds)"
              className="bg-transparent border-none outline-none w-full text-foreground placeholder-muted-foreground text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 font-semibold text-white transition-all hover:shadow-lg hover:shadow-indigo-500/20 active:translate-y-0"
          >
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </form>
        {error && <p className="text-sm text-red-400 text-center mt-2">{error}</p>}
      </div>

      {loading && <ComparisonSkeleton />}

      {profile && analytics && (
        <div className="space-y-8 animate-fade-in">
          {/* Main developer stats overview grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {analytics.insights.map((insight, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-card/30 backdrop-blur-md p-6 relative group overflow-hidden"
              >
                <div className="absolute top-0 right-0 h-16 w-16 bg-indigo-500/5 rounded-bl-full group-hover:bg-indigo-500/10 transition-colors" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  {insight.title}
                </h4>
                <p className="text-2xl font-extrabold text-foreground mb-1">{insight.value}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{insight.description}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Scorecard breakdown */}
            <div className="md:col-span-2 rounded-2xl border border-white/10 bg-card/30 backdrop-blur-md p-6">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <BarChart2 className="h-5 w-5 text-indigo-400" /> Score Breakdown
              </h3>
              <div className="space-y-4">
                {Object.entries(analytics.score.breakdown).map(([key, val]) => (
                  <div key={key} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold uppercase tracking-wider text-muted-foreground">
                        {key}
                      </span>
                      <span className="font-bold text-foreground">{val}/100</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-500"
                        style={{ width: `${val}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Badges overview */}
            <div className="rounded-2xl border border-white/10 bg-card/30 backdrop-blur-md p-6">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Award className="h-5 w-5 text-purple-400" /> Earned Badges
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {analytics.badges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 border text-xs font-semibold select-none transition-all ${
                      badge.earned
                        ? 'border-indigo-500/25 bg-indigo-500/10 text-indigo-300'
                        : 'border-white/5 bg-white/5 text-muted-foreground opacity-50'
                    }`}
                    title={badge.description}
                  >
                    <span>{badge.icon}</span>
                    <span>{badge.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
