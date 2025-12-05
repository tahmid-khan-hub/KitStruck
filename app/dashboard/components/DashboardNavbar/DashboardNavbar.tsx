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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16" />
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
          <Image
            src={profilePic}
            alt="User"
            width={36}
            height={36}
            className="rounded-full object-cover border"
          />
        )}
      </div>
    </div>
  );
}
