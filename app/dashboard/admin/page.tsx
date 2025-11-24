import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
    const session = await getServerSession(authOptions);
    const role = session?.user?.role;
    if(role !== "admin") redirect("/dashboard/user");

    return(
        <div>
            admin dashbaord
        </div>
    )
}