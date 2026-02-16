import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function serverFetch(path, options = {}) {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    const headers = new Headers(options.headers || {});
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }
    
    if (options.body && typeof options.body === 'object' && !headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
    }

    const fetchOptions = {
        ...options,
        headers,
        cache: 'no-store',
        body: options.body && typeof options.body === 'object' 
              ? JSON.stringify(options.body) 
              : options.body
    };

    const response = await fetch(`${API_URL}${path}`, fetchOptions);

    if (!response.ok) {
        if (response.status === 401) {
            redirect('/api/auth/logout');
        }

        let errorMessage = `ServerFetch failed: ${response.status}`;
        try {
            const errorBody = await response.json();
            errorMessage = errorBody.error || errorBody.message || errorMessage;
        } catch (e) {
            // Fallback if not JSON
        }
        
        console.error(`[ServerFetch Error] ${path}:`, errorMessage);
        throw new Error(errorMessage);
    }

    const contentType = response.headers.get('content-type');
    return contentType?.includes('application/json') ? response.json() : response.text();
}
