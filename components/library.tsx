"use client";

import { useState } from "react";
import { ArrowRight, Plus } from "lucide-react";

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
type SectionKey = "featured" | "trending";
const initialCounts: Record<SectionKey, number> = {
  featured: 4,
  trending: 4,
};

function AssetSection({
  title,
  subtitle,
  items,
  visibleCount,
  onMore,
  onOpen,
}: {
  title: string;
  subtitle: string;
  items: Asset[];
  visibleCount: number;
  onMore: () => void;
  onOpen: (id: string) => void;
}) {
  return (
    <section className="mt-7" aria-label={title}>
      <div className="mb-3">
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {items.slice(0, visibleCount).map((asset) => (
          <AssetCard key={asset.id} asset={asset} onOpen={onOpen} />
        ))}
      </div>
      {items.length > visibleCount && (
        <button
          type="button"
          onClick={onMore}
          className="mt-3 inline-flex items-center gap-1 rounded border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-slate-700"
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

  const selected = assets.find((asset) => asset.id === selectedId) ?? null;

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
                className={`rounded px-1 py-1.5 text-[11px] sm:text-xs ${tab === item.id ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-150">
        <>
          <AssetSection
            title="Featured"
            subtitle="Curated top picks from this week"
            items={assets.filter((asset) => asset.featured)}
            visibleCount={counts.featured}
            onMore={() => showMore("featured")}
            onOpen={openAsset}
          />
          <AssetSection
            title="Trending"
            subtitle="Most popular by the community"
            items={assets.filter((asset) => asset.trending)}
            visibleCount={counts.trending}
            onMore={() => showMore("trending")}
            onOpen={openAsset}
          />
        </>
      </div>

      <AssetDialog asset={selected} onClose={() => setSelectedId(null)} />
    </main>
  );
}
