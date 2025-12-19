"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  Search,
  Calendar,
  User,
  Briefcase,
  Star,
  Settings,
  Users,
  Shield,
  FileText,
  Clock,
} from "lucide-react";
import type { UserRole } from "@/types";

interface SidebarProps {
  userRole: UserRole;
}

const customerLinks = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/search", icon: Search, label: "Find Services" },
  { href: "/dashboard/bookings", icon: Calendar, label: "My Bookings" },
  { href: "/dashboard/profile", icon: User, label: "Profile" },
];

const providerLinks = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/dashboard/provider/profile", icon: User, label: "My Profile" },
  { href: "/dashboard/provider/services", icon: Briefcase, label: "My Services" },
  { href: "/dashboard/provider/availability", icon: Clock, label: "Availability" },
  { href: "/dashboard/bookings", icon: Calendar, label: "Bookings" },
  { href: "/dashboard/reviews", icon: Star, label: "Reviews" },
];

const adminLinks = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/dashboard/admin/users", icon: Users, label: "Users" },
  { href: "/dashboard/admin/providers", icon: Shield, label: "Providers" },
  { href: "/dashboard/admin/bookings", icon: Calendar, label: "Bookings" },
  { href: "/dashboard/admin/reviews", icon: FileText, label: "Reviews" },
  { href: "/dashboard/admin/settings", icon: Settings, label: "Settings" },
];

export function Sidebar({ userRole }: SidebarProps) {
  const pathname = usePathname();

  const links =
    userRole === "admin"
      ? adminLinks
      : userRole === "service_provider"
      ? providerLinks
      : customerLinks;

  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-lg font-bold">K</span>
          </div>
          <span className="text-lg font-bold">Karigar</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || pathname.startsWith(link.href + "/");

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
