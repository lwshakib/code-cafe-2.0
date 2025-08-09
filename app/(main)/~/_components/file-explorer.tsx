import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Search } from "lucide-react";
import { useState } from "react";
import { TreeView } from "./file-tree";

const treeData = [
  {
    id: "app",
    label: "app",
    children: [
      {
        id: "app-auth",
        label: "(auth)",
        children: [
          { id: "app-auth-layout", label: "layout.tsx" },
          {
            id: "app-auth-signin",
            label: "sign-in",
            children: [
              {
                id: "app-auth-signin-page",
                label: "[[...sign-in]]",
                children: [
                  { id: "app-auth-signin-page-tsx", label: "page.tsx" },
                ],
              },
            ],
          },
          {
            id: "app-auth-signup",
            label: "sign-up",
            children: [
              {
                id: "app-auth-signup-page",
                label: "[[...sign-up]]",
                children: [
                  { id: "app-auth-signup-page-tsx", label: "page.tsx" },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "app-main",
        label: "(main)",
        children: [
          { id: "app-main-layout", label: "layout.tsx" },
          { id: "app-main-page", label: "page.tsx" },
          {
            id: "app-main-dashboard",
            label: "dashboard",
            children: [
              { id: "app-main-dashboard-page", label: "page.tsx" },
              {
                id: "app-main-dashboard-components",
                label: "_components",
                children: [
                  { id: "dashboard-header", label: "dashboard-header.tsx" },
                  { id: "dashboard-stats", label: "dashboard-stats.tsx" },
                  { id: "dashboard-chart", label: "dashboard-chart.tsx" },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "app-api",
        label: "api",
        children: [
          {
            id: "app-api-auth",
            label: "auth",
            children: [{ id: "app-api-auth-route", label: "route.ts" }],
          },
          {
            id: "app-api-users",
            label: "users",
            children: [
              { id: "app-api-users-route", label: "route.ts" },
              {
                id: "app-api-users-id",
                label: "[id]",
                children: [{ id: "app-api-users-id-route", label: "route.ts" }],
              },
            ],
          },
        ],
      },
      { id: "app-globals", label: "globals.css" },
      { id: "app-layout", label: "layout.tsx" },
      { id: "app-loading", label: "loading.tsx" },
      { id: "app-not-found", label: "not-found.tsx" },
    ],
  },
  {
    id: "components",
    label: "components",
    children: [
      {
        id: "components-ui",
        label: "ui",
        children: [
          { id: "ui-button", label: "button.tsx" },
          { id: "ui-input", label: "input.tsx" },
          { id: "ui-card", label: "card.tsx" },
          { id: "ui-dialog", label: "dialog.tsx" },
          { id: "ui-dropdown", label: "dropdown-menu.tsx" },
          { id: "ui-tabs", label: "tabs.tsx" },
        ],
      },
      { id: "navbar", label: "navbar.tsx" },
      { id: "sidebar", label: "sidebar.tsx" },
      { id: "footer", label: "footer.tsx" },
      { id: "theme-provider", label: "theme-provider.tsx" },
    ],
  },
  {
    id: "lib",
    label: "lib",
    children: [
      { id: "lib-utils", label: "utils.ts" },
      { id: "lib-auth", label: "auth.ts" },
      { id: "lib-db", label: "db.ts" },
      { id: "lib-validations", label: "validations.ts" },
    ],
  },
  {
    id: "hooks",
    label: "hooks",
    children: [
      { id: "use-auth", label: "use-auth.ts" },
      { id: "use-local-storage", label: "use-local-storage.ts" },
      { id: "use-debounce", label: "use-debounce.ts" },
    ],
  },
  {
    id: "public",
    label: "public",
    children: [
      { id: "favicon", label: "favicon.ico" },
      { id: "logo", label: "logo.svg" },
      {
        id: "images",
        label: "images",
        children: [
          { id: "hero-img", label: "hero-image.jpg" },
          { id: "placeholder", label: "placeholder.png" },
        ],
      },
    ],
  },
  {
    id: "types",
    label: "types",
    children: [
      { id: "auth-types", label: "auth.d.ts" },
      { id: "user-types", label: "user.d.ts" },
      { id: "api-types", label: "api.d.ts" },
    ],
  },
  { id: "components-json", label: "components.json" },
  { id: "middleware", label: "middleware.ts" },
  { id: "next-config", label: "next.config.js" },
  { id: "package-json", label: "package.json" },
  { id: "tailwind-config", label: "tailwind.config.js" },
  { id: "tsconfig", label: "tsconfig.json" },
  { id: "readme", label: "README.md" },
  { id: "env-local", label: ".env.local" },
  { id: "gitignore", label: ".gitignore" },
];

function FileExplorer() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="h-full bg-background dark:bg-[#1E1E1E]">
      <Tabs defaultValue="files" className="h-full flex flex-col">
        <TabsList className="grid grid-cols-2 mx-1 md:mx-2 mt-1 md:mt-2 mb-1 md:mb-2 w-fit h-8 md:h-10">
          <TabsTrigger
            value="files"
            className="flex items-center gap-1 px-2 md:px-3 text-xs md:text-sm"
          >
            <FileText className="h-3 w-3 md:h-4 md:w-4" />
            <span className="hidden sm:inline">Files</span>
            <span className="sm:hidden">📁</span>
          </TabsTrigger>
          <TabsTrigger
            value="search"
            className="flex items-center gap-1 px-2 md:px-3 text-xs md:text-sm"
          >
            <Search className="h-3 w-3 md:h-4 md:w-4" />
            <span className="hidden sm:inline">Search</span>
            <span className="sm:hidden">🔍</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="files" className="flex-1 m-0 p-0 h-0">
          <ScrollArea className="h-[calc(100vh-12rem)] md:h-[calc(100vh-15rem)]">
            <TreeView
              data={treeData}
              onNodeClick={(node) => console.log("Clicked:", node.label)}
              //   defaultExpandedIds={["app"]}
              className="border-0 rounded-none bg-transparent"
              indent={12} // Smaller indent on mobile
            />
          </ScrollArea>
        </TabsContent>

        <TabsContent
          value="search"
          className="flex-1 m-0 p-0 flex flex-col h-0"
        >
          <div className="p-1 md:p-2 border-b flex-shrink-0">
            <div className="relative">
              <Search className="absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
              <Input
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 md:pl-10 h-8 md:h-10 text-xs md:text-sm"
              />
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-1 md:p-2">
              {searchQuery ? (
                <div className="text-xs md:text-sm text-muted-foreground">
                  Search results for "{searchQuery}" would appear here
                </div>
              ) : (
                <div className="text-xs md:text-sm text-muted-foreground">
                  Enter a search term to find files
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default FileExplorer;
