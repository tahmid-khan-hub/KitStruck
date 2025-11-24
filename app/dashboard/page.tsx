import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashBoardPage() {
    const session = await getServerSession(authOptions);

    if(!session) redirect("/sign-in");

    const role = session.user.role;

    if(role === "admin") redirect("/dashboard/admin");
    else redirect("/dashboard/user");
    
}