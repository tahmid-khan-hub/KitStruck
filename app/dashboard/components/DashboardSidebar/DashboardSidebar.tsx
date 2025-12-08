"use client";
import ActiveLink from "@/app/hooks/ActiveLink";
import Logo from "@/app/hooks/Logo";
import { signOut, useSession } from "next-auth/react";
import { AiFillHome } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { IoAddCircle, IoLogOut } from "react-icons/io5";
import { MdModeComment } from "react-icons/md";
import { RiShoppingBag3Fill, RiShoppingBag4Fill } from "react-icons/ri";

export default function DashboardSidebar() {
  const { data: session } = useSession();
  const role = session?.user?.role;

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
        {/* Links */}
        {role === "admin" ? (
        // admin dashboard links
          <>
            <li><ActiveLink href="/"><AiFillHome size={20}/><span className="mt-1 text-[16px] ml-1">Home</span></ActiveLink></li>
            <li><ActiveLink href="/dashboard/admin"><FaUserCircle size={20}/><span className="text-[16px] ml-1">Profile</span></ActiveLink></li>
            <li><ActiveLink href="/dashboard/admin/addJersey"><IoAddCircle size={20}/><span className="text-[16px] ml-1">Add Jersey</span></ActiveLink></li>
            <li><ActiveLink href="/dashboard/admin/manageUsers"><RiShoppingBag4Fill size={20}/><span className="text-[16px] ml-1 mt-1">Manage Orders</span></ActiveLink></li>
            <li onClick={() => signOut()}><ActiveLink><IoLogOut size={20}/><span className=" text-[16px] ml-1">Sign Out</span></ActiveLink></li>
          </>
        ) : (
        // user dashboard links
          <>
            <li><ActiveLink href="/"><AiFillHome size={20}/><span className="mt-1 text-[16px] ml-1">Home</span></ActiveLink></li>
            <li><ActiveLink href="/dashboard/user"><FaUserCircle size={20}/><span className="text-[16px] ml-1">Profile</span></ActiveLink></li>
            <li><ActiveLink href="/dashboard/user/myOrders"><RiShoppingBag3Fill size={20}/><span className="text-[16px] ml-1">My Orders</span></ActiveLink></li>
            <li><ActiveLink href="/dashboard/user/reviewPage"><MdModeComment size={20}/><span className=" text-[16px] ml-1">Review</span></ActiveLink></li>
            <li onClick={() => signOut()}><ActiveLink><IoLogOut size={20}/><span className=" text-[16px] ml-1">Sign Out</span></ActiveLink></li>
          </>
        )}
      </ul>
    </div>
  );
}
