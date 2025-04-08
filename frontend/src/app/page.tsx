'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  // For language selector functionality
  const [language, setLanguage] = useState('english');
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col">
      {/* Navigation */}
      <nav className="w-full p-4 md:p-6 flex justify-between items-center border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-teal-500/50">
            <Image
              src="/logo.png"
              alt="Teacher Toolkit Logo"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-full"
              priority
            />
          </div>
          <span className="text-xl font-bold text-teal-400">Teacher Toolkit</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-2 py-1 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-sm"
          >
            <option value="english">English</option>
            <option value="kannada">ಕನ್ನಡ (Kannada)</option>
            <option value="hindi">हिंदी (Hindi)</option>
            <option value="tamil">தமிழ் (Tamil)</option>
            <option value="telugu">తెలుగు (Telugu)</option>
            <option value="marathi">मराठी (Marathi)</option>
          </select>
          
          <Link 
            href="/login" 
            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
          >
            Sign In
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="w-full py-16 px-4 md:px-10 flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto">
        <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Empowering Education <br/>
            <span className="text-teal-400">In Rural Communities</span>
          </h1>
          <p className="text-gray-300 text-lg mb-8 max-w-lg">
            Teacher Toolkit provides accessible learning tools that work online and offline, 
            supporting multiple languages to bridge the digital divide in rural education.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/register" 
              className="px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-center shadow-lg"
            >
              Create Free Account
            </Link>
            <Link 
              href="/learn-more" 
              className="px-6 py-3 bg-transparent border border-gray-600 hover:border-teal-400 text-gray-300 hover:text-teal-400 font-bold rounded-lg transition-all text-center"
            >
              Learn More
            </Link>
          </div>
        </div>
        
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md h-80 md:h-96">
            <Image
              src="/hero-image.png"
              alt="Students using Teacher Toolkit"
              fill
              style={{ objectFit: "contain" }}
              className="drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <h2 className="text-3xl font-bold text-center text-teal-400 mb-12">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-900/80 p-6 rounded-xl border border-gray-800 shadow-lg">
              <div className="w-12 h-12 bg-teal-500/20 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0v8" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Interactive Learning</h3>
              <p className="text-gray-300">
                Engage with interactive lessons, quizzes, and activities designed for various learning styles and accessibility needs.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gray-900/80 p-6 rounded-xl border border-gray-800 shadow-lg">
              <div className="w-12 h-12 bg-teal-500/20 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Offline Access</h3>
              <p className="text-gray-300">
                Download lessons and resources for offline use, ensuring continuous learning even without consistent internet connectivity.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gray-900/80 p-6 rounded-xl border border-gray-800 shadow-lg">
              <div className="w-12 h-12 bg-teal-500/20 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Multilingual Support</h3>
              <p className="text-gray-300">
                Access content in multiple regional languages including Kannada, Hindi, Tamil, Telugu, and Marathi to overcome language barriers.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-gray-900/80 p-6 rounded-xl border border-gray-800 shadow-lg">
              <div className="w-12 h-12 bg-teal-500/20 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Safe Learning Environment</h3>
              <p className="text-gray-300">
                A secure platform with age-appropriate content and controlled social interactions to ensure child safety.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-gray-900/80 p-6 rounded-xl border border-gray-800 shadow-lg">
              <div className="w-12 h-12 bg-teal-500/20 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Progress Tracking</h3>
              <p className="text-gray-300">
                Monitor learning progress with detailed analytics and insights, helping identify strengths and areas for improvement.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-gray-900/80 p-6 rounded-xl border border-gray-800 shadow-lg">
              <div className="w-12 h-12 bg-teal-500/20 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Low Resource Compatibility</h3>
              <p className="text-gray-300">
                Optimized for lower-end devices and slow connections, ensuring accessibility for students with limited technological resources.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 px-4 md:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Join Our Growing Community</h2>
          <p className="text-gray-300 text-lg mb-8">
            Start your learning journey today. Teacher Toolkit is helping thousands of students access quality education regardless of their location.
          </p>
          <Link 
            href="/register" 
            className="inline-block px-8 py-4 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white text-lg font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all shadow-lg"
          >
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 px-4 border-t border-gray-800 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-teal-500/50">
              <Image
                src="/logo.png"
                alt="Teacher Toolkit Logo"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
            <span className="text-sm font-medium text-gray-400">© 2025 Teacher Toolkit</span>
          </div>
          
          <div className="flex space-x-6">
            <Link href="/about" className="text-gray-400 hover:text-teal-400 text-sm">About</Link>
            <Link href="/contact" className="text-gray-400 hover:text-teal-400 text-sm">Contact</Link>
            <Link href="/privacy" className="text-gray-400 hover:text-teal-400 text-sm">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-400 hover:text-teal-400 text-sm">Terms of Use</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}