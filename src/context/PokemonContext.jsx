import { createContext, useState } from "react";
import {
  formatAbilities,
  formatStats,
  formatTypes,
  getEvolutions,
  getImageByPokemon,
  getPokemonDescription,
  formatEncounters
} from "../helpers/pokemon";
import axios from "axios";
import { getPokemonEncounters } from "../services/pokemonServices";

const PokemonContext = createContext();

const PokemonProvider = ({ children }) => {
  const [pokemonDetail, setPokemonDetail] = useState(null);
  const [showDetailPokemon, setShowDetailPokemon] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const showPokemon = async (pokemonInfo) => {
    setIsLoading(true);
    const { data: dataSpecies } = await axios.get(pokemonInfo.species.url);
    const { data: dataEvolution } = await axios.get(
      dataSpecies.evolution_chain.url
    );

    const { id, name, height, weight, stats, types, abilities } = pokemonInfo;
    const evolutions = await getEvolutions(dataEvolution);

    // Ubicaciones (encounters)
    let locations = [];
    try {
      const encountersRaw = await getPokemonEncounters(id);
      locations = formatEncounters(encountersRaw).slice(0, 8);
    } catch (e) {
      console.log(e);
    }

    setPokemonDetail({
      id,
      name,
      height,
      weight,
      stats: formatStats(stats),
      types: formatTypes(types),
      abilities: formatAbilities(abilities),
      description: getPokemonDescription(dataSpecies),
      evolutions,
      image: getImageByPokemon(pokemonInfo.sprites),
      locations,
    });

    setShowDetailPokemon(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const closePokemonDetail = () => {
    setShowDetailPokemon(false);
  };

  // ========= Navegación Prev/Next =========
  const loadAndShowById = async (id) => {
    try {
      const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      await showPokemon(data); // reutiliza todo el pipeline (species, evoluciones, locations…)
    } catch (e) {
      console.log(e);
    }
  };

  const showPrevPokemon = async () => {
    if (!pokemonDetail?.id) return;
    const prev = Math.max(1, pokemonDetail.id - 1);
    await loadAndShowById(prev);
  };

  const showNextPokemon = async () => {
    if (!pokemonDetail?.id) return;
    const next = Math.min(898, pokemonDetail.id + 1); // ajusta si usas más generaciones
    await loadAndShowById(next);
  };
  // =======================================

  return (
    <PokemonContext.Provider
      value={{
        showDetailPokemon,
        showPokemon,
        closePokemonDetail,
        pokemonDetail,
        isLoading,
        showPrevPokemon,   // 👈 expuesto
        showNextPokemon,   // 👈 expuesto
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export { PokemonContext, PokemonProvider };
