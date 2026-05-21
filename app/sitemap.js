export default async function sitemap() {
  return [
    {
      url: 'https://trendhack.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ];
}