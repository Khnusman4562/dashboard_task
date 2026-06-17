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
          : "border-[#C3C6D7] hover:border-[#B5B9CC]"
      }`}
      style={!dragging ? { backgroundColor: '#F7F9FB' } : {}}
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
            <img src="/upload_icon.svg" alt="Upload" className="w-7 h-7" />
          ) : (
            <img src="/plus_icon.svg" alt="Plus" className="w-7 h-7" />
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
        className={`w-full py-2.5 rounded-xl text-[13px] font-bold transition-all ${
          file
            ? "bg-white border border-[#C3C6D7] text-gray-900 hover:bg-white hover:border hover:border-gray-400"
            : "bg-[#004AC6]/5 text-[#004AC6] hover:bg-white hover:border border-[#6f9cea]"
        }`}
      >
        {file ? "Replace File" : "Select File"}
      </button>
    </div>
  );
}
