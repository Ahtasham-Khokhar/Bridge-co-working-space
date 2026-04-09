"use client";
import Image from "next/image";
import { useSidebar } from "@/context/sidebar-context";
import SuperadminSidebar from "../sidebar/superadmin";

export default function Header() {
  const { isOpen, toggle } = useSidebar();

  return (
    <>
      <SuperadminSidebar />

      {/* Push content right when sidebar is open — only on lg+ screens where sidebar pushes */}
      <div className={`transition-all duration-300 ${isOpen ? "lg:ml-64" : "ml-0"}`}>
        <div className="flex justify-between items-center bg-white border-b border-gray-100 px-3 sm:px-4 py-2 sm:py-3 shadow-sm">

          {/* Toggle Button */}
          <button
            onClick={toggle}
            className="p-2 rounded-xl hover:bg-yellow-50 hover:text-yellow-500 transition-colors"
            title={isOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isOpen ? (
              // Panel left close
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M9 3v18" /><path d="m16 15-3-3 3-3" />
              </svg>
            ) : (
              // Panel left open
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M9 3v18" /><path d="m14 9 3 3-3 3" />
              </svg>
            )}
          </button>

          {/* Right section */}
          <div className="flex gap-2 sm:gap-3 items-center">
            {/* Notification */}
            <button className="relative p-2 rounded-xl hover:bg-yellow-50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.268 21a2 2 0 0 0 3.464 0" />
                <path d="M20.002 14.464a9 9 0 0 0 .738.863A1 1 0 0 1 20 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 12 0c0 1.33.21 2.558.604 3.7" />
              </svg>
              {/* Notification dot */}
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-yellow-400 rounded-full" />
            </button>

            {/* User */}
            <div className="flex items-center gap-2 pl-2 border-l border-gray-100">
              <Image
                src="/auth/usericon.webp"
                alt="User"
                width={36}
                height={36}
                className="rounded-full ring-2 ring-yellow-400 w-8 h-8 sm:w-9 sm:h-9"
              />
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="text-sm font-semibold text-gray-800">Ahtasham Ashiq</span>
                <span className="text-xs text-gray-400">Super Admin</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}