import jwt from 'jsonwebtoken';
import Login from '@/models/loginmodel';
import dbconnect from './dbconnect';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_Secret_key || 'bridge-login-rbac-2026';

export interface AuthUser {
  id: string;
  email: string;
  selectedRole: string;
}

export async function loginUser(email: string, password: string, selectedRole: string) {
  await dbconnect();
  
  const user = await Login.findOne({ email }).select('+password');
  if (!user) throw new Error('User not found');

  // ✅ YOUR comparePassword method
  const isValidPassword = await user.comparePassword(password);
  if (!isValidPassword) throw new Error('Invalid password');

  // ✅ Role validation (your business logic)
  const rolePermissions: Record<string, string[]> = {
    'superadmin@gmail.com': ['Super Admin'],
    'branchadmin@gmail.com': ['Branch'],
    'investoradmin@gmail.com': ['Investor'],
    'useradmin@gmail.com': ['User']
  };

  if (!rolePermissions[user.email]?.includes(selectedRole)) {
    throw new Error(`User ${user.email} cannot access ${selectedRole} role`);
  }

  return {
    id: user._id.toString(),
    email: user.email,
    selectedRole
  };
}

export function createJWT(user: AuthUser): string {
  return jwt.sign(user, JWT_SECRET, { expiresIn: '24h' });
}

export async function verifyJWT(token: string): Promise<AuthUser | null> {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthUser;
  } catch {
    return null;
  }
}
