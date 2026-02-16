import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('token')?.value;
  const { pathname } = req.nextUrl;
  
  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/signup');

  // Logic: "Bouncer at the gate"
  // 1. If no token and not on an auth page, send to login
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // 2. If logged in but trying to see login/signup, send to dashboard
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|icons|public).*)'],
};
