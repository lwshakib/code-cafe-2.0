"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Coffee, Loader2, Trash2 } from "lucide-react";
import { useState } from "react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useCafeContext } from "@/context/CafeProvider";
import { toast } from "sonner";
import Link from "next/link";


const messages= [
  {
    id: "1",
    clerkId: "1",
    content:"markdown",
    
  }
]

export function CafeItems({}: {}) {
  const { cafes, setCafes } = useCafeContext();
  const [deletingCafeId, setDeletingCafeId] = useState<string | null>(null);

  const handleDeleteCafe = async (cafeId: string) => {
    try {
      setDeletingCafeId(cafeId);
      const promise = fetch("/api/cafe", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cafeId }),
      });

      toast.promise(promise, {
        loading: `Deleting cafe ${
          cafes.find((cafe) => cafe.id === cafeId)?.name
        }...`,
        success: `${
          cafes.find((cafe) => cafe.id === cafeId)?.name
        } deleted successfully`,
        error: `Failed to delete ${
          cafes.find((cafe) => cafe.id === cafeId)?.name
        }`,
      });

      const response = await promise;

      if (response.ok) {
        // Remove the cafe from the context state
        setCafes((prevCafes) => prevCafes.filter((cafe) => cafe.id !== cafeId));
      } else {
        console.error("Failed to delete cafe:", response.statusText);
        toast.error(
          `Failed to delete ${cafes.find((cafe) => cafe.id === cafeId)?.name}`
        );
      }
    } catch (error) {
      console.error("Error deleting cafe:", error);
      toast.error(
        `Failed to delete ${cafes.find((cafe) => cafe.id === cafeId)?.name}`
      );
    } finally {
      setDeletingCafeId(null);
    }
  };

  if (!cafes || cafes.length === 0) {
    return (
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel>Cafes</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Coffee />
              <span>No cafes yet</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    );
  }

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Cafes</SidebarGroupLabel>
      <SidebarMenu>
        {cafes.map((cafe) => (
          <SidebarMenuItem
            key={cafe.id}
            className={
              deletingCafeId === cafe.id
                ? "relative overflow-hidden animate-pulse opacity-60 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent"
                : ""
            }
          >
            <SidebarMenuButton asChild>
              <Link href={`/~/${cafe.id}`}>
                <Coffee />
                <span>{cafe.name}</span>
              </Link>
            </SidebarMenuButton>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <SidebarMenuAction
                  showOnHover
                  disabled={deletingCafeId === cafe.id}
                >
                  {deletingCafeId === cafe.id ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Trash2 />
                  )}
                  <span className="sr-only">
                    {deletingCafeId === cafe.id ? "Deleting..." : "Delete"}
                  </span>
                </SidebarMenuAction>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Cafe</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{cafe.name}"? This action
                    cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDeleteCafe(cafe.id)}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
