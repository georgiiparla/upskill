const PROXY_URL = '/api/proxy';

export async function clientFetch(path, options = {}) {
    const headers = new Headers(options.headers || {});
    
    if (options.body && typeof options.body === 'object' && !headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
    }

    const fetchOptions = {
        ...options,
        headers,
        body: options.body && typeof options.body === 'object' 
              ? JSON.stringify(options.body) 
              : options.body
    };

    try {
        const response = await fetch(`${PROXY_URL}${path}`, fetchOptions);
        let data = null;
        
        try {
            const text = await response.text();
            if (text) data = JSON.parse(text);
        } catch (e) {
            // Not JSON
        }

        if (!response.ok) {
            const error = (data && (data.error || (data.errors && data.errors.join(', ')))) || `Request failed: ${response.status}`;
            return { success: false, error };
        }

        return { success: true, data };
    } catch (error) {
        return { success: false, error: error.message || "A network error occurred." };
    }
}

// API Endpoints
export const likeSubmission = (id) => clientFetch(`/feedback_submissions/${id}/like`, { method: 'POST' });
export const unlikeSubmission = (id) => clientFetch(`/feedback_submissions/${id}/like`, { method: 'DELETE' });
export const deleteSubmission = (id) => clientFetch(`/feedback_submissions/${id}`, { method: 'DELETE' });

export const getUserAliases = () => clientFetch('/me/aliases');
export const addUserAlias = (email) => clientFetch('/me/aliases', { method: 'POST', body: { email } });
export const removeUserAlias = (id) => clientFetch(`/me/aliases/${id}`, { method: 'DELETE' });
export const getMyLeaderboardEntry = () => clientFetch('/leaderboard/me');
