"use client";

import { useRef, useState } from "react";

export default function UploadDropzone({ label, subtitle, icon = "upload", onFileSelect, file, variant = "primary" }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) onFileSelect(dropped);
  };

  const handleChange = (e) => {
    const selected = e.target.files[0];
    if (selected) onFileSelect(selected);
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={`flex-1 border-2 border-dashed rounded-[24px] p-6 flex flex-col items-center justify-between transition-all min-h-[360px] ${
  dragging
    ? "border-indigo-400 bg-indigo-50/50"
    : "border-[#C3C6D7] bg-gray-50/20 hover:border-[#B5B9CC]"
}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".csv,.xlsx"
        className="hidden"
        onChange={handleChange}
      />

      {/* Top Content: Icon + Text */}
      <div className="flex flex-col items-center gap-4 pt-2">
        <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gray-100/80">
          {icon === "upload" ? (
            <svg className="w-7 h-7 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          ) : (
            <svg className="w-7 h-7 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          )}
        </div>

        <div className="text-center flex flex-col gap-1">
          <p className="text-sm font-bold text-gray-900 truncate max-w-[160px]">
            {file ? file.name : label}
          </p>
          <p className="text-[11px] font-medium text-gray-400">
            {file ? `${(file.size / 1024).toFixed(1)} KB` : (subtitle || "Drop .csv here")}
          </p>
        </div>
      </div>

      {/* Bottom Content: Full-width Button */}
      <button
        onClick={() => inputRef.current?.click()}
        className={`w-full py-2.5 rounded-xl text-[11px] font-bold transition-all ${
          file
            ? "bg-indigo-600 text-white shadow-md shadow-indigo-100"
            : variant === "secondary"
              ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
              : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
        }`}
      >
        {file ? "Replace File" : (variant === "secondary" ? "Select File" : "Replace File")}
      </button>
    </div>
  );
}
