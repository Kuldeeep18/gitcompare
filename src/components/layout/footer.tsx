import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="18" r="3" />
                  <circle cx="6" cy="6" r="3" />
                  <path d="M13 6h3a2 2 0 0 1 2 2v7" />
                  <path d="M11 18H8a2 2 0 0 1-2-2V9" />
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                GitCompare
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Open Source Developer Analytics & GitHub Comparison Platform. Compare developers,
              analyze contributions, and gain insights into open-source activity.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Features</h4>
            <ul className="space-y-2">
              <li><Link href="/compare" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Profile Comparison</Link></li>
              <li><Link href="/repositories" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Repository Analysis</Link></li>
              <li><Link href="/analytics" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Developer Analytics</Link></li>
              <li><Link href="/leaderboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Leaderboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Open Source</h4>
            <ul className="space-y-2">
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">GitHub Repository</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contributing Guide</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Code of Conduct</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Report an Issue</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} GitCompare. Built with ❤️ for the open-source community.
          </p>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 px-3 py-1 text-xs font-medium text-emerald-400 ring-1 ring-emerald-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              GSSoC Project
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
