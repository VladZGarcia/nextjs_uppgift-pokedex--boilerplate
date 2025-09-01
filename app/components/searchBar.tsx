"use client";

import { fetchPokemonByName, fetchPokemonListItem } from "@/lib/data/pokemons";
import { PokemonListItem } from "@/lib/interfaces";
import { off } from "process";
import { useState, useEffect } from "react";

const offset = 0;
const allPokemon = 1302;

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [pokemonListItems, setPokemonListItems] = useState<PokemonListItem[]>([]);

  useEffect(() => {
    async function loadData() {
      const data = await fetchPokemonListItem(offset, allPokemon);
      setPokemonListItems(data);
    }
    loadData();
  }, []);

  const filteredPokemons =
    query.length > 0
      ? pokemonListItems.filter((pokemon) =>
          pokemon.name.toLowerCase().startsWith(query.toLowerCase())
        )
      : [];

  return (
    <div className="relative w-80 mx-auto">
      <input
        type="text"
        className="w-full p-2 border rounded bg-white shadow-black/20 shadow-md"
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