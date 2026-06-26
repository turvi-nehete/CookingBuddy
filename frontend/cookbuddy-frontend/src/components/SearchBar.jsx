import { useState } from "react";

function SearchBar({ onSearch, placeholder = "Search recipes..." }) {
  const [query, setQuery] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onSearch?.(query.trim());
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3 rounded-[1.75rem] bg-white p-2 shadow-soft sm:flex-row">
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="min-h-14 flex-1 rounded-[1.25rem] border border-transparent bg-cream-50 px-5 text-cocoa-800 outline-none transition focus:border-primary-300 focus:bg-white"
        placeholder={placeholder}
      />
      <button type="submit" className="btn btn-primary min-h-14 px-7">
        Search
      </button>
    </form>
  );
}

export default SearchBar;