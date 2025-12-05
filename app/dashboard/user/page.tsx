import { isValidUrl } from "@/app/hooks/isValidUrl";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function UserDashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/sign-in");
  const user = session?.user;
  const profilePic = user?.image && user.image.trim() !== "" && isValidUrl(user.image) ? user.image : "/default_user.jpg";

  return (
    <div className="min-h-screen mt-5 mx-auto">
      <div className="bg-white p-8 rounded-xl shadow-md text-center w-full">
        {/* User Image */}
         <Image
          src={profilePic}
          alt="User"
          width={52}
          height={52}
          className="rounded-full mx-auto mb-4 object-cover"
        />

        {/* Name & Email */}
        <div className="flex justify-center items-center gap-2 text-gray-700 font-semibold">
          <span>{user.name}</span>
          <span>|</span>
          <span>{user.email}</span>
        </div>
      </div>
    </div>
  );
}
