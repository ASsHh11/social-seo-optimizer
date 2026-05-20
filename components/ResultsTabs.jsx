"use client";

import { useEffect, useState } from "react";
import PlatformResultCard from "./PlatformResultCard";

export default function ResultsTabs({ data }) {
  const platforms = Object.keys(data || {});
  const [active, setActive] = useState(platforms[0] || "");

  useEffect(() => {
    if (!platforms.includes(active)) {
      setActive(platforms[0] || "");
    }
  }, [platforms, active]);

  if (platforms.length === 0) {
    return (
      <div className="max-w-6xl mx-auto text-center text-gray-400">
        No generated platform data available.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex gap-3 mb-8 flex-wrap">
        {platforms.map((platform) => (
          <button
            key={platform}
            onClick={() => setActive(platform)}
            className={`px-6 py-3 rounded-2xl transition
            ${active === platform ? "glow-btn" : "glass"}`}
          >
            {platform}
          </button>
        ))}
      </div>

      <PlatformResultCard data={data[active] || {}} />
    </div>
  );
}
