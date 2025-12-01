import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// This must match your Ruby backend URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9292';

async function proxyRequest(request) {
    try {
        // 1. Get token from HttpOnly cookie
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        // 2. Construct Target URL components
        const url = new URL(request.url);
        // Remove the Next.js prefix to get the raw backend path
        const proxyPath = url.pathname.replace(/^\/api\/proxy/, '');

        // --- SECURITY FIX: Strict Pattern Matching ---
        // This regex allows standard API paths but blocks SSRF attack characters.
        // Allowed:
        //   /  (Forward slashes for path separation)
        //   a-z, A-Z (Letters)
        //   0-9 (Numbers for IDs)
        //   -   (Hyphens for slugs)
        //   _   (Underscores)
        //
        // Blocked:
        //   .   (Dots -> Prevents IP addresses like 1.2.3.4 or domains like google.com)
        //   @   (At sign -> Prevents auth redirection user@evil.com)
        //   :   (Colon -> Prevents protocol injection like file: or gopher:)
        const SAFE_PATH_PATTERN = /^\/[a-zA-Z0-9_\-\/]+$/;

        if (!SAFE_PATH_PATTERN.test(proxyPath)) {
            console.error(`Blocked potentially malicious proxy path: ${proxyPath}`);
            return NextResponse.json({ error: 'Forbidden Endpoint Structure' }, { status: 403 });
        }
        // ---------------------------------------------

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