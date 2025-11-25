import DashboardNavbar from "./components/DashboardNavbar/DashboardNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="drawer lg:drawer-open max-w-[1500px] mx-auto border border-gray-50">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* navbar for small screen */}
      <DashboardNavbar></DashboardNavbar>
      {children}
    </div>
  );
}
