"use client";

export default function DonutChart({ total, processed, pending }) {
  const radius = 60; // Slightly smaller
  const stroke = 18; // Thicker ring
  const normalizedR = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedR;
  const processedPct = processed / total;
  const processedDash = processedPct * circumference;
  const gap = 2.5;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-40 h-40">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          {/* Background track */}
          <circle
            cx="60" cy="60" r={normalizedR}
            fill="none"
            stroke="#f1f5f9"
            strokeWidth={stroke}
          />
          {/* Pending arc */}
          <circle
            cx="60" cy="60" r={normalizedR}
            fill="none"
            stroke="#c0392b"
            strokeWidth={stroke}
            strokeDasharray={`${circumference - processedDash - gap} ${processedDash + gap}`}
            strokeDashoffset={-(processedDash + gap / 2)}
            strokeLinecap="round"
          />
          {/* Processed arc */}
          <circle
            cx="60" cy="60" r={normalizedR}
            fill="none"
            stroke="#7b2d26"
            strokeWidth={stroke}
            strokeDasharray={`${processedDash - gap / 2} ${circumference - processedDash + gap / 2}`}
            strokeLinecap="round"
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-gray-900 leading-none">{total.toLocaleString()}</span>
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.15em] mt-1.5">Total Rows</span>
        </div>
      </div>
    </div>
  );
}
