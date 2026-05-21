import "./globals.css";
import ContactButton from "../components/ContactButton";

// GOOGLE ALGORITHM DOMINANCE META ENGINE - FULLY LOADED
export const metadata = {
  title: "TrendHack | Free AI Social SEO Optimizer & Viral Hook Generator",
  description: "Stop guessing the social media algorithm! Use TrendHack to instantly generate high-converting posts, viral hooks, dynamic video scripts, and SEO-optimized hashtags for LinkedIn, Instagram, TikTok, and Twitter (X) using advanced multi-modal AI models.",
  keywords: [
    "seo", "ai seo", "social seo", "seo tool", "seo optimizer", "free seo", "seo ranking", "growth hacks", "marketing automation",
    "linkedin seo", "instagram seo", "twitter seo", "tiktok seo", "youtube shorts seo", "threads algorithm", "social media ranking",
    "hooks", "hashtags", "copywriting", "social media", "viral hooks", "caption generator", "content optimization",
    "ai content humanizer", "multi modal ai optimizer", "generative search optimization",
    "how to viral linkedin post", "ai hook generator free", "instagram seo tips 2026", "twitter algorithm hack", "free ai copywriting tool",
    "TrendHack", "trendhack.vercel.app", "trendhack seo", "trendhack ai"
  ],
  authors: [{ name: "Arslan Ash" }],
  creator: "Arslan Ash",
  
  // Google Webmaster Verification Key (UPDATED)
  verification: {
    google: "2tfWnKOIdDW-snYB8QazRZ5AKma2iESdJctJs9cqmt0",
  },

  // OpenGraph Link Previews Protocol
  openGraph: {
    title: "TrendHack - AI Social SEO Optimizer",
    description: "Let AI reverse-engineer your social media reach. Generate viral hooks, captions, and SEO metrics in seconds.",
    url: "https://trendhack.vercel.app",
    siteName: "TrendHack",
    locale: "en_US",
    type: "website",
  },

  // Twitter/X Meta Cards System
  twitter: {
    card: "summary_large_image",
    title: "TrendHack - AI Social SEO Optimizer",
    description: "Let AI reverse-engineer your social media reach. Generate viral hooks, captions, and SEO metrics in seconds.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#030014] text-white selection:bg-violet-500/30">
        {children}

        <footer className="w-full border-t border-white/10 mt-12 py-8 bg-[#030014]">
          <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-300">© 2026 TrendHack. Built for creators who want smart SEO and viral growth.</p>
            </div>

            <div className="flex items-center gap-4">
              <a href="/privacy" className="text-slate-200 transition hover:text-white">Privacy Policy</a>
              <a href="/terms" className="text-slate-200 transition hover:text-white">Terms of Service</a>
              <ContactButton />
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}