// File: components/GenerateButton.jsx

"use client";

import { Loader2, Sparkles } from "lucide-react";

export default function GenerateButton({
  loading,
  onClick
}) {

  return (

    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="
        w-full
        rounded-2xl
        py-5
        font-semibold
        text-lg
        transition-all
        duration-300
        flex
        items-center
        justify-center
        gap-3

        bg-gradient-to-r
        from-indigo-500
        via-violet-500
        to-purple-500

        hover:shadow-[0_0_30px_rgba(139,92,246,0.6)]
        hover:scale-[1.02]

        active:scale-95

        disabled:opacity-60
        disabled:cursor-not-allowed
      "
    >

      {loading ? (
        <>
          <Loader2
            className="animate-spin"
            size={22}
          />

          Optimizing Viral Reach...
        </>
      ) : (
        <>
          <Sparkles size={22} />

          Generate AI SEO Content
        </>
      )}

    </button>

  );

}