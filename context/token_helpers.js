export const setTokenCookie = (token) => {
    const expires = new Date(Date.now() + 86400 * 1000).toUTCString();
    document.cookie = `token=${token}; expires=${expires}; path=/; SameSite=Lax`;
};

export const removeTokenCookie = () => {
    if (typeof document === 'undefined') return;

    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=' + window.location.hostname;
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.' + window.location.hostname;
};

export const getTokenFromCookie = () => {
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