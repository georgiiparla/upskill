import { getTokenFromCookie } from "@/context/token_helpers";

// Helper: API URL
const getApiUrl = () => process.env.NEXT_PUBLIC_API_URL;

// Helper: get token
const getToken = () => getTokenFromCookie();

// Helper: prepare body (stringify if object) and detect JSON
const prepareBody = (body) => {
    if (body && typeof body === 'object') {
        return { bodyString: JSON.stringify(body), isJson: true };
    }
    return { bodyString: body, isJson: false };
};

// Helper: build headers, including auth and content-type when needed
const buildRequestHeaders = (initialHeaders = {}, token, isJson = false) => {
    const requestHeaders = new Headers(initialHeaders || {});
    if (token) {
        requestHeaders.set('Authorization', `Bearer ${token}`);
    }
    if (isJson && !requestHeaders.has('Content-Type')) {
        requestHeaders.set('Content-Type', 'application/json');
    }
    return requestHeaders;
};

// Helper: perform fetch call
const performFetch = async (apiUrl, path, options) => {
    return fetch(`${apiUrl}${path}`, {
        ...options,
        headers: options.headers,
    });
};

// Helper: process fetch response and normalize return shape
const processFetchResponse = async (response) => {
    // Try parse JSON when possible
    let data = null;
    try {
        data = await response.json();
    } catch (e) {
        // ignore JSON parse errors
        data = null;
    }

    if (!response.ok) {
        const errorMessage = (data && (data.error || (data.errors && data.errors.join(', ')))) || `Request failed with status ${response.status}`;
        return { success: false, error: errorMessage };
    }

    return { success: true, data };
};

// Main clientFetch composed from helpers
export async function clientFetch(path, options = {}) {
    const api_url = getApiUrl();
    const token = getToken();

    const { bodyString, isJson } = prepareBody(options.body);

    const requestHeaders = buildRequestHeaders(options.headers, token, isJson);

    const fetchOptions = {
        ...options,
        headers: requestHeaders,
    };

    if (bodyString !== undefined) fetchOptions.body = bodyString;

    try {
        const response = await performFetch(api_url, path, fetchOptions);
        return await processFetchResponse(response);
    } catch (error) {
        return { success: false, error: error.message || "A network error occurred." };
    }
}

export const likeSubmission = (id) => clientFetch(`/feedback_submissions/${id}/like`, { method: 'POST' });
export const unlikeSubmission = (id) => clientFetch(`/feedback_submissions/${id}/like`, { method: 'DELETE' });
export const deleteSubmission = (id) => clientFetch(`/feedback_submissions/${id}`, { method: 'DELETE' });
export const deleteQuest = (id) => clientFetch(`/quests/${id}`, { method: 'DELETE' });

export const getUserAliases = () => clientFetch('/me/aliases');
export const addUserAlias = (email) => clientFetch('/me/aliases', { method: 'POST', body: { email } });
export const removeUserAlias = (id) => clientFetch(`/me/aliases/${id}`, { method: 'DELETE' });
export const getMyLeaderboardEntry = () => clientFetch('/leaderboard/me');