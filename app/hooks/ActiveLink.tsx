"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  href?: string; // optional
  children: React.ReactNode;
}

export default function ActiveLink({ href, children }: Props) {
  const pathname = usePathname();
  const isActive = href ? pathname === href : false;

  const className = `flex px-3 py-3 font-semibold rounded-md transition ${
    isActive ? "border-2 border-gray-200" : "block px-3 py-2"
  }`;

  if (!href) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
