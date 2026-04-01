type Tab = "home" | "search" | "2am";

type BottomNavProps = {
  active: Tab;
  onChange: (tab: Tab) => void;
};

const tabs: Array<{ id: Tab; label: string }> = [
  { id: "home", label: "Home" },
  { id: "search", label: "Search" },
  { id: "2am", label: "2 AM" },
];

export function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-md border-t border-white/15 bg-[#0b1f3a]/95 p-2 backdrop-blur">
      <div className="grid grid-cols-3 gap-2">
        {tabs.map((tab) => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`rounded-xl py-2 text-sm font-medium transition ${
                isActive ? "bg-[#f5c542] text-slate-900" : "bg-white/5 text-slate-200"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
