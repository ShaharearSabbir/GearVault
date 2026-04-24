// components/skeletons/GearCardSkeleton.tsx

export default function GearCardSkeleton() {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
      {/* Image Area */}
      <div className="aspect-4/3 bg-slate-200 animate-pulse" />

      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-2 flex-1">
            {/* Title */}
            <div className="h-5 bg-slate-200 rounded-md w-3/4 animate-pulse" />
            {/* Brand */}
            <div className="h-3 bg-slate-100 rounded-md w-1/4 animate-pulse" />
          </div>
          {/* Price Tag */}
          <div className="space-y-1 text-right">
            <div className="h-5 bg-slate-200 rounded-md w-12 ml-auto animate-pulse" />
            <div className="h-2 bg-slate-100 rounded-md w-8 ml-auto animate-pulse" />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          {/* Condition Badge */}
          <div className="h-5 bg-slate-100 rounded-md w-16 animate-pulse" />
          {/* Link Button */}
          <div className="h-4 bg-slate-200 rounded-md w-24 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
