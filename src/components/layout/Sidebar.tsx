import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Clock,
  FileText,
  GraduationCap,
  Heart,
  Briefcase,
  Settings,
  Info,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const menuItems = [
  { path: "/dashboard", label: "Tổng quan", icon: LayoutDashboard },
  { path: "/learning", label: "Trợ lý học tập", icon: BookOpen },
  { path: "/schedule", label: "Quản lý thời gian", icon: Clock },
  { path: "/summary", label: "Tóm tắt bài học", icon: FileText },
  { path: "/practice", label: "Luyện thi", icon: GraduationCap },
  { path: "/wellness", label: "Sức khỏe tinh thần", icon: Heart },
  { path: "/career", label: "Định hướng nghề nghiệp", icon: Briefcase },
];

const bottomItems = [
  { path: "/settings", label: "Cài đặt", icon: Settings },
  { path: "/about", label: "Giới thiệu", icon: Info },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const NavItem = ({ item }: { item: typeof menuItems[0] }) => {
    const isActive = location.pathname === item.path;
    const Icon = item.icon;

    return (
      <NavLink
        to={item.path}
        onClick={() => setMobileOpen(false)}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
          isActive
            ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
            : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
        )}
      >
        <Icon className={cn("w-5 h-5 shrink-0", isActive && "animate-bounce-subtle")} />
        {!collapsed && (
          <span className="text-sm font-medium truncate">{item.label}</span>
        )}
      </NavLink>
    );
  };

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="flex items-center gap-3 px-3 py-4 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
          <Sparkles className="w-6 h-6 text-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="font-bold text-sidebar-foreground text-lg">EduLife AI</span>
            <span className="text-xs text-sidebar-foreground/50">Trợ lý học tập thông minh</span>
          </div>
        )}
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-2 space-y-1">
        {menuItems.map((item) => (
          <NavItem key={item.path} item={item} />
        ))}
      </nav>

      {/* Divider */}
      <div className="mx-4 my-4 border-t border-sidebar-border" />

      {/* Bottom Navigation */}
      <nav className="px-2 pb-4 space-y-1">
        {bottomItems.map((item) => (
          <NavItem key={item.path} item={item} />
        ))}
      </nav>

      {/* Collapse Button - Desktop only */}
      <div className="hidden md:block px-2 pb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="w-full justify-center text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden bg-card shadow-lg"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:static inset-y-0 left-0 z-40 flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
          collapsed ? "w-16" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <SidebarContent />
      </aside>
    </>
  );
};
