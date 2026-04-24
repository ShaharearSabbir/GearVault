import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ShieldCheck, Info, Star, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import ImageGallery from "@/components/commonLayout/gears/ImageGallery";

export default async function GearDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const gear = await prisma.gear.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!gear) notFound();

  // Parse JSON specifications if stored as JSON, otherwise default to object
  const specs = (gear.specifications as Record<string, string>) || {};

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/gears"
            className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition"
          >
            <ArrowLeft size={16} />
            Back to Vault
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-xs font-black uppercase tracking-widest text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
              ID: {gear.id.slice(-6)}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT: Image Showcase (5/12 columns) */}
          <div className="lg:col-span-7">
            <ImageGallery images={gear.images} name={gear.name} />

            {/* Description Section */}
            <div className="mt-12 bg-white rounded-[2.5rem] p-8 lg:p-12 border border-slate-200">
              <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <Info className="text-blue-600" />
                Product Overview
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                {gear.description || "No description available for this item."}
              </p>
            </div>
          </div>

          {/* RIGHT: Booking & Specs (5/12 columns) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Pricing Card */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm">
              <div className="mb-6">
                <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">
                  {gear.brand}
                </span>
                <h1 className="text-4xl font-black text-slate-900 mt-1">
                  {gear.name}
                </h1>
              </div>

              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-5xl font-black text-slate-900">
                  ${gear.dailyRate.toNumber()}
                </span>
                <span className="text-slate-400 font-bold uppercase text-sm">
                  / Day
                </span>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <ShieldCheck className="text-emerald-500" size={20} />
                  <span className="text-sm font-medium">
                    Verified Authenticity & Maintenance
                  </span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <Calendar className="text-blue-500" size={20} />
                  <span className="text-sm font-medium">
                    Availability: {gear.status}
                  </span>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-blue-600/20">
                Reserve Gear
              </button>
            </div>

            {/* Specifications Table */}
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white">
              <h3 className="text-xl font-bold mb-6 italic text-blue-400 underline decoration-2 underline-offset-8">
                Technical Specs
              </h3>
              <div className="space-y-4">
                {Object.entries(specs).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between border-b border-white/10 pb-3"
                  >
                    <span className="text-sm font-bold text-slate-400 capitalize">
                      {key.replace(/([A-Z])/g, " $1")}
                    </span>
                    <span className="text-sm font-medium text-white">
                      {value}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-sm font-bold text-slate-400">
                    Condition
                  </span>
                  <span className="text-sm font-medium text-emerald-400 font-mono">
                    {gear.condition}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* REVIEW PLACEHOLDER SECTION */}
        <section className="mt-20 border-t border-slate-200 pt-20">
          <div className="max-w-4xl">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-2">
                  Community Reviews
                </h2>
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-400">
                    <Star fill="currentColor" size={16} />
                    <Star fill="currentColor" size={16} />
                    <Star fill="currentColor" size={16} />
                    <Star fill="currentColor" size={16} />
                    <Star fill="currentColor" size={16} />
                  </div>
                  <span className="text-sm font-bold text-slate-500">
                    4.9 (Coming Soon)
                  </span>
                </div>
              </div>
              <button className="bg-white border border-slate-300 text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-slate-50 transition">
                Write a Review
              </button>
            </div>

            {/* Placeholder Empty State for Reviews */}
            <div className="bg-slate-100 rounded-4xl p-12 text-center border-2 border-dashed border-slate-200">
              <Star className="mx-auto text-slate-300 mb-4" size={40} />
              <p className="text-slate-500 font-bold">
                The review system is currently under maintenance.
              </p>
              <p className="text-slate-400 text-sm mt-1">
                Check back soon to see what other creators are saying.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
