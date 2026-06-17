"use client";

import useUpload from "@/hooks/useUpload";
import DataImportHub from "@/components/dashboard/DataImportHub";
import AssetDistribution from "@/components/dashboard/AssetDistribution";
import DataInsightsTable from "@/components/dashboard/DataInsightsTable";

export default function Home() {
  const {
    primaryFile,
    secondaryFile,
    stats,
    tableData,
    loading,
    handlePrimarySelect,
    handleSecondarySelect,
    handleCompare,
  } = useUpload();

  return (
    <div className="flex flex-col gap-8">
      {/* Page Title */}
      <div className="flex flex-col pt-3">
        <h1 className="text-[32px] font-bold text-[#191C1E] tracking-tight leading-tight">System Overview</h1>
        <p className="text-[16px] text-[#434655] font-normal mt-1">Monitor your enterprise data infrastructure health and asset distribution.</p>
      </div>

      {/* Top Row — Import Hub + Asset Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DataImportHub
            primaryFile={primaryFile}
            secondaryFile={secondaryFile}
            onPrimarySelect={handlePrimarySelect}
            onSecondarySelect={handleSecondarySelect}
            onCompare={handleCompare}
          />
        </div>
        <div className="lg:col-span-1">
          <AssetDistribution
            total={stats.total}
            processed={stats.processed}
            pending={stats.pending}
          />
        </div>
      </div>

      {/* Main Content Area: Either Loader or Data Table */}
      <div className="relative min-h-[400px]">
        {loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/50 backdrop-blur-[2px] rounded-[28px] z-10">
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-sm font-bold text-indigo-700 tracking-widest uppercase">Processing Datasets</span>
                <span className="text-[11px] font-medium text-gray-400 mt-1">Please wait while we sync your records...</span>
              </div>
            </div>
          </div>
        ) : null}

        <div className={loading ? "opacity-20 pointer-events-none transition-opacity duration-300" : "transition-opacity duration-300"}>
          <DataInsightsTable data={tableData} />
        </div>
      </div>
    </div>
  );
}
