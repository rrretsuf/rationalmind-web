import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options) {
          // Properly delete cookies by setting Max-Age to 0 and Expires to past date
          const deleteOptions = {
            ...options,
            maxAge: 0,
            expires: new Date(0),
          };
          request.cookies.set({ name, value: '', ...deleteOptions });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({ name, value: '', ...deleteOptions });
        },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;

  const { pathname } = request.nextUrl;

  // Protect main app routes - redirect unauthenticated users to landing
  if (!user && pathname.startsWith('/main')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If user is logged in and tries to access the landing page, redirect to main app
  if (user && pathname === '/') {
    return NextResponse.redirect(new URL('/main', request.url));
  }

  // If user is logged in and tries to access auth pages, redirect to main app
  if (user && (pathname === '/register' || pathname.startsWith('/register'))) {
    return NextResponse.redirect(new URL('/main', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};