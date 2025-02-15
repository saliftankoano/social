import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, ArrowUp } from "lucide-react";

export default function GeneratePage() {
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
                <div className="relative">
                  <div className="relative rounded-xl border bg-background shadow-sm">
                    <div className="flex flex-col">
                      <div className="flex items-start gap-3 p-4">
                        <Textarea
                          placeholder="Make me a ragebait post about why typescript on the backend is great to attract soydevs to engage with my post"
                          className="flex-1 resize-none border-0 bg-transparent p-0 text-lg shadow-none focus-visible:ring-0"
                          rows={1}
                        />
                      </div>

                      <div className="border-t px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          <Button variant="outline" className="rounded-full">
                            Professional
                          </Button>
                          <Button variant="outline" className="rounded-full">
                            Casual
                          </Button>
                          <Button variant="outline" className="rounded-full">
                            Creative
                          </Button>
                          <div className="flex-1" />
                          <Button className="gap-2 rounded-full">
                            Generate
                            <Sparkles className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="manual">
                <div className="relative">
                  <div className="relative rounded-xl border bg-background shadow-sm">
                    <div className="flex flex-col">
                      <div className="flex items-start gap-3 p-4">
                        <Textarea
                          placeholder="Python is the best language ever created..."
                          className="flex-1 resize-none border-0 bg-transparent p-0 text-lg shadow-none focus-visible:ring-0"
                          rows={1}
                        />
                        <div className="mt-2 flex items-center gap-2">
                          <Button
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
                          <Button variant="outline" className="rounded-full">
                            Professional
                          </Button>
                          <Button variant="outline" className="rounded-full">
                            Casual
                          </Button>
                          <Button variant="outline" className="rounded-full">
                            Creative
                          </Button>
                          <div className="flex-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
            <Card className="group overflow-hidden transition-colors hover:border-foreground">
              <CardContent className="p-0">
                <div className="aspect-[4/3] w-full bg-[#0077B5]/10" />
              </CardContent>
              <CardFooter className="p-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-600 to-blue-800" />
                  <div className="min-w-0">
                    <h3
                      className="line-clamp-2 font-semibold"
                      title="Why I Left FAANG for a Startup"
                    >
                      Why I Left FAANG for a Startup
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      March 15, 2024
                    </p>
                  </div>
                </div>
              </CardFooter>
            </Card>

            {/* Twitter Post */}
            <Card className="group overflow-hidden transition-colors hover:border-foreground">
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
            <Card className="group overflow-hidden transition-colors hover:border-foreground">
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
            <Card className="group overflow-hidden transition-colors hover:border-foreground">
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
