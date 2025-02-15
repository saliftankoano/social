"use client";

import { useState } from "react";

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

const GENERATION_PRESETS = [
  "LEONARDO",
  "ANIME",
  "REALISM",
  "ILLUSTRATION",
  "SKETCH_COLOR",
  "SKETCH_BW",
  "PIXAR",
  "INK",
  "RENDER_3D",
  "LEGO",
  "SCIFI",
  "RECRO_CARTOON",
  "PIXEL_ART",
  "CREATIVE",
  "PHOTOGRAPHY",
  "RAYTRACED",
  "ENVIRONMENT",
  "FANTASY",
  "ANIME_SR",
  "MOVIE",
  "STYLIZED_ILLUSTRATION",
  "MANGA",
];

const CAPTION_PRESETS = [
  "Basic",
  "Revid",
  "Hormozi",
  "Ali",
  "Wrap 1",
  "Wrap 2",
  "Faceless",
];

const AUDIO_OPTIONS = {
  "Blade Runner 2049": "https://cdn.revid.ai/audio/_bladerunner-2049.mp3",
  Suspense: "https://cdn.revid.ai/audio/_paris-else.mp3",
  Calm: "https://cdn.revid.ai/audio/_izzamuzzic.mp3",
  // Add more audio options here as needed
} as const;

const VOICE_OPTIONS = {
  Jessica: "cgSgspJ2msm6clMCkdW9",
  brian: "nPczCjzI2devNBz1zQrb",
  // Add more voice options here as needed
} as const;

export default function RevidPage() {
  const [formData, setFormData] = useState<CreationParams>({
    inputText: "",
    hasToGenerateVoice: false,
    hasToSearchMedia: false,
    hasEnhancedGeneration: false,
    hasAvatar: false,
    captionPresetName: "Wrap 1",
    ratio: "9 / 16",
    selectedAvatarType: "video/mp4",
    nbGenerations: 1,
    imageGenerationModel: "good",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/revid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          creationParams: formData,
        }),
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
      console.log("Response:", data);
      // Handle the response as needed
    } catch (error) {
      console.error("Error:", error);
      // You might want to show an error message to the user here
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-2xl font-bold">Generate TikTok Video</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="mb-2 block">
            Script/Input Text:
            <textarea
              name="inputText"
              value={formData.inputText}
              onChange={handleInputChange}
              className="w-full rounded border p-2"
              required
            />
          </label>
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="hasToGenerateVoice"
              checked={formData.hasToGenerateVoice}
              onChange={handleInputChange}
            />
            Generate Voice
          </label>

          {formData.hasToGenerateVoice && (
            <select
              name="selectedVoice"
              value={formData.selectedVoice ?? ""}
              onChange={handleInputChange}
              className="mt-2 w-full rounded border p-2"
            >
              <option value="">Select voice</option>
              {Object.entries(VOICE_OPTIONS).map(([name, id]) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          )}
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="hasToSearchMedia"
              checked={formData.hasToSearchMedia}
              onChange={handleInputChange}
            />
            Add Media
          </label>

          {formData.hasToSearchMedia && (
            <div className="mt-2 space-y-2">
              <select
                name="mediaType"
                value={formData.mediaType ?? ""}
                onChange={handleInputChange}
                className="rounded border p-2"
              >
                <option value="">Select Media Type</option>
                <option value="stockVideo">Stock Video</option>
                <option value="movingImage">Moving Image</option>
                <option value="aiVideo">AI Video</option>
              </select>

              <select
                name="generationPreset"
                value={formData.generationPreset ?? ""}
                onChange={handleInputChange}
                className="rounded border p-2"
              >
                <option value="">Select Generation Preset</option>
                {GENERATION_PRESETS.map((preset) => (
                  <option key={preset} value={preset}>
                    {preset}
                  </option>
                ))}
              </select>

              <input
                type="text"
                name="generationUserPrompt"
                value={formData.generationUserPrompt ?? ""}
                onChange={handleInputChange}
                placeholder="Generation Prompt"
                className="w-full rounded border p-2"
              />
            </div>
          )}
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="hasEnhancedGeneration"
              checked={formData.hasEnhancedGeneration}
              onChange={handleInputChange}
            />
            Use Enhanced Generation
          </label>
        </div>

        <div>
          <label className="block">
            <input
              type="checkbox"
              name="hasToGenerateVoice"
              checked={formData.hasToGenerateVoice ?? false}
              onChange={handleInputChange}
              className="mr-2"
            />
            Background Audio
          </label>

          {formData.hasToGenerateVoice && (
            <select
              name="audioUrl"
              value={formData.audioUrl ?? ""}
              onChange={handleInputChange}
              className="mt-2 w-full rounded border p-2"
            >
              <option value="">Select background audio</option>
              {Object.entries(AUDIO_OPTIONS).map(([name, url]) => (
                <option key={url} value={url}>
                  {name}
                </option>
              ))}
            </select>
          )}
        </div>

        <div>
          <label className="mb-2 block">
            Caption Preset:
            <select
              name="captionPresetName"
              value={formData.captionPresetName}
              onChange={handleInputChange}
              className="w-full rounded border p-2"
            >
              {CAPTION_PRESETS.map((preset) => (
                <option key={preset} value={preset}>
                  {preset}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="hasAvatar"
              checked={formData.hasAvatar}
              onChange={handleInputChange}
            />
            Add Talking Avatar
          </label>

          {formData.hasAvatar && (
            <input
              type="text"
              name="selectedAvatar"
              value={formData.selectedAvatar ?? ""}
              onChange={handleInputChange}
              placeholder="Avatar Image/Video URL"
              className="mt-2 w-full rounded border p-2"
            />
          )}
        </div>

        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Generate Video
        </button>
      </form>
    </div>
  );
}
