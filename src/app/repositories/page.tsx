'use client';

import { useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Search, GitCompare, GitFork, Star, Eye, AlertCircle, FileCode } from 'lucide-react';
import { ErrorState } from '@/components/shared/error-state';
import { ChartSkeleton } from '@/components/shared/loading-skeleton';
import { formatNumber } from '@/utils/format';

interface RepoDetails {
  name: string;
  full_name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  open_issues_count: number;
  size: number;
  language: string | null;
  contributorCount: number;
  languageBreakdown: Record<string, number>;
}

export default function RepositoriesComparePage() {
  const [repoAQuery, setRepoAQuery] = useState('');
  const [repoBQuery, setRepoBQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ repoA: RepoDetails; repoB: RepoDetails } | null>(null);

  const handleCompare = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const rA = repoAQuery.trim();
    const rB = repoBQuery.trim();

    if (!rA || !rB || !rA.includes('/') || !rB.includes('/')) {
      setError('Please provide both repository links in owner/name format (e.g. facebook/react)');
      return;
    }

    if (rA.toLowerCase() === rB.toLowerCase()) {
      setError('Please specify two different repositories to compare');
      return;
    }

    setLoading(true);

    try {
      const [resA, resB] = await Promise.all([
        fetch(`/api/github/repos?repo=${encodeURIComponent(rA)}`),
        fetch(`/api/github/repos?repo=${encodeURIComponent(rB)}`),
      ]);

      if (!resA.ok) {
        const data = await resA.json().catch(() => ({}));
        throw new Error(data.error || `Failed to fetch repository ${rA}`);
      }
      if (!resB.ok) {
        const data = await resB.json().catch(() => ({}));
        throw new Error(data.error || `Failed to fetch repository ${rB}`);
      }

      const repoA: RepoDetails = await resA.json();
      const repoB: RepoDetails = await resB.json();

      setResult({ repoA, repoB });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during repo comparison');
    } finally {
      setLoading(false);
    }
  };

  const chartData = result
    ? [
        { name: 'Stars', A: result.repoA.stargazers_count, B: result.repoB.stargazers_count },
        { name: 'Forks', A: result.repoA.forks_count, B: result.repoB.forks_count },
        { name: 'Watchers', A: result.repoA.watchers_count, B: result.repoB.watchers_count },
        { name: 'Issues', A: result.repoA.open_issues_count, B: result.repoB.open_issues_count },
      ]
    : [];

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
          Compare{' '}
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Repositories
          </span>
        </h1>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Compare stars, forks, watchers, open issues and contributor levels side by side.
        </p>
      </div>

      {/* Input form */}
      <div className="max-w-2xl mx-auto mb-12">
        <form onSubmit={handleCompare} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative flex items-center bg-card/50 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3">
              <Search className="h-5 w-5 text-muted-foreground mr-3" />
              <input
                type="text"
                value={repoAQuery}
                onChange={(e) => setRepoAQuery(e.target.value)}
                placeholder="Repository A (owner/repo)"
                className="bg-transparent border-none outline-none w-full text-foreground placeholder-muted-foreground text-sm"
              />
            </div>
            <div className="relative flex items-center bg-card/50 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3">
              <Search className="h-5 w-5 text-muted-foreground mr-3" />
              <input
                type="text"
                value={repoBQuery}
                onChange={(e) => setRepoBQuery(e.target.value)}
                placeholder="Repository B (owner/repo)"
                className="bg-transparent border-none outline-none w-full text-foreground placeholder-muted-foreground text-sm"
              />
            </div>
          </div>
          {error && <p className="text-sm text-red-400 text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-3.5 font-semibold text-white transition-all hover:shadow-lg hover:shadow-indigo-500/20 hover:-translate-y-0.5"
          >
            <GitCompare className="h-5 w-5" />
            {loading ? 'Analyzing...' : 'Compare Repositories'}
          </button>
        </form>
      </div>

      {loading && <ChartSkeleton />}

      {result && (
        <div className="space-y-8 animate-fade-in">
          {/* Side-by-side summaries */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-white/10 bg-card/30 backdrop-blur-md p-6">
              <h2 className="text-xl font-bold">{result.repoA.name}</h2>
              <p className="text-xs text-indigo-400 font-semibold mb-3">{result.repoA.full_name}</p>
              {result.repoA.description && (
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
                  {result.repoA.description}
                </p>
              )}
              <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span>{formatNumber(result.repoA.stargazers_count)} stars</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <GitFork className="h-4 w-4 text-sky-400" />
                  <span>{formatNumber(result.repoA.forks_count)} forks</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Eye className="h-4 w-4 text-purple-400" />
                  <span>{formatNumber(result.repoA.watchers_count)} watchers</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <span>{result.repoA.open_issues_count} open issues</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground col-span-2">
                  <FileCode className="h-4 w-4 text-indigo-400" />
                  <span>Primary Language: {result.repoA.language || 'None'}</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-card/30 backdrop-blur-md p-6">
              <h2 className="text-xl font-bold">{result.repoB.name}</h2>
              <p className="text-xs text-purple-400 font-semibold mb-3">{result.repoB.full_name}</p>
              {result.repoB.description && (
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
                  {result.repoB.description}
                </p>
              )}
              <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span>{formatNumber(result.repoB.stargazers_count)} stars</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <GitFork className="h-4 w-4 text-sky-400" />
                  <span>{formatNumber(result.repoB.forks_count)} forks</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Eye className="h-4 w-4 text-purple-400" />
                  <span>{formatNumber(result.repoB.watchers_count)} watchers</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <span>{result.repoB.open_issues_count} open issues</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground col-span-2">
                  <FileCode className="h-4 w-4 text-purple-400" />
                  <span>Primary Language: {result.repoB.language || 'None'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recharts chart */}
          <div className="rounded-2xl border border-white/10 bg-card/30 backdrop-blur-md p-6">
            <h3 className="text-lg font-bold mb-6">Metrics Comparison Chart</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" tick={{ fill: 'var(--muted-foreground)' }} />
                  <YAxis tick={{ fill: 'var(--muted-foreground)' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--background)',
                      borderColor: 'rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="A" name={result.repoA.name} fill="#6366f1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="B" name={result.repoB.name} fill="#a855f7" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
