import { cookies } from 'next/headers';

export async function serverFetch(path, options = {}) {
    const api_url = process.env.NEXT_PUBLIC_API_URL;

    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get('token'); // <-- Get the JWT cookie by name

    const requestHeaders = new Headers(options.headers || {});

    if (tokenCookie?.value) {
        // Attach the JWT as a Bearer Token, which is the standard for APIs.
        requestHeaders.set('Authorization', `Bearer ${tokenCookie.value}`);
    }

    if (options.body && typeof options.body === 'object') {
        options.body = JSON.stringify(options.body);
        if (!requestHeaders.has('Content-Type')) {
            requestHeaders.set('Content-Type', 'application/json');
        }
    }

    try {
        const response = await fetch(`${api_url}${path}`, {
            ...options,
            headers: requestHeaders,
            cache: 'no-store'
        });

        if (!response.ok) {
            let errorMessage = `Request to '${path}' failed with status ${response.status}`;
            try {
                const errorBody = await response.json();
                errorMessage = errorBody.error || errorBody.message || errorMessage;
            } catch (e) { /* Ignore if body isn't JSON */ }
            throw new Error(errorMessage);
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return response.json();
        }

        return response.text();

    } catch (error) {
        // Re-throw the error so Next.js can catch it and show the error.js boundary
        throw error;
    }
}