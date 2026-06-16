"use client";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-2">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-8 h-8 rounded-full border border-[#D9D9E8] bg-white flex items-center justify-center hover:bg-[#F8F9FC] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <svg className="w-4 h-4 text-[#8E93A8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-3">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`transition-all duration-200 flex items-center justify-center ${
              currentPage === page
                ? "w-8 h-8 rounded-full bg-[#4B16FF] text-white font-bold text-[13px]"
                : "text-[13px] font-semibold text-[#3F4659] hover:text-[#4B16FF]"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-8 h-8 rounded-full border border-[#D9D9E8] bg-white flex items-center justify-center hover:bg-[#F8F9FC] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <svg className="w-4 h-4 text-[#8E93A8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
