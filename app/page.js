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
      {/* Background Glow Animation */}
      <div className="radial-bg top-0 left-1/2 -translate-x-1/2 animate-glow" />

      {/* GOOGLEBOT VIP ACCESS: 
        Yeh H1 tag aur descriptive text visually screen par hidden hain ('sr-only' tools aur accessibility crawlers ke liye).
        Google ka algorithm isko parhte hi samajh jaye gaa ke yeh page kis category ka king hai.
      */}
      <div className="sr-only">
        <h1>AlgoHack | Free AI Social SEO Optimizer & Hook Generator</h1>
        <h2>Automated Social Media Copywriting, Viral Hooks, and Hashtags</h2>
        <p>
          Optimize your digital presence across LinkedIn, Instagram, and Twitter. 
          Analyze media files, extract context, and generate high-engagement, 
          SEO-friendly social media copies instantly using advanced AI automation.
        </p>
      </div>

      {/* Main Visible Hero Component */}
      <HeroSection />

      {/* Main Dynamic Application Interface */}
      <div className="max-w-5xl mx-auto mt-16 glass rounded-3xl p-8 space-y-10">
        <div>
          <label htmlFor="content-idea-input" className="text-sm text-violet-300 mb-3 block font-medium tracking-wide">
            STEP 1 — Describe Your Post Idea
          </label>

          <textarea
            id="content-idea-input"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Describe your content idea for LinkedIn, Instagram, or Twitter to generate viral hooks and SEO optimized posts..."
            className="w-full h-40 bg-white/5 rounded-2xl p-5 outline-none border border-white/10 focus:border-violet-500 text-white placeholder-white/30 transition-all duration-300"
          />
        </div>

        {/* Media Upload Sub-system */}
        <UploadZone file={file} setFile={setFile} />

        {/* Multi-Platform Core Selection */}
        <PlatformSelector selected={platforms} setSelected={setPlatforms} />

        {/* Heavy Lifting Trigger */}
        <GenerateButton onClick={generateContent} loading={loading} />
      </div>

      {/* Error Management Feed */}
      {error && (
        <div className="max-w-5xl mx-auto mt-6 text-center text-red-400 font-medium bg-red-500/10 border border-red-500/20 py-3 px-6 rounded-2xl animate-fade-in">
          {error}
        </div>
      )}

      {/* Global Interactive Async State Overlays */}
      {loading && <LoadingOverlay />}

      {/* Rich Generative Outputs Block */}
      {results && !error && (
        <div className="mt-16 animate-fade-in">
          <ResultsTabs data={results} />
        </div>
      )}
    </main>
  );
}