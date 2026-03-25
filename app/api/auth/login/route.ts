import { NextRequest, NextResponse } from 'next/server';
import { loginUser, createJWT } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password, selectedRole } = await request.json();

    // ✅ Uses YOUR Login model + comparePassword
    const user = await loginUser(email, password, selectedRole);

    // ✅ Secure JWT with role
    const token = createJWT(user);

    const response = NextResponse.json({
      success: true,
      message: `Welcome ${selectedRole}`,
      dashboard: `/${selectedRole.toLowerCase().replace(' ', '-')}`
    });

    // ✅ Secure httpOnly cookies
    response.cookies.set('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60
    });
    response.cookies.set('selectedRole', selectedRole, {
      httpOnly: true,
      maxAge: 24 * 60 * 60
    });

    return response; 
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Login failed';
    return NextResponse.json(
      { error: message }, 
      { status: 401 }
    );
  }
}
