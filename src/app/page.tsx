import { SearchBar } from '@/components/landing/search-bar';
import { FeatureShowcase } from '@/components/landing/feature-showcase';
import { AnimatedCounter } from '@/components/shared/animated-counter';
import Link from 'next/link';

export const metadata = {
  title: 'GitCompare — GitHub Developer Comparison Platform',
  description: 'Compare developers side by side. Analyze stars, language distribution, streaks and achievements.',
};

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[120px] dark:bg-indigo-500/5 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[120px] dark:bg-purple-500/5 animate-pulse" />

      <main className="container mx-auto px-4 py-20 flex-1 flex flex-col items-center justify-center text-center">
        {/* Banner badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 px-3 py-1 text-xs font-medium text-indigo-400 mb-8 animate-fade-in">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
          Analytics Engine v1.0
        </div>

        {/* Hero title */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl leading-tight">
          Compare GitHub Developers{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Side-by-Side
          </span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl leading-relaxed">
          Gain deep insights into language distributions, commit patterns, open source contributions,
          and overall profile ranking.
        </p>

        {/* Search Bar Section */}
        <div className="mb-24 w-full">
          <SearchBar />
        </div>

        {/* Dynamic Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 w-full max-w-4xl border-t border-b border-white/5 py-8">
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              <AnimatedCounter value={1250} />+
            </p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Comparisons</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              <AnimatedCounter value={43000} />+
            </p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Repos Scanned</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              <AnimatedCounter value={100} />%
            </p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Open Source</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              <AnimatedCounter value={50} />+
            </p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Issue Ideas</p>
          </div>
        </div>

        {/* Feature showcase */}
        <div className="w-full text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Platform Capabilities</h2>
          <FeatureShowcase />
        </div>
      </main>
    </div>
  );
}
