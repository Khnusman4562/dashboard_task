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
  } = useUpload();

  return (
    <div className="flex flex-col gap-8 max-w-[1600px] mx-auto">
      {/* Page Title */}
      <div className="flex flex-col pt-6">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight leading-tight">System Overview</h1>
        <p className="text-xs text-gray-500 font-medium mt-1">Monitor infrastructure health and asset distribution.</p>
      </div>

      {/* Top Row — Import Hub + Asset Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DataImportHub
            primaryFile={primaryFile}
            secondaryFile={secondaryFile}
            onPrimarySelect={handlePrimarySelect}
            onSecondarySelect={handleSecondarySelect}
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

      {/* Loading indicator */}
      {loading && (
        <div className="flex items-center gap-2 text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-lg px-3 py-2 shadow-sm animate-pulse">
          <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          PROCESSING DATASETS...
        </div>
      )}

      {/* Data Insights Table */}
      <DataInsightsTable data={tableData} />
    </div>
  );
}
