"use client";

import { FiSearch, FiX } from "react-icons/fi";

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
  filters?: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: string[];
  }[];
}

export default function SearchFilter({ searchTerm, onSearchChange, placeholder = "Search...", filters = [] }: SearchFilterProps) {
  return (
    <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 p-4 sm:p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => onSearchChange(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-11 pr-10 py-3 rounded-xl bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <FiX />
            </button>
          )}
        </div>

        {/* Filters */}
        {filters.map((filter, i) => (
          <select
            key={i}
            value={filter.value}
            onChange={e => filter.onChange(e.target.value)}
            className="px-4 py-3 rounded-xl bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:border-red-500 min-w-[140px] transition-colors"
          >
            <option value="" className="bg-white dark:bg-gray-800">{filter.label}</option>
            {filter.options.map(opt => (
              <option key={opt} value={opt} className="bg-white dark:bg-gray-800">{opt}</option>
            ))}
          </select>
        ))}
      </div>
    </div>
  );
}
