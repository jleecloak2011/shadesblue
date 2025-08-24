// content/projects.ts
export type ProjectSource = 'employment' | 'client' | 'personal' | 'open-source';

export type Project = {
  slug: string;
  title: string;
  role: string;
  year: number;
  stack: string[];
  summary: string;
  hero?: string | null;                // path under /public, e.g. /images/projects/mscs.webp
  links?: { live?: string | null; repo?: string | null };
  highlights?: string[];               // outcomes/metrics
  source: ProjectSource;
  attribution?: string;                // e.g., "Memphis–Shelby County Schools"
  featured?: boolean;
  tags?: string[];
};

export const projects: Project[] = [
  // === Featured (Employment) ===
  {
    slug: 'mscs-website',
    title: 'MSCS District Website',
    role: 'Sole Developer',
    year: 2025,
    stack: ['PHP', 'MySQL', 'Bootstrap 5', 'Tailwind', 'Leaflet'],
    summary: 'Rebuilt district site with improved IA, accessibility, and search.',
    hero: '/images/projects/mscs.webp',
    links: { live: 'https://www.scsk12.org/', repo: null },
    highlights: ['Lighthouse 95+ mobile', 'Reduced support tickets', 'Accessible navigation & keyboard flows'],
    source: 'employment',
    attribution: 'Memphis–Shelby County Schools',
    featured: true,
    tags: ['accessibility', 'performance', 'ia']
  },
  {
    slug: 'hr-portal',
    title: 'Talent Management (HR) Portal',
    role: 'Sole Developer',
    year: 2025,
    stack: ['PHP', 'MySQL', 'Tailwind'],
    summary: 'Modernized HR portal with consistent design system and dynamic content.',
    hero: '/images/projects/hr.webp',
    links: { live: 'https://www.scsk12.org/hr25', repo: null },
    highlights: ['Reduced content update time', 'Unified patterns', 'Improved discoverability'],
    source: 'employment',
    attribution: 'Memphis–Shelby County Schools',
    featured: true,
    tags: ['design-system', 'cms']
  },
  {
    slug: 'afterschool-app',
    title: 'After School Memphis App',
    role: 'Full-stack Developer',
    year: 2025,
    stack: ['PHP', 'MySQL', 'Leaflet', 'Tailwind'],
    summary: 'Finder for schools, zones, programs, and activities with map + search.',
    hero: '/images/projects/afterschool-memphis.webp',
    links: { live: 'https://www.scsk12.org/afterschoolmemphis', repo: null },
    highlights: ['Map search', 'Custom markers', 'Mobile-first UI'],
    source: 'employment',
    attribution: 'Memphis–Shelby County Schools',
    featured: true,
    tags: ['maps', 'search']
  },

  // === Supporting items (you can add more later) ===
  {
    slug: 'accessibility-menu',
    title: 'Website Accessibility Menu',
    role: 'Developer',
    year: 2025,
    stack: ['Next.js', 'TypeScript', 'Tailwind'],
    summary: 'Text size, underline links, high contrast, reduce motion, and dark mode with persisted preferences.',
    hero: '/images/projects/ada-tool.webp', // your site’s screenshot
    links: {
      live: null,                                     // your site page if you publish one
      // optional: a public employer page that shows the same feature
      // live: 'https://www.employer-site.example/page'
    },
    highlights: ['WCAG 2.2–aware', 'Keyboard + ESC + focus trap', 'Alt+Shift+A shortcut'],
    source: 'employment',
    attribution: 'Memphis–Shelby County Schools',
    featured: false,
    tags: ['accessibility', 'ux']
  }

,
{
  slug: 'data-table-demo',
  title: 'Sortable/Filterable Data Table (Demo)',
  role: 'Developer',
  year: 2025,
  stack: ['Next.js', 'TypeScript', 'Tailwind'],
  summary: 'Client/server search, sort, and pagination with proper table semantics.',
  hero: '/images/projects/data-table.webp', // add a cropped screenshot later
  links: { live: '/demo/data-table', repo: null },
  highlights: ['Keyboard sorting', 'ARIA roles', 'Pagination'],
  source: 'personal',
  tags: ['tables', 'accessibility']
},
];
