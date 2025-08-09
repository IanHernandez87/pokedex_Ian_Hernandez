import { colorByStat, colorByType } from "../constants/pokemon";
import Evolutions from "./Evolutions";

const PokemonDetail = ({ pokemon }) => {
  return (
    <>
      <header className="absolute left-1/2 -translate-x-1/2 -translate-y-[92%] scale-[180%]">
        <img className="pixelated" src={pokemon?.image} alt="" />
      </header>
      <div className="overflow-y-auto px-4 pt-12 grid gap-2 content-start h-full hidden-scroll">
        <span className="text-slate-400 text-sm font-semibold">
          N° {pokemon?.id}
        </span>
        <h2 className="font-bold text-2xl capitalize">{pokemon?.name}</h2>
        <ul className="flex gap-2 justify-center">
          {pokemon?.types.map((type) => (
            <li
              className={`p-1 rounded-md px-2 text-white text-sm ${colorByType[type]}`}
              key={type}
            >
              {type}
            </li>
          ))}
        </ul>
        <div>
          <h4 className="font-bold capitalize">Pokedex Entry</h4>
          <p className="text-slate-400">{pokemon?.description}</p>
        </div>

        <section className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <h4 className="font-bold capitalize">Height</h4>
            <span className="bg-slate-100 block rounded-full p-1">
              {pokemon?.height ? `${(pokemon.height / 10).toFixed(1)}m` : ""}
            </span>
          </div>
          <div className="grid gap-2">
            <h4 className="font-bold capitalize">Weight</h4>
            <span className="bg-slate-100 block rounded-full p-1">
              {pokemon?.weight ? `${(pokemon.weight / 10).toFixed(1)}kg` : ""}
            </span>
          </div>
        </section>

        <section className="grid gap-2">
          <h4 className="font-bold capitalize">Abilities</h4>
          <ul className="grid grid-cols-2 gap-4">
            {pokemon?.abilities.map((ability) => (
              <li
                key={ability}
                className="bg-slate-100 block rounded-full p-1 capitalize"
              >
                <span>{ability}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="grid gap-3">
          <h4 className="font-bold">Stats</h4>

          <ul className="space-y-2">
            {pokemon?.stats
              ?.filter((s) => s.name !== "TOT") 
              .map((stat) => {
                const percent = Math.min(100, Math.round((stat.base_stat / 255) * 100));

                const barColor =
                  stat.name === "HP" ? "bg-red-500" :
                    stat.name === "Attack" ? "bg-orange-500" :
                      stat.name === "Defense" ? "bg-yellow-500" :
                        stat.name === "Sp. Attack" ? "bg-blue-300" :
                          stat.name === "Sp. Defense" ? "bg-green-500" :
                    "bg-pink-500";

                return (
                  <li key={stat.name} className="grid grid-cols-[80px_40px_1fr] items-center gap-3">
                    <span className="text-slate-500 text-sm">{stat.name}</span>
                    <span className="font-semibold text-slate-800 text-sm">{stat.base_stat}</span>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`${barColor} h-2 rounded-full`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </li>
                );
              })}
          </ul>

          {(() => {
            const tot = pokemon?.stats?.find((s) => s.name === "TOT")?.base_stat;
            return (
              <div className="flex justify-end text-sm text-slate-600">
                <span className="mr-2 font-semibold">Total:</span>
                <span className="font-bold text-slate-800">{tot ?? "-"}</span>
              </div>
            );
          })()}
        </section>

        <section className="grid gap-2">
          <h4 className="font-bold capitalize">Evolutions</h4>
          <Evolutions evolutions={pokemon?.evolutions ?? []} />
        </section>

        {pokemon?.locations?.length > 0 && (
          <section className="grid gap-3">
            <div className="relative">
              <h4 className="font-bold capitalize relative z-10">Locations</h4>
              <svg
                className="absolute -top-3 right-2 w-16 h-16 opacity-10 pointer-events-none"
                viewBox="0 0 100 100"
                aria-hidden="true"
              >
                <circle cx="50" cy="50" r="48" fill="currentColor" />
                <path
                  d="M5 50 H95 M50 5 V95"
                  stroke="white"
                  strokeWidth="6"
                  opacity="0.6"
                />
                <path
                  d="M20 20 C40 40,60 40,80 20"
                  stroke="white"
                  strokeWidth="4"
                  fill="none"
                  opacity="0.5"
                />
                <path
                  d="M20 80 C40 60,60 60,80 80"
                  stroke="white"
                  strokeWidth="4"
                  fill="none"
                  opacity="0.5"
                />
              </svg>
            </div>

            <ul className="flex flex-wrap gap-2 justify-center">
              {pokemon.locations.map((loc) => (
                <li
                  key={loc.name}
                  className="bg-slate-100 rounded-full px-3 py-1 text-sm text-slate-700"
                  title={[
                    loc.levelRange ? `Lv ${loc.levelRange}` : null,
                    loc.methods?.length
                      ? `Methods: ${loc.methods.join(", ")}`
                      : null,
                    loc.versions?.length
                      ? `Versions: ${loc.versions.join(", ")}`
                      : null,
                  ]
                    .filter(Boolean)
                    .join(" • ")}
                >
                  {loc.name}
                </li>
              ))}
            </ul>

            <LocationsDetails locations={pokemon.locations} />
          </section>

        )}
        <br></br>
      </div>
    </>
  );
};

export default PokemonDetail;

function LocationsDetails({ locations }) {
  if (!locations?.length) return null;
  return (
    <details className="bg-white/70 rounded-xl p-3 border border-slate-200 open:shadow-sm">
      <summary className="cursor-pointer font-semibold text-slate-700">
        Ver detalles
      </summary>
      <div className="mt-3 space-y-3">
        {locations.map((loc) => (
          <div key={loc.name} className="bg-slate-50 rounded-lg p-3">
            <h5 className="font-semibold text-slate-800">{loc.name}</h5>
            {loc.levelRange && (
              <p className="text-sm text-slate-600">
                Niveles: {loc.levelRange}
              </p>
            )}
            {loc.methods?.length > 0 && (
              <p className="text-sm text-slate-600">
                Métodos: {loc.methods.join(", ")}
              </p>
            )}
            {loc.versions?.length > 0 && (
              <p className="text-sm text-slate-600">
                Versiones: {loc.versions.join(", ")}
              </p>
            )}
          </div>
        ))}
      </div>
    </details>
  );
}
