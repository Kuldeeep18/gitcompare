import { NextRequest, NextResponse } from 'next/server';
import { getRepoDetails, getRepoLanguages, getRepoContributors } from '@/lib/github-api';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const repo = searchParams.get('repo'); // format: owner/repo

  if (!repo || !repo.includes('/')) {
    return NextResponse.json(
      { error: 'Repository parameter is required in owner/repo format' },
      { status: 400 }
    );
  }

  const [owner, repoName] = repo.split('/');

  try {
    const [details, languages, contributors] = await Promise.all([
      getRepoDetails(owner, repoName),
      getRepoLanguages(owner, repoName),
      getRepoContributors(owner, repoName).catch(() => []),
    ]);

    return NextResponse.json({
      ...details,
      languageBreakdown: languages,
      contributorCount: contributors.length,
      topContributors: contributors.slice(0, 10),
    });
  } catch (error) {
    console.error('Repo fetch error:', error);
    const message = error instanceof Error ? error.message : 'Failed to fetch repository';
    const status = message.includes('Not found') ? 404 : message.includes('Rate limited') ? 429 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
