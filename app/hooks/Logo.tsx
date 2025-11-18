"use client";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <div>
      <Link href="/" className="font-passero text-xl font-bold text-black flex">
        <Image
          src={"/Navbar-logo.png"}
          alt="Kitstruck-logo"
          width={40}
          height={40}
        ></Image>
        <span className="mt-3 ml-1 text-gray-700">KitStruck</span>
      </Link>
    </div>
  );
};

export default Logo;
