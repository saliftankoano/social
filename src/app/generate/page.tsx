"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { usePromptStore } from "@/lib/store";
import { type Platform } from "@/lib/store";
import { Sparkles, ArrowUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FormEvent, useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function GeneratePage() {
  const router = useRouter();
  const { setPrompt, setPlatforms, platforms } = usePromptStore();
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Example prompts for each card
  const examplePrompts = {
    linkedin:
      "Create a viral post about unconventional beauty product hacks that save money and work better than expensive alternatives. Include tips about using common household items for skincare and makeup, focusing on sustainability and affordability.",
    twitter:
      "Create a controversial but engaging tweet about why TypeScript is actually making developers worse at JavaScript. Make it spicy but backed with some logical arguments.",
    tiktok:
      "Generate a script for a day-in-the-life TikTok that shows the reality vs expectations of being a remote developer, with a touch of humor and relatable moments.",
    reddit:
      "Write a detailed AITA-style post about choosing PHP for a new project in 2024, defending the decision while acknowledging modern alternatives. Make it engaging and slightly controversial.",
  };

  const handleCardClick = (prompt: string) => {
    setInput(prompt);
    // Ensure textarea is visible
    textareaRef.current?.scrollIntoView({ behavior: "smooth" });
    // Focus the textarea
    textareaRef.current?.focus();
  };

  const togglePlatform = (platform: Platform) => {
    if (platforms.includes(platform)) {
      // Remove platform if it's not the last one
      if (platforms.length > 1) {
        setPlatforms(platforms.filter((p) => p !== platform));
      }
    } else {
      setPlatforms([...platforms, platform]);
    }
  };

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setPrompt(input.trim());
    router.push("/generate/preview");
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="flex h-[90vh] items-center">
        <div className="container mx-auto p-6">
          <div className="mx-auto max-w-3xl space-y-12">
            <div className="space-y-4 text-center">
              <h1 className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-center text-6xl font-bold tracking-tight text-transparent sm:text-7xl">
                How can I help you shitpost?
              </h1>
              <p className="text-muted-foreground">
                {
                  "Generate viral social media content with AI. No more writer's block."
                }
              </p>
            </div>

            <Tabs defaultValue="ai" className="w-full">
              <TabsList>
                <TabsTrigger value="ai">AI Assisted</TabsTrigger>
                <TabsTrigger value="manual">Manual</TabsTrigger>
              </TabsList>
              <TabsContent value="ai">
                <form onSubmit={handleSubmit}>
                  <div className="relative">
                    <div className="relative rounded-xl border bg-background shadow-sm">
                      <div className="flex flex-col">
                        <div className="flex items-start gap-3 p-4">
                          <Textarea
                            ref={textareaRef}
                            placeholder="Make me a ragebait post about why typescript on the backend is great to attract soydevs to engage with my post"
                            className="flex-1 resize-none border-0 bg-transparent p-0 text-lg shadow-none focus-visible:ring-0"
                            rows={1}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                          />
                        </div>

                        <div className="border-t px-4 py-3">
                          <div className="flex flex-wrap gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              className={cn(
                                "rounded-full transition-colors",
                                platforms.includes("tiktok") &&
                                  "border-primary bg-primary text-primary-foreground",
                              )}
                              onClick={() => togglePlatform("tiktok")}
                            >
                              TikTok
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              className={cn(
                                "rounded-full transition-colors",
                                platforms.includes("twitter") &&
                                  "border-primary bg-primary text-primary-foreground",
                              )}
                              onClick={() => togglePlatform("twitter")}
                            >
                              𝕏 / Twitter
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              className={cn(
                                "rounded-full transition-colors",
                                platforms.includes("linkedin") &&
                                  "border-primary bg-primary text-primary-foreground",
                              )}
                              onClick={() => togglePlatform("linkedin")}
                            >
                              LinkedIn
                            </Button>
                            <div className="flex-1" />
                            <Button
                              type="submit"
                              className="gap-2 rounded-full"
                            >
                              Generate
                              <Sparkles className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="manual">
                <form onSubmit={handleSubmit}>
                  <div className="relative">
                    <div className="relative rounded-xl border bg-background shadow-sm">
                      <div className="flex flex-col">
                        <div className="flex items-start gap-3 p-4">
                          <Textarea
                            ref={textareaRef}
                            placeholder="Python is the best language ever created..."
                            className="flex-1 resize-none border-0 bg-transparent p-0 text-lg shadow-none focus-visible:ring-0"
                            rows={1}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                          />
                          <div className="mt-2 flex items-center gap-2">
                            <Button
                              type="submit"
                              variant="ghost"
                              size="icon"
                              className="rounded-lg"
                            >
                              <ArrowUp />
                            </Button>
                          </div>
                        </div>

                        <div className="border-t px-4 py-3">
                          <div className="flex flex-wrap gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              className={cn(
                                "rounded-full transition-colors",
                                platforms.includes("tiktok") &&
                                  "border-primary bg-primary text-primary-foreground",
                              )}
                              onClick={() => togglePlatform("tiktok")}
                            >
                              TikTok
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              className={cn(
                                "rounded-full transition-colors",
                                platforms.includes("twitter") &&
                                  "border-primary bg-primary text-primary-foreground",
                              )}
                              onClick={() => togglePlatform("twitter")}
                            >
                              𝕏 / Twitter
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              className={cn(
                                "rounded-full transition-colors",
                                platforms.includes("linkedin") &&
                                  "border-primary bg-primary text-primary-foreground",
                              )}
                              onClick={() => togglePlatform("linkedin")}
                            >
                              LinkedIn
                            </Button>
                            <div className="flex-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Past posts */}
      <div className="container mx-auto px-6 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* LinkedIn Post */}
            <Card
              className="group cursor-pointer overflow-hidden transition-colors hover:border-foreground"
              onClick={() => handleCardClick(examplePrompts.linkedin)}
            >
              <CardContent className="p-0">
                <div className="aspect-[4/3] w-full bg-gradient-to-br from-pink-50 to-purple-50" />
              </CardContent>
              <CardFooter className="p-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 flex-shrink-0 rounded-full bg-gradient-to-br from-pink-400 to-purple-400" />
                  <div className="min-w-0">
                    <h3
                      className="line-clamp-2 font-semibold"
                      title="Beauty Hacks: Affordable Alternatives That Actually Work"
                    >
                      Beauty Hacks: Affordable Alternatives That Actually Work
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      March 15, 2024
                    </p>
                  </div>
                </div>
              </CardFooter>
            </Card>

            {/* Twitter Post */}
            <Card
              className="group cursor-pointer overflow-hidden transition-colors hover:border-foreground"
              onClick={() => handleCardClick(examplePrompts.twitter)}
            >
              <CardContent className="p-0">
                <div className="aspect-[4/3] w-full bg-blue-100" />
              </CardContent>
              <CardFooter className="p-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-400 to-blue-600" />
                  <div className="min-w-0">
                    <h3
                      className="line-clamp-2 font-semibold"
                      title="Hot Take: TypeScript is Just JavaScript with Training Wheels"
                    >
                      Hot Take: TypeScript is Just JavaScript with Training
                      Wheels
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      March 14, 2024
                    </p>
                  </div>
                </div>
              </CardFooter>
            </Card>

            {/* TikTok Post */}
            <Card
              className="group cursor-pointer overflow-hidden transition-colors hover:border-foreground"
              onClick={() => handleCardClick(examplePrompts.tiktok)}
            >
              <CardContent className="p-0">
                <div className="aspect-[4/3] w-full bg-gradient-to-br from-pink-100 to-purple-100" />
              </CardContent>
              <CardFooter className="p-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 flex-shrink-0 rounded-full bg-gradient-to-br from-pink-500 to-purple-500" />
                  <div className="min-w-0">
                    <h3
                      className="line-clamp-2 font-semibold"
                      title="Day in the Life: Remote Developer"
                    >
                      Day in the Life: Remote Developer
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      March 13, 2024
                    </p>
                  </div>
                </div>
              </CardFooter>
            </Card>

            {/* Reddit Post */}
            <Card
              className="group cursor-pointer overflow-hidden transition-colors hover:border-foreground"
              onClick={() => handleCardClick(examplePrompts.reddit)}
            >
              <CardContent className="p-0">
                <div className="aspect-[4/3] w-full bg-orange-100" />
              </CardContent>
              <CardFooter className="p-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 flex-shrink-0 rounded-full bg-gradient-to-br from-orange-500 to-red-500" />
                  <div className="min-w-0">
                    <h3
                      className="line-clamp-2 font-semibold"
                      title="AITA for Using PHP in 2024? A Long Discussion About Modern Web Development Practices"
                    >
                      AITA for Using PHP in 2024? A Long Discussion About Modern
                      Web Development Practices
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      March 12, 2024
                    </p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
