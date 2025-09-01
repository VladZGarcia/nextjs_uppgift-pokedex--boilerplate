"use client";

import { fetchPokemonByName, fetchPokemonListItem } from "@/lib/data/pokemons";
import { useState, useEffect } from "react";

const offset = 0;
const limit = 1020;

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [pokemonListItems, setPokemonListItems] = useState<PokemonListItem[]>([]);

  useEffect(() => {
    async function loadData() {
      const data = await fetchPokemonData();
      setPokemonData(data);
    }
    loadData();
  }, []);

  const filteredPokemons =
    query.length > 0
      ? pokemonData.filter((pokemon) =>
          pokemon.name.toLowerCase().startsWith(query.toLowerCase())
        )
      : [];

  return (
    <div className="relative w-80 mx-auto">
      <input
        type="text"
        className="w-full p-2 border rounded"
        placeholder="Search Pokémon..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowDropdown(e.target.value.length > 0);
        }}
        onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
        onFocus={() => setShowDropdown(query.length > 0)}
      />
      {showDropdown && filteredPokemons.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white border rounded shadow z-10 max-h-60 overflow-y-auto">
          {filteredPokemons.map((pokemon) => (
            <li
              key={pokemon.name}
              className="p-2 hover:bg-yellow-100 cursor-pointer"
              onMouseDown={() => {
                setQuery(pokemon.name);
                setShowDropdown(false);
              }}
            >
              {pokemon.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}