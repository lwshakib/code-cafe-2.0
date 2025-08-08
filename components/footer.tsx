"use client";

import { ModeToggle } from "./mode-toggle";
import { Separator } from "./ui/separator";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              © {currentYear} Code Cafe. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-4">
            <nav className="flex items-center gap-4 text-sm">
              <a
                href="#privacy"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy
              </a>
              <a
                href="#terms"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms
              </a>
              <a
                href="#contact"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </a>
            </nav>
            <Separator orientation="vertical" className="h-4" />
            <ModeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
