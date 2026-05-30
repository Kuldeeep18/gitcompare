'use client';

import { useLeaderboard } from '@/hooks/use-leaderboard';
import { Search, Trophy, Trash2, ArrowUpDown } from 'lucide-react';
import Image from 'next/image';
import { formatNumber } from '@/utils/format';

export default function LeaderboardPage() {
  const {
    entries,
    remove,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    total,
  } = useLeaderboard();

  const handleSortToggle = (field: 'score' | 'stars' | 'followers' | 'repos' | 'contributions') => {
    setSortBy(field);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 flex items-center justify-center gap-3">
          <Trophy className="h-8 w-8 text-yellow-400 animate-bounce" />
          <span>Local Leaderboard</span>
        </h1>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Global rankings of analyzed developer profiles. Compare developer metrics side-by-side.
        </p>
      </div>

      {/* Filter and search actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
        <div className="relative flex items-center bg-card/50 border border-white/10 rounded-xl px-4 py-2 w-full sm:max-w-xs">
          <Search className="h-4 w-4 text-muted-foreground mr-2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search profiles..."
            className="bg-transparent border-none outline-none w-full text-foreground placeholder-muted-foreground text-sm"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider mr-2">Sort by:</span>
          {(['score', 'stars', 'followers', 'contributions'] as const).map((field) => (
            <button
              key={field}
              onClick={() => handleSortToggle(field)}
              className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                sortBy === field
                  ? 'border-indigo-500/30 bg-indigo-500/15 text-indigo-400'
                  : 'border-white/5 bg-white/5 text-muted-foreground hover:bg-white/10'
              }`}
            >
              <span className="capitalize">{field}</span>
              <ArrowUpDown className="h-3 w-3" />
            </button>
          ))}
        </div>
      </div>

      {entries.length === 0 ? (
        <div className="rounded-2xl border border-white/5 bg-card/20 py-20 text-center text-muted-foreground">
          <Trophy className="h-12 w-12 mx-auto mb-4 opacity-25" />
          <p className="font-semibold mb-1">Leaderboard is empty</p>
          <p className="text-sm">Run a profile comparison or user analysis to populate entries.</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-card/30 backdrop-blur-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <th className="py-4 px-6 w-16 text-center">Rank</th>
                  <th className="py-4 px-6">Developer</th>
                  <th className="py-4 px-6 text-center">Dev Score</th>
                  <th className="py-4 px-6 text-center">Stars</th>
                  <th className="py-4 px-6 text-center">Followers</th>
                  <th className="py-4 px-6 text-center">Activity</th>
                  <th className="py-4 px-6 w-16 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {entries.map((entry, idx) => (
                  <tr key={entry.username} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 text-center font-bold text-muted-foreground">{idx + 1}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative h-9 w-9 rounded-full overflow-hidden border border-white/10">
                          <Image src={entry.avatarUrl} alt={entry.username} fill className="object-cover" />
                        </div>
                        <span className="font-bold text-foreground hover:text-indigo-400 transition-colors">
                          @{entry.username}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center font-extrabold text-indigo-400">{entry.score}</td>
                    <td className="py-4 px-6 text-center text-sm font-semibold">{formatNumber(entry.stars)}</td>
                    <td className="py-4 px-6 text-center text-sm font-semibold">{formatNumber(entry.followers)}</td>
                    <td className="py-4 px-6 text-center text-sm font-semibold">{formatNumber(entry.contributions)}</td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => remove(entry.username)}
                        className="p-1.5 rounded-lg text-red-400/70 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                        title="Remove from leaderboard"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
