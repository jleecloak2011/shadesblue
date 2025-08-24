export default function SiteFooter() {
  return (
    <footer className="mt-20 border-t bg-slate-900">
      <div className="container mx-auto px-4 py-8 text-sm text-slate-500">
        © {new Date().getFullYear()} Shadesblue. All rights reserved.
      </div>
    </footer>
  );
}
