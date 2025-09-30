import jdksService from '@/lib/services/jdks';
import sdksService from '@/lib/services/sdks';

export const dynamic = 'force-static';

const baseUrl = 'https://sdkman.io';
const mainPages = ['/', '/install/', '/usage/', '/vendors/', '/contributors/'];

async function getSitemap() {
  const jdksRoutes = jdksService
    .generateParams()
    .map((item) => `/jdks/${item.id}/`);

  const sdksRoutes = await sdksService
    .generateParams()
    .then((data) => data.map((item) => `/sdks/${item.id}/`));

  const sitemapList = [
    ...mainPages,
    '/jdks/',
    ...jdksRoutes,
    '/sdks/',
    ...sdksRoutes,
  ].map((item) => ({
    url: `${baseUrl}${item}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.5,
  }));

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    ${sitemapList
      .map(
        (item) => `
            <url>
              <loc>${item.url}</loc>
              <lastmod>${item.lastModified.toISOString()}</lastmod>
              <changefreq>${item.changeFrequency}</changefreq>
              <priority>${item.priority}</priority>
            </url>
          `,
      )
      .join('')}
    </urlset>
  `;
}

export async function GET() {
  const sitemap = await getSitemap();

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'text/xml',
    },
  });
}
