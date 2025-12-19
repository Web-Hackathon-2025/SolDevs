"use client";

import { Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getInitials } from "@/lib/utils";
import Link from "next/link";

interface HeaderProps {
  userName: string;
  avatarUrl?: string | null;
  onMenuClick?: () => void;
  unreadNotifications?: number;
}

export function DashboardHeader({
  userName,
  avatarUrl,
  onMenuClick,
  unreadNotifications = 0,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={onMenuClick}
      >
        <Menu className="h-5 w-5" />
      </Button>

      <div className="flex-1" />

      <Link href="/dashboard/notifications" className="relative">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
          {unreadNotifications > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs"
            >
              {unreadNotifications}
            </Badge>
          )}
        </Button>
      </Link>

      <Link href="/dashboard/profile">
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarImage src={avatarUrl || undefined} alt={userName} />
          <AvatarFallback>{getInitials(userName)}</AvatarFallback>
        </Avatar>
      </Link>
    </header>
  );
}
