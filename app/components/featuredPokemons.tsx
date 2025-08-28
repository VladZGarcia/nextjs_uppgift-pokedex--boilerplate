"use client"
import { fetchRandomPokemonsList } from "@/lib/data/pokemons";
import { Pokemon } from "@/lib/interfaces";
import { useState } from "react";
import PokemonCard from "./pokemonCard";

const nrOfPokemonsToFetch = 4;

export default function FeaturedPokemons() {
    const [featuredPokemons, setFeaturedPokemons] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchFeaturedPokemons = async () => {
        setLoading(true);
        const data = await fetchRandomPokemonsList(nrOfPokemonsToFetch);
        setFeaturedPokemons(data);
        setLoading(false);
    };

    // Fetch featured Pokémon when component mounts
    if (featuredPokemons.length === 0 && !loading) {
        fetchFeaturedPokemons();
    }

    // You can add logic here to fetch and set featured Pokémon data
    return (
        <div>
            <ul className="grid relative items-center gap-x-8 gap-y-3 grid-cols-1 sd:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 p-4">
                    {featuredPokemons.map((pokemon, index) => (
                      <li key={pokemon.id + index}>
                        <PokemonCard pokemon={pokemon} color={pokemon.color} />
                      </li>
                    ))}
                  </ul>
        </div>
    );
}