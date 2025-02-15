"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send, CheckCircle2, Video } from "lucide-react";
import { LinkedInPost } from "@/components/social/linkedin-post";
import { TwitterPost } from "@/components/social/twitter-post";
import { useChat } from "@ai-sdk/react";
import { cn } from "@/lib/utils";
import { useRef, useEffect, useState } from "react";
import { usePromptStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

interface AIResponse {
  posts: Array<{
    reasoning: string;
    post: string;
    platform: string;
  }>;
}

type VideoGenerationState = Record<number, boolean>;

interface VideoGenerationResponse {
  data: {
    id: string;
    status: string;
  };
}

export default function PreviewPage() {
  const router = useRouter();
  const { prompt, platforms } = usePromptStore();
  const formRef = useRef<HTMLFormElement>(null);
  const [aiResponses, setAiResponses] = useState<AIResponse[]>([]);
  const [selectedResponseIndex, setSelectedResponseIndex] = useState<number>(0);
  const [generatingVideo, setGeneratingVideo] = useState<VideoGenerationState>(
    {},
  );

  // If no prompt is set, redirect back to generate page
  useEffect(() => {
    if (!prompt) {
      router.push("/generate");
    }
  }, [prompt, router]);

  const {
    messages,
    input,
    status,
    error,
    handleInputChange,
    handleSubmit,
    reload,
    setInput,
  } = useChat({
    api: "/api/chat",
    initialMessages: [],
    onFinish: (message) => {
      try {
        // Try to parse the AI response
        const response = JSON.parse(message.content) as AIResponse;
        setAiResponses((prev) => [...prev, response]);
        setSelectedResponseIndex(aiResponses.length); // Select the new response
      } catch (e) {
        console.error("Failed to parse AI response:", e);
      }
    },
  });

  // Send initial prompt when component mounts
  useEffect(() => {
    if (prompt && messages.length === 0) {
      // Set the input value
      setInput(prompt + " Target platforms: " + platforms.join(", "));
      // Submit after a short delay to ensure the input is set
      setTimeout(() => {
        formRef.current?.requestSubmit();
      }, 100);
    }
  }, [prompt, platforms, messages.length, setInput]);

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

  const generateVideo = async (script: string, index: number) => {
    setGeneratingVideo((prev) => ({ ...prev, [index]: true }));
    try {
      const response = await fetch("/api/revid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          creationParams: {
            inputText: script,
            hasToGenerateVoice: false,
            hasToSearchMedia: false,
            hasEnhancedGeneration: false,
            hasAvatar: false,
            captionPresetName: "Wrap 1",
            ratio: "9 / 16",
            selectedAvatarType: "video/mp4",
            nbGenerations: 1,
            imageGenerationModel: "good",
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = (await response.json()) as VideoGenerationResponse;
      console.log("Video generation started:", data);
    } catch (error) {
      console.error("Error generating video:", error);
    } finally {
      setGeneratingVideo((prev) => ({ ...prev, [index]: false }));
    }
  };

  if (!prompt) {
    return null;
  }

  return (
    <div className="h-screen w-full">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        {/* Chat Section */}
        <ResizablePanel defaultSize={30} minSize={30} maxSize={60}>
          <div className="flex h-full flex-col border-r">
            <div className="flex-1 space-y-3 overflow-auto p-4">
              {/* Chat Messages */}
              {messages.map((message, index) => {
                if (message.role === "user") {
                  return (
                    <div key={message.id} className="flex justify-end">
                      <div className="max-w-[85%] rounded-2xl bg-primary px-4 py-3 text-sm text-primary-foreground">
                        {message.content}
                      </div>
                    </div>
                  );
                }

                // Only show custom UI for assistant messages that are JSON
                try {
                  JSON.parse(message.content);
                  const revisionNumber = Math.floor(index / 2);
                  return (
                    <div
                      key={message.id}
                      className="flex flex-col justify-start gap-1"
                    >
                      <span className="ml-1 text-xs text-muted-foreground">
                        Click to preview this version
                      </span>
                      <button
                        onClick={() => setSelectedResponseIndex(revisionNumber)}
                        className={cn(
                          "group flex max-w-[85%] items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition-all hover:border-primary/50 hover:bg-muted/80",
                          selectedResponseIndex === revisionNumber
                            ? "border-primary/50 bg-muted text-foreground shadow-sm"
                            : "border-transparent bg-muted/50 text-muted-foreground",
                        )}
                      >
                        <div className="flex flex-col items-start gap-0.5">
                          <span className="font-medium">
                            Revision {revisionNumber + 1}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {aiResponses[revisionNumber]?.posts.length} posts
                            generated
                          </span>
                        </div>
                        {selectedResponseIndex === revisionNumber && (
                          <CheckCircle2 className="ml-auto h-4 w-4 text-primary" />
                        )}
                      </button>
                    </div>
                  );
                } catch {
                  // If streaming JSON or other message, show loading state
                  if (
                    status === "streaming" &&
                    message === messages[messages.length - 1]
                  ) {
                    return (
                      <div
                        key={message.id}
                        className="flex flex-col justify-start gap-1"
                      >
                        <span className="ml-1 text-xs text-muted-foreground">
                          Generating new version...
                        </span>
                        <div className="max-w-[85%] animate-pulse rounded-2xl border border-transparent bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col gap-0.5">
                              <div className="h-4 w-24 rounded bg-muted"></div>
                              <div className="h-3 w-32 rounded bg-muted"></div>
                            </div>
                            <Loader2 className="ml-auto h-4 w-4 animate-spin" />
                          </div>
                        </div>
                      </div>
                    );
                  }

                  // For any other non-JSON messages
                  return (
                    <div key={message.id} className="flex justify-start">
                      <div className="max-w-[85%] rounded-2xl bg-muted px-4 py-3 text-sm text-muted-foreground">
                        {message.content}
                      </div>
                    </div>
                  );
                }
              })}

              {/* Loading States */}
              {status === "submitted" && (
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
              <form ref={formRef} onSubmit={handleSubmit}>
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
                {aiResponses[selectedResponseIndex]?.posts.map(
                  (post, index) => {
                    if (post.platform === "linkedin") {
                      return (
                        <LinkedInPost
                          key={index}
                          avatar="/avatars/user.png"
                          name="John Doe"
                          headline="Senior Software Engineer at Tech Corp"
                          timePosted="Just now"
                          content={
                            <div className="prose prose-sm dark:prose-invert">
                              <ReactMarkdown>{post.post}</ReactMarkdown>
                            </div>
                          }
                        />
                      );
                    }
                    if (post.platform === "twitter") {
                      return (
                        <TwitterPost
                          key={index}
                          avatar="/avatars/user.png"
                          name="John Doe"
                          handle="johndoe"
                          verified={true}
                          timePosted="Just now"
                          content={
                            <div className="prose prose-sm dark:prose-invert">
                              <ReactMarkdown>{post.post}</ReactMarkdown>
                            </div>
                          }
                        />
                      );
                    }
                    if (post.platform === "tiktok") {
                      return (
                        <div
                          key={index}
                          className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm"
                        >
                          <div className="mb-4 flex items-center justify-between">
                            <h3 className="font-semibold">TikTok Script</h3>
                            <Button
                              onClick={() => generateVideo(post.post, index)}
                              disabled={generatingVideo[index]}
                              className="gap-2"
                            >
                              {generatingVideo[index] ? (
                                <>
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                  Generating...
                                </>
                              ) : (
                                <>
                                  <Video className="h-4 w-4" />
                                  Generate Video
                                </>
                              )}
                            </Button>
                          </div>
                          <div className="whitespace-pre-wrap text-sm">
                            {post.post.split(/(\[[^\]]*\])/g).map((part, i) => {
                              if (part.startsWith("[") && part.endsWith("]")) {
                                return (
                                  <span
                                    key={i}
                                    className="mb-2 block rounded bg-muted/50 px-2 py-1 text-muted-foreground"
                                  >
                                    {part}
                                  </span>
                                );
                              }
                              return (
                                <span key={i} className="mb-2 block">
                                  {part}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  },
                )}
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
