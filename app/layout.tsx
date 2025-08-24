import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import AccessibilityMenu from '@/components/AccessibilityMenu';

export const metadata: Metadata = {
  title: 'Shadesblue — Jason Martin',
  description: 'Full-stack developer for K-12 & nonprofits.',
  metadataBase: new URL('https://www.shadesblue.com'),
  openGraph: { type: 'website', siteName: 'Shadesblue' }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="min-h-dvh antialiased text-slate-800 dark:text-slate-100">
        {/* Skip link for keyboard users */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:shadow"
        >
          Skip to main content
        </a>

        {/* Apply theme + accessibility preferences before hydration */}
        <Script id="init-preferences" strategy="beforeInteractive">
          {`(function(){try{
            var d=document.documentElement;

            // Theme
            var savedTheme=localStorage.getItem('theme');
            var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;
            var dark = savedTheme ? savedTheme==='dark' : prefersDark;
            d.classList.toggle('dark', dark);

            // Accessibility
            var a11y={};
            try{ a11y = JSON.parse(localStorage.getItem('a11y')||'{}'); }catch(e){}
            if(a11y.textSize==='large') d.classList.add('a11y-lgtext');
            if(a11y.textSize==='xlarge') d.classList.add('a11y-xltext');
            if(a11y.underlineLinks) d.classList.add('a11y-underline-links');
            if(a11y.highContrast) d.classList.add('a11y-high-contrast');
            if(a11y.reduceMotion) d.classList.add('a11y-reduce-motion');
          }catch(e){}})();`}
        </Script>

        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <AccessibilityMenu />
      </body>
    </html>
  );
}
