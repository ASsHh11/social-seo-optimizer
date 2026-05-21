export default async function sitemap() {
  return [
    {
      url: 'https://trendhack.vercel.app',
      lastModified: new Date().toISOString(), // Date ko ISO string format mein bhejna zyada stable hota hai
      changeFrequency: 'daily',
      priority: 1,
    },
  ];
}
