import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="container max-w-7xl mx-auto p-4 md:p-6 lg:p-8 pt-16 md:pt-6">
          {children}
        </div>
      </main>
    </div>
  );
};
