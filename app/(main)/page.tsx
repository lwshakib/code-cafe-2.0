"use client";

import { FloatingHeader } from "@/components/floating-header";
import { Footer } from "@/components/footer";
import AiInput from "@/components/ui/ai-input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCafeContext } from "@/context/CafeProvider";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

type Props = {};

function page({}: Props) {
  const { isSignedIn, isLoaded } = useCafeContext();

  if (!isLoaded) {
    return (
      <div className="w-full min-h-screen flex flex-col">
        {/* Header Skeleton */}
        <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              {/* Logo skeleton */}
              <Skeleton className="h-8 w-32" />

              {/* Navigation items skeleton */}
              <div className="hidden md:flex items-center gap-6">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
              </div>

              {/* Mode toggle skeleton */}
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="flex-1 flex justify-center items-center p-4">
          <div className="w-full max-w-4xl mx-auto space-y-8">
            {/* AI Input Container Skeleton */}
            <div className="relative">
              {/* Textarea skeleton */}
              <div className="relative">
                <Skeleton className="h-32 w-full rounded-lg" />
                {/* Placeholder text skeleton */}
                <div className="absolute top-4 left-4">
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>

              {/* Action buttons skeleton */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <Skeleton className="h-8 w-8 rounded-md" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-24 rounded-md" />
                  <Skeleton className="h-8 w-16 rounded-md" />
                </div>
              </div>
            </div>

            {/* Quick Actions Skeleton */}
            <div className="space-y-4">
              <Skeleton className="h-5 w-32 mx-auto" />
              <div className="flex flex-wrap justify-center gap-3">
                <Skeleton className="h-10 w-28 rounded-full" />
                <Skeleton className="h-10 w-28 rounded-full" />
                <Skeleton className="h-10 w-28 rounded-full" />
                <Skeleton className="h-10 w-28 rounded-full" />
              </div>
            </div>

            {/* Features Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="space-y-3">
                <Skeleton className="h-12 w-12 rounded-lg" />
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <div className="space-y-3">
                <Skeleton className="h-12 w-12 rounded-lg" />
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <div className="space-y-3">
                <Skeleton className="h-12 w-12 rounded-lg" />
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Skeleton */}
        <div className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <Skeleton className="h-4 w-48" />
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-4 w-px" />
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col">
      <FloatingHeader />
      <div className="flex-1 flex justify-center items-center">
        <AiInput />
      </div>
      <Footer />

      {!isSignedIn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-md mx-4 p-6 bg-background border rounded-lg shadow-lg">
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-semibold">Welcome to Code Cafe</h2>
                <p className="text-muted-foreground">
                  Please sign in to access all features and start coding with AI
                  assistance.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <SignInButton mode="modal">
                  <Button className="w-full">Sign In</Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button variant="outline" className="w-full">
                    Sign Up
                  </Button>
                </SignUpButton>
                <p className="text-sm text-muted-foreground text-center">
                  Sign in or create an account to unlock the full potential of
                  Code Cafe
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default page;
