import { env } from "@/env";
import { NextResponse } from "next/server";

interface CreationParams {
  inputText: string;
  hasToGenerateVoice?: boolean;
  selectedVoice?: string;
  hasToSearchMedia?: boolean;
  mediaType?: "stockVideo" | "movingImage" | "aiVideo";
  generationPreset?: string;
  generationUserPrompt?: string;
  hasEnhancedGeneration?: boolean;
  audioUrl?: string;
  captionPresetName?: string;
  hasAvatar?: boolean;
  selectedAvatar?: string;
  ratio?: "9 / 16" | "1 / 1";
  nbGenerations?: number;
  selectedAvatarType?: "video/mp4" | "image/png";
  imageGenerationModel?: "good" | "fast";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreationParams;

    const response = await fetch("https://www.revid.ai/api/public/v2/render", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        key: env.REVID_API_KEY,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as {
      data: {
        id: string;
        status: string;
      };
    };
    return NextResponse.json(data);
  } catch (error) {
    console.error("Revid API error:", error);
    return NextResponse.json(
      { error: "Failed to process video generation request" },
      { status: 500 },
    );
  }
}
