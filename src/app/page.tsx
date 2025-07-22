'use client';
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { useState, useRef } from "react";

export default function LandingPage() {
  const [showDashboardDropdown, setShowDashboardDropdown] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowDashboardDropdown(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowDashboardDropdown(false);
    }, 500);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="text-white w-full absolute top-0 left-0 z-20" style={{ minHeight: '3.8vw', height: 'clamp(36px, 4.75vw, 60px)' }}>
        {/* Navigation Container */}
        <div className="flex items-center justify-between w-full max-w-[1800px] mx-auto h-full relative">
          {/* Left Links */}
          <div className="flex items-center gap-6 min-w-[180px] z-10 ml-7">
            <Link href="/leaderboard" className="font-normal transition-colors hover:text-gray-200" style={{ fontSize: 'min(1.294vw, 19px)', transform: 'translateY(0.7px)' }}>Rankings</Link>
            <Link href="/vote" className="font-normal transition-colors hover:text-gray-200" style={{ fontSize: 'min(1.294vw, 19px)', transform: 'translateY(0.7px)' }}>Vote</Link>
          </div>
          
          {/* Right Links */}
          <div className="flex items-center gap-6 min-w-[100px] justify-end z-10 mr-7">
            {/* Dashboard with Dropdown */}
            <div 
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link 
                href="/dashboard" 
                className="font-normal transition-colors hover:text-gray-200" 
                style={{ fontSize: 'min(1.294vw, 19px)', transform: 'translateY(2.5px)' }}
              >
                Dashboard
              </Link>
              
              {/* Dropdown Menu */}
              {showDashboardDropdown && (
                <div 
                  className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg border border-gray-200 py-1 z-50 rounded-md"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link 
                    href="/upload" 
                    className="block px-4 py-2 text-blue-600 hover:bg-gray-50 transition-colors text-sm"
                  >
                    Upload Property
                  </Link>
                </div>
              )}
            </div>
            
            {/* Sign In with Dropdown */}
            <div 
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link 
                href="/signin" 
                className="font-normal transition-colors hover:text-gray-200 flex items-center" 
                style={{ fontSize: 'min(1.294vw, 19px)', transform: 'translateY(0.7px)' }}
              >
                Sign In
              </Link>
              
              {/* Sign In Dropdown Menu */}
              {showDashboardDropdown && (
                <div 
                  className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg border border-gray-200 py-1 z-50 rounded-md"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link 
                    href="/saved" 
                    className="block px-4 py-2 text-blue-600 hover:bg-gray-50 transition-colors text-sm"
                  >
                    Saved
                  </Link>
                  <Link 
                    href="/messages" 
                    className="block px-4 py-2 text-blue-600 hover:bg-gray-50 transition-colors text-sm"
                  >
                    Messages
                  </Link>
                  <Link 
                    href="/account/settings" 
                    className="block px-4 py-2 text-blue-600 hover:bg-gray-50 transition-colors text-sm"
                  >
                    Account Settings
                  </Link>
                  <div className="border-t border-gray-200 my-1"></div>
                  <Link 
                    href="/signin" 
                    className="block px-4 py-2 text-blue-600 hover:bg-gray-50 transition-colors text-sm"
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-400 to-blue-500 text-white min-h-[90vh] flex items-center py-24 px-8">
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="mb-8 animate-bounce-slow">
            <Zap className="w-16 h-16 mx-auto mb-4 text-white" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Crib
          <span className="block text-white/90">
            Clash
          </span>
        </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            The ultimate college dorm battle. Vote on apartments, climb the rankings, and see which dorms rule your campus.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/vote"
              className="px-8 py-2 rounded-full bg-white text-blue-600 font-semibold text-lg shadow hover:bg-gray-100 transition flex items-center justify-center"
            >
              Start Voting <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/upload"
              className="px-8 py-2 rounded-full border-2 border-white text-white font-semibold text-lg shadow hover:bg-white hover:text-blue-600 transition flex items-center justify-center"
            >
              Submit Your Dorm
            </Link>
          </div>
          <p className="text-sm mt-6 opacity-80">Join 10,000+ students already voting</p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-32 px-8 bg-gray-50 min-h-[60vh] flex items-center">
        <div className="max-w-4xl mx-auto text-center w-full">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 mb-12">
            See two apartments. Vote your favorite. Rankings update live. It's that simple.
          </p>
          {/* Voting Interface Preview */}
          <div className="bg-white rounded-2xl shadow-2xl border border-blue-100 p-12 max-w-4xl mx-auto">
            <div className="grid grid-cols-2 w-full">
              {/* Left half */}
              <div className="flex-1 flex flex-col items-center">
                <div className="flex flex-1 w-full justify-center">
                  <div className="flex flex-col gap-6 w-full max-w-2xl items-center text-center mx-auto">
                    {/* Smith Hall content */}
                    <div className="w-full h-48 bg-gray-300 rounded-lg mb-4 flex items-center justify-center">
                      <span className="text-gray-500">Apartment Image</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Smith Hall 204</h3>
                    <p className="text-gray-600 mb-3">Cozy single with great natural light</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">#12</span>
                      <button className="px-8 py-2 rounded-full bg-blue-500 text-white font-semibold text-lg shadow hover:bg-blue-600 transition flex items-center justify-center">
                        Vote This Dorm <span className="ml-2">❤️</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Right half */}
              <div className="flex-1 flex flex-col items-center">
                <div className="flex flex-1 w-full justify-center">
                  <div className="flex flex-col gap-6 w-full max-w-2xl items-center text-center mx-auto">
                    {/* East Campus content */}
                    <div className="w-full h-48 bg-gray-300 rounded-lg mb-4 flex items-center justify-center">
                      <span className="text-gray-500">Apartment Image</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">East Campus 156</h3>
                    <p className="text-gray-600 mb-3">Spacious double with modern amenities</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">#8</span>
                      <button className="px-8 py-2 rounded-full bg-blue-500 text-white font-semibold text-lg shadow hover:bg-blue-600 transition flex items-center justify-center">
                        Vote This Dorm <span className="ml-2">❤️</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center text-gray-500 mt-6">This is how voting works - choose between two apartments!</p>
          </div>
        </div>
      </section>

      {/* Top Ranked Section */}
      <section className="py-32 px-8 min-h-[60vh] flex items-center">
        <div className="max-w-6xl mx-auto text-center w-full">
          <div className="text-4xl mb-4">👑</div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Top Ranked Apartments</h2>
          <p className="text-xl text-gray-600 mb-12">
            These legendary apartments have earned their spot at the top. Will yours be next?
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Rank 1 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="w-full h-48 bg-gray-300 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-gray-500">Apartment Image</span>
              </div>
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold inline-block mb-2">#1</div>
              <h3 className="text-xl font-bold mb-1">Sunset Towers 505</h3>
              <p className="text-gray-600 mb-3">State University</p>
              <div className="flex items-center justify-between text-sm">
                <span>⭐ 4.9</span>
                <span>📈 2,847 votes</span>
              </div>
              <p className="text-green-600 text-sm mt-2">Trending up</p>
            </div>
            {/* Rank 2 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="w-full h-48 bg-gray-300 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-gray-500">Apartment Image</span>
              </div>
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold inline-block mb-2">#2</div>
              <h3 className="text-xl font-bold mb-1">The Commons 112</h3>
              <p className="text-gray-600 mb-3">Metro College</p>
              <div className="flex items-center justify-between text-sm">
                <span>⭐ 4.8</span>
                <span>📈 2,654 votes</span>
              </div>
              <p className="text-green-600 text-sm mt-2">Trending up</p>
            </div>
            {/* Rank 3 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="w-full h-48 bg-gray-300 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-gray-500">Apartment Image</span>
              </div>
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold inline-block mb-2">#3</div>
              <h3 className="text-xl font-bold mb-1">Riverside Dorms 308</h3>
              <p className="text-gray-600 mb-3">Tech Institute</p>
              <div className="flex items-center justify-between text-sm">
                <span>⭐ 4.7</span>
                <span>📈 2,401 votes</span>
              </div>
              <p className="text-green-600 text-sm mt-2">Trending up</p>
            </div>
          </div>
          <p className="text-gray-600 mb-6">Want to see your apartment climb the ranks?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/upload" className="px-8 py-2 rounded-full bg-blue-500 text-white font-semibold text-lg shadow hover:bg-blue-600 transition flex items-center justify-center">
              Submit Your Apartment
            </Link>
            <Link href="/leaderboard" className="px-8 py-2 rounded-full border-2 border-blue-500 text-blue-500 font-semibold text-lg shadow hover:bg-blue-500 hover:text-white transition flex items-center justify-center">
              View Full Rankings
            </Link>
          </div>
        </div>
      </section>

      {/* Share the Battle Section (Join the Battle) */}
      <section className="py-32 px-8 bg-blue-400 min-h-[60vh] flex flex-col items-center justify-center">
        <div className="max-w-4xl mx-auto text-center w-full">
          <h2 className="text-4xl font-bold text-white mb-4">Share the Battle</h2>
          <p className="text-xl text-white/90 mb-12">
            Show off your apartment's ranking or challenge friends to vote. Let's make this viral!
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Instagram Stories */}
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">📸</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Instagram Stories</h3>
              <p className="text-gray-600 mb-4 text-sm">Share your apartment's ranking with custom story templates</p>
              <button className="px-8 py-2 rounded-full border-2 border-blue-500 text-blue-500 font-semibold text-lg shadow hover:bg-blue-500 hover:text-white transition">Create Story</button>
            </div>
            {/* TikTok Challenge */}
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl text-white">🎤</span>
              </div>
              <h3 className="font-bold text-lg mb-2">TikTok Challenge</h3>
              <p className="text-gray-600 mb-4 text-sm">Start the #RateMyDorm trend on your campus</p>
              <button className="px-8 py-2 rounded-full border-2 border-blue-500 text-blue-500 font-semibold text-lg shadow hover:bg-blue-500 hover:text-white transition">Join Challenge</button>
            </div>
            {/* Share Link */}
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🔗</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Share Link</h3>
              <p className="text-gray-600 mb-4 text-sm">Get your friends to vote with a shareable link</p>
              <button className="px-8 py-2 rounded-full border-2 border-blue-500 text-blue-500 font-semibold text-lg shadow hover:bg-blue-500 hover:text-white transition">Copy Link</button>
            </div>
          </div>
          <p className="text-white/90 mb-6">Ready to become the talk of your campus?</p>
          <button className="px-8 py-2 rounded-full bg-white text-blue-500 font-semibold text-lg shadow hover:bg-blue-100 transition">Start Your Rate My Dorm Journey</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Rate My Dorm</h3>
              <p className="text-gray-400 text-sm">
                The ultimate college apartment battle platform. Vote, rank, and discover the best apartments on campus.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Platform</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><Link href="/vote" className="hover:text-white transition">How It Works</Link></li>
                <li><Link href="/leaderboard" className="hover:text-white transition">Rankings</Link></li>
                <li><Link href="/upload" className="hover:text-white transition">Submit Apartment</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Community</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>Discord</li>
                <li>Reddit</li>
                <li>Blog</li>
                <li>Events</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}