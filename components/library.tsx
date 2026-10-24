"use client";

import { useState } from "react";
import { ArrowRight, Plus, Search, X } from "lucide-react";

import { assets } from "@/data/assets";
import { AssetCard, AssetDialog } from "@/components";

import type { Asset, Tab } from "@/types/assets";

const tabs: { id: Tab; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "dataViz", label: "Data viz" },
  { id: "kpi", label: "KPI" },
  { id: "layout", label: "Layouts" },
  { id: "storyboard", label: "Storyboards" },
];
type SectionKey = "featured" | "trending" | "list";
const initialCounts: Record<SectionKey, number> = {
  featured: 4,
  trending: 4,
  list: 4,
};

function AssetSection({
  title,
  subtitle,
  items,
  visibleCount,
  onMore,
  onOpen,
  favorites,
}: {
  title: string;
  subtitle: string;
  items: Asset[];
  visibleCount: number;
  onMore: () => void;
  onOpen: (id: string) => void;
  favorites: Set<string>;
}) {
  return (
    <section className="mt-7" aria-label={title}>
      <div className="mb-3">
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {items.slice(0, visibleCount).map((asset) => (
          <AssetCard
            key={asset.id}
            asset={asset}
            onOpen={onOpen}
            isFavorite={favorites.has(asset.id)}
          />
        ))}
      </div>
      {items.length > visibleCount && (
        <button
          type="button"
          onClick={onMore}
          className="mt-3 inline-flex items-center gap-1 rounded border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 "
        >
          Show more <ArrowRight size={16} aria-hidden="true" />
        </button>
      )}
    </section>
  );
}

export function Library() {
  const [tab, setTab] = useState<Tab>("featured");
  const [counts, setCounts] = useState(initialCounts);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState<Set<string>>(() => new Set());

  // open modal
  const selected = assets.find((asset) => asset.id === selectedId) ?? null;

  // Filter Assets
  const withinTab =
    tab === "featured" ? assets : assets.filter((asset) => asset.type === tab);
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const results = withinTab.filter((asset) =>
    asset.name.toLocaleLowerCase().includes(normalizedQuery),
  );

  function updateQuery(value: string) {
    setQuery(value);
    setCounts(initialCounts);
  }

  function commitSearch(value: string) {
    const term = value.trim();
    if (!term) return;
    updateQuery(term);
  }
  // End - Filter Assets

  function openAsset(id: string) {
    setSelectedId(id);
  }
  function openRequest() {
    console.log("open request modal");
  }

  function showMore(section: SectionKey) {
    setCounts((previous) => ({
      ...previous,
      [section]: previous[section] + 4,
    }));
  }

  return (
    <main className="mx-auto min-h-screen max-w-200 px-4 pb-16 pt-5 sm:px-6">
      <header className="flex justify-end">
        <button
          type="button"
          onClick={() => openRequest()}
          className="inline-flex items-center gap-1 rounded bg-slate-600 px-3 py-1.5 text-xs font-medium text-white"
        >
          <Plus size={13} aria-hidden="true" /> Request
        </button>
      </header>

      <div className="mx-auto max-w-150 pt-1 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Library
        </h1>
        <p className="mt-2 text-xs text-slate-600">
          Browse for assets needed to report and present analysis.
        </p>
        <div className="relative mt-5 text-left">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              commitSearch(query);
            }}
            role="search"
          >
            <Search
              size={15}
              className="pointer-events-none absolute left-3 top-2.5 text-slate-400"
              aria-hidden="true"
            />
            <input
              id="library-search"
              type="text"
              value={query}
              onChange={(event) => updateQuery(event.target.value)}
              placeholder="Type to search..."
              className="h-9 w-full rounded border border-slate-200 bg-white pl-9 pr-21 text-xs text-slate-900 outline-none placeholder:text-slate-400"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  updateQuery("");
                }}
                className="absolute right-16 top-1.5 rounded p-1 text-slate-500 "
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
            <button
              type="submit"
              className="absolute right-1 top-1 rounded px-2.5 py-1.5 text-xs font-medium text-slate-500 "
            >
              Search
            </button>
          </form>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <nav
            aria-label="Asset categories"
            className="grid min-w-0 flex-1 grid-cols-5 rounded bg-slate-100 p-0.5 text-center"
          >
            {tabs.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={tab === item.id}
                onClick={() => {
                  setTab(item.id);
                }}
                className={`rounded px-1 py-1.5 text-[11px] sm:text-xs ${tab === item.id ? "bg-white text-slate-900" : "text-slate-500"}`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
      <div className="mx-auto max-w-150">
        {tab === "featured" && !normalizedQuery ? (
          <>
            <AssetSection
              title="Featured"
              subtitle="Curated top picks from this week"
              items={assets.filter((asset) => asset.featured)}
              visibleCount={counts.featured}
              onMore={() => showMore("featured")}
              onOpen={openAsset}
              favorites={favorites}
            />
            <AssetSection
              title="Trending"
              subtitle="Most popular by the community"
              items={assets.filter((asset) => asset.trending)}
              visibleCount={counts.trending}
              onMore={() => showMore("trending")}
              onOpen={openAsset}
              favorites={favorites}
            />
          </>
        ) : results.length > 0 ? (
          <AssetSection
            title={
              normalizedQuery
                ? `Results for “${query.trim()}”`
                : (tabs.find((item) => item.id === tab)?.label ?? "Assets")
            }
            subtitle={`${results.length} ${results.length === 1 ? "asset" : "assets"} found${tab === "featured" ? "" : ` in ${tabs.find((item) => item.id === tab)?.label}`}`}
            items={results}
            visibleCount={counts.list}
            onMore={() => showMore("list")}
            onOpen={openAsset}
            favorites={favorites}
          />
        ) : (
          <div className="mt-7 rounded border border-dashed border-slate-300 bg-white px-5 py-10 text-center">
            <Search
              size={22}
              className="mx-auto text-slate-400"
              aria-hidden="true"
            />

            <h2 className="mt-3 text-sm font-semibold">"No assets found"</h2>
            <p className="mt-1 text-xs text-slate-600">
              "Try a different search or category."
            </p>
            {normalizedQuery && (
              <button
                type="button"
                onClick={() => {
                  updateQuery("");
                }}
                className="mt-3 rounded border border-slate-200 px-3 py-1.5 text-xs font-medium"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>

      <AssetDialog
        asset={selected}
        onClose={() => setSelectedId(null)}
        isFavorite={selected ? favorites.has(selected.id) : false}
        onFavorite={() => {
          if (!selected) return;
          setFavorites((previous) => {
            const next = new Set(previous);
            if (next.has(selected.id)) next.delete(selected.id);
            else next.add(selected.id);
            return next;
          });
        }}
      />
    </main>
  );
}
