// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose'; // ✅ edge compatible JWT library

const routePermissions: Record<string, string[]> = {
  '/super-admin': ['Super Admin'],
  '/branch': ['Branch'],
  '/investor': ['Investor'],
  '/user': ['User']
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('authToken')?.value;

  // Public routes
  if (pathname === '/auth/login-type' || pathname === '/auth/login') {
    return NextResponse.next();
  }

  // Protected routes
  for (const [route, allowedRoles] of Object.entries(routePermissions)) {
    if (pathname === route || pathname.startsWith(route + '/')) {

      // No token → redirect to login
      if (!token) {
        return NextResponse.redirect(new URL('/auth/login-type', request.url));
      }

      try {
        // ✅ jose works on Edge Runtime, jsonwebtoken does NOT
        const secret = new TextEncoder().encode(process.env.JWT_Secret_key!);
        const { payload } = await jwtVerify(token, secret);

        const userRole = payload.selectedRole as string;

        if (!allowedRoles.includes(userRole)) {
          return NextResponse.redirect(new URL('/auth/unauthorized', request.url));
        }

        return NextResponse.next();

      } catch {
        // Token invalid or expired
        return NextResponse.redirect(new URL('/auth/login-type', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|select-role|login).*)']
};