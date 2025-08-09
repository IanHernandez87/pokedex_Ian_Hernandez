import { IconX, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { colorByType } from "../constants/pokemon";
import PokemonDetail from "./PokemonDetail";
import usePokemonContext from "../hooks/usePokemonContext";

const ModalPokemon = ({ showModal, onCloseModal }) => {
  const { pokemonDetail, showPrevPokemon, showNextPokemon } = usePokemonContext();

  return (
    <section
      className={`fixed lg:hidden top-0 left-0 right-0 h-screen transition-all duration-500 ${
        showModal ? "visible opacity-100" : "invisible opacity-0"
      } ${colorByType[pokemonDetail?.types?.[0]]}`}
    >
      <button
        onClick={onCloseModal}
        className="bg-white absolute top-4 right-4 p-1 rounded-lg hover:opacity-80 transition-opacity z-50"
        aria-label="Close"
      >
        <IconX size={34} stroke={4} />
      </button>

      <button
        onClick={showPrevPokemon}
        className="absolute top-1/2 left-3 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:scale-105 transition z-50"
        aria-label="Previous Pokémon"
      >
        <IconChevronLeft size={28} stroke={3} />
      </button>

      <button
        onClick={showNextPokemon}
        className="absolute top-1/2 right-3 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:scale-105 transition z-50"
        aria-label="Next Pokémon"
      >
        <IconChevronRight size={28} stroke={3} />
      </button>

      <article
        className={`bg-white h-[92%] absolute w-full rounded-t-3xl text-center transition-all duration-500 ${
          showModal ? "bottom-0" : "-bottom-full"
        }`}
      >
        <div className="max-w-[520px] sm:max-w-[580px] mx-auto px-5 pt-2 h-full">
          <PokemonDetail pokemon={pokemonDetail} />
        </div>
      </article>
    </section>
  );
};

export default ModalPokemon;
