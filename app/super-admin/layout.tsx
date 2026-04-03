import { SidebarProvider } from "@/context/sidebar-context";
import Header from "@/components/layout/header";
import { SuperAdminProvider } from "@/context/super-admin-context";
import MainWrapper from "@/components/layout/min-wrapper";

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  return (

    <SidebarProvider>
      <SuperAdminProvider>
      <Header />
      <MainWrapper>
        <main className={`p-6 transition-all duration-300`}>
          {children}
        </main>
      </MainWrapper>
      </SuperAdminProvider>
    </SidebarProvider>
  );
}