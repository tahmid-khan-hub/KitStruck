"use client";
import Logo from "@/app/hooks/Logo";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function DashboardNavbar() {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <div className="navbar sticky top-0 z-50 bg-base-100 w-full lg:hidden">
      {/* menu */}
      <div className="flex-none">
        <label
          htmlFor="my-drawer-2"
          aria-label="open sidebar"
          className="btn btn-square btn-ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-6 w-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>

      {/* user display name & photo beside logo */}
      <div className="mx-2 flex-1 mb-1 lg:hidden">
        <div className="flex items-center">
          <Logo></Logo>
          {user && (
            <div className="flex items-center ml-auto">
              <Image
                src={user?.image ?? "/default-user.png"}
                alt="User"
                width={22}
                height={22}
                className="rounded-full object-cover ml-2"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
