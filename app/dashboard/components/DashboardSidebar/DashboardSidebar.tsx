"use client";
import ActiveLink from "@/app/hooks/ActiveLink";
import Logo from "@/app/hooks/Logo";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function DashboardSidebar() {
  const { data: session } = useSession();
  const user = session?.user;
  const role = session?.user?.role;
  const imageSrc =
  user?.image && user.image.trim() !== "" ? user.image : null;

  return (
    <div
      data-aos="fade-right"
      className="drawer-side border-r border-r-gray-400"
    >
      <label
        htmlFor="my-drawer-2"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu text-base-content bg-white min-h-full w-80 p-4">
        {/* Logo */}
        <div className="flex items-center ml-2 mb-4">
          <Logo></Logo>
        </div>

        {/* user photo & name in sidebar */}
        {user && (
          <div className="hidden lg:flex flex-col items-center gap-2 p-2 rounded-lg mb-4 mt-5">
            {imageSrc ? (
            <Image
              src={imageSrc}
              alt="User"
              width={52}
              height={52}
              className="rounded-full object-cover border"
            />
          ) : (
            <Image
              src="/default-user.png"
              alt="Default User"
              width={52}
              height={52}
              className="rounded-full object-cover border"
            />
          )}
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
            <li><ActiveLink href="/">Home</ActiveLink></li>
            <li><ActiveLink href="">Sign Out</ActiveLink></li>
          </>
        ) : (
        // user dashboard links
          <>
            <li><ActiveLink href="/">Home</ActiveLink></li>
            <li><ActiveLink href="/dashboard/user/reviewPage">Review</ActiveLink></li>
            <li><ActiveLink href="">Sign Out</ActiveLink></li>
          </>
        )}
      </ul>
    </div>
  );
}
