import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      inputText: string;
      hasToGenerateVoice: boolean;
      hasToSearchMedia: boolean;
      hasEnhancedGeneration: boolean;
      hasAvatar: boolean;
      captionPresetName: string;
    };

    const response = await fetch("https://www.revid.ai/api/public/v2/render", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        key: process.env.NEXT_PUBLIC_REVID_API_KEY ?? "",
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
