export default function Contact() {
  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-6">Contact</h1>
      <p className="text-slate-600 dark:text-slate-300 mb-6">
        Book a quick intro call or send a note. I’ll reply within one business day.
      </p>
      <div className="flex gap-3">
        <a href="mailto:jleecloak2011@gmail.com" className="rounded-2xl bg-brand-blue text-white px-4 py-2">
          Email
        </a>
        <a href="https://calendly.com" target="_blank" rel="noreferrer" className="rounded-2xl border px-4 py-2">
          Book a call
        </a>
      </div>
    </section>
  );
}
