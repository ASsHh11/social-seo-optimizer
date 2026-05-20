// File: components/PlatformSelector.jsx

"use client";

import {
  Instagram,
  Facebook,
  Linkedin,
  Music2,
  Twitter
} from "lucide-react";

const platforms = [
  {
    name: "Instagram",
    icon: Instagram,
    border: "border-pink-500"
  },
  {
    name: "Facebook",
    icon: Facebook,
    border: "border-blue-500"
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    border: "border-cyan-400"
  },
  {
    name: "TikTok",
    icon: Music2,
    border: "border-white"
  },
  {
    name: "X",
    icon: Twitter,
    border: "border-gray-300"
  }
];

export default function PlatformSelector({
  selected,
  setSelected
}) {

  const toggle = (name) => {

    if (selected.includes(name)) {

      setSelected(
        selected.filter((p) => p !== name)
      );

    } else {

      setSelected([
        ...selected,
        name
      ]);

    }

  };

  return (
    <div>

      <p className="text-sm text-violet-300 mb-4">
        STEP 2 — Select Platforms
      </p>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

        {platforms.map((platform) => {

          const Icon = platform.icon;

          const active = selected.includes(platform.name);

          return (

            <button
              key={platform.name}
              type="button"
              onClick={() => toggle(platform.name)}
              className={`
                glass
                rounded-2xl
                p-5
                border
                flex
                flex-col
                items-center
                justify-center
                transition-all
                duration-300
                cursor-pointer

                ${
                  active
                    ? `${platform.border} bg-white/10 scale-105`
                    : "border-white/10"
                }

                hover:scale-105
                active:scale-95
                hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]
              `}
            >

              <Icon
                className={`mb-3 ${
                  active
                    ? "text-violet-300"
                    : "text-white"
                }`}
                size={28}
              />

              <p className="font-medium">
                {platform.name}
              </p>

            </button>

          );

        })}

      </div>

    </div>
  );
}