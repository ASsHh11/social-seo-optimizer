export default function PrivacyPage() {
  return (
    <main className="min-h-screen px-6 py-12">
      <nav className="max-w-4xl mx-auto mb-6 flex items-center justify-start">
        <a href="/" className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/5 border border-white/8 text-sm text-slate-100 hover:bg-white/10">
          ← Back to Home
        </a>
      </nav>

      <section className="max-w-4xl mx-auto bg-[#040310] glass rounded-3xl p-10">
        <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
        <p className="mt-4 text-slate-300">Last updated: May 21, 2026</p>

        <article className="mt-6 text-slate-300 space-y-4">
          <p>
            TrendHack respects your privacy. This Privacy Policy explains what information we
            collect, how we use it, and the choices you have. We collect minimal data required
            to provide our AI-driven social SEO services, including content you submit for
            analysis and optional media uploads. We do not sell your personal data.
          </p>

          <h2 className="text-xl font-semibold text-white">Data Use</h2>
          <p>
            Data submitted to TrendHack is used to generate optimized social content and
            improve model outputs. Uploaded media may be processed to create previews and
            signals for the generation flow. Any personally-identifying information is only
            used to communicate with you if you provide contact details.
          </p>

          <h2 className="text-xl font-semibold text-white">Security</h2>
          <p>
            We take reasonable measures to protect data in transit and at rest. No online
            system is perfectly secure—please avoid sharing sensitive personal data in inputs.
          </p>

          <h2 className="text-xl font-semibold text-white">Contact</h2>
          <p>
            For privacy requests, please contact the site owner.
          </p>
        </article>
      </section>
    </main>
  );
}
