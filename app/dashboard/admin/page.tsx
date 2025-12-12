import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import StatsCards from "./adminProfile/StatsCards/StatsCards";
import RecentData from "./adminProfile/RecentData/RecentData";
import DashboardGraph from "./adminProfile/DashboardGraph/DashboardGraph";

export default async function AdminDashboard() {
    const session = await getServerSession(authOptions);
    const role = session?.user?.role;
    if(role !== "admin") redirect("/dashboard/user");

    return(
        <div className="px-2">
            <StatsCards />
            <RecentData />
            <DashboardGraph />
        </div>
    )
}