"use client";
import PokemonCard from "@/app/components/pokemonCard";
import { fetchPokemons } from "@/lib/data/pokemons";
import { Pokemon } from "@/lib/interfaces";
import { useState, useEffect, useRef } from "react";

const nrOfPokemonsToFetch = 30;
const offsetStart = 0;
const maxOffset = 1020;

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
      const initialPokemons = await fetchPokemons(offsetStart, nrOfPokemonsToFetch);
      setPokemons(initialPokemons);
      setLoading(false);
      setOffset(nrOfPokemonsToFetch);
      if (initialPokemons.length < nrOfPokemonsToFetch) setHasMore(false);
    };
    loadInitial();
  }, []);

  useEffect(() => {
    if (!hasMore || offset === 0) return;
    const loadMore = async () => {
      setLoading(true);
      const newPokemons = await fetchPokemons(offset, nrOfPokemonsToFetch);
      setPokemons((prev) => [...prev, ...newPokemons]);
      setLoading(false);
      setOffset((prev) => prev + nrOfPokemonsToFetch);
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
            rootMargin: '500px',
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
      <ul className="grid gap-x-6 gap-y-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {pokemons.map((pokemon, index) => (
          <li key={pokemon.id + index}>
            <PokemonCard pokemon={pokemon} color={pokemon.color} />
          </li>
        ))}
      </ul>
      {hasMore && (
        <div ref={loaderRef} className="w-full flex justify-center py-8">
          {loading ? "Loading..." : ""}
        </div>
      )}
    </>
  );
}