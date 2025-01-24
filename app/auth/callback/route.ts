import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    
    try {
      const { data: { session }, error: authError } = await supabase.auth.exchangeCodeForSession(code);
      if (authError) throw authError;

      if (!session) {
        throw new Error('No session established');
      }

      // If user is admin (selvampj86@gmail.com), redirect to admin panel
      if (session.user.email === 'selvampj86@gmail.com') {
        return NextResponse.redirect(new URL('/admin', requestUrl.origin));
      }

      // For non-admin users, redirect to home page
      return NextResponse.redirect(new URL('/', requestUrl.origin));
    } catch (error) {
      console.error('Auth callback error:', error);
      return NextResponse.redirect(new URL('/auth/login?error=auth_callback_failed', requestUrl.origin));
    }
  }

  return NextResponse.redirect(new URL('/auth/login', requestUrl.origin));
}