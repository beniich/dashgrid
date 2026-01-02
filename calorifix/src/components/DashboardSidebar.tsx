import { LayoutDashboard, Users, Calendar, CreditCard, Dumbbell, Sparkles, Image, BarChart3, Settings, TrendingUp, LogOut, ShoppingBag } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
    SidebarFooter,
    useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
    { title: "Tableau de bord", url: "/dashboard", icon: LayoutDashboard },
    { title: "Membres", url: "/dashboard/members", icon: Users },
    { title: "Planning", url: "/dashboard/schedule", icon: Calendar },
    { title: "Paiements", url: "/dashboard/payments", icon: CreditCard },
    { title: "Classes", url: "/dashboard/classes", icon: Dumbbell },
    { title: "AI Assistant", url: "/dashboard/ai-assistant", icon: Sparkles },
    { title: "Galerie", url: "/dashboard/gallery", icon: Image },
    { title: "Boutique", url: "/dashboard/shop", icon: ShoppingBag },
    { title: "Analytics", url: "/dashboard/analytics", icon: BarChart3 },
    { title: "Paramètres", url: "/dashboard/settings", icon: Settings },
];

export function DashboardSidebar() {
    const { state } = useSidebar();
    const location = useLocation();

    return (
        <Sidebar collapsible="icon" className="border-r border-sidebar-border">
            <div className="flex h-16 items-center justify-between px-6 border-b border-sidebar-border">
                {state === "expanded" && (
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                            <TrendingUp className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <span className="text-lg font-semibold text-sidebar-foreground">GymFlow Pro</span>
                    </div>
                )}
                <SidebarTrigger className="text-sidebar-foreground" />
            </div>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-sidebar-foreground/60">Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navigationItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <NavLink
                                            to={item.url}
                                            end
                                            className="hover:bg-sidebar-accent transition-colors"
                                            activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                                        >
                                            <item.icon className="h-4 w-4" />
                                            {state === "expanded" && <span>{item.title}</span>}
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-sidebar-border p-4">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-xs">
                        JD
                    </div>
                    <div className="flex-1 min-w-0">
                        {state === "expanded" && (
                            <>
                                <p className="text-sm font-medium truncate text-sidebar-foreground">Jean Dupont</p>
                                <p className="text-xs text-muted-foreground truncate">Admin</p>
                            </>
                        )}
                    </div>
                    {state === "expanded" && (
                        <button className="text-sidebar-foreground/60 hover:text-sidebar-foreground">
                            <LogOut className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}
