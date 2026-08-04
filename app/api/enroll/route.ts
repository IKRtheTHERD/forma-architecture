import { NextRequest, NextResponse } from 'next/server';
import { addEnrollment } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { program_id, applicant_name, email, portfolio_url, statement } = body;

    if (!program_id || !applicant_name || !email) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: program_id, applicant_name, email' },
        { status: 400 }
      );
    }

    const enrollment = await addEnrollment({
      program_id,
      applicant_name,
      email,
      portfolio_url,
      statement
    });

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully to Forma Architecture Admissions Board.',
      enrollment
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to submit application' }, { status: 500 });
  }
}
