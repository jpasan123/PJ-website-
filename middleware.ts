import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) throw error;

    // Allow access to admin login page without authentication
    if (req.nextUrl.pathname === '/admin/login') {
      if (session) {
        // If already logged in and is admin, redirect to admin panel
        if (session.user.email === 'selvampj86@gmail.com') {
          return NextResponse.redirect(new URL('/admin', req.url));
        }
        // If logged in but not admin, redirect to home
        return NextResponse.redirect(new URL('/', req.url));
      }
      return res;
    }

    // Protect admin routes
    if (req.nextUrl.pathname.startsWith('/admin')) {
      if (!session) {
        return NextResponse.redirect(new URL('/admin/login', req.url));
      }

      // Check if user is admin
      if (session.user.email === 'selvampj86@gmail.com') {
        return res;
      }

      // Redirect non-admin users to home page
      return NextResponse.redirect(new URL('/', req.url));
    }

    // Handle other auth required routes
    if (!session && (
      req.nextUrl.pathname.startsWith('/account') ||
      req.nextUrl.pathname.startsWith('/checkout')
    )) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = '/auth/login';
      redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // If user is admin and tries to access non-admin pages, redirect to admin panel
    if (session && session.user.email === 'selvampj86@gmail.com' && !req.nextUrl.pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/admin', req.url));
    }

    return res;
  } catch (error) {
    console.error('Middleware error:', error);
    return res;
  }
}

export const config = {
  matcher: [
    '/',
    '/admin',
    '/admin/:path*',
    '/account',
    '/account/:path*',
    '/checkout/:path*',
    '/auth/login',
    '/auth/register',
    '/auth/callback'
  ],
};