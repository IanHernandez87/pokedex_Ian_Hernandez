import { IconSearch } from "@tabler/icons-react";
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import TypesFilter from "./TypesFilter";
import { getPokemonNamesByType } from "../services/pokemonServices";

const INITIAL_LIMIT = 40;
const INCREASE_LIMIT = 20;

const Pokemons = () => {
  const [allPokemons, setAllPokemons] = useState([]); 
  const [pokemonName, setPokemonName] = useState("");
  const [limit, setLimit] = useState(INITIAL_LIMIT);

  const [selectedType, setSelectedType] = useState("all");
  const typeCacheRef = useRef(new Map()); 
  const [allowedByType, setAllowedByType] = useState(null); 

  const targetObserver = useRef(null);
  const entry = useIntersectionObserver(targetObserver, {});
  const isVisible = !!entry?.isIntersecting;

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=898")
      .then(({ data }) => setAllPokemons(data.results))
      .catch((err) => console.log(err));
  }, []);

  const handleChangePokemonName = (e) =>
    setPokemonName(e.target.value.toLowerCase());

  useEffect(() => {
    if (selectedType === "all") {
      setAllowedByType(null);
      setLimit(INITIAL_LIMIT);
      return;
    }

    const cache = typeCacheRef.current;
    const cached = cache.get(selectedType);
    if (cached) {
      setAllowedByType(cached);
      setLimit(INITIAL_LIMIT);
      return;
    }

    (async () => {
      try {
        const names = await getPokemonNamesByType(selectedType);
        const setNames = new Set(names);
        cache.set(selectedType, setNames);
        setAllowedByType(setNames);
        setLimit(INITIAL_LIMIT);
      } catch (e) {
        console.log(e);
        setAllowedByType(new Set()); 
      }
    })();
  }, [selectedType]);

  const byName = allPokemons.filter((p) =>
    p.name.includes(pokemonName)
  );

  const byType = allowedByType
    ? byName.filter((p) => allowedByType.has(p.name))
    : byName;

  useEffect(() => {
    const maxPokemons = byType.length;
    if (isVisible && maxPokemons !== 0) {
      const newLimit = limit + INCREASE_LIMIT;
      newLimit > maxPokemons ? setLimit(maxPokemons) : setLimit(newLimit);
    }
  }, [isVisible, byType.length]);

  useEffect(() => {
    setLimit(INITIAL_LIMIT);
  }, [pokemonName, selectedType]);

  return (
    <section className="p-4 py-5">
      <div className="grid grid-cols-1 md:grid-cols-[9rem_1fr] gap-4">
        <TypesFilter selectedType={selectedType} onChange={setSelectedType} />

        <div>
          <form>
            <div className="bg-white p-4 flex rounded-2xl text-lg">
              <input
                className="outline-none flex-1"
                type="text"
                autoComplete="off"
                placeholder="Busca tu Pokemon"
                name="pokemonName"
                onChange={handleChangePokemonName}
              />
              <button
                type="button"
                className="bg-red-500 p-2 rounded-xl shadow-lg shadow-red-500/50 hover:bg-red-400 transition-colors"
              >
                <IconSearch color="white" stroke={3} />
              </button>
            </div>
          </form>

          <PokemonList pokemons={byType.slice(0, limit)} />

          {/* Target Observer */}
          <span ref={targetObserver}></span>
        </div>
      </div>
    </section>
  );
};

export default Pokemons;
