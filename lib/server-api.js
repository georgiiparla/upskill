import { headers } from 'next/headers';

export async function serverFetch(path, options = {}) {
    const api_url = process.env.NEXT_PUBLIC_API_URL;
    const incomingHeaders = await headers();
    
    // --- NEW LOGS START HERE ---
    console.log(`[Server Fetch] Initiating request to: ${path}`);
    const hasCookie = incomingHeaders.has('Cookie');
    console.log(`[Server Fetch] Cookie found in browser request: ${hasCookie}`);
    // --- NEW LOGS END HERE ---
    
    const requestHeaders = new Headers(options.headers || {});

    if (hasCookie) {
        requestHeaders.set('Cookie', incomingHeaders.get('Cookie'));
        // --- NEW LOG ---
        console.log('[Server Fetch] Forwarding browser cookie to the backend API.');
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

        // --- NEW LOG ---
        console.log(`[Server Fetch] Received response from API for ${path}. Status: ${response.status}`);

        if (!response.ok) {
            let errorMessage = `Request to '${path}' failed with status ${response.status}`;
            try {
                const errorBody = await response.json();
                errorMessage = errorBody.error || errorBody.message || errorMessage;
            } catch (e) {
                // The response was not JSON, so we use the generic error.
            }
            console.error(`[Server Fetch] API fetch failed: ${errorMessage}`);
            throw new Error(errorMessage);
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return response.json();
        }
        
        return response.text();

    } catch (error) {
        console.error(`[Server Fetch] An error occurred during server fetch for path: ${path}`, error.message);
        throw error;
    }
}