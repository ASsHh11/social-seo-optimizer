export default function TermsPage() {
  return (
    <main className="min-h-screen px-6 py-12">
      <nav className="max-w-4xl mx-auto mb-6 flex items-center justify-start">
        <a href="/" className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/5 border border-white/8 text-sm text-slate-100 hover:bg-white/10">
          ← Back to Home
        </a>
      </nav>

      <section className="max-w-4xl mx-auto bg-[#040310] glass rounded-3xl p-10">
        <h1 className="text-3xl font-bold text-white">Terms of Service</h1>
        <p className="mt-4 text-slate-300">Last updated: May 21, 2026</p>

        <article className="mt-6 text-slate-300 space-y-4">
          <p>
            By using TrendHack, you agree to these terms. TrendHack provides AI-generated
            social SEO suggestions and content based on the information you submit. You are
            responsible for the content you publish and must comply with platform policies
            and local laws.
          </p>

          <h2 className="text-xl font-semibold text-white">Acceptable Use</h2>
          <p>
            Do not use TrendHack to generate illegal, harmful, or infringing content. The
            service may restrict or remove content that violates these terms.
          </p>

          <h2 className="text-xl font-semibold text-white">Liability</h2>
          <p>
            TrendHack is provided "as-is" and we disclaim liability for indirect or
            consequential damages. Use the tool at your own discretion and verify results
            before publishing.
          </p>
        </article>
      </section>
    </main>
  );
}
