"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronDown, Grid3X3, Lock, MoreVertical, Plus } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CodeView from "../_components/code-view";
import MessagesView from "../_components/messages-view";

function page() {
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMobile = useIsMobile();
  const [message, setMessage] = useState<string | null>(null);
  const [cafe, setCafe] = useState<any>(null);

  useEffect(() => {
    const messageParam = searchParams.get("message");
    if (messageParam) {
      setMessage(messageParam);
      const newUrl = `/~/${id}`;
      router.replace(newUrl);
    }
  }, [searchParams, id, router]);

  useEffect(() => {
    const fetchCafe = async () => {
      try {
        const response = await fetch(`/api/cafe/${id}`);
        if (response.ok) {
          const cafeData = await response.json();
          setCafe(cafeData);
        }
      } catch (error) {
        console.error("Error fetching cafe:", error);
      }
    };

    fetchCafe();
  }, [id]);

  return (
    <div className="h-full min-h-0 flex flex-col">
      <div className="bg-background border-b border-border px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-foreground font-semibold italic text-base">
              Code cafe 2.0
            </h1>
          </div>

          <div className="flex items-center space-x-2">
            <h2 className="text-foreground text-base font-medium">
              {cafe?.name || "Loading..."}
            </h2>
            <Lock className="w-3 h-3 text-muted-foreground" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  <MoreVertical className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Export</DropdownMenuItem>
                <DropdownMenuItem>Share</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center space-x-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="sm">
                  <div className="relative mr-2">
                    <Grid3X3 className="w-3 h-3" />
                    <Plus className="w-2 h-2 absolute -bottom-1 -left-1" />
                  </div>
                  <span className="text-xs font-medium">Integrations</span>
                  <ChevronDown className="w-3 h-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>API Connections</DropdownMenuItem>
                <DropdownMenuItem>Webhooks</DropdownMenuItem>
                <DropdownMenuItem>Third-party Services</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm">
                  <span className="text-xs font-medium">Publish</span>
                  <ChevronDown className="w-3 h-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>Deploy to Production</DropdownMenuItem>
                <DropdownMenuItem>Deploy to Staging</DropdownMenuItem>
                <DropdownMenuItem>Preview Build</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <ModeToggle />
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        {isMobile ? (
          <MessagesView />
        ) : (
          <ResizablePanelGroup direction="horizontal" className="w-full h-full">
            <ResizablePanel defaultSize={30} minSize={30} maxSize={50}>
              <MessagesView />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={70} minSize={50} maxSize={70}>
              <CodeView />
            </ResizablePanel>
          </ResizablePanelGroup>
        )}
      </div>
    </div>
  );
}

export default page;
