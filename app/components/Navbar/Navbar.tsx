"use client";
import UseNavbar from './UseNavbar';
import Link from 'next/link';

const Navbar = () => {

    const { isOpen, setIsOpen, menuRef } = UseNavbar();

    const links = <>
        <li>
            <Link href={"/"} className="font-semibold">Home</Link>
        </li>
        <li>
            <Link href={"/"} className="font-semibold">Jerseys</Link>
        </li>
        <li>
            <Link href={"/"} className="font-semibold">About</Link>
        </li>
    </>
    return (
    <div className="navbar sticky top-0 z-10 bg-background/55 backdrop-blur-md text-white">
      <div className="max-w-[1350px] mx-auto w-full flex justify-between items-center px-4 md:px-3">
        {/* Left side */}
        <Link href="/" className="font-passero text-xl font-bold text-black">
          KitStruck
        </Link>

        {/* Right side */}
        <div className="navbar-end">
          <ul className="hidden lg:flex gap-5 text-black">{links}</ul>

          <button className='btn'>Login</button>

          {/* Mobile menu */}
          <div className="lg:hidden relative" ref={menuRef}>
            {/* Icon */}
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

            {/* Dropdown */}
            {isOpen && (
              <ul
                tabIndex={0}
                className="absolute right-0 mt-3 w-60 p-4 rounded-2xl shadow-lg
                 bg-white border border-white/20
                  flex flex-col gap-4 z-50 text-black"
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