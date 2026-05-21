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

  const emailUser = "moonsoon786110";
  const emailDomain = "gmail.com";
  const contactEmail = `${emailUser}@${emailDomain}`;

  return (
    <main className="min-h-screen px-6 py-12 relative overflow-hidden">
      <div className="radial-bg top-0 left-1/2 -translate-x-1/2" />
      <div className="sr-only">
        <h1>TrendHack | Free AI Social SEO Optimizer & Hook Generator</h1>
      </div>

      <HeroSection />

      <section id="how-it-works" className="max-w-5xl mx-auto mt-16">
        <div className="glass rounded-3xl p-8 sm:p-10">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-violet-300">How it works</p>
            <h2 className="mt-4 text-3xl sm:text-4xl font-semibold text-white">One workflow, three fast steps to viral-ready copy.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">TrendHack makes algorithm-aware social SEO simple by turning your idea into optimized, platform-ready content in seconds.</p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300 font-bold">1</div>
              <h3 className="mt-6 text-xl font-semibold text-white">Share your topic</h3>
              <p className="mt-3 text-slate-300">Input your topic, target audience, or campaign idea to start the optimization process.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300 font-bold">2</div>
              <h3 className="mt-6 text-xl font-semibold text-white">AI analyzes trends</h3>
              <p className="mt-3 text-slate-300">AI evaluates trending social algorithms and SEO signals for the platforms you choose.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300 font-bold">3</div>
              <h3 className="mt-6 text-xl font-semibold text-white">Publish optimized content</h3>
              <p className="mt-3 text-slate-300">Receive viral-ready captions, hooks, and SEO-enhanced output instantly.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="generate" className="max-w-5xl mx-auto mt-16 glass rounded-3xl p-8 space-y-10">
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
      </section>

      {error && (
        <div className="max-w-5xl mx-auto mt-6 text-center text-red-400 font-medium bg-red-500/10 border border-red-500/20 py-3 px-6 rounded-2xl">
          {error}
        </div>
      )}

      {loading && <LoadingOverlay />}

      {results && !error && (
        <div className="mt-16 animate-fade-in max-w-5xl mx-auto">
          <ResultsTabs data={results} />
        </div>
      )}

      <section id="about" className="max-w-5xl mx-auto mt-16 glass rounded-3xl p-10">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-violet-300">About Us</p>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold text-white">Helping creators dominate SEO with smarter AI outputs.</h2>
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-xl font-semibold text-white">Reverse-engineer algorithms</h3>
            <p className="mt-4 text-slate-300">TrendHack uses AI to translate social signals into content that matches algorithm trends, helping creators rank higher on LinkedIn, TikTok, and Twitter.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-xl font-semibold text-white">Humanize AI content</h3>
            <p className="mt-4 text-slate-300">Our tool delivers copy that feels natural and engaging, while still optimized for search and social discovery.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-xl font-semibold text-white">SEO-ready across platforms</h3>
            <p className="mt-4 text-slate-300">Whether you publish on LinkedIn, TikTok, or X, TrendHack helps you create algorithm-friendly posts with better visibility.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-xl font-semibold text-white">Fast, responsive workflow</h3>
            <p className="mt-4 text-slate-300">Built to work across mobile and desktop, TrendHack keeps the content generation process clean and accessible wherever you create.</p>
          </div>
        </div>
      </section>

      <section id="contact" className="max-w-5xl mx-auto mt-16 glass rounded-3xl p-10">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-violet-300">Contact Us</p>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold text-white">Need help or want a custom campaign?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">Reach out directly and we'll get back to you with guidance on using TrendHack for your next viral social strategy.</p>
        </div>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 text-center">
          <button
            type="button"
            onClick={() => {
              try {
                const parts = ["moonsoon786110", "gmail", "com"];
                const email = `${parts[0]}@${parts[1]}.${parts[2]}`;
                const subject = "TrendHack inquiry";
                const body = "Hi, I would like help with TrendHack.\n\nPlease advise on...";
                const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                window.open(gmailUrl, "_blank", "noopener,noreferrer");
              } catch (e) {
                // fallback: open default mail client
                const parts = ["moonsoon786110", "gmail", "com"];
                const email = `${parts[0]}@${parts[1]}.${parts[2]}`;
                window.location.href = `mailto:${email}?subject=${encodeURIComponent("TrendHack inquiry")}`;
              }
            }}
            className="inline-flex items-center justify-center rounded-full border border-violet-500/30 bg-white/5 px-8 py-4 text-base font-semibold text-white transition hover:border-violet-400 hover:bg-white/10"
          >
            Contact via Gmail
          </button>
          <a className="sr-only" href={`mailto:${contactEmail}`}>Email: {contactEmail}</a>
        </div>
      </section>

      {/* Footer moved to app/layout.js as single source-of-truth */}
    </main>
  );
}