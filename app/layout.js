import "./globals.css";

// GOOGLE ALGORITHM DOMINANCE META ENGINE - FULLY LOADED
export const metadata = {
  title: "AlgoHack | Free AI Social SEO Optimizer & Viral Hook Generator",
  description: "Stop guessing the social media algorithm! Use AlgoHack to instantly generate high-converting posts, viral hooks, dynamic video scripts, and SEO-optimized hashtags for LinkedIn, Instagram, TikTok, and Twitter (X) using advanced multi-modal AI models.",
  keywords: [
    // 1. HIGH COMPETITION SHORT-TAIL SEO KEYWORDS
    "seo", "ai seo", "social seo", "seo tool", "seo optimizer", "free seo", "seo ranking", "seo checkers", "onpage seo", "seo marketing", "growth hacks", "marketing automation",
    
    // 2. SOCIAL MEDIA PLATFORM EXPANSION
    "linkedin seo", "instagram seo", "twitter seo", "tiktok seo", "youtube shorts seo", "threads algorithm", "facebook post seo", "social media ranking", "algorithmic reach",
    
    // 3. CORE UTILITY & CONTEXTUAL TERMS
    "hooks", "hashtags", "copywriting", "social media", "viral hooks", "post formatter", "caption generator", "content optimization", "headline generator", "social media metrics",
    
    // 4. NEXT-GEN & FUTURE AI PREDICTIONS (SGE & SGM Ready)
    "ai content humanizer", "multi modal ai optimizer", "voice search seo", "generative search optimization", "ai algorithm bypass", "zero click search seo", "predictive audience analytics", "contextual ai copywriting", "automated growth engine", "semantic search optimization",
    
    // 5. HIGH-INTENT USER PROBLEM SOLVING PHRASES
    "how to viral linkedin post", "ai hook generator free", "instagram seo tips 2026", "twitter algorithm hack", "free ai copywriting tool", "social media content optimizer", "viral script generator", "get more views on tiktok ai", "linkedin content strategy", "grow organic traffic fast", "best free hashtag app", "how to write high engagement hooks",
    
    // 6. BRAND IDENTIFIERS
    "AlgoHack", "algohack.netlify.app", "algohack seo", "algohack ai"
  ],
  authors: [{ name: "Arslan Ash" }],
  creator: "Arslan Ash",
  
  // Exact Google Webmaster Verification Key (Perfect Alignment)
  verification: {
    google: "nqGq8akKknGolsiHPLnc0QWYKgXk4Hj8TDIYs0mvcDk",
  },

  // OpenGraph Link Previews Protocol (Social Rich Media Injections)
  openGraph: {
    title: "AlgoHack - AI Social SEO Optimizer",
    description: "Let AI reverse-engineer your social media reach. Generate viral hooks, captions, and SEO metrics in seconds.",
    url: "https://algohack.netlify.app",
    siteName: "AlgoHack",
    locale: "en_US",
    type: "website",
  },

  // Twitter/X Meta Cards System
  twitter: {
    card: "summary_large_image",
    title: "AlgoHack - AI Social SEO Optimizer",
    description: "Let AI reverse-engineer your social media reach. Generate viral hooks, captions, and SEO metrics in seconds.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#030014] text-white selection:bg-violet-500/30">
        {children}
      </body>
    </html>
  );
}