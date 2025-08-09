"use client";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Expand, Minimize } from "lucide-react";
import { useState } from "react";
import CodeEditor from "./code-editor";
import WebPreview from "./web-preview";

function CodeView() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div
      className={`flex flex-col ${
        isFullscreen
          ? "fixed inset-0 z-50 bg-background p-2 md:p-4"
          : "h-full p-2 md:p-4"
      }`}
    >
      <Card className="flex-1 flex flex-col p-0 m-0 bg-background dark:bg-[#1E1E1E]">
        <Tabs defaultValue="code-editor" className="flex-1 flex flex-col">
          <div className="p-1">
            <div className="flex justify-between items-center gap-2">
              <TabsList className="grid w-fit grid-cols-2 h-8 md:h-10">
                <TabsTrigger
                  value="code-editor"
                  className="text-xs md:text-sm px-2 md:px-3"
                >
                  <span className="hidden sm:inline">Code Editor</span>
                  <span className="sm:hidden">Code</span>
                </TabsTrigger>
                <TabsTrigger
                  value="web-preview"
                  className="text-xs md:text-sm px-2 md:px-3"
                >
                  <span className="hidden sm:inline">Web Preview</span>
                  <span className="sm:hidden">Preview</span>
                </TabsTrigger>
              </TabsList>
              {isFullscreen ? (
                <Minimize
                  className="h-4 w-4 cursor-pointer hover:text-gray-600 flex-shrink-0"
                  onClick={toggleFullscreen}
                />
              ) : (
                <Expand
                  className="h-4 w-4 cursor-pointer hover:text-gray-600 flex-shrink-0"
                  onClick={toggleFullscreen}
                />
              )}
            </div>
          </div>
          <TabsContent
            value="code-editor"
            className="flex-1 h-full overflow-hidden m-0"
          >
            <CodeEditor />
          </TabsContent>
          <TabsContent
            value="web-preview"
            className="flex-1 h-full overflow-hidden m-0"
          >
            <WebPreview />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

export default CodeView;
