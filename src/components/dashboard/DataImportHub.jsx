"use client";

import UploadDropzone from "./UploadDropzone";

export default function DataImportHub({ primaryFile, secondaryFile, onPrimarySelect, onSecondarySelect, onCompare }) {
  return (
    <div className="bg-white rounded-[28px] p-4 md:p-6 h-full flex flex-col shadow-sm border border-gray-50">
      {/* Header - Responsive Layout */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2">
            <img src="/file_icon.svg" alt="Data Import Hub" className="w-[15px] h-[19px]" />
          </div>
          <h2 className="text-[18px] font-semibold text-[#191C1E] tracking-tight">Data Import Hub</h2>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={onCompare}
            disabled={!primaryFile || !secondaryFile}
            className="text-[10px] font-bold bg-indigo-600 text-white px-4 py-1.5 rounded-full shadow-sm hover:bg-indigo-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed uppercase tracking-wider"
          >
            Compare Files
          </button>
          <span className="text-[10px] font-bold bg-[#004AC6]/5 text-[#004AC6] px-3 py-1.5 rounded-full  uppercase tracking-wider">
            CSV FORMATS ONLY
          </span>
        </div>
      </div>

      {/* Dropzones - Stacked on mobile */}
      <div className="flex flex-col md:flex-row gap-4 flex-1">
        <UploadDropzone
          label="Primary Dataset"
          subtitle="Upload .csv/.xlsx"
          icon="upload"
          file={primaryFile}
          onFileSelect={onPrimarySelect}
          variant="primary"
        />
        <UploadDropzone
          label="Secondary Dataset"
          subtitle="Upload .csv/.xlsx"
          icon="plus"
          file={secondaryFile}
          onFileSelect={onSecondarySelect}
          variant="secondary"
        />
      </div>
    </div>
  );
}
