export default async function sitemap() {
  const baseUrl = 'https://passiveincometoday.com'

  // Define your main routes
  const routes = [
    '',
    '/about',
    '/guides',
    '/resources',
    '/tools/rental-property-roi',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily',
    priority: route === '' ? 1 : 0.8,
  }))

  return routes
} 