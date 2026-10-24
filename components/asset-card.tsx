import {
  BarChart3,
  BookmarkCheck,
  ChartNoAxesCombined,
  LayoutDashboard,
  PanelsTopLeft,
} from "lucide-react";
import type { Asset } from "@/types/assets";
import { typeLabels } from "@/types/assets";

const icons = {
  kpi: ChartNoAxesCombined,
  dataViz: BarChart3,
  layout: LayoutDashboard,
  storyboard: PanelsTopLeft,
};

export function AssetCard({
  asset,
  onOpen,
  isFavorite,
}: {
  asset: Asset;
  onOpen: (id: string) => void;
  isFavorite: boolean;
}) {
  const Icon = icons[asset.type];
  return (
    <button
      type="button"
      onClick={() => onOpen(asset.id)}
      className="group flex min-h-25 w-full gap-3 rounded border border-slate-200 bg-white p-3 text-left  hover:border-slate-400 hover:shadow-sm "
      aria-label={`View ${asset.name} details`}
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-slate-100 text-slate-500">
        <Icon size={22} strokeWidth={1.3} aria-hidden="true" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="flex items-center gap-1.5 text-sm font-semibold leading-5 text-slate-900 group-hover:text-slate-700">
          <span>{asset.name}</span>
          {isFavorite && (
            <BookmarkCheck
              size={14}
              className="shrink-0 text-slate-600"
              aria-label="Favorited"
            />
          )}
        </span>
        <span className="mt-0.5 line-clamp-2 text-xs leading-4 text-slate-600">
          {asset.description}
        </span>
        <span className="mt-auto flex items-center gap-2 pt-1 text-[11px] text-slate-500">
          {typeLabels[asset.type]} ·{" "}
          {new Date(`${asset.updatedAt}T00:00:00`).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </span>
    </button>
  );
}
