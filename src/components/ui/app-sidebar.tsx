"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import {
  Home,
  MicVocal,
  Music4,
  LibraryBig,
  ListMusic,
  UsersRound,
  // Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  // SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/ui/nav-main";

// Sidebar Navigation Items
const sidebarItems = {
  super_admin: [
    { title: "Home", url: "#", icon: Home },
    { title: "Music", url: "../music", icon: Music4 },
    { title: "Artists", url: "../artist", icon: MicVocal },
    { title: "Albums", url: "#", icon: LibraryBig },
    { title: "Genre", url: "#", icon: ListMusic },
    { title: "Users", url: "#", icon: UsersRound },
  ],
  artist_manager: [
    { title: "Home", url: "#", icon: Home },
    { title: "Music", url: "../music", icon: Music4 },
    { title: "Artists", url: "../artist", icon: MicVocal },
    { title: "Albums", url: "#", icon: LibraryBig },
    { title: "Genre", url: "#", icon: ListMusic },
  ],
  artist: [
    { title: "Home", url: "#", icon: Home },
    { title: "My Music", url: "../my-music", icon: Music4 },
    { title: "My Albums", url: "#", icon: LibraryBig },
    { title: "Genre", url: "#", icon: ListMusic },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Fetch user role_type from sessionStorage
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserRole(user.role_type || "guest"); // Use 'guest' if no role found
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  // Determine the menu items based on the user's role
  const navItems = sidebarItems[userRole as keyof typeof sidebarItems] || [];

  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <h1>artisync</h1>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
