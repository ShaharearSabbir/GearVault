// components/skeletons/GearListSkeleton.tsx

import GearCardSkeleton from "./GearCardSkeleton";


export default function GearListSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Skeleton */}
      <aside className="w-full lg:w-64 space-y-8">
        <div className="space-y-4">
          <div className="h-3 bg-slate-200 rounded w-16 animate-pulse" />
          <div className="h-10 bg-white border border-slate-200 rounded-xl animate-pulse" />
        </div>
        <div className="space-y-3">
          <div className="h-3 bg-slate-200 rounded w-20 animate-pulse" />
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-9 bg-white border border-slate-100 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </aside>

      {/* Main Grid Area */}
      <div className="flex-1 space-y-6">
        {/* Sort Bar Skeleton */}
        <div className="h-16 bg-white border border-slate-200 rounded-2xl animate-pulse" />

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <GearCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
