import MainWrapper from "@/app/components/main-wrapper";
import PokemonCard from "@/app/components/pokemonCard";
import { fetchPokemons } from "@/lib/data/pokemons";
import { Pokemon } from "@/lib/interfaces";
import { Suspense } from "react";


async function PokedexList() {
  const pokemons: Pokemon[] = await fetchPokemons();
  return (
    <ul className="grid gap-x-6 gap-y-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {pokemons.map((pokemon, index) => (
          <li key={index}>
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          </li>
      ))}
    </ul>
  );
}

export default function Pokedex() {
    return (
        <MainWrapper title="Pokédex">
            <Suspense fallback={<div>Loading...</div>}>
                <PokedexList />
            </Suspense>
        </MainWrapper>
    );
}