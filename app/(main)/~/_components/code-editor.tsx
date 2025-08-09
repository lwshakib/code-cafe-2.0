import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Skeleton } from "@/components/ui/skeleton";
import Editor from "@monaco-editor/react";
import { Check, Copy } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import FileExplorer from "./file-explorer";

const treeData = [
  {
    id: "1",
    label: "Documents",
    children: [
      {
        id: "1-1",
        label: "Projects",
        children: [
          { id: "1-1-1", label: "Project A.pdf" },
          { id: "1-1-2", label: "Project B.docx" },
          {
            id: "1-1-3",
            label: "Archive",
            children: [
              { id: "1-1-3-1", label: "Old Project.zip" },
              { id: "1-1-3-2", label: "Backup.tar" },
            ],
          },
        ],
      },
      {
        id: "1-2",
        label: "Reports",
        children: [
          { id: "1-2-1", label: "Monthly Report.xlsx" },
          { id: "1-2-2", label: "Annual Report.pdf" },
        ],
      },
    ],
  },
  {
    id: "2",
    label: "Downloads",
    children: [
      { id: "2-1", label: "setup.exe" },
      { id: "2-2", label: "image.jpg" },
      { id: "2-3", label: "video.mp4" },
    ],
  },
  {
    id: "3",
    label: "Desktop",
    children: [{ id: "3-1", label: "shortcut.lnk" }],
  },
];

function FileHeader({
  file,
  onCopy,
  copied,
}: {
  file: { path: string; content?: string };
  onCopy: () => void;
  copied: boolean;
}) {
  const getFileType = (filePath: string) => {
    if (filePath.endsWith(".tsx")) return "TSX";
    if (filePath.endsWith(".ts")) return "TS";
    if (filePath.endsWith(".js")) return "JS";
    if (filePath.endsWith(".jsx")) return "JSX";
    if (filePath.endsWith(".md")) return "MD";
    if (filePath.endsWith(".css")) return "CSS";
    if (filePath.endsWith(".json")) return "JSON";
    return "TXT";
  };

  return (
    <div className="flex items-center justify-between px-2 md:px-3 py-1.5 border-b bg-background dark:bg-[#1e1e1e]">
      <div className="flex items-center gap-1 md:gap-2 min-w-0 flex-1">
        <Badge variant="outline" className="text-xs hidden sm:inline-flex">
          {getFileType(file.path)}
        </Badge>
        <span className="text-xs text-muted-foreground truncate">
          {/* Show only filename on small screens, full path on larger screens */}
          <span className="sm:hidden">{file.path.split("/").pop()}</span>
          <span className="hidden sm:inline">{file.path}</span>
        </span>
      </div>
      <div className="flex gap-1 flex-shrink-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={onCopy}
          className="cursor-pointer h-6 w-6 md:h-8 md:w-8 p-0"
          title="Copy file content"
        >
          {copied ? (
            <Check className="h-3 w-3" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="h-6 w-6 md:h-8 md:w-8 p-0"
          title="View on GitHub"
        ></Button>
      </div>
    </div>
  );
}

function CodeEditorSkeleton() {
  return (
    <div className="h-full w-full bg-background dark:bg-[#1e1e1e]">
      <div className="flex-1 p-4 space-y-3">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="h-4 w-6 shrink-0" />
            <Skeleton
              className="h-4"
              style={{
                width: `${Math.random() * 60 + 20}%`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function codeEditor() {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);

  // Sample file data - you can replace this with actual file data from props or context
  const currentFile = {
    path: "example.tsx",
    content: "console.log('Hello World!');",
  };

  const handleCopy = async () => {
    if (currentFile.content) {
      await navigator.clipboard.writeText(currentFile.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="h-full w-full">
      {/* Mobile: Stack vertically, Desktop: Side by side */}
      <div className="block md:hidden h-full">
        {/* Mobile Layout: File explorer in drawer/collapsible */}
        <div className="h-full bg-background flex flex-col">
          <FileHeader file={currentFile} onCopy={handleCopy} copied={copied} />
          <div className="flex-1">
            <Editor
              loading={<CodeEditorSkeleton />}
              defaultLanguage="javascript"
              defaultValue={currentFile.content}
              theme={theme === "dark" ? "vs-dark" : "light"}
              options={{
                minimap: { enabled: false },
                fontSize: 12, // Smaller font on mobile
                lineNumbers: "on",
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                wordWrap: "on", // Enable word wrap on mobile
              }}
            />
          </div>
        </div>
      </div>

      {/* Desktop Layout: Resizable panels */}
      <div className="hidden md:block h-full">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            defaultSize={25}
            minSize={15}
            maxSize={50}
            className="min-w-[200px]"
          >
            <FileExplorer />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={75} minSize={50}>
            <div className="h-full bg-background flex flex-col">
              <FileHeader
                file={currentFile}
                onCopy={handleCopy}
                copied={copied}
              />
              <div className="flex-1">
                <Editor
                  loading={<CodeEditorSkeleton />}
                  defaultLanguage="javascript"
                  defaultValue={currentFile.content}
                  theme={theme === "dark" ? "vs-dark" : "light"}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: "on",
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                  }}
                />
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}

export default codeEditor;
