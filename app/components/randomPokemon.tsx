"use client";
import { useState, useEffect } from "react";
import { fetchRandomPokemon } from "@/lib/data/pokemons";
import Image from "next/image";
import PokemonCard from "./pokemonCard";

export default function RandomPokemon() {
  const [pokemon, setPokemon] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const getRandomPokemon = async () => {
    setLoading(true);
    const randomPokemon = await fetchRandomPokemon();
    console.log("Fetched random Pokémon:", randomPokemon.color);
    setPokemon(randomPokemon);
    setLoading(false);
  };

  useEffect(() => {
    getRandomPokemon();
  }, []);
    
    return (
    <main>
      <section className="flex flex-col items-center gap-4 p-14">
        
        <button className="btn-primary flex items-center gap-2" onClick={getRandomPokemon} disabled={loading}>
          <Image
            src={loading ? "/search.svg" : "/Dice.svg"}
            width={25}
            height={25}
            alt="Dice"
          />
          {loading ? "Loading..." : "Random Pokémon"}
        </button>
        {pokemon && <PokemonCard pokemon={pokemon} color={pokemon.color} />}
      </section>
    </main>
  );
}