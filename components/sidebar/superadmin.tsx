"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/sidebar-context";

const menuItems = [
  {
    label: "Dashboard",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
    href: "/super-admin",
  },
  {
    label: "Seat Booking",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" />
        <path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0Z" />
        <path d="M4 19v2" /><path d="M20 19v2" />
      </svg>
    ),
    children: [
      { label: "Floor Plan",      href: "/super-admin/seat-booking/floor-plan" },
      { label: "Available Seats", href: "/super-admin/seat-booking/available" },
      { label: "Reserve a Seat",  href: "/super-admin/seat-booking/reserve" },
      { label: "Seat Map",        href: "/super-admin/seat-booking/map" },
    ],
  },
  {
    label: "Booking Management",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 2v4" /><path d="M16 2v4" />
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M3 10h18" /><path d="M8 14h.01" /><path d="M12 14h.01" />
        <path d="M16 14h.01" /><path d="M8 18h.01" /><path d="M12 18h.01" />
      </svg>
    ),
    children: [
      { label: "All Bookings",      href: "/super-admin/bookings/all" },
      { label: "Pending Approvals", href: "/super-admin/bookings/pending" },
      { label: "Cancelled Bookings",href: "/super-admin/bookings/cancelled" },
      { label: "Booking Reports",   href: "/super-admin/bookings/reports" },
    ],
  },
  {
    label: "Members",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    href: "/super-admin/members",
  },
  {
    label: "Settings",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    href: "/super-admin/settings",
  },
];

export default function SuperadminSidebar() {
  const { isOpen, toggle } = useSidebar();
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>(["Seat Booking"]);

  const toggleMenu = (label: string) => {
    setOpenMenus(prev =>
      prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
    );
  };

  return (
    <>
      {/* Mobile backdrop overlay — only visible on small screens when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={toggle}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen bg-secondary-white text-primary-light-black z-40 flex flex-col transition-all duration-300 ease-in-out ${
          isOpen ? "w-64" : "w-0 overflow-hidden"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
          <div className="bg-secondary-yellow rounded-lg w-8 h-8 flex items-center justify-center flex-shrink-0">
            <span className="text-primary-light-black font-black text-sm">B</span>
          </div>
          <span className="font-bold text-lg tracking-wide whitespace-nowrap">Bridge</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {menuItems.map(item => {
            const isActive = item.href
              ? pathname === item.href
              : item.children?.some(c => pathname.startsWith(c.href));
            const isExpanded = openMenus.includes(item.label);

            if (item.children) {
              return (
                <div key={item.label}>
                  {/* Parent */}
                  <button
                    onClick={() => toggleMenu(item.label)}
                    className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium ${
                      isActive
                        ? "bg-secondary-blue text-primary-light-black"
                        : "text-primary-dark-black hover:bg-white/10 hover:text-secondary-blue"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      {item.icon}
                      <span className="whitespace-nowrap">{item.label}</span>
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                      className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>

                  {/* Children */}
                  <div className={`overflow-hidden transition-all duration-200 ${isExpanded ? "max-h-60 mt-1" : "max-h-0"}`}>
                    <div className="ml-4 pl-3 border-l border-white/10 space-y-0.5">
                      {item.children.map(child => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => {
                            // Close sidebar on mobile after navigation
                            if (window.innerWidth < 1024) toggle();
                          }}
                          className={`block px-3 py-2 rounded-xl text-sm transition-all whitespace-nowrap ${
                          pathname === child.href
                              ? "bg-secondary-blue text-primary-light-black font-semibold"
                              : "text-primary-dark-black hover:bg-white/10 hover:text-secondary-blue"
                          }`}
                      >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href!}
                onClick={() => {
                  // Close sidebar on mobile after navigation
                  if (window.innerWidth < 1024) toggle();
                }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-secondary-blue text-primary-light-black"
                    : "text-primary-light-black/70 hover:bg-white/10 hover:text-secondary-blue"
                }`}
              >
                {item.icon}
                <span className="whitespace-nowrap">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom logout */}
        <div className="p-3 border-t border-white/10">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-primary-dark-black hover:bg-red-500/20 hover:text-error transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span className="whitespace-nowrap">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}