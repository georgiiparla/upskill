import { NextResponse } from 'next/server';

export async function POST(request) {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.demoplatform.app';

    try {
        const backendRes = await fetch(`${backendUrl}/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Cookie: request.headers.get('cookie') || '',
            },
            credentials: 'include',
        });

        const data = await backendRes.json();

        const response = NextResponse.json(data);

        const setCookie = backendRes.headers.get('set-cookie');
        if (setCookie) {
            response.headers.set('Set-Cookie', setCookie);
        }

        return response;

    } catch (err) {
        console.error('Logout proxy error:', err);
        return NextResponse.json({ message: 'Logout failed' }, { status: 500 });
    }
}