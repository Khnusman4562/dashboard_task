"use client";

import { useState } from "react";

const navLinks = [
  { name: "Dashboard", active: true },
  { name: "Analytics", active: false },
  { name: "Files", active: false },
  { name: "Settings", active: false },
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm/5">
      <div className="max-w-[1800px] mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Brand/Logo Section */}
          <div className="flex items-center gap-4 md:gap-8">
            <div className="flex items-center gap-2.5">
              <div className="flex flex-col">
                <span className="text-base md:text-lg font-bold text-[#004AC6] leading-none tracking-tight">DataCentral</span>
                <span className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Enterprise Analytics</span>
              </div>
            </div>

            {/* Main Navigation */}
            <nav className="hidden md:flex items-center p-1 ">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => setActiveTab(link.name)}
                  className={`px-2.5 py-1.5 text-xs rounded-md transition-all duration-200 ${
                    activeTab === link.name
                      ? "text-indigo-600 font-bold underline underline-offset-8 decoration-2"
                      : "text-gray-500 font-normal hover:text-gray-800"
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative hidden lg:block group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-3.5 w-3.5 text-gray-400 group-focus-within:text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="w-58 pl-8 pr-3 py-2 bg-gray-50 border-none ring-2 rounded-2xl text-xs ring-transparent focus:ring-2 focus:ring-indigo-100 focus:w-58 transition-all outline-none"
              />
            </div>

            {/* Notifications */}
            <div className="flex items-center border-l border-gray-100 pl-4 ml-2">
              <button className="relative p-1.5 text-gray-400 hover:text-gray-600 transition-colors">
                <img src="/bell_icon.svg" alt="Notifications" className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-indigo-500 border border-white rounded-full"></span>
              </button>
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-3">
              
              <div className="w-9 h-9 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden shadow-sm">
                <img 
                  src="/profile_icon.svg" 
                  alt="Alex Rivera" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
