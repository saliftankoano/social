import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  MoreHorizontal,
  ThumbsUp,
  MessageSquare,
  Repeat,
  Send,
} from "lucide-react";
import { type ReactNode } from "react";

interface LinkedInPostProps {
  avatar: string;
  name: string;
  headline: string;
  timePosted: string;
  content: ReactNode;
  likes?: number;
  comments?: number;
  reposts?: number;
  image?: string;
}

export function LinkedInPost({
  avatar,
  name,
  headline,
  timePosted,
  content,
  likes = 0,
  comments = 0,
  reposts = 0,
  image,
}: LinkedInPostProps) {
  return (
    <Card className="border-[#e8e8e8] bg-white dark:border-[#1d1d1d] dark:bg-[#1d1d1d]">
      <CardContent className="p-3">
        <div className="flex items-start gap-3">
          <Avatar className="h-12 w-12 shrink-0 border-2 border-white ring-1 ring-[#e8e8e8]/50 dark:border-[#1d1d1d] dark:ring-[#424242]/50">
            <AvatarImage src={avatar} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="flex items-baseline gap-1">
                  <h3 className="truncate text-[16px] font-semibold leading-5 text-[#000000e6] hover:text-[#0a66c2] hover:underline dark:text-[#ffffffef]">
                    {name}
                  </h3>
                  <span className="text-[14px] text-[#666666] dark:text-[#a6a6a6]">
                    • 1st
                  </span>
                </div>
                <p className="text-[14px] leading-5 text-[#666666] dark:text-[#a6a6a6]">
                  {headline}
                </p>
                <p className="flex items-center gap-1 text-[14px] leading-5 text-[#666666] dark:text-[#a6a6a6]">
                  {timePosted} • <span className="text-[0.6rem]">🌐</span>
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-[40px] w-[40px] shrink-0 rounded-full text-[#666666] hover:bg-[#00000014] dark:text-[#a6a6a6] dark:hover:bg-[#ffffff1a]"
              >
                <MoreHorizontal className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-3 text-[14px] leading-[1.4] text-[#000000e6] dark:text-[#ffffffef]">
          {content}
        </div>

        {(likes > 0 || comments > 0) && (
          <div className="mt-2 flex items-center gap-1 border-b border-[#e8e8e8] pb-1 text-[12px] text-[#666666] dark:border-[#424242] dark:text-[#a6a6a6]">
            {likes > 0 && (
              <div className="flex items-center gap-1">
                <div className="flex -space-x-1">
                  <div className="flex h-[16px] w-[16px] items-center justify-center rounded-full bg-[#0a66c2] text-[0.65rem] text-white ring-2 ring-white dark:ring-[#1d1d1d]">
                    👍
                  </div>
                  <div className="flex h-[16px] w-[16px] items-center justify-center rounded-full bg-[#b24020] text-[0.65rem] text-white ring-2 ring-white dark:ring-[#1d1d1d]">
                    ❤️
                  </div>
                </div>
                <span>{likes}</span>
              </div>
            )}
            {likes > 0 && comments > 0 && <span>•</span>}
            {comments > 0 && (
              <span className="hover:text-[#0a66c2] hover:underline">
                {comments} comments
              </span>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="grid grid-cols-4 gap-1 border-t border-[#e8e8e8] px-1 py-1 dark:border-[#424242]">
        <Button
          variant="ghost"
          size="sm"
          className="h-[48px] gap-2 rounded-[4px] px-2 text-[14px] font-medium text-[#666666] hover:bg-[#00000014] dark:text-[#a6a6a6] dark:hover:bg-[#ffffff1a]"
        >
          <ThumbsUp className="h-[20px] w-[20px]" />
          Like
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-[48px] gap-2 rounded-[4px] px-2 text-[14px] font-medium text-[#666666] hover:bg-[#00000014] dark:text-[#a6a6a6] dark:hover:bg-[#ffffff1a]"
        >
          <MessageSquare className="h-[20px] w-[20px]" />
          Comment
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-[48px] gap-2 rounded-[4px] px-2 text-[14px] font-medium text-[#666666] hover:bg-[#00000014] dark:text-[#a6a6a6] dark:hover:bg-[#ffffff1a]"
        >
          <Repeat className="h-[20px] w-[20px]" />
          Repost
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-[48px] gap-2 rounded-[4px] px-2 text-[14px] font-medium text-[#666666] hover:bg-[#00000014] dark:text-[#a6a6a6] dark:hover:bg-[#ffffff1a]"
        >
          <Send className="h-[20px] w-[20px]" />
          Send
        </Button>
      </CardFooter>
    </Card>
  );
}
