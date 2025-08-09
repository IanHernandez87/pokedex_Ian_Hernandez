import axios from "axios";

const getEvolutionsData = (evolutions) => {
  return evolutions.map(
    async (evolution) =>
      await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolution.name}/`)
  );
};

const getPokemonNamesByType = async (type) => {
  const { data } = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
  return data.pokemon.map(p => p.pokemon.name);
};

const getPokemonEncounters = async (idOrName) => {
  const { data } = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${idOrName}/encounters`
  );
  return data; 
};

export { getEvolutionsData, getPokemonNamesByType, getPokemonEncounters };
