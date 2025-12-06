import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import UserDashboardContent from "./UserDashboardContent/UserDashboardContent";

export default async function UserDashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/sign-in");

  return (
    <div className="">
      <UserDashboardContent user={session.user} />
    </div>
  );
}
