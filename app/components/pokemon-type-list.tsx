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

const POKEMONS_PER_PAGE = 20;

export default function PokemonTypeList({
  pokemons,
  type,
}: PokemonTypeListProps) {
  const typeColor = typeColors[type as PokemonType] || "#ffd700";
  const [displayedPokemons, setDisplayedPokemons] = useState<Pokemon[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);
  const initialLoadDone = useRef(false);

  const loadMorePokemons = () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);

    const nextPokemons = pokemons.slice(
      currentIndex,
      currentIndex + POKEMONS_PER_PAGE
    );

    setDisplayedPokemons((prev) => {
      const newPokemons = nextPokemons.filter(
        (newPoke) =>
          !prev.some((existingPoke) => existingPoke.id === newPoke.id)
      );
      return [...prev, ...newPokemons];
    });

    setCurrentIndex((prev) => {
      const nextIndex = prev + POKEMONS_PER_PAGE;
      if (nextIndex >= pokemons.length) {
        setHasMore(false);
      }
      return nextIndex;
    });

    setTimeout(() => {
      setLoading(false);
      loadingRef.current = false;
      initialLoadDone.current = true;
    }, 500);
  };

  useEffect(() => {
    setDisplayedPokemons([]);
    setCurrentIndex(0);
    setHasMore(true);
    setLoading(true);
    initialLoadDone.current = false;
    loadingRef.current = false;

    requestAnimationFrame(() => {
      loadMorePokemons();
    });
  }, [type]);

  useEffect(() => {
    if (!hasMore || loading) return;

    const currentLoader = loaderRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingRef.current) {
          loadMorePokemons();
        }
      },
      {
        threshold: 0,
        rootMargin: "100px",
      }
    );

    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [hasMore, loading, currentIndex]);

  if (!initialLoadDone.current) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingScreen />
      </div>
    );
  }

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
