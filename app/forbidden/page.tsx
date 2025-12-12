"use client";

import Image from "next/image";
import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gray-50">
      {/* IMAGE */}
      <div className="relative w-72 h-72 md:w-96 md:h-96">
        <Image
          src="/forbidden.png"
          alt="403 Forbidden"
          fill
          className="object-contain "
        />
      </div>

      {/* TEXT */}
      <div className="-mt-12 mb-24">
        <h1 className="text-5xl font-extrabold text-blue-600 mt-6">403</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mt-2">
          Access Forbidden
        </h2>

        <p className="text-gray-600 max-w-md mt-3">
          You don’t have permission to enter this page. Please go back <Link href={"/"}><span className="text-blue-600 font-semibold hover:underline hover:cursor-pointer">Home</span></Link>.
        </p>
      </div>
    </div>
  );
}
