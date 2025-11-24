"use client";
import { usePathname } from "next/navigation";

export default function LayoutVisibility({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <>
      {/* Only show children (Navbar, Banner, Footer) when NOT dashboard */}
      {!isDashboard && children}
    </>
  );
}
