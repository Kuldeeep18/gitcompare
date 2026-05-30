'use client';

import { useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useComparison } from '@/hooks/use-comparison';
import { useLeaderboard } from '@/hooks/use-leaderboard';
import { createLeaderboardEntry } from '@/services/analytics-service';
import { ProfileCard } from '@/components/comparison/profile-card';
import { StatsComparison } from '@/components/comparison/stats-comparison';
import { LanguageChart } from '@/components/comparison/language-chart';
import { ContributionHeatmap } from '@/components/comparison/contribution-heatmap';
import { RadarChart } from '@/components/comparison/radar-chart';
import { ComparisonHeader } from '@/components/comparison/comparison-header';
import { ComparisonSkeleton } from '@/components/shared/loading-skeleton';
import { ErrorState } from '@/components/shared/error-state';
import { Download, Share2, Plus, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function CompareContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const user1 = searchParams.get('user1');
  const user2 = searchParams.get('user2');

  const { result, loading, error, compare } = useComparison();
  const { add } = useLeaderboard();
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user1 && user2) {
      compare(user1, user2);
    }
  }, [user1, user2, compare]);

  const handleAddToLeaderboard = () => {
    if (!result) return;
    const entryA = createLeaderboardEntry(result.userA);
    const entryB = createLeaderboardEntry(result.userB);
    add(entryA);
    add(entryB);
    alert('Both profiles added to local Leaderboard!');
  };

  const handleExportPDF = async () => {
    if (!reportRef.current) return;
    try {
      const canvas = await html2canvas(reportRef.current, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`gitcompare-${user1}-vs-${user2}.pdf`);
    } catch (err) {
      console.error('Failed to export PDF:', err);
      alert('Error generating PDF report.');
    }
  };

  const handleShare = () => {
    if (typeof window === 'undefined') return;
    navigator.clipboard.writeText(window.location.href);
    alert('Comparison link copied to clipboard!');
  };

  if (!user1 || !user2) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ErrorState
          title="Invalid Usernames"
          message="Please make sure to enter two usernames from the Home page."
          onRetry={() => router.push('/')}
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center gap-2 mb-8">
          <Link href="/" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Home
          </Link>
        </div>
        <ComparisonSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center gap-2 mb-8">
          <Link href="/" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Home
          </Link>
        </div>
        <ErrorState
          title="Data Loading Failed"
          message={error}
          onRetry={() => compare(user1, user2)}
        />
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Top Bar Navigation & Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={handleAddToLeaderboard}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-card/60 px-4 py-2 text-sm font-semibold hover:bg-card transition-colors"
          >
            <Plus className="h-4 w-4" /> Save to Leaderboard
          </button>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-card/60 px-4 py-2 text-sm font-semibold hover:bg-card transition-colors"
          >
            <Share2 className="h-4 w-4" /> Share URL
          </button>
          <button
            onClick={handleExportPDF}
            className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5"
          >
            <Download className="h-4 w-4" /> Download PDF
          </button>
        </div>
      </div>

      {/* Renders A4 report content target */}
      <div ref={reportRef} className="space-y-8 bg-background p-2 rounded-2xl">
        <ComparisonHeader userA={result.userA} userB={result.userB} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProfileCard profile={result.userA} position="left" />
          <ProfileCard profile={result.userB} position="right" />
        </div>

        {/* Dynamic insights alert block */}
        {result.insights.length > 0 && (
          <div className="rounded-2xl border border-indigo-500/10 bg-indigo-500/5 p-6 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-indigo-400">Platform Insights</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.insights.map((insight, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <span className="text-xl shrink-0">{insight.icon}</span>
                  <div>
                    <h5 className="font-semibold text-foreground">{insight.title}</h5>
                    <p className="text-muted-foreground text-xs leading-relaxed mt-0.5">{insight.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <StatsComparison result={result} />

        <RadarChart userA={result.userA} userB={result.userB} />

        <LanguageChart userA={result.userA} userB={result.userB} />

        <ContributionHeatmap userA={result.userA} userB={result.userB} />
      </div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-16">
        <ComparisonSkeleton />
      </div>
    }>
      <CompareContent />
    </Suspense>
  );
}
