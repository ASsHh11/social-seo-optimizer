import "./globals.css";

export const metadata = {
  title: "AlgoHack - AI Social SEO Optimizer",
  description: "Crack the social media algorithm using advanced AI SEO insights.",
  verification: {
    google: "nqGq8akKknGolsiHPLnc0QWYKgXk4Hj8TDIYs0mvcDk",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}