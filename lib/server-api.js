import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Helper: get API url
const getApiUrl = () => process.env.NEXT_PUBLIC_API_URL;

// Helper: read token from cookies
const getTokenFromCookies = async () => {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get('token');
    return tokenCookie?.value;
};

// Helper: build Headers object and ensure content-type when body is JSON
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

// Helper: prepare fetch options (stringify body when needed)
const prepareFetchOptions = (options = {}, requestHeaders) => {
    const opts = { ...options, headers: requestHeaders };
    if (options.body && typeof options.body === 'object') {
        opts.body = JSON.stringify(options.body);
    }
    return opts;
};

// Helper: perform fetch
const performFetch = async (apiUrl, path, options) => {
    return fetch(`${apiUrl}${path}`, { ...options, cache: 'no-store' });
};

// Helper: process response (handle 401 and throw informative errors)
const processResponse = async (response, path) => {
    if (!response.ok) {
        if (response.status === 401) {
            // server-side redirect to login for unauthorized
            // DISABLED to prevent infinite loops on clients where RSC fails but Client Auth works
            // redirect('/login');
            throw new Error("Unauthorized (401) during server-side fetch");
        }

        let errorMessage = `Request to '${path}' failed with status ${response.status}`;
        try {
            const errorBody = await response.json();
            errorMessage = errorBody.error || errorBody.message || errorMessage;
        } catch (e) {
            // ignore JSON parse errors
        }
        throw new Error(errorMessage);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return response.json();
    }
    return response.text();
};

// Main exported function: orchestrates helpers for readability
export async function serverFetch(path, options = {}) {
    const apiUrl = getApiUrl();
    const token = await getTokenFromCookies();
    const hasJsonBody = Boolean(options.body && typeof options.body === 'object');

    const requestHeaders = buildRequestHeaders(options.headers, token, hasJsonBody);
    const fetchOptions = prepareFetchOptions(options, requestHeaders);

    try {
        const response = await performFetch(apiUrl, path, fetchOptions);
        return await processResponse(response, path);
    } catch (error) {
        // Re-throw to allow callers to handle or let Next.js surface errors
        throw error;
    }
}