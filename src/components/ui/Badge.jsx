import { AMOUNT_STYLES } from "@/constants";

export function AmountBadge({ type }) {
  const style = AMOUNT_STYLES[type] || "bg-gray-100 text-gray-600";
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium tracking-wide ${style}`}>
      {type}
    </span>
  );
}

export function StatusBadge({ status }) {
  const styles = {
    Processing: {
      dot: "bg-blue-500",
      text: "text-blue-600",
      icon: null,
    },
    Success: {
      dot: null,
      text: "text-green-600",
      icon: (
        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    Failed: {
      dot: null,
      text: "text-red-500",
      icon: (
        <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  };

  const s = styles[status] || styles.Failed;

  return (
    <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${s.text}`}>
      {s.dot ? <span className={`w-2 h-2 rounded-full ${s.dot}`} /> : s.icon}
      {status}
    </span>
  );
}
