"use client";

import { Coffee, Trash2 } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function CafeItems({}: {}) {
  const { isMobile } = useSidebar();
  const cafeList = [
    {
      name: "Design Engineering",
      url: "#",
      icon: Coffee,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: Coffee,
    },
    {
      name: "Travel",
      url: "#",
      icon: Coffee,
    },
  ];

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Cafes</SidebarGroupLabel>
      <SidebarMenu>
        {cafeList.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
            <SidebarMenuAction showOnHover>
              <Trash2 />
              <span className="sr-only">Delete</span>
            </SidebarMenuAction>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
