import { NextResponse } from 'next/server';
import { getStudentWork } from '@/lib/db';

export async function GET() {
  try {
    const studentWork = await getStudentWork();
    return NextResponse.json({ success: true, count: studentWork.length, studentWork });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch student work' }, { status: 500 });
  }
}
