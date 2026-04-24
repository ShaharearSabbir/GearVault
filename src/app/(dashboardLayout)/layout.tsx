import DashboardHeader from "@/components/dashboardLayout/DashboardHeader";
import Sidebar from "@/components/dashboardLayout/Sidebar";

export default function DashboardLayout({
  user,
  admin,
}: {
  user: React.ReactNode;
  admin: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* 1. Permanent Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-white border-r border-slate-200">
        <Sidebar />
      </aside>

      {/* 2. Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-y-auto">
        {/* Top Header */}
        <DashboardHeader />

        {/* Content Slot */}
        <section className="p-4 md:p-8 max-w-7xl mx-auto w-full">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 min-h-[calc(100vh-120px)] p-6">
            {user}
            {admin}
          </div>
        </section>
      </main>
    </div>
  );
}
