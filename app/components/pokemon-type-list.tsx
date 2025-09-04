"use client";

import PokemonCard from "./pokemon-card";
import { Pokemon } from "@/lib/interfaces";
import { PokemonType, typeColors } from "@/lib/data/pokemonColors";

interface PokemonTypeListProps {
  pokemons: Pokemon[];
  type: string;
}

export default function PokemonTypeList({
  pokemons,
  type,
}: PokemonTypeListProps) {
  const typeColor = typeColors[type as PokemonType] || "#ffd700";

  return (
    <div className="container mx-auto px-4">
      <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
        {pokemons.map((pokemon) => (
          <li
            key={pokemon.id}
            className="transition-transform duration-300 hover:-translate-y-1"
          >
            <PokemonCard pokemon={pokemon} color={typeColor} />
          </li>
        ))}
      </ul>
    </div>
  );
}
