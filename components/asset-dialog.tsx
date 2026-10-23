"use client";

import { useEffect, useRef } from "react";
import {
  BarChart3,
  ChartNoAxesCombined,
  LayoutDashboard,
  PanelsTopLeft,
  X,
} from "lucide-react";

import { Asset, typeLabels } from "@/types/assets";

type Props = {
  asset: Asset | null;
  onClose: () => void;
};

const icons = {
  kpi: ChartNoAxesCombined,
  dataViz: BarChart3,
  layout: LayoutDashboard,
  storyboard: PanelsTopLeft,
};

export function AssetDialog({ asset, onClose }: Props) {
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
                  {new Date(`${asset.updatedAt}T00:00:00`).toLocaleDateString(
                    "en-US",
                    { month: "short", day: "numeric", year: "numeric" },
                  )}
                </strong>
                Last updated
              </span>
            </div>
          </div>
        </>
      )}
    </dialog>
  );
}
