import React from "react";

interface TreasuryFiltersProps {
  query: string;
  status: string;
  resultCount: number;
  onQueryChange: (query: string) => void;
  onStatusChange: (status: "pending" | "ready" | "executed") => void;
}

export function TreasuryFilters({
  query,
  status,
  resultCount,
  onQueryChange,
  onStatusChange,
}: TreasuryFiltersProps) {
  return (
    <div className="card">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="relative">
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            className="w-full rounded-lg border border-stellar-border bg-gray-900 px-3 py-2 pr-8 text-sm text-white outline-none focus:border-primary-500"
            placeholder="Search by tx ID, address, or status"
            aria-label="Search transactions"
          />
          {query && (
            <button
              onClick={() => onQueryChange("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
        <select
          value={status}
          onChange={(event) =>
            onStatusChange(event.target.value as "pending" | "ready" | "executed")
          }
          className="w-full rounded-lg border border-stellar-border bg-gray-900 px-3 py-2 text-sm text-white outline-none focus:border-primary-500"
        >
          <option value="pending">Pending Approval</option>
          <option value="ready">Ready to Execute</option>
          <option value="executed">Executed</option>
        </select>
        <div className="text-xs text-gray-400 flex items-center md:justify-end">
          {resultCount} matching transaction
          {resultCount === 1 ? "" : "s"}
        </div>
      </div>
    </div>
  );
}
