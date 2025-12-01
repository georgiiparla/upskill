import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
    const cookieStore = await cookies();

    // Delete the token cookie by setting it to empty/expired
    cookieStore.delete('token');

    return NextResponse.json({ success: true });
}