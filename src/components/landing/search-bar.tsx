'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GitCompare, Search, ArrowRight } from 'lucide-react';

export function SearchBar() {
  const router = useRouter();
  const [userA, setUserA] = useState('');
  const [userB, setUserB] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedA = userA.trim();
    const trimmedB = userB.trim();

    if (!trimmedA || !trimmedB) {
      setError('Please fill in both GitHub usernames');
      return;
    }

    if (trimmedA.toLowerCase() === trimmedB.toLowerCase()) {
      setError('Please specify two different GitHub usernames');
      return;
    }

    router.push(`/compare?user1=${encodeURIComponent(trimmedA)}&user2=${encodeURIComponent(trimmedB)}`);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl opacity-20 blur-sm group-focus-within:opacity-40 transition duration-300" />
            <div className="relative flex items-center bg-card/60 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3.5">
              <Search className="h-5 w-5 text-muted-foreground mr-3" />
              <input
                type="text"
                value={userA}
                onChange={(e) => setUserA(e.target.value)}
                placeholder="Developer A (e.g. torvalds)"
                className="bg-transparent border-none outline-none w-full text-foreground placeholder-muted-foreground text-sm"
              />
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl opacity-20 blur-sm group-focus-within:opacity-40 transition duration-300" />
            <div className="relative flex items-center bg-card/60 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3.5">
              <Search className="h-5 w-5 text-muted-foreground mr-3" />
              <input
                type="text"
                value={userB}
                onChange={(e) => setUserB(e.target.value)}
                placeholder="Developer B (e.g. gaearon)"
                className="bg-transparent border-none outline-none w-full text-foreground placeholder-muted-foreground text-sm"
              />
            </div>
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-400 text-center animate-shake">{error}</p>
        )}

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-4 font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5 active:translate-y-0 group"
        >
          <GitCompare className="h-5 w-5 transition-transform group-hover:rotate-180 duration-500" />
          Compare Profiles
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </form>
    </div>
  );
}
