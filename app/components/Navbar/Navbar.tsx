"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Menu from "@/app/hooks/Menu";
import Logo from "@/app/hooks/Logo";
import { FaCartShopping } from "react-icons/fa6";
import NavLink from "@/app/hooks/NavLink";
import { MdLogin, MdLogout } from "react-icons/md";

const Navbar = () => {
  const { data: session, status } = useSession(); 
  const { isOpen, setIsOpen, menuRef } = Menu();

  const links = (
    <>
      <li className="transition-transform duration-200 hover:scale-110">
         <NavLink href="/">Home</NavLink>      
      </li>
      <li className="transition-transform duration-200 hover:scale-110">
         <NavLink href="/jerseys">Jerseys</NavLink>      
      </li>
      <li className="transition-transform duration-200 hover:scale-110">
         <NavLink href="/about">About</NavLink>      
      </li>
      {status === "loading" && (
        <div className="h-6 w-20 rounded bg-gray-200 animate-pulse"></div>
      )}
      {status === "authenticated" && (
        <li className="transition-transform duration-200 hover:scale-110">
          <NavLink href="/dashboard">Dashboard</NavLink>
        </li>
      )}
    </>
  );
  return (
    <div className="sticky top-0 z-10 bg-gray-50 text-white">
      <div className="max-w-[1350px] mx-auto w-full flex items-center justify-between px-4 md:px-3 h-16">
        {/* Left side */}
        <div className="inline-flex items-center justify-center p-2 
        rounded-full transition-all duration-200 hover:scale-110"><Logo></Logo></div>

        {/* Center links */}
        <div className="hidden lg:flex flex-1 justify-center">
          <ul className="flex gap-8 text-black">{links}</ul>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* cart */}
          <Link
            className=""
            href="/cart"
          >
            <FaCartShopping size={23} className="text-black transition-transform duration-200
          hover:text-blue-600 hover:scale-110" />
          </Link>
          {status === "loading" ? (
            <div className="h-8 w-9 bg-gray-200 rounded animate-pulse"></div>
          ) : session ? (
            <div className="relative group">
              <MdLogout className="text-blue-600 hover:border hover:border-blue-600 hover:bg-blue-600 hover:text-white hover:rounded-full p-1 hover:p-2
              transition-transform duration-200 hover:scale-110" onClick={() => signOut()} size={36}/>
              <div className="absolute right-0 translate-y-3 hidden group-hover:block bg-black text-white text-sm py-1 px-2 rounded-md whitespace-nowrap shadow-lg">Sign Out</div>
            </div>
            
          ) : (
            <div className="relative group"><Link href="/sign-in"><MdLogin className="text-blue-600 hover:border hover:border-blue-600 hover:bg-blue-600 hover:text-white hover:rounded-full p-1 hover:p-2 transition-transform duration-200 hover:scale-110" size={36}/></Link>
            <div className="absolute right-0 translate-y-3 hidden group-hover:block bg-black text-white text-sm py-1 px-2 rounded-md whitespace-nowrap shadow-lg">Sign In</div></div>
          )}
          {/* Mobile menu */}
          <div className="lg:hidden relative" ref={menuRef}>
            <label
              tabIndex={0}
              className="cursor-pointer"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>

            <AnimatePresence>
              {isOpen && (
              <motion.ul
                key="mobile-menu"
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                tabIndex={0}
                className="absolute right-0 mt-3 w-60 p-4 rounded-2xl shadow-lg
             bg-white border border-white/20 flex flex-col gap-4 z-50 text-black"
              >
                {links}
              </motion.ul>
            )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
