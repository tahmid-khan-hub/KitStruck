"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  href: string;
  children: React.ReactNode;
}

export default function ActiveLink({ href, children }: Props) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`block px-3 py-2 font-semibold rounded-md transition ${
        isActive
          ? "border-2 border-gray-200"
          : "block px-3 py-2"
      }`}
    >
      {children}
    </Link>
  );
}
