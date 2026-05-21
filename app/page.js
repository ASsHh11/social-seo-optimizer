"use client";

import { useState } from "react";
// ... baki imports same rahengi

export default function HomePage() {
  const [idea, setIdea] = useState("");
  const [platforms, setPlatforms] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  // Naya Helper: Video/Image ko Base64 mein badalne ke liye
  const processMedia = (file) => {
    return new Promise((resolve, reject) => {
      if (file.type.startsWith("video/")) {
        const video = document.createElement("video");
        video.src = URL.createObjectURL(file);
        video.muted = true;
        video.playsInline = true;
        
        video.onloadeddata = () => { video.currentTime = 1; }; // 1st second ka frame
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
    if (!idea.trim()) return setError("Please describe your idea.");
    if (platforms.length === 0) return setError("Select a platform.");

    setLoading(true);
    setError("");

    try {
      let mediaPayload = null;
      if (file) {
        mediaPayload = await processMedia(file); // Yahan Canvas logic chalega
      }

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea, platforms, media: mediaPayload })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Generation failed");
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ... baki JSX same rahega