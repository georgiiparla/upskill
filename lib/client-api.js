import { getTokenFromCookie } from "@/context/token_helpers";

export async function clientFetch(path, options = {}) {
    const api_url = process.env.NEXT_PUBLIC_API_URL;
    const token = getTokenFromCookie();

    const requestHeaders = new Headers(options.headers || {});

    if (token) {
        requestHeaders.set('Authorization', `Bearer ${token}`);
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
        });

        const data = await response.json();

        if (!response.ok) {
            const errorMessage = data.error || data.errors?.join(', ') || `Request failed with status ${response.status}`;
            return { success: false, error: errorMessage };
        }
        
        return { success: true, data };

    } catch (error) {
        return { success: false, error: error.message || "A network error occurred." };
    }
}

export const likeSubmission = (id) => clientFetch(`/feedback_submissions/${id}/like`, { method: 'POST' });
export const unlikeSubmission = (id) => clientFetch(`/feedback_submissions/${id}/like`, { method: 'DELETE' });
export const deleteSubmission = (id) => clientFetch(`/feedback_submissions/${id}`, { method: 'DELETE' });