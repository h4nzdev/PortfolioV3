import { Search, X, SlidersHorizontal } from 'lucide-react';
import { sound } from '../../utils/sound';

export default function BlogFilterBar({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  totalResults,
}) {
  const handleCategoryClick = (cat) => {
    sound.playClick();
    onSelectCategory(cat);
  };

  const handleClearSearch = () => {
    sound.playClick();
    onSearchChange('');
  };

  return (
    <div className="space-y-4 mb-8">
      {/* Search Input Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-lg">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#85847E]">
            <Search size={16} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by topic, keyword, or technology (e.g. YOLO, ERP, Docker)..."
            className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white border border-[#C8B99A]/50 focus:border-[#171715] focus:outline-hidden text-sm font-sans text-[#171715] placeholder-[#85847E] shadow-2xs transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#85847E] hover:text-[#171715] cursor-pointer"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Results Counter */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#66635B] self-end sm:self-center">
          <SlidersHorizontal size={13} className="text-[#85847E]" />
          <span>
            Showing <strong className="text-[#171715]">{totalResults}</strong> {totalResults === 1 ? 'dispatch' : 'dispatches'}
          </span>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategoryClick(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#171715] text-[#F8F7F2] font-semibold shadow-xs'
                  : 'bg-white/80 hover:bg-white text-[#66635B] hover:text-[#171715] border border-[#C8B99A]/40'
              }`}
            >
              <span>{cat}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
