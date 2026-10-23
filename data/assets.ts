import type { Asset } from "@/types/assets";

export const assets: Asset[] = [
  {
    id: "ebca3518-5185-43ae-a80f-000000000001",
    name: "Revenue Growth",
    description: "Track how revenue changes across periods and markets.",
    updatedAt: "2026-09-18",
    type: "kpi",
    featured: true,
  },
  {
    id: "ebca3518-5185-43ae-a80f-000000000002",
    name: "Market Pulse",
    description: "Compare regional performance and spot changes at a glance.",
    updatedAt: "2026-09-12",
    type: "dataViz",
    featured: true,
  },
  {
    id: "ebca3518-5185-43ae-a80f-000000000003",
    name: "Executive Overview",
    description: "A concise dashboard layout for leadership reporting.",
    updatedAt: "2026-08-27",
    type: "layout",
    trending: true
  },
  {
    id: "ebca3518-5185-43ae-a80f-000000000004",
    name: "Quarterly Performance Story",
    description: "A presentation outline for sharing quarterly results.",
    updatedAt: "2026-09-05",
    type: "storyboard",
    trending: true
  }
];
