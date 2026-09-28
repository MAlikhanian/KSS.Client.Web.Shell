import { NextResponse } from 'next/server';

const CAPTCHA_BASE_URL =
  process.env.CAPTCHA_API_BASE_URL || 'http://localhost:8000';

export async function GET() {
  try {
    const response = await fetch(
      `${CAPTCHA_BASE_URL}/Api/Challenge/Create`,
      {
        method: 'GET',
        cache: 'no-store',
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: 'Failed to obtain captcha challenge' },
        { status: 502 },
      );
    }

    const challenge = await response.json();
    return NextResponse.json(challenge);
  } catch {
    return NextResponse.json(
      { message: 'Captcha service unavailable' },
      { status: 503 },
    );
  }
}
