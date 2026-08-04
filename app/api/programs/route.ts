import { NextRequest, NextResponse } from 'next/server';
import { getPrograms } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category') || undefined;
    const status = searchParams.get('status') || undefined;
    const query = searchParams.get('query') || undefined;

    const programs = await getPrograms(category, status, query);
    return NextResponse.json({ success: true, count: programs.length, programs });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch programs' }, { status: 500 });
  }
}
