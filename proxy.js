import { NextResponse } from 'next/server';

// 1. Define Public Routes
// All other routes are protected by default
const publicRoutes = [
    '/login',
    '/signup',
    '/auth/callback',
    '/' // Root is technically public but we redirect to dashboard/login
];

export function proxy(request) {
    const { pathname } = request.nextUrl;

    // 2. Get Token from Cookies
    // We use the standard 'token' cookie set by our backend/API route
    const token = request.cookies.get('token')?.value;

    // 3. Determine if route is protected
    // If it's NOT in the publicRoutes list, it is protected.
    const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(`${route}/`));
    const isProtectedRoute = !isPublicRoute;

    if (isProtectedRoute) {
        // ...and has no token
        if (!token) {
            // Redirect to login
            const loginUrl = new URL('/login', request.url);
            // Optional: Add ?from=pathname to redirect back after login
            return NextResponse.redirect(loginUrl);
        }
        // If token exists, allow access
        return NextResponse.next();
    }

    // 4. Handle Public Routes (Login/Signup)
    // If user is already logged in and tries to access login/signup...
    if (pathname === '/login' || pathname === '/signup') {
        if (token) {
            // Redirect to dashboard
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    }

    // 5. Handle Root Path
    if (pathname === '/') {
        if (token) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        } else {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

// 6. Configure Matcher
// This ensures middleware only runs on specific paths, improving performance
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (images, etc)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
