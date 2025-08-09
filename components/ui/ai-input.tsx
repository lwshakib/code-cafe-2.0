"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bot, Command, Paperclip, Plus, Send, Sparkles } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCafeContext } from "@/context/CafeProvider";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Cafe } from "@/types/cafe";

interface UseAutoResizeTextareaProps {
  minHeight: number;
  maxHeight?: number;
}

function useAutoResizeTextarea({
  minHeight,
  maxHeight,
}: UseAutoResizeTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(
    (reset?: boolean) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      if (reset) {
        textarea.style.height = `${minHeight}px`;
        return;
      }

      textarea.style.height = `${minHeight}px`;
      const newHeight = Math.max(
        minHeight,
        Math.min(textarea.scrollHeight, maxHeight ?? Number.POSITIVE_INFINITY)
      );

      textarea.style.height = `${newHeight}px`;
    },
    [minHeight, maxHeight]
  );

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = `${minHeight}px`;
    }
  }, [minHeight]);

  useEffect(() => {
    const handleResize = () => adjustHeight();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [adjustHeight]);

  return { textareaRef, adjustHeight };
}

const MIN_HEIGHT = 100;
const MAX_HEIGHT = 264;

const AnimatedPlaceholder = () => (
  <AnimatePresence mode="wait">
    <motion.p
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.1 }}
      className="pointer-events-none w-[150px] text-sm absolute text-black/70 dark:text-white/70"
    >
      Ask AI...
    </motion.p>
  </AnimatePresence>
);

export default function AiInput() {
  const [value, setValue] = useState("");
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: MIN_HEIGHT,
    maxHeight: MAX_HEIGHT,
  });
  const { model, setModel, cafes, setCafes } = useCafeContext();
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showCommands, setShowCommands] = useState(false);
  const [hoveredCommand, setHoveredCommand] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const commandsRef = useRef<HTMLDivElement>(null);

  const commands = [
    {
      title: "Write Code",
      description: "Generate code for any language",
      detailedPrompt:
        "Write clean, well-documented code in the specified language. Include proper error handling, comments, and follow best practices for the chosen language and framework.",
    },
    {
      title: "Debug Code",
      description: "Find and fix bugs in your code",
      detailedPrompt:
        "Analyze the provided code to identify bugs, logical errors, and potential issues. Provide specific fixes with explanations and suggest improvements to prevent similar issues.",
    },
    {
      title: "Explain Code",
      description: "Get detailed explanations of code",
      detailedPrompt:
        "Break down the code line by line, explaining the purpose of each function, variable, and logic. Include context about design patterns, algorithms, and best practices used.",
    },
    {
      title: "Optimize Code",
      description: "Improve performance and efficiency",
      detailedPrompt:
        "Analyze the code for performance bottlenecks, memory leaks, and inefficient algorithms. Provide optimized solutions with benchmarks and explanations of improvements.",
    },
    {
      title: "Create Tests",
      description: "Generate unit tests for your code",
      detailedPrompt:
        "Create comprehensive unit tests covering edge cases, error conditions, and normal operation. Include test descriptions, setup/teardown, and mock objects where appropriate.",
    },
    {
      title: "Code Review",
      description: "Get feedback on your code quality",
      detailedPrompt:
        "Perform a thorough code review focusing on readability, maintainability, security, performance, and adherence to coding standards. Provide specific suggestions for improvement.",
    },
    {
      title: "Refactor Code",
      description: "Restructure code for better maintainability",
      detailedPrompt:
        "Restructure the code to improve readability, reduce complexity, and enhance maintainability. Apply design patterns, extract methods, and improve naming conventions.",
    },
    {
      title: "Add Comments",
      description: "Add documentation and comments to code",
      detailedPrompt:
        "Add comprehensive comments and documentation explaining the purpose, parameters, return values, and usage examples for functions, classes, and complex logic.",
    },
    {
      title: "Convert Language",
      description: "Convert code between programming languages",
      detailedPrompt:
        "Convert the code to the target language while maintaining functionality, performance, and idiomatic patterns. Adapt libraries, syntax, and language-specific features appropriately.",
    },
    {
      title: "Generate API",
      description: "Create REST API endpoints and documentation",
      detailedPrompt:
        "Design and implement RESTful API endpoints with proper HTTP methods, status codes, request/response schemas, authentication, and comprehensive documentation including examples.",
    },
    {
      title: "Database Query",
      description: "Write and optimize database queries",
      detailedPrompt:
        "Write efficient database queries with proper indexing, joins, and optimization techniques. Include query performance analysis and alternative approaches for complex operations.",
    },
    {
      title: "UI Component",
      description: "Create React/Vue/Angular components",
      detailedPrompt:
        "Create reusable UI components with proper props, state management, styling, accessibility features, and responsive design. Include TypeScript types and component documentation.",
    },
    {
      title: "Mobile App",
      description: "Generate mobile app code and structure",
      detailedPrompt:
        "Create mobile app architecture with proper navigation, state management, API integration, offline capabilities, and platform-specific features for iOS/Android development.",
    },
    {
      title: "Web Scraping",
      description: "Create web scraping scripts and bots",
      detailedPrompt:
        "Build web scraping solutions with proper rate limiting, error handling, data parsing, and respect for robots.txt. Include data storage, processing, and ethical scraping practices.",
    },
    {
      title: "Data Analysis",
      description: "Analyze and visualize data with Python/R",
      detailedPrompt:
        "Perform comprehensive data analysis including data cleaning, statistical analysis, visualization, and insights generation. Use appropriate libraries and techniques for the data type and analysis goals.",
    },
  ];

  const handelClose = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input
    }
    setImagePreview(null); // Use null instead of empty string
  };

  const handelChange = (e: any) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!value.trim()) return;

    try {
      const promise = fetch('/api/cafe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      toast.promise(promise, {
        loading: 'Creating cafe...',
        success: 'Cafe created successfully',
        error: 'Failed to create cafe',
      });

      const response = await promise;


      if (response.ok) {
        const cafe = await response.json();
        setCafes((prevCafes: Cafe[]) => [...prevCafes, cafe]);
        console.log('Cafe created:', cafe);
        
        // Redirect to the cafe page with the message
        router.push(`/~/${cafe.id}?message=${encodeURIComponent(value)}`);
      } else {
        console.error('Failed to create cafe:', response.statusText);
        toast.error('Failed to create cafe');
      }
    } catch (error) {
      console.error('Error creating cafe:', error);
      toast.error('Error creating cafe');
    }

    setValue("");
    adjustHeight(true);
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // Handle click outside to close popovers
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showCommands &&
        commandsRef.current &&
        !commandsRef.current.contains(event.target as Node) &&
        !textareaRef.current?.contains(event.target as Node)
      ) {
        setShowCommands(false);
        setHoveredCommand(null);
        // Remove the slash from the input
        if (value.startsWith("/")) {
          setValue(value.substring(1));
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCommands, value]);
  return (
    <div className="w-full py-4">
      <div className="relative max-w-xl border rounded-[22px] border-black/5 p-1 w-full mx-auto">
        <div className="relative rounded-2xl border border-black/5 bg-neutral-800/5 flex flex-col">
          <div
            className="overflow-y-auto"
            style={{ maxHeight: `${MAX_HEIGHT}px` }}
          >
            <div className="relative">
              <Textarea
                id="ai-input-04"
                value={value}
                placeholder=""
                className="w-full rounded-2xl rounded-b-none px-4 py-3 bg-black/5 dark:bg-white/5 border-none dark:text-white resize-none focus-visible:ring-0 leading-[1.2]"
                ref={textareaRef}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setValue(newValue);
                  adjustHeight();
                  console.log(newValue);

                  // Show commands popover if first character is "/"
                  if (newValue.startsWith("/")) {
                    setShowCommands(true);
                  } else {
                    setShowCommands(false);
                  }
                }}
              />
              {!value && (
                <div className="absolute left-4 top-3">
                  <AnimatedPlaceholder />
                </div>
              )}
            </div>
          </div>

          {/* Commands Popover */}
          <AnimatePresence>
            {showCommands && (
              <motion.div
                ref={commandsRef}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute bottom-full left-4 mb-2 w-80 bg-background border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 backdrop-blur-sm"
              >
                <div className="p-3">
                  <div className="text-xs font-semibold text-gray-400 mb-3 px-1 uppercase tracking-wide">
                    Commands
                  </div>
                  <ScrollArea className="h-64">
                    <div className="space-y-1 pr-2">
                      {commands.map((command, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 group"
                          onMouseEnter={() => setHoveredCommand(index)}
                          onMouseLeave={() => setHoveredCommand(null)}
                          onClick={() => {
                            setValue(command.detailedPrompt);
                            setShowCommands(false);
                            setHoveredCommand(null);
                            textareaRef.current?.focus();
                          }}
                        >
                          <div className="font-medium text-sm text-gray-900 dark:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-200">
                            {command.title}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            {command.description}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
                {/* Arrow pointing down */}
                <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-200 dark:border-t-gray-700"></div>

                {/* Detailed Prompt Popover */}
                <AnimatePresence>
                  {hoveredCommand !== null && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.1 }}
                      className="absolute left-full top-0 ml-2 w-80 bg-background border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 p-3"
                      style={{
                        top: `${
                          hoveredCommand !== null ? hoveredCommand * 10 : 0
                        }px`,
                      }}
                    >
                      <div className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                        Detailed Prompt
                      </div>
                      <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        {hoveredCommand !== null
                          ? commands[hoveredCommand].detailedPrompt
                          : ""}
                      </div>
                      {/* Arrow pointing left */}
                      <div className="absolute left-0 top-4 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-200 dark:border-r-gray-700 transform -translate-x-1"></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="h-12 bg-black/5 dark:bg-white/5 rounded-b-xl">
            <div className="absolute left-3 bottom-3 flex items-center gap-2">
              <label
                className={cn(
                  "cursor-pointer relative rounded-full p-2 bg-black/5 dark:bg-white/5",
                  imagePreview
                    ? "bg-[#ff3f17]/15 border border-[#ff3f17] text-[#ff3f17]"
                    : "bg-black/5 dark:bg-white/5 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white"
                )}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handelChange}
                  className="hidden"
                />
                <Paperclip
                  className={cn(
                    "w-4 h-4 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors",
                    imagePreview && "text-[#ff3f17]"
                  )}
                />
                {imagePreview && (
                  <div className="absolute w-[100px] h-[100px] top-14 -left-4">
                    <Image
                      className="object-cover rounded-2xl"
                      src={imagePreview || "/picture1.jpeg"}
                      height={500}
                      width={500}
                      alt="additional image"
                    />
                    <button
                      onClick={handelClose}
                      className="bg-[#e8e8e8] text-[#464646] absolute -top-1 -left-1 shadow-3xl rounded-full rotate-45"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </label>
              <button
                type="button"
                onClick={() => {
                  setValue("/");
                  setShowCommands(true);
                  textareaRef.current?.focus();
                }}
                className="rounded-full p-2 bg-black/5 dark:bg-white/5 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors"
                title="Open commands"
              >
                <Command className="w-4 h-4" />
              </button>
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger className="w-[140px] h-8 rounded-full border border-black/5 bg-black/5 dark:bg-white/5 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4" />
                      <span>GPT-4</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="gpt-3.5-turbo">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4" />
                      <span>GPT-3.5 Turbo</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="claude-3">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4" />
                      <span>Claude 3</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="gemini-pro">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4" />
                      <span>Gemini Pro</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="absolute right-3 bottom-3 flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  // TODO: Implement prompt enhancement logic
                  console.log("Enhance prompt clicked");
                }}
                className={cn(
                  "rounded-full p-2 transition-colors",
                  value
                    ? "bg-[#ff3f17]/15 text-[#ff3f17] hover:bg-[#ff3f17]/25"
                    : "bg-black/5 dark:bg-white/5 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white"
                )}
                title="Enhance prompt"
              >
                <Sparkles className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className={cn(
                  "rounded-full p-2 transition-colors",
                  value
                    ? "bg-[#ff3f17]/15 text-[#ff3f17]"
                    : "bg-black/5 dark:bg-white/5 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white"
                )}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
