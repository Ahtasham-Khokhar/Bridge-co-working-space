
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <div className="text-center">{children}</div>
   
  );
}
