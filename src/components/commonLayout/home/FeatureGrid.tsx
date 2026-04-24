import {
  Database,
  Shield,
  Zap,
  LayoutGrid,
  BarChart3,
  Users,
} from "lucide-react";

export default function FeatureGrid() {
  const features = [
    {
      icon: <Database />,
      title: "JSON Specs",
      desc: "Add custom technical fields for any gear type instantly.",
    },
    {
      icon: <Shield />,
      title: "Secure Vault",
      desc: "Unique serial number tracking with ownership verification.",
    },
    {
      icon: <Zap />,
      title: "Real-time Status",
      desc: "Instantly see what's available or in maintenance.",
    },
    {
      icon: <LayoutGrid />,
      title: "Visual Assets",
      desc: "Integrated image management powered by ImgBB.",
    },
    {
      icon: <BarChart3 />,
      title: "ROI Tracking",
      desc: "Manage daily rates and calculate asset utilization.",
    },
    {
      icon: <Users />,
      title: "Team Sync",
      desc: "Collaborate with multiple technicians in one dashboard.",
    },
  ];

  return (
    <section id="features" className="py-24 bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 italic">
            The Professional Core.
          </h2>
          <p className="text-slate-500 max-w-lg">
            Everything you need to manage a high-end equipment inventory without
            the spreadsheet headache.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-8 rounded-3xl bg-slate-900/30 border border-slate-900 hover:border-blue-500/50 transition-all group"
            >
              <div className="w-12 h-12 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center mb-6 text-blue-500 group-hover:text-white group-hover:bg-blue-600 transition-all">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
