'use client';
import React, { useState, useRef } from "react";
import Link from "next/link";
import { useAuth } from '@/context/AuthContext';

export default function LandingHeader() {
  const { user, signOut } = useAuth();
  const [showDashboardDropdown, setShowDashboardDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dashboardTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const profileTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleDashboardMouseEnter = () => {
    if (dashboardTimeoutRef.current) {
      clearTimeout(dashboardTimeoutRef.current);
    }
    setShowDashboardDropdown(true);
  };

  const handleDashboardMouseLeave = () => {
    dashboardTimeoutRef.current = setTimeout(() => {
      setShowDashboardDropdown(false);
    }, 500);
  };

  const handleProfileMouseEnter = () => {
    if (profileTimeoutRef.current) {
      clearTimeout(profileTimeoutRef.current);
    }
    setShowProfileDropdown(true);
  };

  const handleProfileMouseLeave = () => {
    profileTimeoutRef.current = setTimeout(() => {
      setShowProfileDropdown(false);
    }, 500);
  };

  const handleSignOut = async () => {
    await signOut();
    setShowProfileDropdown(false);
  };

  return (
    <div className="absolute top-0 left-0 w-full z-50">
      {/* Navigation Container */}
      <div className="flex items-center justify-between w-full max-w-[1800px] mx-auto h-full relative" style={{ minHeight: '3.8vw', height: 'clamp(36px, 4.75vw, 60px)' }}>
        {/* Left Links */}
        <div className="flex items-center gap-6 min-w-[180px] z-10 ml-7">
          <Link href="/leaderboard" className="font-normal text-white transition-colors hover:text-gray-200" style={{ fontSize: 'min(1.294vw, 19px)', transform: 'translateY(0.7px)' }}>Rankings</Link>
        </div>
        
        {/* Right Links */}
        <div className="flex items-center gap-6 min-w-[100px] justify-end z-10 mr-7">
          {/* Dashboard with Dropdown */}
          <div 
            className="relative"
            onMouseEnter={handleDashboardMouseEnter}
            onMouseLeave={handleDashboardMouseLeave}
          >
            <Link 
              href="/dashboard" 
              className="font-normal text-white transition-colors hover:text-gray-200" 
              style={{ fontSize: 'min(1.294vw, 19px)', transform: 'translateY(4.5px)' }}
            >
              Dashboard
            </Link>
            
            {/* Dashboard Dropdown Menu */}
            {showDashboardDropdown && (
              <div 
                className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg border border-gray-200 py-1 z-50 rounded-md"
                onMouseEnter={handleDashboardMouseEnter}
                onMouseLeave={handleDashboardMouseLeave}
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
          
          {/* Conditional Render: Profile Dropdown or Sign In */}
          {user ? (
            <div 
              className="relative"
              onMouseEnter={handleProfileMouseEnter}
              onMouseLeave={handleProfileMouseLeave}
            >
              {/* Circular Profile Icon */}
              <button 
                className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center font-medium"
                style={{ fontSize: 'min(1.1vw, 16px)' }}
              >
                {user.email?.charAt(0).toUpperCase()}
              </button>
              
              {/* Profile Dropdown Menu */}
              {showProfileDropdown && (
                <div 
                  className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg border border-gray-200 py-1 z-50 rounded-md"
                  onMouseEnter={handleProfileMouseEnter}
                  onMouseLeave={handleProfileMouseLeave}
                >
                  <Link 
                    href="/saved" 
                    className="block px-4 py-2 text-blue-600 hover:bg-gray-50 transition-colors text-sm"
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    Saved
                  </Link>
                  <Link 
                    href="/messages" 
                    className="block px-4 py-2 text-blue-600 hover:bg-gray-50 transition-colors text-sm"
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    Messages
                  </Link>
                  <Link 
                    href="/account/settings" 
                    className="block px-4 py-2 text-blue-600 hover:bg-gray-50 transition-colors text-sm"
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    Account Settings
                  </Link>
                  <div className="border-t border-gray-200 my-1"></div>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50 transition-colors text-sm"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div 
              className="relative"
              onMouseEnter={handleProfileMouseEnter}
              onMouseLeave={handleProfileMouseLeave}
            >
              <Link 
                href="/signin" 
                className="font-normal text-white transition-colors hover:text-gray-200 flex items-center" 
                style={{ fontSize: 'min(1.294vw, 19px)', transform: 'translateY(0.7px)' }}
              >
                Sign In
              </Link>
              
              {/* Sign In Dropdown Menu */}
              {showProfileDropdown && (
                <div 
                  className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg border border-gray-200 py-1 z-50 rounded-md"
                  onMouseEnter={handleProfileMouseEnter}
                  onMouseLeave={handleProfileMouseLeave}
                >
                  <Link 
                    href="/saved" 
                    className="block px-4 py-2 text-blue-600 hover:bg-gray-50 transition-colors text-sm"
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    Saved
                  </Link>
                  <Link 
                    href="/messages" 
                    className="block px-4 py-2 text-blue-600 hover:bg-gray-50 transition-colors text-sm"
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    Messages
                  </Link>
                  <Link 
                    href="/account/settings" 
                    className="block px-4 py-2 text-blue-600 hover:bg-gray-50 transition-colors text-sm"
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    Account Settings
                  </Link>
                  <div className="border-t border-gray-200 my-1"></div>
                  <Link 
                    href="/signin" 
                    className="block px-4 py-2 text-blue-600 hover:bg-gray-50 transition-colors text-sm"
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
