"use client";

import { fetchPokemonByName, fetchPokemonListItem, fetchPokemons } from "@/lib/data/pokemons";
import { PokemonListItem } from "@/lib/interfaces";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect, useMemo } from "react";
import PokemonCard from "./pokemonCard";

interface SearchBarProps {
  onSearchPage?: boolean;
}

export default function SearchBar({ onSearchPage }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [filteredPokemonsDetails, setFilteredPokemonsDetails] = useState<any[]>([]);
  const router = useRouter();
  const offset = 0;
  const limit = 1302; // match pokemons.ts
  const ulRef = useRef<HTMLUListElement>(null);

  // Load initial Pokemon list
  useEffect(() => {
    async function loadData() {
      //prefetch pokemons
      const data = await fetchPokemonListItem(offset, limit);
      setPokemonList(data);
    }
    loadData();
  }, []);

  // Filter Pokemon based on query
  const filteredPokemons = useMemo(() => 
    query.length > 0
      ? pokemonList.filter(pokemon => 
          pokemon.name.toLowerCase().startsWith(query.toLowerCase())
        )
      : []
  , [query, pokemonList]);

  // Fetch details for filtered Pokemon
  useEffect(() => {
    let isMounted = true;

    async function fetchDetails() {
      if (filteredPokemons.length > 0 && onSearchPage) {
        const details = await Promise.all(
          filteredPokemons.map(pokemon => fetchPokemonByName(pokemon.name))
        );
        if (isMounted) {
          setFilteredPokemonsDetails(details.filter(Boolean));
        }
      } else {
        setFilteredPokemonsDetails([]);
      }
    }

    fetchDetails();

    return () => {
      isMounted = false;
    };
  }, [filteredPokemons, onSearchPage]);

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
      router.push(`/pages/search/${filteredPokemons[highlightedIndex].name}`);
      e.preventDefault();
    } else if (e.key === "Escape") {
      setQuery("");
      setShowDropdown(false);
      setHighlightedIndex(-1);
      e.preventDefault();
    }
  };

  return (
    <main>
    <div className="relative w-80 mx-auto">
      <input
        type="text"
        className="w-full p-2 border rounded bg-white"
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
      {!onSearchPage && showDropdown && filteredPokemons.length > 0 && (
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
                }`}>
              <Link href={`/pages/search/${pokemon.name}`} key={pokemon.name}
              onClick={() => {
                setShowDropdown(false);
              }}
            >
                {pokemon.name}
              </Link>
            </li>
          ))}
        </ul>
        )}
      </div>
      <div className="mx-auto">
      {onSearchPage && filteredPokemonsDetails.length > 0 && (
        <ul className="grid gap-x-6 gap-y-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mt-10">
          {filteredPokemonsDetails.map((pokemon) => (
            <li key={pokemon.name}>
                <PokemonCard pokemon={pokemon} color={pokemon.color} />
             
            </li>
          ))}
        </ul>
      )}
      </div>
      </main>
  );
}