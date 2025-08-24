import { projects } from '@/content/projects';

export default function sitemap() {
  const base = 'https://www.shadesblue.com';
  const routes = ['', '/portfolio', '/what-i-do', '/contact'].map(p => ({
    url: base + p, lastModified: new Date().toISOString()
  }));
  const projectRoutes = projects.map(p => ({
    url: `${base}/portfolio/${p.slug}`, lastModified: new Date(`${p.year}-01-02`).toISOString()
  }));
  return [...routes, ...projectRoutes];
}
