import prisma from "@/lib/prisma";

export default async function StatsBar() {
  const topBrands = await prisma.gear.groupBy({
    by: ["brand"],
    _count: {
      brand: true,
    },
    orderBy: {
      _count: {
        brand: "desc",
      },
    },
    take: 5,
  });

  const brands = topBrands.map((brand) => ({
    brand: brand.brand,
    count: brand._count.brand,
  }));

  return (
    <section className="bg-slate-900/50 border-y border-slate-900 py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 grayscale contrast-125">
          {brands.map((brand) => (
            <span
              key={brand.brand}
              className="text-2xl font-black italic tracking-tighter text-white"
            >
              {brand.brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
