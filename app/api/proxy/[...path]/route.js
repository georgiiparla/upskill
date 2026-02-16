import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9292';

async function proxyRequest(request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        const url = new URL(request.url);
        const proxyPath = url.pathname.replace(/^\/api\/proxy/, '');

        // Security: Block non-standard path characters
        if (!/^\/[a-zA-Z0-9_\-\/]+$/.test(proxyPath)) {
            return NextResponse.json({ error: 'Invalid Path' }, { status: 400 });
        }

        const targetUrl = `${API_URL}${proxyPath}${url.search}`;
        const headers = new Headers(request.headers);

        // Forward identity
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        // Duplex is required for forwarding bodies in Next.js
        const fetchOptions = {
            method: request.method,
            headers,
            duplex: 'half'
        };

        if (request.method !== 'GET' && request.method !== 'HEAD') {
            fetchOptions.body = request.body;
        }

        const response = await fetch(targetUrl, fetchOptions);
        const data = await response.arrayBuffer();

        // Return the response as-is from the backend
        return new NextResponse(data, {
            status: response.status,
            headers: response.headers,
        });

    } catch (error) {
        console.error('Proxy Error:', error);
        return NextResponse.json({ error: 'Proxy Failure' }, { status: 500 });
    }
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const PATCH = proxyRequest;
export const DELETE = proxyRequest;
