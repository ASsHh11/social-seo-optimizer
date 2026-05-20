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

  const generateContent = async () => {
    if (!idea.trim()) {
      setError("Please describe your content idea.");
      return;
    }

    if (platforms.length === 0) {
      setError("Please select at least one platform.");
      return;
    }

    setError("");
    setResults(null);
    setLoading(true);

    try {
      let mediaPayload = null;

      if (file) {
        const { extractAudio } = await import("@/lib/ffmpeg");
        mediaPayload = await extractAudio(file);
      }

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          idea,
          platforms,
          media: mediaPayload
        })
      });

      const data = await response.json();

      if (!response.ok || data?.error) {
        setError(data?.message || "Something went wrong while generating content.");
        setResults(null);
        return;
      }

      setResults(data);
    } catch (err) {
      console.error("Client generate error:", err);
      setError("Unable to generate content. Please try again.");
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-6 py-12 relative">
      <div className="radial-bg top-0 left-1/2 -translate-x-1/2 animate-glow" />

      <HeroSection />

      <div className="max-w-5xl mx-auto mt-16 glass rounded-3xl p-8 space-y-10">
        <div>
          <p className="text-sm text-violet-300 mb-3">
            STEP 1 — Describe Your Post
          </p>

          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Describe your content idea..."
            className="w-full h-40 bg-white/5 rounded-2xl p-5 outline-none border border-white/10 focus:border-violet-500"
          />
        </div>

        <UploadZone file={file} setFile={setFile} />

        <PlatformSelector selected={platforms} setSelected={setPlatforms} />

        <GenerateButton onClick={generateContent} loading={loading} />
      </div>

      {error && (
        <div className="max-w-5xl mx-auto mt-6 text-center text-red-400">
          {error}
        </div>
      )}

      {loading && <LoadingOverlay />}

      {results && !error && (
        <div className="mt-16">
          <ResultsTabs data={results} />
        </div>
      )}
    </main>
  );
}
