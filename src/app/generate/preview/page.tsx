import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Send } from "lucide-react";
import { LinkedInPost } from "@/components/social/linkedin-post";
import { TwitterPost } from "@/components/social/twitter-post";

export default function PreviewPage() {
  return (
    <div className="flex h-screen">
      {/* Chat Section */}
      <div className="flex w-1/2 flex-col border-r">
        <div className="flex-1 space-y-4 overflow-auto p-4">
          {/* AI Message */}
          <div className="flex items-start gap-3">
            <Avatar>
              <AvatarFallback>
                <Bot className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 rounded-xl bg-muted p-3">
              <p>
                I&apos;ll help you create viral social media content. What kind
                of post would you like to generate?
              </p>
            </div>
          </div>

          {/* User Message */}
          <div className="flex items-start justify-end gap-3">
            <div className="flex-1 rounded-xl bg-primary p-3 text-primary-foreground">
              <p>
                Make me a viral LinkedIn post about why TypeScript is better
                than JavaScript
              </p>
            </div>
            <Avatar>
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>

          {/* AI Message with Generations */}
          <div className="flex items-start gap-3">
            <Avatar>
              <AvatarFallback>
                <Bot className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-4">
              <div className="rounded-xl bg-muted p-3">
                <p>Here are 3 variations of your LinkedIn post:</p>
              </div>
              <div className="grid gap-3">
                <div className="rounded-lg border bg-background p-3">
                  <p className="font-medium">Professional Version</p>
                  <p className="mt-2 text-muted-foreground">
                    🚀 Why I Switched to TypeScript and Never Looked Back After
                    5 years of JavaScript development, making the switch to
                    TypeScript was a game-changer. Here&apos;s why: ✅ Catch
                    bugs before they hit production ✅ Better IDE support and
                    refactoring ✅ Self-documenting code ✅ Improved team
                    collaboration The initial learning curve is worth it. Your
                    future self will thank you. #TypeScript #WebDevelopment
                    #Programming #SoftwareEngineering
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Use this version
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Input */}
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Textarea
              placeholder="Type a message..."
              className="min-h-[44px] resize-none"
              rows={1}
            />
            <Button size="icon" className="h-11 w-11 shrink-0">
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="flex w-1/2 flex-col bg-muted/50">
        <div className="flex-1 space-y-6 overflow-y-auto p-8">
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
    </div>
  );
}
