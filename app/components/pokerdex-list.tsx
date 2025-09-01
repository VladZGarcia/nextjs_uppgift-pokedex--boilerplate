"use client";
import PokemonCard from "@/app/components/pokemonCard";
import { fetchPokemons } from "@/lib/data/pokemons";
import { Pokemon } from "@/lib/interfaces";
import { useState, useEffect, useRef } from "react";
import { LoadingScreen } from "./loadingScreen";

const nrOfPokemonsToFetch = 50;
const offsetStart = 0;
const maxOffset = 1302;
const listGapStart = 1025;
const listGapEnd = 10001;

export function PokedexList() {
  const [offset, setOffset] = useState(offsetStart);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch initial batch
    const loadInitial = async () => {
      setLoading(true);
      /* await new Promise(resolve => setTimeout(resolve, 2000)); */
      const initialPokemons = await fetchPokemons(offset, nrOfPokemonsToFetch);
      setPokemons(initialPokemons);
      setLoading(false);
      setOffset(offset + nrOfPokemonsToFetch);
      console.log("Initial load complete. Next offset:", offset);
      if (initialPokemons.length < nrOfPokemonsToFetch) setHasMore(false);
    };
    loadInitial();
  }, []);

  useEffect(() => {
    if (!hasMore || offset === 0) return;
    const loadMore = async () => {
      setLoading(true);
      console.log("Loading more pokemons...offset:", offset);
      const newPokemons = await fetchPokemons(offset, nrOfPokemonsToFetch);
      setPokemons((prev) => [...prev, ...newPokemons]);
      setLoading(false);
      setOffset(offset + nrOfPokemonsToFetch);
      if (newPokemons.length < nrOfPokemonsToFetch || offset + nrOfPokemonsToFetch >= maxOffset) setHasMore(false);
    };

    let observer: IntersectionObserver;
    if (loaderRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !loading) {
            loadMore();
          }
        },
          {
              threshold: 0, 
            rootMargin: '300px',
        }
      );
      observer.observe(loaderRef.current);
    }
    return () => {
      if (observer && loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [offset, hasMore, loading]);

  return (
    <>
      <ul className="grid gap-x-6 gap-y-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        {pokemons.map((pokemon) => (
          <li key={pokemon.id}>
            <PokemonCard pokemon={pokemon} color={pokemon.color} />
          </li>
        ))}
      </ul>
      {hasMore && (
        <div ref={loaderRef} className="w-full flex justify-center py-8">
          {loading ? <LoadingScreen/> : ""}
        </div>
      )}
    </>
  );
}