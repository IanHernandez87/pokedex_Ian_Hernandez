import { POKEMON_TYPES, colorByType } from "../constants/pokemon";

const TypesFilter = ({ selectedType, onChange }) => {
  return (
    <aside className="hidden md:block w-36 pr-2 space-y-2 sticky top-4 h-[calc(100vh-2rem)] overflow-auto">
      {POKEMON_TYPES.map((t) => {
        const isActive = selectedType === t;
        const typeClass = colorByType[t] || "bg-gray-300";

        return (
          <button
            key={t}
            onClick={() => onChange(t)}
            className={`w-full uppercase tracking-wide rounded-xl px-3 py-2 border text-sm transition-colors
              ${isActive ? `${typeClass} text-white border-transparent` : "bg-white border-gray-200 hover:bg-gray-50"}`}
          >
            {t}
          </button>
        );
      })}
    </aside>
  );
};

export default TypesFilter;
