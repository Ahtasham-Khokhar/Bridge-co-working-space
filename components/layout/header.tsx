"use client";
import Image from "next/image";
import { useState } from "react";
import { useSidebar } from "@/context/sidebar-context";

export default function Header() {
  const { isOpen, toggle } = useSidebar();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="flex justify-between items-center bg-secondary-white w-full h-[70px] px-4 shadow-sm">
      
      {/* Toggle Button */}
      <button
        onClick={toggle}
        className="p-2 rounded-xl hover:bg-background transition-colors"
        title={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {/* ... SVG remains the same ... */}
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M9 3v18" /><path d="m16 15-3-3 3-3" /></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M9 3v18" /><path d="m14 9 3 3-3 3" /></svg>
        )}
      </button>

      {/* Right section */}
      <div className="flex items-center gap-2">
        
        {/* Notification */}
        <button className="relative p-2 rounded-xl hover:bg-background transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.268 21a2 2 0 0 0 3.464 0" /><path d="M20.002 14.464a9 9 0 0 0 .738.863A1 1 0 0 1 20 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 12 0c0 1.33.21 2.558.604 3.7" /></svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary-yellow rounded-full" />
        </button>

        <div className="w-px h-8 bg-border mx-1" />

        {/* --- KEY CHANGE HERE --- */}
        {/* We wrap the entire interactive user area in a relative container */}
        <div className="relative">
          <div 
            className="flex items-center gap-2 cursor-pointer p-1 rounded-lg hover:bg-background transition-colors"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <Image
              src="/auth/usericon.webp"
              alt="User"
              width={36}
              height={36}
              className="rounded-full ring-2 ring-secondary-yellow flex-shrink-0"
            />
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-sm font-semibold text-foreground whitespace-nowrap">Ahtasham Ashiq</span>
              <span className="text-xs text-primary-text">Super Admin</span>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              className={`transition-transform duration-200 text-primary-text ${dropdownOpen ? "rotate-180" : ""}`}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>

          {/* Dropdown - Now correctly anchored */}
          {dropdownOpen && (
            <div className="absolute top-[120%] right-0 w-48 bg-white border border-border rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in duration-200">
              <div className="px-4 py-3 border-b border-border bg-slate-50/50">
                <p className="text-sm font-semibold text-foreground uppercase tracking-wider">Account</p>
              </div>
              
              <div className="p-1">
                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-background rounded-lg transition-colors">
                   {/* I suggest using a user or settings icon here instead of more.svg */}
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                   Profile
                </button>
                
                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-error hover:bg-red-50 rounded-lg transition-colors">
                  {/* Logout Icon */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}