'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // In production, this would call your Django backend API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Login failed');
      }

      // On successful login
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-gray-900/80 rounded-xl shadow-2xl p-8 border border-gray-800">
        <div className="flex justify-center mb-8">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-teal-500/50 shadow-lg shadow-teal-500/20">
            <Image
              src="/logo.png"
              alt="Teacher Toolkit Logo"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-full"
              priority
            />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-teal-400 mb-8">
          Welcome
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-700 text-red-400 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="username" 
              className="block text-gray-300 text-lg font-medium mb-2"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 placeholder-gray-400"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label 
              htmlFor="password" 
              className="block text-gray-300 text-lg font-medium mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 placeholder-gray-400"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-150 ease-in-out text-lg shadow-lg"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center mt-8">
          <p className="text-gray-300 text-lg">
            Don't have an account?{' '}
            <Link href="/register" className="text-teal-400 hover:text-teal-300 font-medium">
              Register here
            </Link>
          </p>
        </div>
      </div>

      {/* Language selector with updated styling */}
      <div className="mt-8 text-center bg-gray-900/80 px-6 py-3 rounded-lg border border-gray-800 shadow-lg">
        <label htmlFor="language" className="text-gray-300 mr-3">
          Select Language:
        </label>
        <select
          id="language"
          className="px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          defaultValue="english"
        >
          <option value="english">English</option>
          <option value="kannada">ಕನ್ನಡ (Kannada)</option>
          <option value="hindi">हिंदी (Hindi)</option>
          <option value="tamil">தமிழ் (Tamil)</option>
          <option value="telugu">తెలుగు (Telugu)</option>
          <option value="marathi">मराठी (Marathi)</option>
        </select>
      </div>
    </div>
  );
}