import axios from "axios";
import { useEffect, useState } from "react";
import { colorByType } from "../constants/pokemon";

const PokemonPreview = ({ pokemonURL, onClick }) => {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    axios
      .get(pokemonURL)
      .then(({ data }) => setPokemon(data))
      .catch((err) => console.log(err));
  }, [pokemonURL]);

  const heightM = pokemon ? (pokemon.height / 10).toFixed(1) : "";
  const weightKg = pokemon ? (pokemon.weight / 10).toFixed(1) : "";
  const mainAbility = pokemon?.abilities?.[0]?.ability?.name ?? "";

  return (
    <article
      onClick={() => onClick(pokemon)}
      className="relative bg-white rounded-[30px] p-4 pt-8 text-center font-semibold capitalize shadow-lg shadow-slate-400/10 border-2 border-transparent hover:border-slate-200 cursor-pointer group grid gap-2"
    >
      {heightM && (
        <div className="absolute -top-4 left-4 bg-white rounded-full w-12 h-12 shadow flex items-center justify-center text-[11px] text-gray-600 font-medium">
          {heightM}m
        </div>
      )}

      {weightKg && (
        <div className="absolute -top-4 right-4 bg-white rounded-full w-12 h-12 shadow flex items-center justify-center text-[11px] text-gray-600 font-medium">
          {weightKg}kg
        </div>
      )}

      <header className="h-20 flex justify-center items-end">
        <img
          className="group-hover:scale-110 transition-transform pixelated"
          src={
            pokemon?.sprites.versions["generation-v"]["black-white"]
              .front_default ||
            pokemon?.sprites.front_default
          }
          alt={pokemon?.name ?? "pokemon"}
        />
      </header>

      <span className="text-sm text-slate-400">N° {pokemon?.id}</span>
      <h4 className="text-lg">{pokemon?.name}</h4>

      <ul className="flex gap-2 justify-center">
        {pokemon?.types?.map((type) => (
          <li
            className={`p-1 rounded-md px-2 text-white text-[12px] ${colorByType[type.type.name]}`}
            key={type.type.name}
          >
            {type.type.name}
          </li>
        ))}
      </ul>

      {mainAbility && (
        <div className="text-[12px] font-normal text-gray-500 mt-1">
          {mainAbility}
        </div>
      )}
    </article>
  );
};

export default PokemonPreview;
