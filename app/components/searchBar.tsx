"use client";

import { fetchPokemonListItem, fetchPokemons } from "@/lib/data/pokemons";
import { PokemonListItem } from "@/lib/interfaces";
import { useRef, useState, useEffect } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const offset = 0;
  const limit = 1302; // match pokemons.ts
  const ulRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    async function loadData() {
      const data = await fetchPokemonListItem(offset, limit);
      setPokemonList(data);
    }
    loadData();
  }, []);

  const filteredPokemons =
    query.length > 0
      ? pokemonList.filter(pokemon => pokemon.name.toLowerCase().startsWith(query.toLowerCase()))
      : [];

  // Reset highlight when dropdown changes
  useEffect(() => {
    setHighlightedIndex(filteredPokemons.length > 0 ? 0 : -1);
  }, [filteredPokemons.length, showDropdown]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || filteredPokemons.length === 0) return;

    if (e.key === "ArrowDown") {
      setHighlightedIndex((i) => {
        const next = i < filteredPokemons.length - 1 ? i + 1 : 0;
        setTimeout(() => {
          const ul = ulRef.current;
          if (ul) {
            const li = ul.children[next] as HTMLElement;
            li?.scrollIntoView({ block: "nearest" });
          }
        }, 0);
        return next;
      });
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((i) => {
        const prev = i > 0 ? i - 1 : filteredPokemons.length - 1;
        setTimeout(() => {
          const ul = ulRef.current;
          if (ul) {
            const li = ul.children[prev] as HTMLElement;
            li?.scrollIntoView({ block: "nearest" });
          }
        }, 0);
        return prev;
      });
      e.preventDefault();
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      setQuery(filteredPokemons[highlightedIndex].name);
      setShowDropdown(false);
      e.preventDefault();
    } else if (e.key === "Escape") {
      setQuery("");
      setShowDropdown(false);
      setHighlightedIndex(-1);
      e.preventDefault();
    }
  };

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
        onKeyDown={handleKeyDown}
      />
      {showDropdown && filteredPokemons.length > 0 && (
        <ul
          ref={ulRef}
          className="absolute left-0 right-0 bg-white border rounded shadow z-10 max-h-60 overflow-y-auto"
        >
          {filteredPokemons.map((pokemon, idx) => (
            <li
              key={pokemon.name}
              className={`p-2 cursor-pointer ${
                idx === highlightedIndex
                  ? "bg-yellow-200"
                  : "hover:bg-yellow-100"
              }`}
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