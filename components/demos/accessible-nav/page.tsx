import AccessibleNavDemo from "@/components/demos/AccessibleNavDemo";

export const metadata = {
  title: "Accessible Navigation (Demo) · Shadesblue",
  description:
    "A keyboard-first, screen-reader-friendly navigation demo with focus trap, ESC to close, and proper ARIA.",
};

export default function Page() {
  return (
    <main id="demo-main" className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-2">Accessible Navigation (Demo)</h1>
      <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-2xl">
        This demo shows an accessible header with a keyboard-friendly mobile menu,
        skip link, focus trap, ESC to close, and visible focus states.
      </p>
      <div className="rounded-2xl border">
        <AccessibleNavDemo />
      </div>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border p-6">
          <h2 className="text-xl font-semibold">What’s accessible here</h2>
          <ul className="mt-2 list-disc pl-5 text-sm text-slate-600 dark:text-slate-300">
            <li>Skip link goes directly to main content</li>
            <li>Hamburger toggles a real menu (no div-spam)</li>
            <li>Focus trap inside the open menu</li>
            <li>ESC closes the menu and returns focus to the toggle</li>
            <li>ARIA: <code>aria-expanded</code>, <code>aria-controls</code>, labelled regions</li>
            <li>Visible focus rings, no keyboard traps</li>
          </ul>
        </div>
        <div className="rounded-2xl border p-6">
          <h2 className="text-xl font-semibold">How I’d use this in prod</h2>
          <ul className="mt-2 list-disc pl-5 text-sm text-slate-600 dark:text-slate-300">
            <li>Integrate with your site routes & active styling</li>
            <li>Add reduced-motion variants for big transitions</li>
            <li>Unit test keyboard flows (Tab/Shift+Tab/ESC)</li>
            <li>Audit with Lighthouse and axe DevTools</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
