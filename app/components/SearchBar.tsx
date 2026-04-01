type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
};

export function SearchBar({ value, onChange, onSubmit }: SearchBarProps) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 p-2">
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && onSubmit) {
            onSubmit();
          }
        }}
        placeholder="Search: baby not feeding"
        className="h-10 flex-1 rounded-xl bg-transparent px-3 text-sm text-white outline-none placeholder:text-slate-300/70"
      />
      <button
        type="button"
        onClick={onSubmit}
        className="h-10 w-10 rounded-xl bg-[#f5c542] text-lg font-semibold text-slate-900 transition active:scale-95"
        aria-label="Voice search"
      >
        🎤
      </button>
    </div>
  );
}
