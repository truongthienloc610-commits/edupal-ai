import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Brain,
  Calendar,
  Target,
  Heart,
  Briefcase,
  MessageCircle,
  Settings,
  Info,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Menu,
  X,
  LogOut,
  FileText,
  UserCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const menuItems = [
  { path: "/dashboard", label: "Tổng quan", icon: LayoutDashboard },
  { path: "/learning", label: "Lộ trình học", icon: BookOpen },
  { path: "/summary", label: "Tóm tắt bài", icon: Brain },
  { path: "/schedule", label: "Lịch học", icon: Calendar },
  { path: "/practice", label: "Luyện tập", icon: Target },
  { path: "/wellness", label: "Sức khỏe tinh thần", icon: Heart },
  { path: "/career", label: "Nghề nghiệp", icon: Briefcase },
  { path: "/ai-consult", label: "Hỏi AI", icon: MessageCircle },
  { path: "/documents", label: "Tài liệu PDF", icon: FileText },
];

const bottomItems = [
  { path: "/profile", label: "Hồ sơ cá nhân", icon: UserCircle },
  { path: "/settings", label: "Cài đặt", icon: Settings },
  { path: "/about", label: "Giới thiệu", icon: Info },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, profile } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

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
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-wellness flex items-center justify-center shadow-lg">
          <GraduationCap className="w-6 h-6 text-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="font-bold text-sidebar-foreground text-lg">KMA-RES AI</span>
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
      <nav className="px-2 pb-2 space-y-1">
        {bottomItems.map((item) => (
          <NavItem key={item.path} item={item} />
        ))}
      </nav>

      {/* User Info & Sign Out */}
      <div className="px-2 pb-4 space-y-2">
        {profile && !collapsed && (
          <div className="px-3 py-2 text-sm text-sidebar-foreground/70 truncate">
            {profile.display_name || "Người dùng"}
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSignOut}
          className="w-full justify-start gap-3 text-sidebar-foreground/70 hover:text-destructive hover:bg-destructive/10"
        >
          <LogOut className="w-4 h-4" />
          {!collapsed && <span>Đăng xuất</span>}
        </Button>
      </div>

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
          "fixed md:static inset-y-0 left-0 z-40 flex flex-col border-r border-sidebar-border/50 transition-all duration-300",
          "bg-sidebar/80 backdrop-blur-2xl",
          collapsed ? "w-16" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <SidebarContent />
      </aside>
    </>
  );
};
