// --- If you don't already have this type, keep it. Otherwise, skip this block. ---
export type Project = {
  slug: string;
  title: string;
  role: string;
  year?: string;
  summary?: string;
  hero?: string;
  gallery?: string[];
  problem?: string;
  did?: string[];
  impact?: string[];
  training?: string;
  stack?: string[];
  links?: { live?: string; repo?: string };
};

// Helper to fetch a single project
export const getProject = (slug: string) => projects.find(p => p.slug === slug);

// --- Replace/add these project entries in your `projects` array by slug ---
export const projects: Project[] = [
  // ===== AfterSchool Memphis =====

  // ===== MSCS District Website / Template =====
  {
    slug: 'mscs-district-template',
    title: 'MSCS District Website',
    role: 'Lead Developer (with Communications & Department Stakeholders)',
    year: '2025',
    summary:
      'Reusable district template with strong accessibility defaults, consistent page patterns, and editor-friendly content blocks.',
    hero: '/images/portfolio/mscs.webp',
    gallery: [
      '/images/portfolio/mscs.webp',
      '/images/portfolio/mscs-2.webp',
      '/images/portfolio/mscs-3.webp',
    ],
    problem:
      'Departments needed a consistent, accessible template that made pages easy to publish and maintain while keeping the brand cohesive across the district.',
    did: [
      'Partnered with Communications and multiple departments to define common page types and content models.',
      'Built a component library (hero, grids, CTAs, accordions, FAQs) with semantic HTML and keyboard flows.',
      'Set color/contrast tokens and focus styles to meet WCAG 2.2 AA across panels, cards, and nav.',
      'Streamlined media handling, image sizes/WebP, and lazy loading for mobile performance.',
      'Documented usage patterns so editors can build pages without layout breaks.',
    ],
    impact: [
      'Faster page creation with a consistent look-and-feel across departments.',
      'Better accessibility by default; fewer one-off code fixes.',
      'Improved mobile performance and lower maintenance overhead.',
    ],
    training:
      'Delivered a short workshop for editors with examples of common page layouts and a publishing checklist.',
    stack: ['PHP (PDO)', 'MySQL', 'Tailwind/Bootstrap', 'Light JS components'],
    links: { live: 'https://www.scsk12.org/' },
  },


  // ===== HR Website / HR25 =====
  {
    slug: 'hr-website',
    title: 'HR Website (Employee Hub)',
    role: 'Lead Developer (with Communications & HR)',
    year: '2025',
    summary:
      'Modern HR hub with quick links, dynamic updates, and a clear IA—optimized for employees to find forms, benefits, and contacts quickly.',
    hero: '/images/portfolio/hr25-port.webp',
    gallery: [
      '/images/portfolio/hr25-port.webp',
      '/images/portfolio/hr25-port-2.webp',
    ],
    problem:
      'Employees struggled to locate essential forms and updates; HR needed a hub that balances clarity, speed, and easy maintenance.',
    did: [
      'Designed a quick-links grid with icons and large tap targets; refined IA for core tasks.',
      'Implemented a “What’s New” feed and structured content blocks for policies/resources.',
      'Added accessible nav patterns, focus management, and clear states for links/buttons.',
      'Optimized assets and caching to keep the hub fast during peak traffic.',
    ],
    impact: [
      'Fewer clicks to reach key HR content and contacts.',
      'HR editors publish updates without layout risk or dev assistance.',
      'Consistent accessibility across links, headings, and forms.',
    ],
    training:
      'Hosted a walkthrough for HR editors and delivered a posting SOP with examples (including accessibility quick checks).',
    stack: ['PHP (PDO)', 'MySQL', 'Bootstrap/Tailwind'],
    links: { live: 'https://www.scsk12.org/hr25' },
  },
  // ===== Newsroom =====
  {
    slug: 'newsroom',
    title: 'MSCS Newsroom',
    role: 'Lead Developer (with Communications)',
    year: '2025',
    summary:
      'A newsroom hub for timely updates, press releases, and featured stories with accessible typography and publishing workflows.',
    hero: '/images/portfolio/newsroom.webp',
    gallery: [
      '/images/portfolio/newsroom.webp',
      '/images/portfolio/newsroom-2.webp',
    ],
    problem:
      'Communications needed a reliable way to publish news that scales—easy to scan, accessible on mobile, and structured for editors to update quickly.',
    did: [
      'Built a news index with filters/tags, featured placements, and image handling.',
      'Created accessible article templates (headings, captions, pull-quotes, media embeds).',
      'Added “What’s New” slots for timely items and guidance for alt text and link labels.',
      'Optimized images and listing queries; added caching for high-traffic events.',
    ],
    impact: [
      'Faster publishing cadence and clearer content hierarchy.',
      'Improved mobile readability and share-ready pages.',
      'Reduced friction for editors; consistent layouts without manual HTML.',
    ],
    training:
      'Provided a one-pager SOP and a short loom-style video for posting, tagging, and adding accessible images/captions.',
    stack: ['PHP (PDO)', 'MySQL', 'Bootstrap/Tailwind'],
      links: { live: 'https://www.scsk12.org/nr' },
  },

  {
    slug: 'afterschool-memphis',
    title: 'AfterSchool Memphis',
    role: 'Lead Developer (with Communications & IT)',
    year: '2025',
    summary:
      'District-wide after-school programs directory with fast search, activity grids, and Leaflet map—built for editors to maintain without dev help.',
    hero: '/images/portfolio/afterschool-memphis.webp',
    gallery: [
      '/images/portfolio/afterschool-memphis.webp',
      '/images/portfolio/afterschool-memphis-2.webp',
      '/images/portfolio/afterschool-memphis-3.webp',
    ],
    problem:
      'Families and staff needed a single, reliable source for after-school offerings across many schools. Information lived in PDFs, emails, and pages that were hard to search, inconsistent on mobile, and not accessible.',
    did: [
      'Met with Communications, IT, and program stakeholders to gather requirements, content, and data fields.',
      'Designed IA and a responsive UI with filterable activity cards, school views, and detail modals.',
      'Built PHP (PDO) endpoints and MySQL schema for schools, programs, activities, and relationships.',
      'Integrated Leaflet with custom markers, keyword/ZIP filters, and accessible popups.',
      'Implemented WCAG 2.2 AA practices (landmarks, focus order, labels/alt, contrast) and form patterns.',
      'Optimized images/queries, added caching, and set up a maintainable content workflow for staff.',
    ],
    impact: [
      'One source of truth for programs; faster discovery on mobile and desktop.',
      'Non-technical staff can add/update programs confidently with consistent structure.',
      'Reduced support requests by centralizing updates and using editor-friendly fields.',
    ],
    training:
      'Led an editor training with a screen-recorded walkthrough, plus a 2-page SOP and an accessibility checklist (headings, alt text, link labels, keyboard checks).',
    stack: ['PHP (PDO)', 'MySQL', 'Tailwind/Bootstrap', 'Leaflet', 'Vanilla JS'],
    links: { live: 'https://www.scsk12.org/afterschoolmemphis' },
  },

  // ===== Accessibility Menu / Utilities =====
  {
    slug: 'accessibility-menu',
    title: 'Accessibility Menu & Utilities',
    role: 'Lead Developer (with Communications)',
    year: '2025',
    summary:
      'Lightweight accessibility utilities (focus styles, skip links, contrast checks, and content patterns) integrated into district templates.',
    hero: '/images/portfolio/accessibility-menu.webp',
    gallery: ['/images/portfolio/accessibility-menu.webp'],
    problem:
      'Pages needed consistent, unobtrusive accessibility helpers to support keyboard users, screen readers, and inclusive content editing.',
    did: [
      'Implemented skip-to-content links, focus-visible styles, and logical heading structures.',
      'Provided editable alt/label patterns and link text guidance inside content blocks.',
      'Built reusable components that avoid color-only cues and maintain contrast.',
      'Wrote short editor docs to keep posts accessible over time.',
    ],
    impact: [
      'Greater baseline accessibility across new pages without extra dev work.',
      'Editors have clear, repeatable patterns for accessible content.',
    ],
    training:
      'Delivered an accessibility checklist and micro-tutorials embedded in the editor workflow.',
    stack: ['Semantic HTML', 'Tailwind tokens', 'Vanilla JS'],
    links: { live: 'https://www.scsk12.org/' },
  },

  // ===== LeaderBoard CMS =====
  {
    slug: 'leaderboard-cms',
    title: 'Leaderboard CMS',
    role: 'Lead Developer',
    year: '2025',
    summary:
      'Admin tool to manage leaderboard entries and archives with a clean separation between content and presentation.',
    hero: '/images/portfolio/leaderboard-hero.webp',
    gallery: ['/images/portfolio/leaderboard-hero.webp'],
    problem:
      'Leaders needed a simple way to add, feature, and archive entries on a schedule without breaking the front-end layout.',
    did: [
      'Designed DB schema for active/archived entries and relationships.',
      'Built CRUD with validation, search, and status workflows.',
      'Created componentized templates and safe HTML fields for content.',
      'Added export/import tools to streamline seasonal transitions.',
    ],
    impact: [
      'Reliable publishing with fewer manual steps.',
      'Seasonal updates are faster, with audit-friendly history.',
    ],
    training:
      'Provided a “season rollover” checklist and a 45-minute admin walkthrough for new staff.',
    stack: ['PHP (PDO)', 'MySQL', 'Bootstrap/Tailwind'],
    links: { live: 'https://www.scsk12.org/leaderboard' },
  },

  // ===== Teacher Leadership =====
  {
    slug: 'teacher-leadership',
    title: 'Teacher Leadership Hub',
    role: 'Lead Developer (with Communications & Program Stakeholders)',
    year: '2025',
    summary:
      'Centralized program info, calendars, and resources with clear navigation and strong accessibility for busy educators.',
    hero: '/images/portfolio/teacher-leadership.webp',
    gallery: ['/images/portfolio/teacher-leadership.webp'],
    problem:
      'Program information was fragmented across pages and emails; educators needed a single, easy-to-scan hub that worked well on mobile.',
    did: [
      'Collaborated with Communications and program leads to organize content and user journeys.',
      'Built modular content blocks (cards, accordions, highlights) and a clean IA.',
      'Ensured WCAG 2.2 AA patterns for headings, focus, and link text.',
      'Optimized images and caching for consistent performance.',
    ],
    impact: [
      'Educators find program info faster with fewer clicks.',
      'Updates can be published quickly without breaking layout.',
    ],
    training:
      'Ran a short editor session and delivered a 1-page posting guide with accessibility reminders.',
    stack: ['PHP (PDO)', 'MySQL', 'Tailwind', 'Light JS components'],
    links: { live: 'https://www.scsk12.org/teacherleadership' },
  },

  // ===== CCTE =====
  {
    slug: 'ccte',
    title: 'College, Career & Technical Education (CCTE)',
    role: 'Lead Developer (with Communications & Department Stakeholders)',
    year: '2025',
    summary:
      'Program directory and resources with clear CTAs for students and families, focused on mobile speed and readability.',
    hero: '/images/portfolio/ccte.webp',
    gallery: ['/images/portfolio/ccte.webp'],
    problem:
      'Students and families needed a straightforward way to understand programs and pathways. Prior content was dense, not easily comparable, and hard to navigate on mobile.',
    did: [
      'Worked with stakeholders to define the IA and key tasks (explore, compare, contact).',
      'Built a structured program directory with filterable cards and detail pages.',
      'Implemented accessible patterns for headings, tables, and links.',
      'Tuned images and delivery for strong mobile performance.',
    ],
    impact: [
      'Clearer discovery of programs; fewer barriers to finding next steps.',
      'Editors can maintain the directory without developer intervention.',
    ],
    training:
      'Provided a quick SOP and a 10-minute micro-video for adding programs with alt text and consistent naming.',
    stack: ['PHP (PDO)', 'MySQL', 'Tailwind/Bootstrap'],
    links: { live: 'https://www.scsk12.org/ccte' },
  },
];
