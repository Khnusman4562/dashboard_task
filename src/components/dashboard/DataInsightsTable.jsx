"use client";

import { useState, useMemo } from "react";
import { AmountBadge, StatusBadge } from "@/components/ui/Badge";
import Pagination from "@/components/ui/Pagination";
import { ITEMS_PER_PAGE } from "@/constants";

const FileIcon = ({ type }) => {
  const colors = {
    METADATA: "text-blue-500 bg-blue-50",
    "USER DATA": "text-green-500 bg-green-50",
    "IOT STREAM": "text-red-400 bg-red-50",
  };
  const c = colors[type] || "text-gray-400 bg-gray-50";
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
  const [statusFilter, setStatusFilter] = useState("All");

  const statuses = ["All", "Processing", "Success", "Failed"];

  const filtered = useMemo(() => {
    return data.filter((row) => {
      const matchText = row.utr.toLowerCase().includes(filterText.toLowerCase());
      const matchStatus = statusFilter === "All" || row.status === statusFilter;
      return matchText && matchStatus;
    });
  }, [data, filterText, statusFilter]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="bg-white rounded-[28px] shadow-sm border border-gray-50 overflow-hidden">
      {/* Table Header */}
      <div className="px-8 py-6 border-b border-gray-100">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900 leading-tight">Data Insights</h2>
            <p className="text-[13px] font-medium text-gray-400 mt-1">Recent file activity</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-1.5">
              {statuses.map((s) => (
                <button
                  key={s}
                  onClick={() => { setStatusFilter(s); setCurrentPage(1); }}
                  className={`px-4 py-1.5 rounded-lg text-[13px] font-bold transition-all ${
                    statusFilter === s
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-100"
                      : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Filter..."
                value={filterText}
                onChange={(e) => { setFilterText(e.target.value); setCurrentPage(1); }}
                className="pl-4 pr-4 py-2 text-[13px] bg-gray-50 border-none rounded-xl w-44 focus:ring-2 focus:ring-indigo-50 outline-none"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#C3C6D7] text-[13px] font-semibold text-[#2B2B2B] hover:bg-[#F8F9FC] transition-all duration-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M7 10l5 5m0 0l5-5m-5 5V3" />
              </svg>
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="px-8 py-5 text-[12px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">UTR</th>
              <th className="px-8 py-5 text-[12px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Date</th>
              <th className="px-8 py-5 text-[12px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Amount</th>
              <th className="px-8 py-5 text-[12px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Status</th>
              <th className="px-8 py-5 text-[12px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">IFSC</th>
              <th className="px-8 py-5 border-b border-gray-100"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {paginated.length === 0 ? (
              <tr><td colSpan={6} className="px-8 py-12 text-center text-sm text-gray-400">No records found.</td></tr>
            ) : (
              paginated.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <FileIcon type={row.amount} />
                      <span className="text-[14px] font-bold text-gray-800">{row.utr}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-[14px] font-medium text-gray-500">{row.date}</td>
                  <td className="px-8 py-5"><AmountBadge type={row.amount} /></td>
                  <td className="px-8 py-5"><StatusBadge status={row.status} /></td>
                  <td className="px-8 py-5 text-[14px] font-bold text-gray-700">{row.ifsc}</td>
                  <td className="px-8 py-5 text-gray-300">
                    <button className="hover:text-gray-600 font-bold">•••</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-8 py-5 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
        <span className="text-[13px] font-medium text-gray-400 tracking-tight">
          Showing {paginated.length} out of {filtered.length} results
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
