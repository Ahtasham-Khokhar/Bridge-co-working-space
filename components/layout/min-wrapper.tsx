"use client";
import { useSidebar } from "@/context/sidebar-context";

export default function MainWrapper({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebar();
  return (
    <div className={`transition-all duration-300 ${isOpen ? "lg:ml-64" : "ml-0"}`}>
      {children}
    </div>
  );
}