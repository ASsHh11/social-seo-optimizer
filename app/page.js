"use client";

import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import PlatformSelector from "@/components/PlatformSelector";
import UploadZone from "@/components/UploadZone";
import GenerateButton from "@/components/GenerateButton";
import LoadingOverlay from "@/components/LoadingOverlay";
import ResultsTabs from "@/components/ResultsTabs";

export default function HomePage() {
  const [idea, setIdea] = useState("");
  const [platforms, setPlatforms] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  const processMedia = (file) => {
    return new Promise((resolve, reject) => {
      if (file.type.startsWith("video/")) {
        const video = document.createElement("video");
        video.src = URL.createObjectURL(file);
        video.muted = true;
        video.playsInline = true;
        
        video.onloadeddata = () => { video.currentTime = 1; };
        video.onseeked = () => {
          const canvas = document.createElement("canvas");
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
          resolve({ mimeType: "image/jpeg", data: canvas.toDataURL("image/jpeg").split(",")[1] });
        };
        video.onerror = reject;
      } else {
        const reader = new FileReader();
        reader.onload = () => resolve({ mimeType: file.type, data: reader.result.split(",")[1] });
        reader.onerror = reject;
        reader.readAsDataURL(file);
      }
    });
  };

  const generateContent = async () => {
    if (!idea.trim()) {
      setError("Please describe your content idea.");
      return;
    }
    if (platforms.length === 0) {
      setError("Please select at least one platform.");
      return;
    }

    setLoading(true);
    setError("");
    setResults(null);

    try {
      let mediaPayload = null;
      if (file) {
        mediaPayload = await processMedia(file);
      }

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea, platforms, media: mediaPayload })
      });

      const data = await response.json();
      if (!response.ok || data?.error) {
        throw new Error(data?.message || "Something went wrong.");
      }
      setResults(data);
    } catch (err) {
      console.error("Client generate error:", err);
      setError(err.message || "Unable to generate content.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-6 py-12 relative">
      <div className="radial-bg top-0 left-1/2 -translate-x-1/2 animate-glow" />
      <div className="sr-only">
        <h1>TrendHack | Free AI Social SEO Optimizer & Hook Generator</h1>
      </div>

      <HeroSection />

      <div className="max-w-5xl mx-auto mt-16 glass rounded-3xl p-8 space-y-10">
        <div>
          <label htmlFor="content-idea-input" className="text-sm text-violet-300 mb-3 block font-medium">
            STEP 1 — Describe Your Post Idea
          </label>
          <textarea
            id="content-idea-input"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Describe your content idea..."
            className="w-full h-40 bg-white/5 rounded-2xl p-5 outline-none border border-white/10 focus:border-violet-500 text-white"
          />
        </div>

        <UploadZone file={file} setFile={setFile} />
        <PlatformSelector selected={platforms} setSelected={setPlatforms} />
        <GenerateButton onClick={generateContent} loading={loading} />
      </div>

      {error && (
        <div className="max-w-5xl mx-auto mt-6 text-center text-red-400 font-medium bg-red-500/10 border border-red-500/20 py-3 px-6 rounded-2xl">
          {error}
        </div>
      )}

      {loading && <LoadingOverlay />}

      {results && !error && (
        <div className="mt-16 animate-fade-in">
          <ResultsTabs data={results} />
        </div>
      )}
    </main>
  );
}