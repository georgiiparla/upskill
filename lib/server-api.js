import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const getApiUrl = () => process.env.NEXT_PUBLIC_API_URL;

const getTokenFromCookies = async () => {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get('token');
    return tokenCookie?.value;
};

const buildRequestHeaders = (initialHeaders = {}, token, hasJsonBody = false) => {
    const requestHeaders = new Headers(initialHeaders || {});
    if (token) {
        requestHeaders.set('Authorization', `Bearer ${token}`);
    }
    if (hasJsonBody && !requestHeaders.has('Content-Type')) {
        requestHeaders.set('Content-Type', 'application/json');
    }
    return requestHeaders;
};

const prepareFetchOptions = (options = {}, requestHeaders) => {
    const opts = { ...options, headers: requestHeaders };
    if (options.body && typeof options.body === 'object') {
        opts.body = JSON.stringify(options.body);
    }
    return opts;
};

const performFetch = async (apiUrl, path, options) => {
    return fetch(`${apiUrl}${path}`, { ...options, cache: 'no-store' });
};

const processResponse = async (response, path) => {
    if (!response.ok) {
        if (response.status === 401) {
            redirect('/api/auth/logout');
        }

        let errorMessage = `Request to '${path}' failed with status ${response.status}`;
        try {
            const errorBody = await response.json();
            errorMessage = errorBody.error || errorBody.message || errorMessage;
        } catch (e) {
        }

        // Ensure the error is logged on the server (Next.js console) 
        // before it bubbles up to error boundaries.
        console.error(`[ServerFetch Error] ${path}:`, errorMessage);

        throw new Error(errorMessage);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return response.json();
    }
    return response.text();
};

export async function serverFetch(path, options = {}) {
    const apiUrl = getApiUrl();
    const token = await getTokenFromCookies();
    const hasJsonBody = Boolean(options.body && typeof options.body === 'object');

    const requestHeaders = buildRequestHeaders(options.headers, token, hasJsonBody);
    const fetchOptions = prepareFetchOptions(options, requestHeaders);

    const response = await performFetch(apiUrl, path, fetchOptions);
    return await processResponse(response, path);
}