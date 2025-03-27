"use client";

import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/ui/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ThemeToggle from "@/components/theme-toggle";
import { CarouselPlugin } from "@/components/dashboard/carousel";

export default function Page() {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve user data from sessionStorage
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserRole(user.role_type || "guest"); // Use role_type instead of role
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{userRole || "Loading..."}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Theme and Avatar (Aligned to Right) */}
          <div className="ml-auto flex items-center gap-4">
            <ThemeToggle />
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Conditionally Render Dashboard Content */}
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {userRole === "super_admin" ? (
            <div>
              <h2 className="text-xl font-bold">Super Admin Dashboard</h2>
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-muted/50">
                  Manage Users
                </div>
                <div className="aspect-video rounded-xl bg-muted/50">
                  View Reports
                </div>
                <div className="aspect-video rounded-xl bg-muted/50">
                  System Settings
                </div>
              </div>
            </div>
          ) : userRole === "artist_manager" ? (
            <div>
              <h2 className="text-xl font-bold">Artist Manager Dashboard</h2>
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-muted/50">
                  Manage Artists
                </div>
                <div className="aspect-video rounded-xl bg-muted/50">
                  View Statistics
                </div>
                <div className="aspect-video rounded-xl bg-muted/50">
                  Handle Promotions
                </div>
              </div>
            </div>
          ) : userRole === "artist" ? (
            <div>
              <h2 className="text-xl font-bold">Artist Dashboard</h2>
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-muted/50">
                  My Music
                </div>
                <div className="aspect-video rounded-xl bg-muted/50">
                  My Albums
                </div>
                <div className="aspect-video rounded-xl bg-muted/50" />
              </div>
              <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
                <CarouselPlugin />
              </div>
            </div>
          ) : (
            <div className="text-red-500 text-center">Unauthorized Access</div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
