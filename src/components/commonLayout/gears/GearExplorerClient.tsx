/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { Search, PackageSearch } from "lucide-react";
import { getPaginatedGears } from "@/actions/gear.action";
import GearCard from "./GearCard";
import GearCardSkeleton from "@/components/skeletons/GearCardSkeleton";
import { useDebounce } from "@/hooks/useDebounce";

export default function GearExplorerClient({ initialGears, categories }: any) {
  const [gears, setGears] = useState(initialGears);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // Filter States
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const debouncedSearch = useDebounce(search, 500);
  const { ref, inView } = useInView({ threshold: 0.1 });

  // --- RE-FETCH ON FILTER CHANGE ---
  useEffect(() => {
    const resetAndFetch = async () => {
      setLoading(true);
      const freshGears = await getPaginatedGears(
        0,
        debouncedSearch,
        selectedCategory,
        sortBy,
      );
      setGears(freshGears);
      setPage(1);
      setHasMore(freshGears.length === 9);
      setLoading(false);
    };

    resetAndFetch();
  }, [debouncedSearch, selectedCategory, sortBy]);

  // --- INFINITE SCROLL ---
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const nextGears = await getPaginatedGears(
      page,
      debouncedSearch,
      selectedCategory,
      sortBy,
    );

    if (nextGears.length === 0) {
      setHasMore(false);
    } else {
      setGears((prev: any) => [...prev, ...nextGears]);
      setPage((p) => p + 1);
      setHasMore(nextGears.length === 9);
    }
    setLoading(false);
  }, [page, loading, hasMore, debouncedSearch, selectedCategory, sortBy]);

  useEffect(() => {
    if (inView && hasMore && !loading) loadMore();
  }, [inView, loadMore, hasMore, loading]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar - Remains visually the same, but updates state */}
      <aside className="w-full lg:w-72 shrink-0 space-y-8">
        <div className="space-y-3">
          <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
            Search Vault
          </label>
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              value={search}
              placeholder="Search database..."
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
            Categories
          </label>
          <div className="flex flex-wrap lg:flex-col gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-5 py-3 rounded-xl text-sm font-bold text-left transition-all ${selectedCategory === "all" ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200"}`}
            >
              All Equipment
            </button>
            {categories.map((cat: any) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-3 rounded-xl text-sm font-bold text-left transition-all ${selectedCategory === cat.id ? "bg-blue-600 text-white" : "bg-white text-slate-600 border border-slate-200"}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </aside>

      <div className="flex-1 space-y-6">
        {/* Top Bar */}
        <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200">
          <p className="text-sm font-bold text-slate-500">
            Results:{" "}
            <span className="text-slate-900">
              {gears.length} {hasMore ? "+" : ""} items
            </span>
          </p>
          <select
            className="text-xs font-black uppercase bg-slate-50 border-none outline-none p-2 rounded-lg"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low</option>
            <option value="price-high">Price: High</option>
          </select>
        </div>

        {/* Results */}
        {gears.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {gears.map((gear: any) => (
              <GearCard key={gear.id} gear={gear} />
            ))}
            {loading && [1, 2, 3].map((i) => <GearCardSkeleton key={i} />)}
            <div ref={ref} className="h-10" />
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <GearCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-[3rem] border border-slate-200">
            <PackageSearch className="mx-auto text-slate-200 mb-4" size={64} />
            <h3 className="text-xl font-bold">No results in database</h3>
          </div>
        )}
      </div>
    </div>
  );
}
