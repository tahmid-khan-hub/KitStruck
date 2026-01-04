"use client";
import ActiveLink from "@/app/hooks/ActiveLink";
import Logo from "@/app/hooks/Logo";
import { signOut, useSession } from "next-auth/react";
import { AiFillHome } from "react-icons/ai";
import { FaTshirt, FaUserCircle } from "react-icons/fa";
import { FaRegChartBar } from "react-icons/fa6";
import { IoAddCircle, IoLogOut } from "react-icons/io5";
import { MdContactSupport, MdModeComment } from "react-icons/md";
import { RiCustomerService2Fill, RiShoppingBag3Fill, RiShoppingBag4Fill } from "react-icons/ri";
import { motion } from "framer-motion";
import { sidebarContainer, sidebarItem } from "./SidebarAnimation";

export default function DashboardSidebar() {
  const { data: session } = useSession();
  const role = session?.user?.role;

  const AdminDashboardLinks = <>
    <motion.li variants={sidebarItem}><ActiveLink href="/"><AiFillHome size={20}/><span className="mt-1 text-[16px] ml-1">Home</span></ActiveLink></motion.li>
    <motion.li variants={sidebarItem}><ActiveLink href="/dashboard/admin"><FaRegChartBar size={20}/><span className="text-[16px] ml-1 mt-0.5">Overview</span></ActiveLink></motion.li>
    <motion.li variants={sidebarItem}><ActiveLink href="/dashboard/admin/allJersey"><FaTshirt size={20}/><span className="text-[16px] ml-1 mt-0.5">All Jerseys</span></ActiveLink></motion.li>
    <motion.li variants={sidebarItem}><ActiveLink href="/dashboard/admin/addJersey"><IoAddCircle size={20}/><span className="text-[16px] ml-1">Add Jersey</span></ActiveLink></motion.li>
    <motion.li variants={sidebarItem}><ActiveLink href="/dashboard/admin/manageOrders"><RiShoppingBag4Fill size={20}/><span className="text-[16px] ml-1 mt-1">Manage Orders</span></ActiveLink></motion.li>
    <motion.li variants={sidebarItem}><ActiveLink href="/dashboard/admin/supportAndIssues"><MdContactSupport size={20}/><span className="text-[16px] ml-1 ">Support & Issues</span></ActiveLink></motion.li>
    <motion.li initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0,
      transition: { duration: 0.8, ease: [0.42, 0, 0.58, 1] },
    }}
    className="mt-1.5"
    onClick={() => signOut()}><button><IoLogOut size={20}/><span className=" text-[16px] ml-1 font-semibold">Sign Out</span></button></motion.li>
  </>;

  const UserDashboardLinks = <>
    <motion.li variants={sidebarItem}><ActiveLink href="/"><AiFillHome size={20}/><span className="mt-1 text-[16px] ml-1">Home</span></ActiveLink></motion.li>
    <motion.li variants={sidebarItem}><ActiveLink href="/dashboard/user"><FaUserCircle size={20}/><span className="text-[16px] ml-1">Profile</span></ActiveLink></motion.li>
    <motion.li variants={sidebarItem}><ActiveLink href="/dashboard/user/myOrders"><RiShoppingBag3Fill size={20}/><span className="text-[16px] ml-1">My Orders</span></ActiveLink></motion.li>
    <motion.li variants={sidebarItem}><ActiveLink href="/dashboard/user/reviewPage"><MdModeComment size={20}/><span className=" text-[16px] ml-1">Review</span></ActiveLink></motion.li>
    <motion.li variants={sidebarItem}><ActiveLink href="/dashboard/user/supportPage"><RiCustomerService2Fill size={20}/><span className=" text-[16px] ml-1">Support</span></ActiveLink></motion.li>
    <motion.li initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0,
      transition: { duration: 0.8, ease: [0.42, 0, 0.58, 1] },
    }}
    onClick={() => signOut()}><ActiveLink><IoLogOut size={20}/><span className=" text-[16px] ml-1 font-semibold">Sign Out</span></ActiveLink></motion.li>
  </>;

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
      <motion.ul variants={sidebarContainer} initial="hidden" animate="visible" 
      className="menu text-base-content bg-white min-h-full w-80 p-4">
        {/* Logo */}
        <div className="flex items-center ml-2 mb-4">
          <Logo></Logo>
        </div>
        {/* Dashboard Links */}
        {role === "admin" ? AdminDashboardLinks : UserDashboardLinks}
      </motion.ul>
    </div>
  );
}
