import { NextRequest, NextResponse } from 'next/server';
import { fetchUserProfile } from '@/services/comparison-service';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json(
      { error: 'Username parameter is required' },
      { status: 400 }
    );
  }

  try {
    const profile = await fetchUserProfile(username);
    return NextResponse.json(profile);
  } catch (error) {
    console.error('User fetch error:', error);
    const message = error instanceof Error ? error.message : 'Failed to fetch user';
    const status = message.includes('Not found') ? 404 : message.includes('Rate limited') ? 429 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
