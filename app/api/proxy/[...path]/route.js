import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9292';

/**
 * PIPELINE HELPERS
 */

function getProxyPath(req) {
    const url = new URL(req.url);
    const path = url.pathname.replace(/^\/api\/proxy/, '');
    const isSafe = /^\/[a-zA-Z0-9_\-\/]+$/.test(path);
    
    if (!isSafe) throw new Error('Insecure path');
    return path;
}

async function getSessionToken() {
    const cookieStore = await cookies();
    return cookieStore.get('token')?.value;
}

function buildTargetUrl(path, rawUrl) {
    const url = new URL(rawUrl);
    return `${BACKEND_URL}${path}${url.search}`;
}

async function buildFetchOptions(req, token) {
    const headers = new Headers(req.headers);
    if (token) headers.set('Authorization', `Bearer ${token}`);

    const options = {
        method: req.method,
        headers,
        duplex: 'half'
    };

    if (req.method !== 'GET' && req.method !== 'HEAD') {
        options.body = req.body;
    }

    return options;
}

async function createNextResponse(backendRes) {
    const data = await backendRes.arrayBuffer();
    return new NextResponse(data, {
        status: backendRes.status,
        headers: backendRes.headers,
    });
}

/**
 * MAIN PIPELINE
 */
async function proxyRequest(req) {
    try {
        const path = getProxyPath(req);
        const token = await getSessionToken();
        const target = buildTargetUrl(path, req.url);
        const options = await buildFetchOptions(req, token);

        const backendRes = await fetch(target, options);
        
        return await createNextResponse(backendRes);
    } catch (err) {
        console.error('[Proxy Error]:', err.message);
        const status = err.message === 'Insecure path' ? 400 : 500;
        return NextResponse.json({ error: err.message }, { status });
    }
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const PATCH = proxyRequest;
export const DELETE = proxyRequest;
