"use client";

import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";

import { assets } from "@/data/assets";
import {
  AssetDialog,
  AssetSection,
  RequestDialog,
  SearchSection,
} from "@/components";

import type { Tab } from "@/types/assets";

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

export function Library() {
  const [tab, setTab] = useState<Tab>("featured");
  const [counts, setCounts] = useState(initialCounts);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState<Set<string>>(() => new Set());
  const [requestDialog, setRequestDialog] = useState<boolean | null>(null);
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
    setRequestDialog(true);
  }

  function showMore(section: SectionKey) {
    setCounts((previous) => ({
      ...previous,
      [section]: previous[section] + 4,
    }));
  }

  async function copyLink() {
    if (!selected) return;
    const url = new URL(window.location.href);
    url.searchParams.set("asset", selected.id);
    try {
      await navigator.clipboard.writeText(url.toString());
      alert("Link copied to clipboard.");
    } catch {
      alert(
        "Could not copy the link. Check your browser's clipboard permissions.",
      );
    }
  }

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("asset");
    if (id && assets.some((asset) => asset.id === id)) setSelectedId(id);
  }, []);

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
        <SearchSection
          query={query}
          updateQuery={updateQuery}
          commitSearch={commitSearch}
        />

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
        onCopy={copyLink}
      />
      <RequestDialog
        context={requestDialog}
        onClose={() => setRequestDialog(null)}
      />
    </main>
  );
}
