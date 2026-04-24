export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-950">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1e293b,transparent)] opacity-50" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase mb-6">
          Inventory Excellence
        </span>
        <h1 className="text-5xl lg:text-8xl font-black text-white mb-8 tracking-tighter">
          Track Gear. <br />{" "}
          <span className="text-blue-500">Zero Friction.</span>
        </h1>
        <p className="max-w-2xl mx-auto text-slate-400 text-lg lg:text-xl mb-12 leading-relaxed">
          The high-performance vault for your production equipment. Manage
          serials, JSON-based technical specs, and daily rates with a
          developer-first interface.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto bg-white text-slate-950 px-8 py-4 rounded-2xl font-black text-lg hover:bg-blue-400 transition-all">
            Get Started Free
          </button>
          <button className="w-full sm:w-auto bg-slate-900 text-white border border-slate-800 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all">
            View Live Demo
          </button>
        </div>
      </div>
    </section>
  );
}
