export type AssetType = "kpi" | "dataViz" | "layout" | "storyboard";
export type Tab = "featured" | "dataViz" | "kpi" | "layout" | "storyboard";

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
    businessQuestions: string[];
    metricIds: string[];
    calculation: string;
    visuals: string[];
    affiliates: string[];
  })
  | (BaseAsset & {
    type: "dataViz";
    kpiIds: string[];
    context: string;
    chartLabels: string[];
    chartValues: number[];
  })
  | (BaseAsset & {
    type: "layout";
    pageCount: number;
    kpiIds: string[];
    previewSections: string[];
  })
  | (BaseAsset & {
    type: "storyboard";
    kpiIds: string[];
    filters: string[];
    affiliates: string[];
    restricted?: boolean;
  });

export const typeLabels: Record<AssetType, string> = {
  kpi: "KPI",
  dataViz: "Data Viz",
  layout: "Layout",
  storyboard: "Storyboard",
};