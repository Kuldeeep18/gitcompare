'use client';

import { useState, useCallback } from 'react';
import { ComparisonResult } from '@/types/comparison';

interface UseComparisonReturn {
  result: ComparisonResult | null;
  loading: boolean;
  error: string | null;
  compare: (userA: string, userB: string) => Promise<void>;
  reset: () => void;
}

export function useComparison(): UseComparisonReturn {
  const [result, setResult] = useState<ComparisonResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const compare = useCallback(async (userA: string, userB: string) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`/api/github/compare?userA=${encodeURIComponent(userA)}&userB=${encodeURIComponent(userB)}`);
      
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: 'Failed to compare users' }));
        throw new Error(data.error || `Failed to compare users (${res.status})`);
      }

      const data: ComparisonResult = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    setLoading(false);
  }, []);

  return { result, loading, error, compare, reset };
}
