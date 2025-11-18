import Logo from "@/app/hooks/Logo";
import Link from "next/link";

const Footer = () => {
  const links = (
    <>
      <li>
        <Link href={"/About"} className="font-semibold hover:underline mr-6">
          {" "}
          About
        </Link>
      </li>
      <li>
        <Link href={"/faq"} className="font-semibold hover:underline mr-6">
          {" "}
          FaQ
        </Link>
      </li>
      <li>
        <Link href={"/terms"} className="font-semibold hover:underline mr-6">
          {" "}
          Terms & Conditions
        </Link>
      </li>
      <li>
        <Link href={"/policy"} className="font-semibold hover:underline mr-6">
          {" "}
          Privacy & Policy
        </Link>
      </li>
    </>
  );
  return (
    <footer className="bg-white text-black">
      <div className="max-w-[1350px] w-[96%] mx-auto px-4 md:px-3 py-8 md:flex md:items-center md:justify-between">
        {/* Left: Logo */}
        <div className="flex items-center mb-4 md:mb-0">
          <Logo></Logo>
        </div>

        {/* Center: Links */}
        <ul className="flex flex-wrap items-center mb-4 md:mb-0 text-sm font-medium text-black mr-5">
          {links}
        </ul>

        {/* Social Icons */}
        <div className="flex space-x-4">
          <a
            href={"https://www.facebook.com"}
            target="_blank"
            className="hover:text-blue-500"
          >
            <svg fill="currentColor" className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2c0-2 1-3 3-3h2v3h-2c-.5 0-1 .5-1 1v2h3l-.5 3h-2.5v7A10 10 0 0 0 22 12z" />
            </svg>
          </a>
          <a
            href={"https://x.com"}
            target="_blank"
            className="hover:text-sky-400"
          >
            <svg fill="currentColor" className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 0 1-3 1 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom copyright */}
      <hr className="border-gray-700 mx-4 " />
      <div className="text-center py-4 text-xs ml-0 md:ml-7 text-gray-500">
        &copy; {new Date().getFullYear()} KitStruck™. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
