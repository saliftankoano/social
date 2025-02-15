import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  MoreHorizontal,
  MessageCircle,
  Repeat2,
  Heart,
  Share,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type ReactNode } from "react";

interface TwitterPostProps {
  avatar: string;
  name: string;
  handle: string;
  verified?: boolean;
  timePosted: string;
  content: ReactNode;
  likes?: number;
  reposts?: number;
  comments?: number;
  image?: string;
}

export function TwitterPost({
  avatar,
  name,
  handle,
  verified = false,
  timePosted,
  content,
  likes = 0,
  reposts = 0,
  comments = 0,
  image,
}: TwitterPostProps) {
  return (
    <Card className="overflow-hidden border-[#eff3f4] bg-white dark:border-[#2f3336] dark:bg-black">
      <div className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10 shrink-0">
            <AvatarImage src={avatar} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <span className="truncate text-[15px] font-bold text-[#0f1419] hover:underline dark:text-[#e7e9ea]">
                    {name}
                  </span>
                  {verified && (
                    <Badge
                      variant="secondary"
                      className="shrink-0 rounded-full bg-transparent p-0.5"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-3.5 w-3.5 fill-[#1d9bf0]"
                      >
                        <g>
                          <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"></path>
                        </g>
                      </svg>
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <span className="truncate text-[15px] text-[#536471] dark:text-[#71767b]">
                    @{handle}
                  </span>
                  <span className="text-[15px] text-[#536471] dark:text-[#71767b]">
                    ·
                  </span>
                  <span className="truncate text-[15px] text-[#536471] dark:text-[#71767b]">
                    {timePosted}
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full text-[#536471] hover:bg-[#e8f5fd] hover:text-[#1d9bf0] dark:text-[#71767b] dark:hover:bg-[#031018]"
              >
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-3">
          <div className="whitespace-pre-wrap text-[15px] text-[#0f1419] dark:text-[#e7e9ea]">
            {content}
          </div>
          {image && (
            <div className="mt-3 overflow-hidden rounded-2xl border border-[#eff3f4] dark:border-[#2f3336]">
              <img
                src={image}
                alt="Post image"
                className="aspect-[16/9] h-full w-full object-cover"
              />
            </div>
          )}
        </div>

        <div className="mt-3 flex justify-between">
          <Button
            variant="ghost"
            className="group h-8 gap-2 rounded-full p-0 text-[13px] font-medium text-[#536471] hover:text-[#1d9bf0] dark:text-[#71767b]"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full group-hover:bg-[#e8f5fd] dark:group-hover:bg-[#031018]">
              <MessageCircle className="h-[18px] w-[18px]" />
            </div>
          </Button>
          <Button
            variant="ghost"
            className="group h-8 gap-2 rounded-full p-0 text-[13px] font-medium text-[#536471] hover:text-[#00ba7c] dark:text-[#71767b]"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full group-hover:bg-[#e6f3ef] dark:group-hover:bg-[#071a14]">
              <Repeat2 className="h-[18px] w-[18px]" />
            </div>
          </Button>
          <Button
            variant="ghost"
            className="group h-8 gap-2 rounded-full p-0 text-[13px] font-medium text-[#536471] hover:text-[#f91880] dark:text-[#71767b]"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full group-hover:bg-[#fee7f3] dark:group-hover:bg-[#200914]">
              <Heart className="h-[18px] w-[18px]" />
            </div>
          </Button>
          <Button
            variant="ghost"
            className="group h-8 gap-2 rounded-full p-0 text-[13px] font-medium text-[#536471] hover:text-[#1d9bf0] dark:text-[#71767b]"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full group-hover:bg-[#e8f5fd] dark:group-hover:bg-[#031018]">
              <Share className="h-[18px] w-[18px]" />
            </div>
          </Button>
        </div>
      </div>
    </Card>
  );
}
