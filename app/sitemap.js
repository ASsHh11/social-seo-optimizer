export default async function sitemap() {
  return [
    {
      url: 'https://trendhack.vercel.app', // Yahan aapka naya domain hona chahiye
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];
}
