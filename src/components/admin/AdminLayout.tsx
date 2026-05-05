"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import {
  Building2,
  Users,
  FileText,
  Newspaper,
  Mail,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { NavLink } from "@/components/NavLink";

const navItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Portfolio", url: "/admin/portfolio", icon: Building2 },
  { title: "Team", url: "/admin/team", icon: Users },
  { title: "Dokumente", url: "/admin/documents", icon: FileText },
  { title: "News", url: "/admin/news", icon: Newspaper },
  { title: "Newsletter", url: "/admin/newsletter", icon: Mail },
];

const AdminSidebar = () => {
  const { signOut } = useAuth();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <div className="p-4">
          <img src="/images/logo.avif" alt="Terra Helvetica" className="h-10" />
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Verwaltung</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-muted/50"
                      activeClassName="bg-muted text-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="mt-auto p-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground"
            onClick={signOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Abmelden
          </Button>
          <Link
            href="/"
            className="block mt-2 text-xs text-muted-foreground hover:text-primary text-center"
          >
            Zur Webseite →
          </Link>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b border-border px-4">
            <SidebarTrigger className="mr-4" />
            <h2 className="text-sm font-medium text-muted-foreground">
              Terra Helvetica CMS
            </h2>
          </header>
          <main className="flex-1 p-6 bg-muted/30">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
