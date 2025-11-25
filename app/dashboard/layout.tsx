import DashboardNavbar from "./components/DashboardNavbar/DashboardNavbar";
import DashboardSidebar from "./components/DashboardSidebar/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="drawer lg:drawer-open max-w-[1520px] mx-auto border border-gray-50">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* navbar for small screen */}
        <DashboardNavbar></DashboardNavbar>
        {children}
      </div>
        {/* sidebar */}
        <DashboardSidebar></DashboardSidebar>
    </div>
  );
}
