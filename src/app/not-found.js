import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="relative mb-8">
        <div className="w-24 h-24 md:w-32 md:h-32 bg-indigo-50 rounded-full flex items-center justify-center animate-pulse">
          <svg className="w-12 h-12 md:w-16 md:h-16 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <div className="absolute -top-2 -right-2 bg-amber-400 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm rotate-12">
          NEW
        </div>
      </div>

      <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-3">
        Coming Soon!
      </h1>
      <p className="text-sm md:text-base font-medium text-gray-500 max-w-md mb-8 leading-relaxed">
        We're building something amazing for <span className="text-indigo-600 font-bold">DataCentral</span>. This feature is currently under development and will be available soon.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link 
          href="/"
          className="px-8 py-3 bg-indigo-600 text-white rounded-full text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
        >
          Back to Dashboard
        </Link>
        <button className="px-8 py-3 bg-white border border-gray-200 text-gray-600 rounded-full text-sm font-bold hover:bg-gray-50 transition-all">
          Get Notified
        </button>
      </div>
    </div>
  );
}
