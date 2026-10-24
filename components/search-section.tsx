import { Search, X } from "lucide-react";

export function SearchSection({
  query,
  updateQuery,
  commitSearch,
}: {
  query: string;
  updateQuery: (value: string) => void;
  commitSearch: (value: string) => void;
}) {
  return (
    <div className="relative mt-5 text-left">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          commitSearch(query);
        }}
        role="search"
      >
        <Search
          size={15}
          className="pointer-events-none absolute left-3 top-2.5 text-slate-400"
          aria-hidden="true"
        />
        <input
          id="library-search"
          type="text"
          value={query}
          onChange={(event) => updateQuery(event.target.value)}
          placeholder="Type to search..."
          className="h-9 w-full rounded border border-slate-200 bg-white pl-9 pr-21 text-xs text-slate-900 outline-none placeholder:text-slate-400"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              updateQuery("");
            }}
            className="absolute right-16 top-1.5 rounded p-1 text-slate-500 "
            aria-label="Clear search"
          >
            <X size={15} />
          </button>
        )}
        <button
          type="submit"
          className="absolute right-1 top-1 rounded px-2.5 py-1.5 text-xs font-medium text-slate-500 "
        >
          Search
        </button>
      </form>
    </div>
  );
}
