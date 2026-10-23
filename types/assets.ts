export type AssetType = "kpi" | "dataViz" | "layout" | "storyboard";
export type Tab = "featured" | "kpi" | "layout" | "storyboard";

type BaseAsset = {
  id: string;
  name: string;
  description: string;
  updatedAt: string;
  featured?: boolean;
  trending?: boolean;
};

export type Asset =
  | (BaseAsset & {
    type: "kpi";
  })
  | (BaseAsset & {
    type: "dataViz";
  })
  | (BaseAsset & {
    type: "layout";
  })
  | (BaseAsset & {
    type: "storyboard"
  });

export const typeLabels: Record<AssetType, string> = {
  kpi: "KPI",
  dataViz: "Data Viz",
  layout: "Layout",
  storyboard: "Storyboard",
};