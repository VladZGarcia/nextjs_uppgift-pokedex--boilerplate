"use client";

import PokemonCard from "./pokemon-card";
import { Pokemon } from "@/lib/interfaces";
import { PokemonType, typeColors } from "@/lib/data/pokemonColors";
import { useState, useEffect, useRef } from "react";
import { LoadingScreen } from "./loading-screen";

interface PokemonTypeListProps {
  pokemons: Pokemon[];
  type: string;
}

const POKEMONS_PER_PAGE = 30;

export default function PokemonTypeList({
  pokemons,
  type,
}: PokemonTypeListProps) {
  const typeColor = typeColors[type as PokemonType] || "#ffd700";
  const [displayedPokemons, setDisplayedPokemons] = useState<Pokemon[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false); // Add this to prevent multiple loads

  useEffect(() => {
    // Reset state when type changes
    setDisplayedPokemons([]);
    setCurrentIndex(0);
    setHasMore(true);
    loadMorePokemons();
  }, [type]); // Only reload when type changes

  const loadMorePokemons = () => {
    if (loadingRef.current) return; // Prevent multiple loads
    loadingRef.current = true;
    setLoading(true);

    setTimeout(() => {
      // Add small delay to prevent rapid firing
      const nextPokemons = pokemons.slice(
        currentIndex,
        currentIndex + POKEMONS_PER_PAGE
      );

      setDisplayedPokemons((prev) => {
        // Prevent duplicates by checking IDs
        const newPokemons = nextPokemons.filter(
          (newPoke) =>
            !prev.some((existingPoke) => existingPoke.id === newPoke.id)
        );
        return [...prev, ...newPokemons];
      });

      setCurrentIndex((prev) => prev + POKEMONS_PER_PAGE);

      if (currentIndex + POKEMONS_PER_PAGE >= pokemons.length) {
        setHasMore(false);
      }

      setLoading(false);
      loadingRef.current = false;
    }, 300); // 300ms delay
  };

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          loadMorePokemons();
        }
      },
      {
        threshold: 0,
        rootMargin: "200px", // Reduced from 400px to prevent too early loading
      }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasMore, loading]);

  return (
    <div className="container mx-auto px-4">
      <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
        {displayedPokemons.map((pokemon, index) => (
          <li
            key={`${pokemon.id}-${index}`}
            className="transition-transform duration-300 hover:-translate-y-1"
          >
            <PokemonCard pokemon={pokemon} color={typeColor} />
          </li>
        ))}
      </ul>
      {hasMore && (
        <div ref={loaderRef} className="w-full flex justify-center py-8">
          {loading && <LoadingScreen />}
        </div>
      )}
    </div>
  );
}
