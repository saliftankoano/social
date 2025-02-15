"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send } from "lucide-react";
import { LinkedInPost } from "@/components/social/linkedin-post";
import { TwitterPost } from "@/components/social/twitter-post";
import { useChat } from "@ai-sdk/react";
import { cn } from "@/lib/utils";
import { useRef, useEffect } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function PreviewPage() {
  const {
    messages,
    input,
    status,
    error,
    handleInputChange,
    handleSubmit,
    reload,
  } = useChat({});

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "0px";
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = scrollHeight + "px";
    }
  }, [input]);

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      const form = e.currentTarget.closest("form");
      if (form) {
        form.requestSubmit();
      }
    }
  };

  return (
    <div className="h-screen w-full">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        {/* Chat Section */}
        <ResizablePanel defaultSize={30} minSize={30} maxSize={60}>
          <div className="flex h-full flex-col border-r">
            <div className="flex-1 space-y-3 overflow-auto p-4">
              {/* Chat Messages */}
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex",
                    message.role === "user" ? "justify-end" : "justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-3 text-sm",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {/* Loading States */}
              {(status === "submitted" || status === "streaming") && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl bg-muted px-4 py-3 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>AI is thinking...</span>
                  </div>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="flex justify-center">
                  <div className="flex flex-col items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-center">
                    <div className="text-sm font-medium text-destructive">
                      An error occurred while generating content.
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => reload()}
                      className="mt-2"
                    >
                      Try Again
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="border-t bg-background p-4">
              <form onSubmit={handleSubmit}>
                <div className="flex items-center gap-2">
                  <Textarea
                    ref={textareaRef}
                    name="prompt"
                    value={input}
                    disabled={status !== "ready"}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message... (⌘/Ctrl + Enter to send)"
                    className="max-h-[200px] min-h-[44px] resize-none rounded-2xl border-muted-foreground/20 bg-muted/50 px-4 py-3"
                    rows={1}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={status !== "ready"}
                    className="h-11 w-11 shrink-0 rounded-full"
                  >
                    <Send className="h-5 w-5 -translate-x-[1px] translate-y-[1px]" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Preview Section */}
        <ResizablePanel defaultSize={70}>
          <div className="flex h-full flex-col bg-muted/50">
            <div className="flex-1 overflow-y-auto p-8">
              <div className="space-y-6">
                <LinkedInPost
                  avatar="/avatars/user.png"
                  name="John Doe"
                  headline="Senior Software Engineer at Tech Corp"
                  timePosted="1h"
                  content="🚀 Why I Switched to TypeScript and Never Looked Back

After 5 years of JavaScript development, making the switch to TypeScript was a game-changer. Here's why:

✅ Catch bugs before they hit production
✅ Better IDE support and refactoring
✅ Self-documenting code
✅ Improved team collaboration

The initial learning curve is worth it. Your future self will thank you.

#TypeScript #WebDevelopment #Programming #SoftwareEngineering"
                />

                <TwitterPost
                  avatar="/avatars/user.png"
                  name="John Doe"
                  handle="johndoe"
                  verified={true}
                  timePosted="1h"
                  content="🚀 Why I Switched to TypeScript and Never Looked Back

After 5 years of JavaScript development, making the switch to TypeScript was a game-changer. Here's why:

✅ Catch bugs before they hit production
✅ Better IDE support and refactoring
✅ Self-documenting code
✅ Improved team collaboration

The initial learning curve is worth it. Your future self will thank you.

#TypeScript #WebDevelopment #Programming"
                />
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
