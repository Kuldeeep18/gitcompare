export function ProfileCardSkeleton() {
  return (
    <div className="rounded-2xl border border-white/10 bg-card/50 backdrop-blur-sm p-6 animate-pulse">
      <div className="flex items-center gap-4 mb-6">
        <div className="h-20 w-20 rounded-full bg-muted" />
        <div className="space-y-2">
          <div className="h-5 w-32 rounded bg-muted" />
          <div className="h-4 w-24 rounded bg-muted" />
          <div className="h-3 w-48 rounded bg-muted" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="text-center space-y-2">
            <div className="h-6 w-12 rounded bg-muted mx-auto" />
            <div className="h-3 w-16 rounded bg-muted mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ComparisonSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProfileCardSkeleton />
        <ProfileCardSkeleton />
      </div>
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="rounded-xl border border-white/10 bg-card/50 p-4 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="h-4 w-24 rounded bg-muted" />
              <div className="flex-1 mx-8 h-3 rounded-full bg-muted" />
              <div className="h-4 w-24 rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-white/10 bg-card/50 p-6 h-64 animate-pulse" />
        <div className="rounded-2xl border border-white/10 bg-card/50 p-6 h-64 animate-pulse" />
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="rounded-2xl border border-white/10 bg-card/50 backdrop-blur-sm p-6 animate-pulse">
      <div className="h-5 w-40 rounded bg-muted mb-6" />
      <div className="h-64 rounded-xl bg-muted" />
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="rounded-2xl border border-white/10 bg-card/50 backdrop-blur-sm p-6 animate-pulse">
      <div className="h-5 w-32 rounded bg-muted mb-6" />
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="h-4 w-8 rounded bg-muted" />
            <div className="h-8 w-8 rounded-full bg-muted" />
            <div className="h-4 flex-1 rounded bg-muted" />
            <div className="h-4 w-16 rounded bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}
