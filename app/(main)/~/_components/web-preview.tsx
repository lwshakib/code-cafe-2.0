import { Button } from "@/components/ui/button";
import { CustomSearchBar } from "@/components/ui/custom-search-bar";
import {
  ExternalLink,
  Monitor,
  RotateCcw,
  Smartphone,
  Tablet,
} from "lucide-react";
import { useState } from "react";

type ResponsiveMode = "desktop" | "tablet" | "mobile";

interface WebPreviewHeaderProps {
  url: string;
  setUrl: (url: string) => void;
  responsiveMode: ResponsiveMode;
  setResponsiveMode: (mode: ResponsiveMode) => void;
}

function WebPreviewHeader({
  url,
  setUrl,
  responsiveMode,
  setResponsiveMode,
}: WebPreviewHeaderProps) {
  const handleRefresh = () => {
    // Refresh the preview
    console.log("Refreshing preview...");
  };

  const handleUrlChange = (value: string) => {
    setUrl(value);
  };

  const handleUrlSubmit = (value: string) => {
    // Trigger preview update on Enter
    console.log("Loading URL:", value);
  };

  const handleResponsiveModeToggle = () => {
    const modes: ResponsiveMode[] = ["desktop", "tablet", "mobile"];
    const currentIndex = modes.indexOf(responsiveMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setResponsiveMode(modes[nextIndex]);
    console.log("Responsive mode changed to:", modes[nextIndex]);
  };

  const getResponsiveIcon = () => {
    switch (responsiveMode) {
      case "desktop":
        return <Monitor className="h-3 w-3" />;
      case "tablet":
        return <Tablet className="h-3 w-3" />;
      case "mobile":
        return <Smartphone className="h-3 w-3" />;
    }
  };

  const getResponsiveTitle = () => {
    switch (responsiveMode) {
      case "desktop":
        return "Desktop view - Click to switch to tablet";
      case "tablet":
        return "Tablet view - Click to switch to mobile";
      case "mobile":
        return "Mobile view - Click to switch to desktop";
    }
  };

  return (
    <div className="flex items-center justify-between px-2 md:px-3 py-1.5 border-b bg-background dark:bg-[#1e1e1e]">
      <div className="flex items-center gap-1 md:gap-2 min-w-0 flex-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRefresh}
          className="cursor-pointer h-6 w-6 md:h-8 md:w-8 p-0 flex-shrink-0"
          title="Refresh preview"
        >
          <RotateCcw className="h-3 w-3" />
        </Button>
        <div className="flex-1 min-w-0">
          <CustomSearchBar
            value={url}
            onChange={handleUrlChange}
            onSubmit={handleUrlSubmit}
            placeholder="Enter path..."
            port={3000}
          />
        </div>
      </div>
      <div className="flex gap-1 flex-shrink-0">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="h-6 w-6 md:h-8 md:w-8 p-0"
          title="Open in new tab"
        >
          <a
            href={`http://localhost:3000${
              url.startsWith("/") ? url : `/${url}`
            }`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="h-3 w-3" />
          </a>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleResponsiveModeToggle}
          className="h-6 w-6 md:h-8 md:w-8 p-0"
          title={getResponsiveTitle()}
        >
          {getResponsiveIcon()}
        </Button>
      </div>
    </div>
  );
}

export default function webPreview() {
  const [url, setUrl] = useState("/");
  const [responsiveMode, setResponsiveMode] =
    useState<ResponsiveMode>("desktop");

  const getIframeStyles = () => {
    switch (responsiveMode) {
      case "desktop":
        return "w-full h-full";
      case "tablet":
        return "w-full max-w-[820px] h-full mx-auto border border-gray-300 rounded-lg shadow-lg";
      case "mobile":
        return "w-full max-w-[290px] h-full mx-auto border border-gray-300 rounded-lg shadow-lg";
    }
  };

  const getContainerStyles = () => {
    switch (responsiveMode) {
      case "desktop":
        return "flex-1 bg-white";
      case "tablet":
      case "mobile":
        return "flex-1 bg-gray-100 flex items-center justify-center p-2 md:p-4 overflow-auto";
    }
  };

  return (
    <div className="h-full w-full flex flex-col">
      <WebPreviewHeader
        url={url}
        setUrl={setUrl}
        responsiveMode={responsiveMode}
        setResponsiveMode={setResponsiveMode}
      />
      <div className={getContainerStyles()}>
        <iframe
          src={`http://localhost:3000${url.startsWith("/") ? url : `/${url}`}`}
          className={getIframeStyles()}
          title="Web Preview"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
        />
      </div>
    </div>
  );
}
