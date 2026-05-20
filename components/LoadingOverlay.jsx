"use client";

import { useEffect, useState } from "react";

const messages = [
  "Analyzing 2026 platform algorithms...",
  "Engineering viral emotional hooks...",
  "Optimizing hashtags for maximal reach...",
  "Calculating engagement psychology...",
  "Scanning SEO ranking patterns..."
];

export default function LoadingOverlay() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center z-50">
      <div className="w-24 h-24 rounded-full border-4 border-violet-500 border-t-transparent animate-spin"></div>
      <p className="mt-8 text-xl text-violet-300 animate-pulse">
        {messages[index]}
      </p>
    </div>
  );
}
