"use client";

import UploadDropzone from "./UploadDropzone";

export default function DataImportHub({ primaryFile, secondaryFile, onPrimarySelect, onSecondarySelect }) {
  return (
    <div className="bg-white rounded-[28px] p-6 h-full flex flex-col shadow-sm border border-gray-50">
      {/* Header - Centered Layout */}
      <div className="flex  items-center justify-between mb-6 relative">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-50 rounded-lg">
            <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-base font-bold text-gray-900 tracking-tight">Data Import Hub</h2>
        </div>
        <span className="mt-2 text-[10px] font-bold bg-blue-50 text-blue-600 px-3 py-1 rounded-full border border-blue-100 uppercase tracking-wider">
          CSV FORMATS ONLY
        </span>
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
