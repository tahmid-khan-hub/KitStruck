"use client";
import { isValidUrl } from "@/app/hooks/isValidUrl";
import Logo from "@/app/hooks/Logo";
import { useSession } from "next-auth/react";
import Image from "next/image";

const ProfileSkeleton = () => (
  <div className="w-9 h-9 rounded-full bg-gray-300 animate-pulse"></div>
);

export default function DashboardNavbar() {
  const { data: session, status } = useSession();
  const user = session?.user;
  const profilePic =
    user?.image && user.image.trim() !== "" && isValidUrl(user.image)
      ? user.image
      : "/default_user.jpg";

  return (
    <div className="navbar sticky top-0 z-50 bg-base-100 w-full">
      <div className="flex-none lg:hidden">
        <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="h-6 w-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>
      </div>
      <div className="mx-2 flex-1 mb-1 lg:hidden">
        <Logo />
      </div>
      <div className="ml-auto flex items-center">
        {status === "loading" ? (
          <ProfileSkeleton />
        ) : (
          <div
            className="relative group cursor-pointer"
          >
            <Image
              src={profilePic}
              alt="User"
              width={36}
              height={36}
              className="rounded-full object-cover border w-12 h-12"
            />
            {/* Tooltip */}
            <div className="
                absolute right-0 translate-y-2
                hidden group-hover:block
                bg-black text-white text-sm 
                py-1 px-2 rounded-md 
                whitespace-nowrap shadow-lg
              "
            >
              {user?.name ?? "User"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
