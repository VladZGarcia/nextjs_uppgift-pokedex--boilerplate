"use client"
import { fetchRandomPokemonsList } from "@/lib/data/pokemons";
import { Pokemon } from "@/lib/interfaces";
import { useState } from "react";
import PokemonCard from "./pokemonCard";
import { LoadingScreen } from "./loadingScreen";

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
            {loading ? <LoadingScreen /> : (
                <ul className="grid gap-x-8 gap-y-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 p-4 place-items-center">
                    {(featuredPokemons.map((pokemon, index) => (
                      <li key={pokemon.id + index} className="w-full flex justify-center">
                        <PokemonCard pokemon={pokemon} color={pokemon.color} />
                      </li>
                    )))}
            </ul>)}
        </div>
    );
}