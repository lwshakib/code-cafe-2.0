"use client";

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Plus,
  Settings2,
  SquareTerminal,
} from "lucide-react";
import * as React from "react";

import { CafeItems } from "@/components/cafe-items";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center justify-between my-2 mx-2">
          <SidebarTrigger className="w-4 h-4" />
        </div>
        <div className="flex items-center justify-between mb-2">
          <SidebarMenuButton tooltip="Create a new Cafe" onClick={() => {
            router.push("/");
          }}>
            <Plus className="h-4 w-4" />
            <span>Create a new Cafe</span>
          </SidebarMenuButton>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <CafeItems />
      </SidebarContent>
      <SidebarFooter>
        <NavUser  />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
