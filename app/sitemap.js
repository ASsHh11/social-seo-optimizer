export default async function sitemap() {
  return [
    {
      url: 'https://algohack.netlify.app',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];
}