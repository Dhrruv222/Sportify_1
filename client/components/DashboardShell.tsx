import Sidebar from "@/components/Sidebar";
import RightSidebar from "@/components/RightSidebar";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <div
        className="min-h-screen"
        style={{
          marginLeft: "var(--sidebar-width)",
          marginRight: "var(--right-sidebar-width)",
        }}
      >
        {children}
      </div>
      <RightSidebar />
    </>
  );
}
