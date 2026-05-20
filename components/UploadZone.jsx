"use client";

import { UploadCloud } from "lucide-react";

export default function UploadZone({ file, setFile }) {
  return (
    <div>
      <p className="text-sm text-violet-300 mb-4">
        Optional Media Upload
      </p>

      <label className="glass rounded-3xl border border-dashed border-white/10 flex flex-col items-center justify-center h-48 cursor-pointer hover:border-violet-500 transition">
        <UploadCloud size={42} />
        <p className="mt-4 text-gray-400">
          Upload image/video/audio
        </p>

        <input
          type="file"
          hidden
          accept="image/*,video/*,audio/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </label>

      {file && (
        <p className="mt-3 text-sm text-green-400">
          {file.name}
        </p>
      )}
    </div>
  );
}
