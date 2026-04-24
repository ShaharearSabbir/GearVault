export default function CTA() {
  return (
    <section className="py-20 bg-slate-950/30">
      <div className="container mx-auto px-6">
        <div className="relative overflow-hidden bg-blue-600 rounded-[2.5rem] p-12 lg:p-20 text-center">
          <div className="relative z-10">
            <h2 className="text-4xl lg:text-6xl font-black text-white mb-8 tracking-tight">
              Ready to secure <br /> your inventory?
            </h2>
            <button className="bg-white text-blue-600 px-10 py-4 rounded-2xl font-black text-xl hover:scale-105 transition-transform shadow-xl">
              Create Your Vault Now
            </button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        </div>
      </div>
    </section>
  );
}
