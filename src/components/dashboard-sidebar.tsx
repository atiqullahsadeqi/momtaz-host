import { authClient } from "@/lib/auth-client"
import {
    LayoutDashboard,
    Server,
    Globe,
    Cloud,
    CreditCard,
    LifeBuoy,
    Settings,
    LogOut,
    User,
    Package,
    ShieldCheck,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import Image from "next/image"
import Link from "next/link"
import React from "react"

const navMain = [
    {
        title: "Overview",
        url: "/dashboard",
        icon: LayoutDashboard,
        isActive: true,
    },
    {
        title: "Services",
        url: "#",
        icon: Server,
        items: [
            {
                title: "Dedicated Servers",
                url: "/dashboard/services/dedicated",
            },
            {
                title: "VPS Hosting",
                url: "/dashboard/services/vps",
            },
            {
                title: "Shared Hosting",
                url: "/dashboard/services/shared",
            },
        ],
    },
    {
        title: "Domains",
        url: "/dashboard/domains",
        icon: Globe,
    },
    {
        title: "My Orders",
        url: "/dashboard/orders",
        icon: Package,
    },
    {
        title: "Cloud & Apps",
        url: "/dashboard/cloud",
        icon: Cloud,
        items: [
            {
                title: "Google Workspace",
                url: "/dashboard/cloud/google",
            },
        ],
    },
];

const secondaryNav = [
    {
        title: "Billing",
        url: "/dashboard/billing",
        icon: CreditCard,
    },
    {
        title: "Support",
        url: "/dashboard/support",
        icon: LifeBuoy,
    },
    {
        title: "Settings",
        url: "/dashboard/settings",
        icon: Settings,
    },
];

export function DashboardSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { data: sessionData } = authClient.useSession();

    const handleLogout = async () => {
        await authClient.signOut({ fetchOptions: { onSuccess: () => { window.location.href = "/"; } } });
    }

    return (
        <Sidebar collapsible="icon" {...props} className="border-r border-border/50 bg-sidebar">
            <SidebarHeader className="h-16 border-b border-border/50 flex items-center justify-center">
                <Link href="/" className="flex items-center gap-2 px-4 w-full group-data-[collapsible=icon]:justify-center">
                    <Image
                        src="/images/logo.png"
                        alt="Momtaz Host"
                        width={32}
                        height={32}
                        className="flex-shrink-0"
                    />
                    <span className="font-bold text-lg group-data-[collapsible=icon]:hidden">Momtaz Host</span>
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Management</SidebarGroupLabel>
                    <SidebarMenu>
                        {navMain.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild tooltip={item.title}>
                                    <Link href={item.url}>
                                        <item.icon className="size-4" />
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                                {item.items?.length ? (
                                    <SidebarMenuSub>
                                        {item.items.map((subItem: any) => (
                                            <SidebarMenuSubItem key={subItem.title}>
                                                <SidebarMenuSubButton asChild>
                                                    <Link href={subItem.url}>
                                                        <span>{subItem.title}</span>
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                ) : null}
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
                <SidebarGroup className="mt-auto">
                    <SidebarGroupLabel>Account</SidebarGroupLabel>
                    <SidebarMenu>
                        {secondaryNav.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild size="sm" tooltip={item.title}>
                                    <Link href={item.url}>
                                        <item.icon className="size-4" />
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="border-t border-border/50 p-2">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" className="pointer-events-none">
                            <div className="align-middle size-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden shrink-0">
                                <User className="size-4 text-primary" />
                            </div>
                            <div className="flex flex-col text-left group-data-[collapsible=icon]:hidden truncate leading-tight flex-1 min-w-0">
                                <span className="text-sm font-medium truncate w-full" suppressHydrationWarning>{sessionData?.user?.name ?? ""}</span>
                                <span className="text-xs text-muted-foreground truncate w-full" suppressHydrationWarning>{sessionData?.user?.email ?? ""}</span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="Log Out">
                            <button type="button" onClick={handleLogout} className="w-full flex items-center gap-2 text-muted-foreground hover:text-foreground">
                                <LogOut className="size-4" />
                                <span className="group-data-[collapsible=icon]:hidden">Log Out</span>
                            </button>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
