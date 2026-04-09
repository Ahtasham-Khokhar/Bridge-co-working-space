import { SidebarProvider } from "@/context/sidebar-context";
import Header from "@/components/layout/header";
import { SuperAdminProvider } from "@/context/super-admin-context";
import MainWrapper from "@/components/layout/min-wrapper";
import SuperadminSidebar from "@/components/sidebar/superadmin";

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <SuperAdminProvider>

        <SuperadminSidebar />  
        <MainWrapper>
          <Header />
          <main className="p-3 sm:p-4 lg:p-6 transition-all duration-300">
            {children}
          </main>
        </MainWrapper>

      </SuperAdminProvider>
    </SidebarProvider>
  );
}