import { redirect } from "next/navigation";
import { getCurrentUser } from "@/app/actions/auth";
import { Sidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const userRole = user.profile?.role || "customer";
  const userName = user.profile?.full_name || user.email || "User";
  const avatarUrl = user.profile?.avatar_url;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r bg-background md:flex">
        <Sidebar userRole={userRole} />
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader userName={userName} avatarUrl={avatarUrl} />
        <main className="flex-1 overflow-y-auto bg-muted/10 p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
