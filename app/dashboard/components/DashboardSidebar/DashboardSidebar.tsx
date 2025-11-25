"use client";
import Logo from "@/app/hooks/Logo";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function DashboardSidebar() {
  const { data: session } = useSession();
  const user = session?.user;
  const role = session?.user?.role;

  return (
    <div
      data-aos="fade-right"
      className="drawer-side border-r border-r-orange-500"
    >
      <label
        htmlFor="my-drawer-2"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu text-base-content min-h-full w-80 p-4">
        {/* Logo */}
        <div className="flex items-center ml-2 mb-4">
          <Logo></Logo>
        </div>

        {/* user photo & name in sidebar */}
        {user && (
          <div className="hidden lg:flex flex-col items-center gap-2 p-2 rounded-lg mb-4 mt-5">
            <Image
              src={user?.image ?? "/default-user.png"}
              alt="User"
              width={22}
              height={22}
              className="rounded-full object-cover border"
            />
            <span className="font-semibold text-xl mt-2">
              {user.name}
            </span>
            <span className="font-medium text-gray-500 ">{user.email}</span>
          </div>
        )}

        {/* Links */}
        {role === "admin" ? (
        // admin dashboard links
          <>
            <li><Link href={"/"}></Link>Home</li>
            <li><Link href={"/"}></Link>Sign Out</li>
          </>
        ) : (
        // user dashboard links
          <>
            <li><Link href={"/"}></Link>Home</li>
            <li><Link href={"/"}></Link>Sign Out</li>
          </>
        )}
      </ul>
    </div>
  );
}
