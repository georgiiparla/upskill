import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// This must match your Ruby backend URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9292';

async function proxyRequest(request) {
    try {
        // 1. Get token from HttpOnly cookie
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        // 2. Construct Target URL
        // Incoming: /api/proxy/dashboard -> Outgoing: http://localhost:9292/dashboard
        const url = new URL(request.url);
        const proxyPath = url.pathname.replace(/^\/api\/proxy/, '');
        const queryString = url.search;
        const targetUrl = `${API_URL}${proxyPath}${queryString}`;

        // 3. Prepare Headers
        const headers = new Headers(request.headers);

        // Clean up headers to avoid confusing the backend
        headers.delete('host');
        headers.delete('cookie');
        headers.delete('connection');

        // Attach Token for the Backend
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        // 4. Forward Request
        const fetchOptions = {
            method: request.method,
            headers: headers,
            duplex: 'half' // Required for Node.js environments
        };

        if (request.body) {
            fetchOptions.body = request.body;
        }

        const response = await fetch(targetUrl, fetchOptions);

        // 5. Return Response
        const data = await response.arrayBuffer();
        const responseHeaders = new Headers(response.headers);

        return new NextResponse(data, {
            status: response.status,
            statusText: response.statusText,
            headers: responseHeaders,
        });

    } catch (error) {
        console.error('Proxy Error:', error);
        return NextResponse.json({ error: 'Internal Proxy Error' }, { status: 500 });
    }
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const PATCH = proxyRequest;
export const DELETE = proxyRequest;