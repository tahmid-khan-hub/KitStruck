"use client";
import UseNavbar from "./UseNavbar";
import Link from "next/link";

const Navbar = () => {
  const { isOpen, setIsOpen, menuRef } = UseNavbar();

  const links = (
    <>
      <li>
        <Link href={"/"} className="font-semibold">
          Home
        </Link>
      </li>
      <li>
        <Link href={"/"} className="font-semibold">
          Jerseys
        </Link>
      </li>
      <li>
        <Link href={"/"} className="font-semibold">
          About
        </Link>
      </li>
    </>
  );
  return (
    <div className="sticky top-0 z-10 bg-background/55 backdrop-blur-md text-white">
      <div className="max-w-[1350px] mx-auto w-full flex items-center justify-between px-4 md:px-3 h-16">
        {/* Left side */}
        <Link href="/" className="font-passero text-xl font-bold text-black">
          KitStruck
        </Link>

        {/* Center links */}
        <div className="hidden lg:flex flex-1 justify-center">
          <ul className="flex gap-8 text-black">{links}</ul>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <button className="btn">Login</button>

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

            {isOpen && (
              <ul
                tabIndex={0}
                className="absolute right-0 mt-3 w-60 p-4 rounded-2xl shadow-lg
             bg-white border border-white/20 flex flex-col gap-4 z-50 text-black"
              >
                {links}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
