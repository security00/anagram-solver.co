type RecentSearchesProps = {
  items: string[];
  onPick: (query: string) => void;
  tone?: 'light' | 'dark';
};

export default function RecentSearches({ items, onPick, tone = 'light' }: RecentSearchesProps) {
  if (items.length === 0) return null;

  const labelClass = tone === 'dark' ? 'text-cyan-300' : 'text-[#008f9e]';

  return (
    <div>
      <span className={`text-xs font-bold uppercase tracking-wider ${labelClass}`}>
        Recent searches
      </span>
      <div className="mt-2 flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onPick(item)}
            className="tool-chip"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
