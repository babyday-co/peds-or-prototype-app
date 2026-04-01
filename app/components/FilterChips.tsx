import { ReactNode } from "react";

type FilterOption = {
  label: string;
  value: string;
  tone?: "default" | "red" | "yellow" | "green";
};

type FilterGroupProps = {
  label: string;
  options: FilterOption[];
  selected: string;
  onSelect: (value: string) => void;
};

const toneClass: Record<NonNullable<FilterOption["tone"]>, string> = {
  default: "border-white/15 text-slate-100",
  red: "border-red-400/50 text-red-200",
  yellow: "border-amber-300/50 text-amber-200",
  green: "border-emerald-300/50 text-emerald-200",
};

export function FilterChips({ label, options, selected, onSelect }: FilterGroupProps) {
  return (
    <section className="space-y-2">
      <p className="text-xs uppercase tracking-[0.16em] text-slate-300/80">{label}</p>
      <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex min-w-max gap-2 pb-1">
          {options.map((option) => {
            const isActive = selected === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onSelect(option.value)}
                className={`rounded-full border px-3 py-1.5 text-sm transition active:scale-95 ${
                  isActive
                    ? "border-[#f5c542] bg-[#f5c542] text-slate-900"
                    : toneClass[option.tone ?? "default"] + " bg-white/5"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ChipRow({ children }: { children: ReactNode }) {
  return <div className="space-y-4">{children}</div>;
}
