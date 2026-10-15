import { NextRequest, NextResponse } from 'next/server';
import {
  getSignupSchema,
  SignupSchemaType,
} from '@/app/(auth)/forms/signup-schema';
import { AuthApiError, registerAuth } from '@/services/auth-api';

export async function POST(req: NextRequest) {
  try {
    // Captcha payload is forwarded to the Auth backend, which verifies it
    // against the captcha service. The BFF does not need a presence check —
    // missing/invalid payloads come back as 400 from Auth.
    const captchaPayload = req.headers.get('x-captcha-payload') ?? '';

    // Which tenant the signup arrived at. HOST ONLY, deliberately.
    //
    // Not x-forwarded-host: this cluster's ingress is HAProxy, which passes a
    // client-supplied X-Forwarded-Host straight through rather than overwriting
    // it (measured — a forged header changed the resolved tenant). Host is what
    // the ingress ROUTES on, so a forged Host never reaches this backend at all;
    // it 404s. Auth decides company membership from this value, so it must be
    // the one the client cannot choose.
    //
    // Any inbound x-tenant-host is likewise ignored, never forwarded.
    const tenantHost = req.headers.get('host') ?? undefined;

    const body = await req.json();

    const result = getSignupSchema().safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { message: 'VALIDATION_ERROR' },
        { status: 400 },
      );
    }

    const { firstName, lastName, userName, email, phone, password }: SignupSchemaType = result.data;

    await registerAuth(
      {
        username: userName,
        email,
        password,
        firstName,
        lastName,
        phone,
      },
      captchaPayload,
      tenantHost,
    );

    return NextResponse.json(
      { message: 'Registration successful. You can sign in now.' },
      { status: 200 },
    );
  } catch (err) {
    console.error('[Signup API] Error:', err);
    const message =
      err instanceof Error ? err.message : 'Registration failed. Please try again later.';
    const status = err instanceof AuthApiError ? err.status : 500;
    return NextResponse.json({ message }, { status });
  }
}
