"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Loader2, FileText, Download } from "lucide-react";
import Link from "next/link";
import { searchContent, type SearchResult } from "@/app/actions/search";

export default function HomepageSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Debounce search (wait 300ms after typing stops)
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.length >= 2) {
        setIsLoading(true);
        const data = await searchContent(query);
        setResults(data);
        setIsLoading(false);
        setIsOpen(true);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-lg mx-auto mb-10">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-white/50 group-focus-within:text-[#F97316] transition-colors" />
        </div>
        <input
          type="text"
          className="block w-full pl-11 pr-4 py-4 bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:bg-black/40 transition-all shadow-lg"
          placeholder="Search for tactics, players, guides..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => { if (results.length > 0) setIsOpen(true); }}
        />
        {isLoading && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <Loader2 className="h-5 w-5 text-[#F97316] animate-spin" />
          </div>
        )}
      </div>

      {/* Dropdown Results */}
      {isOpen && results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in slide-in-from-top-2 text-left">
          <ul className="divide-y divide-gray-100">
            {results.map((result) => (
              <li key={`${result.type}-${result.id}`}>
                <Link
                  href={`/${result.type}s/${result.id}`}
                  className="flex items-center gap-4 px-4 py-3 hover:bg-orange-50 transition-colors group"
                  onClick={() => setIsOpen(false)}
                >
                  <div className={`p-2 rounded-lg ${result.type === 'download' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
                    {result.type === 'download' ? <Download size={18} /> : <FileText size={18} />}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 group-hover:text-[#F97316] line-clamp-1">{result.title}</p>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{result.type} • {result.category}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {isOpen && query.length >= 2 && results.length === 0 && !isLoading && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl p-4 text-center text-gray-500 text-sm border border-gray-100">
          No results found for "{query}"
        </div>
      )}
    </div>
  );
}