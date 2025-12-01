// We now point to our local Next.js proxy
const getApiUrl = () => '/api/proxy';

const prepareBody = (body) => {
    if (body && typeof body === 'object') {
        return { bodyString: JSON.stringify(body), isJson: true };
    }
    return { bodyString: body, isJson: false };
};

const buildRequestHeaders = (initialHeaders = {}, isJson = false) => {
    const requestHeaders = new Headers(initialHeaders || {});
    if (isJson && !requestHeaders.has('Content-Type')) {
        requestHeaders.set('Content-Type', 'application/json');
    }
    return requestHeaders;
};

const performFetch = async (apiUrl, path, options) => {
    return fetch(`${apiUrl}${path}`, {
        ...options,
        headers: options.headers,
    });
};

const processFetchResponse = async (response) => {
    let data = null;
    try {
        const text = await response.text();
        if (text) {
            data = JSON.parse(text);
        }
    } catch (e) {
        data = null;
    }

    if (!response.ok) {
        const errorMessage = (data && (data.error || (data.errors && data.errors.join(', ')))) || `Request failed with status ${response.status}`;
        return { success: false, error: errorMessage };
    }

    return { success: true, data };
};

export async function clientFetch(path, options = {}) {
    const api_url = getApiUrl();
    const { bodyString, isJson } = prepareBody(options.body);
    const requestHeaders = buildRequestHeaders(options.headers, isJson);

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
export const getUserAliases = () => clientFetch('/me/aliases');
export const addUserAlias = (email) => clientFetch('/me/aliases', { method: 'POST', body: { email } });
export const removeUserAlias = (id) => clientFetch(`/me/aliases/${id}`, { method: 'DELETE' });
export const getMyLeaderboardEntry = () => clientFetch('/leaderboard/me');