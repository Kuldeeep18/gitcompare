import { NextRequest, NextResponse } from 'next/server';
import { compareUsers } from '@/services/comparison-service';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userA = searchParams.get('userA');
  const userB = searchParams.get('userB');

  if (!userA || !userB) {
    return NextResponse.json(
      { error: 'Both userA and userB parameters are required' },
      { status: 400 }
    );
  }

  if (userA === userB) {
    return NextResponse.json(
      { error: 'Please provide two different usernames' },
      { status: 400 }
    );
  }

  try {
    const result = await compareUsers(userA, userB);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Comparison error:', error);
    const message = error instanceof Error ? error.message : 'Failed to compare users';
    const status = message.includes('Not found') ? 404 : message.includes('Rate limited') ? 429 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
