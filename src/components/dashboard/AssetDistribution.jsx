import DonutChart from "@/components/ui/DonutChart";

export default function AssetDistribution({ total, processed, pending }) {
  const isProcessing = total > 0 && processed < (total - pending); // Simplified check or just check if total > 0
  
  return (
    <div className="bg-white rounded-[28px] p-4 md:p-6 shadow-sm border border-gray-50 flex flex-col h-full relative overflow-hidden">
      {/* Header - Centered */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <div className="p-2 ">
            <img src="/asset_icon.svg" alt="Asset Distribution" className="w-4 h-4" />
          </div>
          <h2 className="text-base font-bold text-gray-900 tracking-tight">Asset Distribution</h2>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 flex items-center justify-center w-full mb-6 relative">
        <DonutChart total={total} processed={processed} pending={pending} />
      </div>

      {/* Statistic Cards */}
      <div className="grid grid-cols-2 gap-3 mt-auto w-full">
        <div className="bg-gray-50/50 p-4 rounded-2xl flex flex-col gap-1 items-center border border-transparent hover:border-indigo-100 transition-all">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#4F46E5]" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Processed</span>
          </div>
          <p className="text-xl font-bold text-gray-900 tabular-nums">{processed.toLocaleString()}</p>
        </div>
        <div className="bg-gray-50/50 p-4 rounded-2xl flex flex-col gap-1 items-center border border-transparent hover:border-red-100 transition-all">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#943700]" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Pending</span>
          </div>
          <p className="text-xl font-bold text-gray-900 tabular-nums">{pending.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
