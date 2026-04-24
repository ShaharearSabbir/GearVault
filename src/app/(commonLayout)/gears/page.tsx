import { Suspense } from "react";
import prisma from "@/lib/prisma";

import GearListSkeleton from "@/components/skeletons/GearListSkeleton";
import GearExplorerClient from "@/components/commonLayout/gears/GearExplorerClient";
import { getPaginatedGears } from "@/actions/gear.action";

export default async function GearsPage() {
  // Fetch initial data for SEO and fast first-paint
  const [gears, categories] = await Promise.all([
    getPaginatedGears(),
    prisma.category.findMany(),
  ]);

  // Serialize Decimal/Date for Client Component

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
            Explore the Vault
          </h1>
          <p className="text-slate-500">
            Professional grade equipment available for your next production.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Suspense fallback={<GearListSkeleton />}>
          <GearExplorerClient initialGears={gears} categories={categories} />
        </Suspense>
      </div>
    </div>
  );
}
