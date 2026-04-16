"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/sidebar-context";

const menuItems = [
  {
    label: "Dashboard",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
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
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" />
        <path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0Z" />
        <path d="M4 19v2" /><path d="M20 19v2" />
      </svg>
    ),
    children: [
      { label: "Floor Plan",      href: "./super-admin/features/floor-plan" },
      { label: "Available Seats", href: "/super-admin/seat-booking/available" },
      { label: "Reserve a Seat",  href: "/super-admin/seat-booking/reserve" },
      { label: "Seat Card",        href: "/super-admin/seat-booking/map" },
    ],
  },
  {
    label: "Inventory Management",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 8h14M5 8a2 2 0 1 0 0-4h14a2 2 0 1 0 0 4M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8m-9 4h4" />
      </svg>
    ),
    children: [
      { label: "All Inventory",    href: "/super-admin/inventory/all" },
      { label: "Add Item",         href: "/super-admin/inventory/add" },
      { label: "Stock Levels",     href: "/super-admin/inventory/stock" },
      { label: "Inventory Report", href: "/super-admin/inventory/report" },
    ],
  },
  {
    label: "Booking Management",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 2v4" /><path d="M16 2v4" />
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M3 10h18" /><path d="M8 14h.01" /><path d="M12 14h.01" />
        <path d="M16 14h.01" /><path d="M8 18h.01" /><path d="M12 18h.01" />
      </svg>
    ),
    children: [
      { label: "All Bookings",       href: "/super-admin/bookings/all" },
      { label: "Pending Approvals",  href: "/super-admin/bookings/pending" },
      { label: "Cancelled Bookings", href: "/super-admin/bookings/cancelled" },
      { label: "Booking Reports",    href: "/super-admin/bookings/reports" },
    ],
  },
  {
    label: "Financial Management",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    children: [
      { label: "Overview",     href: "/super-admin/financial/overview" },
      { label: "Transactions", href: "/super-admin/financial/transactions" },
      { label: "Invoices",     href: "/super-admin/financial/invoices" },
      { label: "Reports",      href: "/super-admin/financial/reports" },
    ],
  },
  {
    label: "Employee Management",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    children: [
      { label: "All Employees", href: "/super-admin/employees/all" },
      { label: "Add Employee",  href: "/super-admin/employees/add" },
      { label: "Roles",         href: "/super-admin/employees/roles" },
      { label: "Attendance",    href: "/super-admin/employees/attendance" },
    ],
  },
  {
    label: "Member",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    children: [
      { label: "All Members",    href: "/super-admin/members/all" },
      { label: "Add Member",     href: "/super-admin/members/add" },
      { label: "Memberships",    href: "/super-admin/members/memberships" },
      { label: "Member Reports", href: "/super-admin/members/reports" },
    ],
  },
  {
    label: "Invoice",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    children: [
      { label: "All Invoices",   href: "/super-admin/invoice/all" },
      { label: "Create Invoice", href: "/super-admin/invoice/create" },
      { label: "Paid",           href: "/super-admin/invoice/paid" },
      { label: "Overdue",        href: "/super-admin/invoice/overdue" },
    ],
  },
  {
    label: "Contact",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    children: [
      { label: "All Contacts", href: "/super-admin/contact/all" },
      { label: "Add Contact",  href: "/super-admin/contact/add" },
      { label: "Messages",     href: "/super-admin/contact/messages" },
      { label: "Support",      href: "/super-admin/contact/support" },
    ],
  },
  {
    label: "Setting",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    children: [
      { label: "General",       href: "/super-admin/settings/general" },
      { label: "Security",      href: "/super-admin/settings/security" },
      { label: "Notifications", href: "/super-admin/settings/notifications" },
      { label: "Billing",       href: "/super-admin/settings/billing" },
    ],
  },
];

export default function SuperadminSidebar() {
  const { isOpen, toggle } = useSidebar();
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>([""]);

  const toggleMenu = (label: string) => {
    setOpenMenus(prev =>
      prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
    );
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={toggle}
        />
      )}

      {/* ✅ Only width changed: 279px */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-secondary-white text-primary-light-black z-40 flex flex-col transition-all duration-300 ease-in-out ${
          isOpen ? "w-[279px]" : "w-0 overflow-hidden"
        }`}
      >
        {/* Logo */}
        <div className="mt-8 ml-4 mb-4 flex-shrink-0">
          <img src="./BridgeLogo.png" alt="Bridge Logo" />
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

                  {/* Parent — ✅ only font-size and weight changed */}
                  <button
                    onClick={() => toggleMenu(item.label)}
                    className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl transition-all ${
                      isActive
                        ? "bg-secondary-blue text-primary-white"
                        : "text-primary-dark-black hover:bg-secondary-white hover:text-secondary-blue"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      {/* ✅ icon 20x20 */}
                      <span className="flex-shrink-0 text-primary-dark-black w-5 h-5">{item.icon}</span>
                      {/* ✅ 14px not bold */}
                      <span className="whitespace-nowrap" style={{ fontSize: "14px", color:'text-primary-dark-black', fontWeight: 400 }}>
                        {item.label}
                      </span>
                    </span>
                    {/* ✅ dropdown arrow 20x20 */}
                    <img src="./svg/dropdown.svg" alt="dropdown" className={`flex-shrink-0 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                  </button>

                  {/* Children */}
                  <div className={`overflow-hidden transition-all duration-200 ${isExpanded ? "max-h-60 mt-1" : "max-h-0"}`}>
                    <div className="ml-4 pl-3 border-l border-white/10 space-y-0.5">
                      {item.children.map(child => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => {
                            if (window.innerWidth < 1024) toggle();
                          }}
                          className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all ${
                            pathname === child.href
                              ? "bg-secondary-blue text-primary-light-black font-semibold"
                              : "text-primary-dark-black hover:bg-white/10 hover:text-secondary-blue"
                          }`}
                        >
                      
                          {/* ✅ 14px not bold */}
                          <span className="whitespace-nowrap" style={{ fontSize: "14px", fontWeight: 400 }}>
                            {child.label}
                          </span>
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
                  if (window.innerWidth < 1024) toggle();
                }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  isActive
                    ? "bg-secondary-blue text-secondary-white"
                    : "text-primary-dark-black hover:bg-secondary-white hover:text-secondary-blue"
                }`}
              >
                {/* ✅ icon 20x20 */}
                <span className={`flex-shrink-0 w-5 h-5 ${isActive ? "text-secondary-white bg-secondary-blue" : "text-primary-dark-black bg-secondary-white"}`}>{item.icon}</span>
                {/* ✅ 14px not bold */}
                <span className="whitespace-nowrap" style={{ fontSize: "14px", fontWeight: 400 }}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Logout — ✅ original colors kept */}
        <div className="p-3 border-t border-white/10 flex-shrink-0">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-primary-dark-black hover:bg-red-500/20 hover:text-error transition-all">
            <span className="flex-shrink-0 w-5 h-5">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </span>
            <span className="whitespace-nowrap" style={{ fontSize: "14px", fontWeight: 400 }}>
              Logout
            </span>
          </button>
        </div>

      </aside>
    </>
  );
}