import { ShieldCheck, Zap, Globe } from "lucide-react";

import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="bg-slate-950 text-white min-h-screen">
      {/* --- Mission Hero --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-40 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#1e293b,transparent)] opacity-70" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
              Built for those <br />
              <span className="text-blue-500">who create.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-slate-400 leading-relaxed font-medium">
              GearVault was born out of a simple frustration: production gear is
              too expensive to manage with spreadsheets. We built the
              world&apos;s most precise inventory vault to give creators peace
              of mind.
            </p>
          </div>
        </div>
      </section>

      {/* --- The Vision (Full Width Image/Stat) --- */}
      <section className="bg-slate-900 py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-video lg:aspect-square rounded-[3rem] overflow-hidden border border-slate-800">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent z-10" />
              <div className="absolute bottom-8 left-8 z-20">
                <p className="text-4xl font-black text-white">$2.4M+</p>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
                  Total Gear Value Secured
                </p>
              </div>
              <div className="bg-slate-800 w-full h-full animate-pulse" />{" "}
              {/* Replace with actual branding image */}
            </div>

            <div className="space-y-8">
              <h2 className="text-4xl font-bold italic underline decoration-blue-600 underline-offset-8">
                Precision First.
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                We believe that your equipment is an extension of your craft.
                Whether you are a solo cinematographer or a global production
                house, GearVault provides the technical infrastructure to track,
                maintain, and scale your inventory with zero friction.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div>
                  <h4 className="text-blue-500 font-black text-2xl">99.9%</h4>
                  <p className="text-sm text-slate-500 font-bold uppercase">
                    Uptime Reliability
                  </p>
                </div>
                <div>
                  <h4 className="text-blue-500 font-black text-2xl">24/7</h4>
                  <p className="text-sm text-slate-500 font-bold uppercase">
                    Technical Support
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Values Grid --- */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-5xl font-black mb-4 italic">
              Our Core Principles
            </h2>
            <div className="h-1.5 w-24 bg-blue-600 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard
              icon={<ShieldCheck className="text-emerald-500" />}
              title="Integrity"
              desc="Your data and inventory history are immutable. We prioritize security above all else."
            />
            <ValueCard
              icon={<Zap className="text-amber-500" />}
              title="Speed"
              desc="The vault is optimized for rapid entry and retrieval. No bloat, just performance."
            />
            <ValueCard
              icon={<Globe className="text-blue-500" />}
              title="Accessibility"
              desc="Manage your gear from the set, the office, or transit. Seamless multi-device sync."
            />
          </div>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="pb-32 px-6">
        <div className="container mx-auto max-w-5xl bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[3rem] p-12 lg:p-24 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl lg:text-6xl font-black mb-8">
              Join the Vault.
            </h2>
            <p className="text-white/80 text-xl mb-12 max-w-xl mx-auto font-medium">
              Ready to professionalize your workflow? Start managing your
              inventory like a pro today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/signup"
                className="bg-white text-blue-600 px-10 py-4 rounded-2xl font-black text-xl hover:scale-105 transition-all"
              >
                Get Started
              </Link>
              <Link
                href="/contact"
                className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-2xl font-black text-xl hover:bg-white hover:text-blue-600 transition-all"
              >
                Contact Sales
              </Link>
            </div>
          </div>
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        </div>
      </section>
    </main>
  );
}

function ValueCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="p-10 rounded-[2.5rem] bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 transition-all group">
      <div className="mb-6 p-4 bg-slate-950 rounded-2xl w-fit group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-slate-400 leading-relaxed font-medium">{desc}</p>
    </div>
  );
}
