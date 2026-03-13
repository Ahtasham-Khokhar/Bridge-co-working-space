import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJWT } from '@/lib/auth';
import dbconnect from '@/lib/dbconnect';
export const runtime = 'nodejs';

const routePermissions: Record<string, string[]> = {
  '/super-admin': ['Super Admin'],
  '/branch': ['Branch'],
  '/investor': ['Investor'],
  '/user': ['User']
};

export async function middleware(request: NextRequest) {
  await dbconnect(); // ✅ YOUR CONNECTION

  const { pathname } = request.nextUrl;
  const token = request.cookies.get('authToken')?.value;

  // Public routes (your selection + login)
  if (pathname === '/select-role' || pathname === '/login') {
    return NextResponse.next();
  }

  // Protected dashboard routes
  for (const [route, allowedRoles] of Object.entries(routePermissions)) {
    if (pathname === route || pathname.startsWith(route + '/')) {
      if (!token) {
        return NextResponse.redirect(new URL('/select-role', request.url));
      }

      const user = await verifyJWT(token);
      if (!user || !allowedRoles.includes(user.selectedRole)) {
        return NextResponse.redirect(new URL('/auth/unauthorized', request.url));
      }
      
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|select-role|login).*)']
};
