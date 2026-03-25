"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  useEffect(() => {
    const role = localStorage.getItem("selectedRole");
    if (!role) router.push('/auth/login-type');
    else setSelectedRole(role);
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, selectedRole })
      });

      const data = await res.json();

      if (res.ok) {
        router.push(data.dashboard);
      } else {
        setError("" + (data.error || "Login failed"));
      }
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='login-wrapper min-h-screen flex flex-col justify-center items-center sm:pt-0'>
        <h1 className='text-2xl font-medium sm:text-2xl md:text-3xl lg:text-4xl mb-14 text-center'>
          Welcome to Bridge
        </h1>
        <div className='card bg-yellow-400 w-full max-w-md rounded-lg sm:px-0'>
          <div className='avatar flex flex-col justify-center items-center relative -mt-10 rounded-full'>
            <Image src="/auth/usericon.webp" className='rounded-full' loading='eager' width={80} height={80} alt='User Icon' />
            <p className='text-lg sm:text-lg md:text-xl lg:text-2xl font-medium capitalize'>
              {selectedRole} Log in
            </p>
          </div>

          <form onSubmit={handleSubmit} className='form flex flex-col gap-4 p-6'>
            <p className='text-lg sm:text-sm md:text-base lg:text-base'>Email</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={`e.g. ${selectedRole.toLowerCase()}@gmail.com`}
              className='bg-white p-2 rounded-2xl border border-gray-300 focus:border-black sm:text-sm md:text-base lg:text-base'
              required
            />

            <p className='text-lg sm:text-sm md:text-base lg:text-base'>Password</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter your password'
              className='bg-white p-2 rounded-2xl border border-gray-300 focus:border-black sm:text-sm md:text-base lg:text-base'
              required
            />

            <p className='text-right mt-4 sm:text-sm md:text-base lg:text-base'>Forgot password?</p>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className='bg-black sm:text-sm md:text-base lg:text-base text-white p-2 rounded-2xl hover:bg-gray-800 transition disabled:opacity-50'
            >
              {loading ? '🔄 Validating...' : `Login as ${selectedRole}`}
            </button>

            <p className='sm:text-sm md:text-lg lg:text-lg mt-2 text-center'>
              Don&apos;t have an account, <Link href="" className='hover:underline'>Signup</Link>
            </p>

            <button
              type="button"
              onClick={() => router.push('/auth/login-type')}
              className='text-sm text-center hover:underline font-medium'
            >
              ← Change Role
            </button>
          </form>
        </div>
      </div>
    </>
  );
}