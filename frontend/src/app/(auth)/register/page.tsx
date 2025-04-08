'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gradeLevel: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      // In production, this would call your Django backend API
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: formData.fullName,
          username: formData.username,
          password: formData.password,
          grade_level: formData.gradeLevel,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Registration failed');
      }

      // On successful registration
      router.push('/login?registered=true');
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-gray-900/80 rounded-xl shadow-2xl p-8 border border-gray-800">
        <div className="flex justify-center mb-6">
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

        <h1 className="text-2xl font-bold text-center text-teal-400 mb-6">
          Create Your Account
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-700 text-red-400 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label 
              htmlFor="fullName" 
              className="block text-gray-300 text-lg font-medium mb-2"
            >
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 placeholder-gray-400"
              placeholder="Enter your full name"
            />
          </div>

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
              placeholder="Choose a username"
            />
          </div>

          <div>
            <label 
              htmlFor="gradeLevel" 
              className="block text-gray-300 text-lg font-medium mb-2"
            >
              Grade Level
            </label>
            <select
              id="gradeLevel"
              name="gradeLevel"
              required
              value={formData.gradeLevel}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="">Select your grade</option>
              <option value="1">Grade 1</option>
              <option value="2">Grade 2</option>
              <option value="3">Grade 3</option>
              <option value="4">Grade 4</option>
              <option value="5">Grade 5</option>
              <option value="6">Grade 6</option>
              <option value="7">Grade 7</option>
              <option value="8">Grade 8</option>
              <option value="9">Grade 9</option>
              <option value="10">Grade 10</option>
              <option value="11">Grade 11</option>
              <option value="12">Grade 12</option>
            </select>
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
              placeholder="Create a password"
            />
          </div>

          <div>
            <label 
              htmlFor="confirmPassword" 
              className="block text-gray-300 text-lg font-medium mb-2"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 placeholder-gray-400"
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-150 ease-in-out mt-4 text-lg shadow-lg"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="text-center mt-8">
          <p className="text-gray-300 text-lg">
            Already have an account?{' '}
            <Link href="/login" className="text-teal-400 hover:text-teal-300 font-medium">
              Sign in
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