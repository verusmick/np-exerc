"use client";

import { assets } from "@/data/assets";
import { AssetCard } from "@/components/asset-card";

export function Library() {
  function openAsset(id: string) {
    console.log("Open Modal");
    // open modal
  }
  return (
    <main>
      <h1>Library - UI</h1>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {assets.map((asset) => (
          <AssetCard key={asset.id} asset={asset} onOpen={openAsset} />
        ))}
      </div>
    </main>
  );
}
