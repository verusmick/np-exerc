import { ArrowRight } from "lucide-react";

import { AssetCard } from "@/components";
import type { Asset } from "@/types/assets";

export function AssetSection({
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
