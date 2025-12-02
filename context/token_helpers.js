export const setTokenCookie = (token) => {
    // Note: In the new system, we primarily rely on HttpOnly cookies set by the server.
    // This helper might still be used for temporary states or non-sensitive flags.
    const expires = new Date(Date.now() + 86400 * 1000).toUTCString();
    document.cookie = `token=${token}; expires=${expires}; path=/; SameSite=Lax`;
};

export const removeTokenCookie = () => {
    if (typeof document === 'undefined') return;

    // Aggressively attempt to clear the cookie by targeting multiple path/domain variations
    // This is critical for clearing legacy cookies that may have been set with different attributes
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=' + window.location.hostname;
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.' + window.location.hostname;
};

export const getTokenFromCookie = () => {
    // Safety check for Server-Side Rendering (SSR)
    if (typeof document === 'undefined') return null;

    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'token') {
            return value;
        }
    }
    return null;
};