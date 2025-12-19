"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, User, LogOut, Settings, LayoutDashboard } from "lucide-react";
import { createBrowserClient } from "@supabase/ssr";
import { useEffect, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function HeaderAuth() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Create client-side supabase client
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            setLoading(false);
        };

        getUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, [supabase]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        setUser(null);
        router.push("/");
        router.refresh();
    };

    if (loading) {
        return (
            <div className="flex items-center space-x-3 opacity-50">
                <div className="h-9 w-20 bg-muted rounded-md animate-pulse"></div>
                <div className="h-9 w-24 bg-muted rounded-md animate-pulse"></div>
            </div>
        );
    }

    if (user) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-muted/50 transition-colors">
                        <Avatar className="h-9 w-9 border border-border">
                            <AvatarImage src={user.user_metadata?.avatar_url} alt={user.user_metadata?.full_name || "User"} />
                            <AvatarFallback className="bg-primary/10 text-primary font-medium">
                                {(user.email?.[0] || "U").toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{user.user_metadata?.full_name || "User"}</p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {user.email}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="cursor-pointer">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            <span>Dashboard</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/dashboard/settings" className="cursor-pointer">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    return (
        <div className="flex items-center space-x-3">
            <Link href="/login">
                <Button variant="ghost" size="sm" className="font-medium">
                    Login
                </Button>
            </Link>
            <Link href="/signup">
                <Button size="sm" className="font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </Link>
        </div>
    );
}
