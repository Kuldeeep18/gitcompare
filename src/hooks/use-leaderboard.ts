'use client';

import { useState, useEffect, useCallback } from 'react';
import { LeaderboardEntry } from '@/types/analytics';
import { getLeaderboard, addToLeaderboard, removeFromLeaderboard } from '@/services/analytics-service';

export function useLeaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [sortBy, setSortBy] = useState<keyof LeaderboardEntry>('score');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setEntries(getLeaderboard());
  }, []);

  const add = useCallback((entry: LeaderboardEntry) => {
    const updated = addToLeaderboard(entry);
    setEntries(updated);
  }, []);

  const remove = useCallback((username: string) => {
    const updated = removeFromLeaderboard(username);
    setEntries(updated);
  }, []);

  const sorted = [...entries].sort((a, b) => {
    const valA = a[sortBy];
    const valB = b[sortBy];
    if (typeof valA === 'number' && typeof valB === 'number') {
      return valB - valA;
    }
    return String(valB).localeCompare(String(valA));
  });

  const filtered = searchQuery
    ? sorted.filter(e => e.username.toLowerCase().includes(searchQuery.toLowerCase()))
    : sorted;

  return {
    entries: filtered,
    add,
    remove,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    total: entries.length,
  };
}
