import { cookies } from 'next/headers';

export async function serverFetch(path, options = {}) {
    const cookieStore = cookies();
    const api_url = process.env.NEXT_PUBLIC_API_URL;

    const cookieHeader = cookieStore.getAll().map(cookie => `${cookie.name}=${cookie.value}`).join('; ');

    const headers = {
        ...options.headers,
        'Cookie': cookieHeader,
    };

    try {
        const response = await fetch(`${api_url}${path}`, {
            ...options,
            headers: headers,
            cache: 'no-store'
        });

        if (!response.ok) {
            // --- IMPROVEMENT STARTS HERE ---
            // Give a much more descriptive error message in the console
            console.error(`API fetch failed for path: ${path} - Status: ${response.status} ${response.statusText}`);
            // And throw an error that includes the path and status for clarity
            throw new Error(`Request to '${path}' failed with status ${response.status}`);
            // --- IMPROVEMENT ENDS HERE ---
        }

        return response.json();

    } catch (error) {
        // This log will now show which path caused the initial fetch to fail
        console.error(`An error occurred during server fetch for path: ${path}`, error.message);
        throw error;
    }
}