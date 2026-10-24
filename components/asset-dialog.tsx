"use client";

import { useEffect, useRef } from "react";
import {
  BarChart3,
  Bookmark,
  ChartNoAxesCombined,
  LayoutDashboard,
  PanelsTopLeft,
  X,
} from "lucide-react";

import { Asset, typeLabels } from "@/types/assets";

import dataVizChart from "@/img/dataViz-chart.png";
import layoutChart from "@/img/layout-chart.png";

type Props = {
  asset: Asset | null;
  onClose: () => void;
  isFavorite: boolean;
  onFavorite: () => void;
};

const icons = {
  kpi: ChartNoAxesCombined,
  dataViz: BarChart3,
  layout: LayoutDashboard,
  storyboard: PanelsTopLeft,
};

function Detail({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-1 text-xs font-semibold text-slate-800">{label}</h3>
      <div className="text-xs leading-5 text-slate-600">{children}</div>
    </div>
  );
}

export function AssetDialog({ asset, onClose, isFavorite, onFavorite }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const Icon = asset ? icons[asset.type] : ChartNoAxesCombined;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (asset && !dialog.open) dialog.showModal();
    if (!asset && dialog.open) dialog.close();
  }, [asset]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
      aria-labelledby="asset-dialog-title"
      className="m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-125 overflow-y-auto rounded border border-slate-200 bg-white p-0 text-slate-900 shadow-xl"
    >
      {asset && (
        <>
          <div className="relative px-5 pb-4 pt-5 text-center sm:px-6">
            <button
              type="button"
              aria-label="Close details"
              onClick={() => dialogRef.current?.close()}
              className="absolute right-3 top-3 rounded p-1 text-slate-500 hover:bg-slate-100"
            >
              <X size={17} aria-hidden="true" />
            </button>
            <span className="mx-auto flex h-9 w-9 items-center justify-center rounded bg-slate-100 text-slate-500">
              <Icon size={20} strokeWidth={1.4} aria-hidden="true" />
            </span>
            <h2 id="asset-dialog-title" className="mt-2 text-lg font-semibold">
              {asset.name}{" "}
              <span className="rounded bg-slate-100 px-1.5 py-0.5 align-middle text-[10px] font-normal text-slate-600">
                {typeLabels[asset.type]}
              </span>
            </h2>
            <p className="mt-1 text-xs text-slate-500">{asset.description}</p>

            <div className="mt-4 grid grid-cols-3 divide-x divide-slate-200 border-y border-slate-100 py-2 text-[11px] text-slate-600">
              <span>
                <strong className="block text-xs text-slate-900">
                  {typeLabels[asset.type]}
                </strong>
                Type
              </span>

              <span>
                <strong className="block text-xs text-slate-900">
                  {asset.type === "layout"
                    ? asset.pageCount
                    : asset.type === "kpi"
                      ? asset.metricIds.length
                      : asset.kpiIds.length}
                </strong>
                {asset.type === "layout" ? "Pages" : "Metrics"}
              </span>
              <span>
                <strong className="block text-xs text-slate-900">
                  {new Date(`${asset.updatedAt}T00:00:00`).toLocaleDateString(
                    "en-US",
                    { month: "short", day: "numeric", year: "numeric" },
                  )}
                </strong>
                Last updated
              </span>
            </div>
          </div>
          <div className="space-y-4 px-5 pb-4 sm:px-6">
            {asset.type === "kpi" && (
              <>
                <div className="rounded border border-slate-100 bg-slate-50 p-4">
                  <p className="text-xs font-semibold text-slate-700">
                    Calculation
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-600">
                    {asset.calculation}
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Detail label="Metric IDs">
                    {asset.metricIds.join(", ")}
                  </Detail>
                  <Detail label="Visuals available">
                    {asset.visuals.join(", ")}
                  </Detail>
                  <Detail label="Affiliate applicability">
                    {asset.affiliates.join(", ")}
                  </Detail>
                </div>
                <Detail label="Business questions">
                  <div className="mt-1 grid gap-2 sm:grid-cols-2">
                    {asset.businessQuestions.map((question) => (
                      <p
                        key={question}
                        className="rounded bg-slate-50 p-2 text-xs"
                      >
                        {question}
                      </p>
                    ))}
                  </div>
                </Detail>
              </>
            )}
            {asset.type === "dataViz" && (
              <>
                <Detail label="Applicable KPIs">
                  {asset.kpiIds.join(", ")}
                </Detail>
                <Detail label="Context">{asset.context}</Detail>
                <div className="rounded border border-slate-100 bg-slate-50 p-3">
                  <img
                    src={dataVizChart.src}
                    alt="Chart preview"
                    className="mx-auto block h-auto w-full object-contain"
                  />
                </div>
              </>
            )}
            {asset.type === "layout" && (
              <>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Detail label="Pages">{asset.pageCount}</Detail>
                  <Detail label="KPIs used">{asset.kpiIds.join(", ")}</Detail>
                </div>
                <Detail label="Layout preview">
                  <div className="mt-2 rounded border border-slate-200 bg-slate-100 p-3">
                    <img
                      src={layoutChart.src}
                      alt="Chart preview"
                      className="mx-auto block h-auto w-full object-contain"
                    />
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    Sections: {asset.previewSections.join(" · ")}
                  </p>
                </Detail>
              </>
            )}
            {asset.type === "storyboard" && (
              <>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Detail label="Coupled KPIs">
                    {asset.kpiIds.join(", ")}
                  </Detail>
                  <Detail label="Available filters">
                    {asset.filters.join(", ")}
                  </Detail>
                </div>
                <Detail label="Applicable affiliates">
                  {asset.affiliates.join(", ")}
                </Detail>
                <Detail label="Storyboard outline">
                  <div className="mt-2 grid gap-2 sm:grid-cols-3">
                    {["The question", "The evidence", "The takeaway"].map(
                      (slide, index) => (
                        <div
                          key={slide}
                          className="rounded border border-slate-200 bg-slate-50 p-3"
                        >
                          <span className="text-xs font-medium text-slate-500">
                            Slide {index + 1}
                          </span>
                          <p className="mt-2 font-medium">{slide}</p>
                          <div className="mt-4 h-1.5 w-3/4 rounded-full bg-slate-200" />
                        </div>
                      ),
                    )}
                  </div>
                </Detail>
              </>
            )}
          </div>
          <div className="px-5 pb-5 sm:px-6">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={onFavorite}
                aria-pressed={false}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded bg-slate-800 px-3 py-2 text-xs font-medium text-white "
              >
                <Bookmark
                  size={14}
                  fill={isFavorite ? "currentColor" : "none"}
                  aria-hidden="true"
                />
                {isFavorite ? "Remove favorite" : "Favorite item"}
              </button>
            </div>
          </div>
        </>
      )}
    </dialog>
  );
}
