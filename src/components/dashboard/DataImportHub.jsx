"use client";

import UploadDropzone from "./UploadDropzone";

export default function DataImportHub({ primaryFile, secondaryFile, onPrimarySelect, onSecondarySelect, onCompare }) {
  return (
    <div className="bg-white rounded-[28px] p-6 h-full flex flex-col shadow-sm border border-gray-50">
      {/* Header - Centered Layout */}
      <div className="flex  items-center justify-between mb-6 relative">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-50 rounded-lg">
            <img src="/file_icon.svg" alt="Data Import Hub" className="w-4 h-4" />
          </div>
          <h2 className="text-base font-bold text-gray-900 tracking-tight">Data Import Hub</h2>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onCompare}
            disabled={!primaryFile || !secondaryFile}
            className="text-[10px] font-bold bg-indigo-600 text-white px-4 py-1.5 rounded-full shadow-sm hover:bg-indigo-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed uppercase tracking-wider"
          >
            Compare Files
          </button>
          <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full border border-blue-100 uppercase tracking-wider">
            CSV FORMATS ONLY
          </span>
        </div>
      </div>

      {/* Dropzones */}
      <div className="flex gap-4 flex-1">
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
