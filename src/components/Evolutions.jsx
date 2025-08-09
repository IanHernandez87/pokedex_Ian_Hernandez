import usePokemonContext from "../hooks/usePokemonContext";
import { colorByType } from "../constants/pokemon";

const Evolutions = ({ evolutions }) => {
  const { showPokemon } = usePokemonContext();

  if (!evolutions?.length) return null;

  return (
    <div className="flex justify-center items-center gap-6 flex-wrap">
      {evolutions.map((evolution) => {
        const types = evolution?.pokemonInfo?.types?.map((t) => t.type.name) ?? [];
        return (
          <div key={evolution.name} className="flex flex-col items-center text-center">
            <button
              onClick={() => showPokemon(evolution.pokemonInfo)}
              className="hover:scale-[1.03] transition"
            >
              <img
                src={evolution.image}
                alt={evolution.name}
                className="h-16 md:h-20 w-auto pixelated mx-auto"
              />
            </button>

            <div className="mt-2 text-sm text-slate-600 font-semibold capitalize">
              {evolution.name}
              {evolution.pokemonInfo?.id && (
                <span className="ml-1 text-slate-400 text-xs">
                  #{String(evolution.pokemonInfo.id).padStart(3, "0")}
                </span>
              )}
            </div>

            <div className="mt-1 flex gap-1 justify-center flex-wrap">
              {types.slice(0, 2).map((t) => (
                <span
                  key={t}
                  className={`px-2 py-0.5 rounded-full text-[11px] text-white ${colorByType[t]}`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Evolutions;
