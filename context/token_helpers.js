// Helper function to set the JWT in a browser cookie.
export const setTokenCookie = (token) => {
    // Set cookie to expire in 1 day, to match the JWT expiry
    const expires = new Date(Date.now() + 86400 * 1000).toUTCString();
    // SameSite=Lax is a good default for a cookie the server needs to read on navigation
    document.cookie = `token=${token}; expires=${expires}; path=/; SameSite=Lax`;
};

// Helper function to remove the JWT cookie on logout
export const removeTokenCookie = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
};

// Helper function to read the JWT from the browser cookie
export const getTokenFromCookie = () => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'token') {
            return value;
        }
    }
    return null;
};