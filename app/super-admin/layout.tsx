import { SuperAdminProvider } from "@/context/super-admin-context";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SuperAdminProvider>
   <div className="">{children}</div>
    </SuperAdminProvider>
   
  );
}
