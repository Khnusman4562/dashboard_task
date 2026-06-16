"use client";

import { useState, useMemo } from "react";
import * as XLSX from "xlsx";
import Pagination from "@/components/ui/Pagination";
import { ITEMS_PER_PAGE } from "@/constants";

const FileIcon = ({ source }) => {
  const colors = {
    "Primary Only": "text-indigo-600 bg-indigo-50",
    "Secondary Only": "text-purple-600 bg-purple-50",
  };
  const c = colors[source] || "text-gray-400 bg-gray-50";
  return (
    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${c}`}>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    </div>
  );
};

export default function DataInsightsTable({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterText, setFilterText] = useState("");
  const [sourceFilter, setSourceFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const sources = ["All", "Primary Only", "Secondary Only"];

  const filteredAndSorted = useMemo(() => {
    let result = data.filter((row) => {
      const matchText = row.utr.toLowerCase().includes(filterText.toLowerCase());
      const matchSource = sourceFilter === "All" || row.source === sourceFilter;
      return matchText && matchSource;
    });

    // Sorting logic
    result.sort((a, b) => {
      const parseAmount = (val) => {
        if (!val || val === "—") return 0;
        // Remove commas and any other non-numeric characters except decimal point
        const cleanVal = String(val).replace(/[^\d.-]/g, '');
        return parseFloat(cleanVal) || 0;
      };

      if (sortBy === "amount-high") return parseAmount(b.amount) - parseAmount(a.amount);
      if (sortBy === "amount-low") return parseAmount(a.amount) - parseAmount(b.amount);
      if (sortBy === "utr") return a.utr.localeCompare(b.utr);
      return 0; // Default: no sort or newest (order as is)
    });

    return result;
  }, [data, filterText, sourceFilter, sortBy]);

  const totalPages = Math.ceil(filteredAndSorted.length / ITEMS_PER_PAGE);
  const paginated = filteredAndSorted.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleClear = () => {
    setFilterText("");
    setSourceFilter("All");
    setSortBy("newest");
    setCurrentPage(1);
  };

  const handleExport = () => {
    if (filteredAndSorted.length === 0) return;
    const ws = XLSX.utils.json_to_sheet(filteredAndSorted);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Unmatched Records");
    XLSX.writeFile(wb, `unmatched_records_${new Date().getTime()}.xlsx`);
  };

  // Custom select style with arrow icon
  const selectClass = "appearance-none pl-4 pr-10 py-2.5 bg-gray-50 border-none rounded-xl text-[13px] font-bold text-gray-600 outline-none focus:ring-2 focus:ring-indigo-100 cursor-pointer transition-all bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%222.5%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M19%209l-7%207-7-7%22%20%2F%3E%3C%2Fsvg%3E')] bg-[length:16px_16px] bg-[right_12px_center] bg-no-repeat hover:bg-gray-100";

  return (
    <div className="bg-white rounded-[28px] shadow-sm border border-gray-50 overflow-hidden">
      {/* Table Header */}
      <div className="px-3 md:px-8 py-4 md:py-6 border-b border-gray-100">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900 leading-tight">Data Insights</h2>
            <p className="text-[13px] font-medium text-gray-400 mt-1">Recent file activity and processing statuses</p>
          </div>
          
          <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-3 w-full xl:w-auto">
            <div className="grid grid-cols-2 sm:flex gap-3">
              {/* Source Dropdown */}
              <select
                value={sourceFilter}
                onChange={(e) => { setSourceFilter(e.target.value); setCurrentPage(1); }}
                className={`${selectClass} w-full sm:w-auto`}
              >
                {sources.map(s => <option key={s} value={s}>{s === "All" ? "All Sources" : s}</option>)}
              </select>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
                className={`${selectClass} w-full sm:w-auto`}
              >
                <option value="newest">Sort: Default</option>
                <option value="amount-high">Amount: High to Low</option>
                <option value="amount-low">Amount: Low to High</option>
                <option value="utr">Sort by UTR</option>
              </select>
            </div>

            <div className="relative w-full sm:w-44">
              <input
                type="text"
                placeholder="Search UTR..."
                value={filterText}
                onChange={(e) => { setFilterText(e.target.value); setCurrentPage(1); }}
                className="pl-4 pr-4 py-2.5 text-[13px] bg-gray-50 border-none rounded-xl w-full font-bold text-gray-600 placeholder:text-gray-400 placeholder:font-medium focus:ring-2 focus:ring-indigo-100 outline-none hover:bg-gray-100 transition-all"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button 
                onClick={handleClear}
                className="px-4 py-2 rounded-xl text-[13px] font-bold text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all flex-1 sm:flex-none"
              >
                Clear
              </button>

              <button 
                onClick={handleExport}
                disabled={filteredAndSorted.length === 0}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white border border-[#C3C6D7] text-[13px] font-semibold text-[#2B2B2B] hover:bg-[#F8F9FC] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex-1 sm:flex-none"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M7 10l5 5m0 0l5-5m-5 5V3" />
                </svg>
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">UTR Number</th>
              <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Transaction Date</th>
              <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">File Source</th>
              <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Transaction Amount</th>
              <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">IFSC</th>
              <th className="px-8 py-5 border-b border-gray-100"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {paginated.length === 0 ? (
              <tr><td colSpan={6} className="px-8 py-12 text-center text-sm text-gray-400 font-medium">No records found.</td></tr>
            ) : (
              paginated.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <FileIcon source={row.source} />
                      <span className="text-[13px] font-bold text-gray-800">{row.utr}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-[13px] font-medium text-gray-500">{row.date}</td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                      row.source === "Primary Only" 
                        ? "bg-indigo-50 text-indigo-600 border border-indigo-100" 
                        : "bg-purple-50 text-purple-600 border border-purple-100"
                    }`}>
                      {row.source}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-[13px] font-bold text-gray-900">
                    {row.amount}
                  </td>
                  <td className="px-8 py-5 text-[13px] font-bold text-gray-700">{row.ifsc}</td>
                  <td className="px-8 py-5 text-gray-300 text-center">
                    <button className="hover:text-gray-600 font-bold transition-colors">•••</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-3 md:px-8 py-4 md:py-5 border-t border-gray-100 flex items-center justify-end sm:justify-between bg-gray-50/30">
        <span className="hidden sm:block text-[13px] font-medium text-gray-400 tracking-tight">
          Showing {paginated.length} out of {filteredAndSorted.length} results
        </span>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages || 1}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
