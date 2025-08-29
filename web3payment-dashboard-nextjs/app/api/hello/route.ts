import { helloBackend } from 'backend';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ msg: helloBackend('Next.js') });
}
