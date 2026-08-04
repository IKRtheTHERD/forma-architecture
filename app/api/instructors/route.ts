import { NextResponse } from 'next/server';
import { getInstructors } from '@/lib/db';

export async function GET() {
  try {
    const instructors = await getInstructors();
    return NextResponse.json({ success: true, count: instructors.length, instructors });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch instructors' }, { status: 500 });
  }
}
