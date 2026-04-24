/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import gearDefault from "@/assets/gear.jpg";

export default function GearCard({ gear }: any) {
  return (
    <div className="group bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          src={gear.images[0] || gearDefault}
          alt={gear.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-sm">
            {gear.category.name}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              {gear.name}
            </h3>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-tighter">
              {gear.brand}
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-black text-slate-900">
              ${gear.dailyRate}
            </p>
            <p className="text-[10px] text-slate-400 font-bold uppercase">
              per day
            </p>
          </div>
        </div>

        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
          <span
            className={`flex items-center gap-1.5 text-[10px] font-bold px-2 py-1 rounded-md ${
              gear.condition === "NEW"
                ? "bg-emerald-50 text-emerald-600"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {gear.condition}
          </span>
          <Link
            href={`/gears/${gear.id}`}
            className="text-sm font-bold text-blue-600 hover:text-blue-700 transition"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
}
