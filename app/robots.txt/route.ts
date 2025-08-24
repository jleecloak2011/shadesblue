export function GET() {
  return new Response(
    `User-agent: *\nAllow: /\nSitemap: https://www.shadesblue.com/sitemap.xml`,
    { headers: { 'Content-Type': 'text/plain' } }
  );
}
