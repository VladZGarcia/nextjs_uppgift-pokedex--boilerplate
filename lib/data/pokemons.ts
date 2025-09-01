import { Pokemon, PokemonListItem } from '../interfaces';
import { createNonRepeatingRandomizer } from '../utils/utils';

export async function fetchPokemonListItem(offset: number, limit: number): Promise<PokemonListItem[]> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
  const data = await response.json();
  return data.results as PokemonListItem[];
}

export async function fetchPokemons(offset: number, limit: number): Promise<Pokemon[]> {
  const pokemonData = await fetchPokemonListItem(offset, limit);
  const pokemonDetails = await Promise.all(
    pokemonData.map(async (pokemon) => {
      const details : Pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`).then(res => res.json());
      const species = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${details.id}`).then(res => res.json());
      return { ...details, color: species.color?.name || 'yellow' };
    })
  );
  return pokemonDetails as Pokemon[];
}

export async function fetchPokemonByName(name: string): Promise<Pokemon | null> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!response.ok) {
    return null;
  }
  const data = await response.json();
  return data as Pokemon;
}

export async function fetchRandomPokemon(): Promise<Pokemon & { color: string }> {
  const offsetStart = 0;
  const limit = 1020; // Total number of legit Pokémon in the API
  const pokemonData = await fetchPokemonListItem(offsetStart, limit); // Fetch all Pokémon

  // Select a random Pokémon without repetition
  const randomizer = createNonRepeatingRandomizer(pokemonData);
  const randomPokemon = randomizer();
  if (!randomPokemon) {
    throw new Error("Failed to get a random pokemon");
  }

  // Fetch detailed data for the selected Pokémon
  const randomPokemonDetails = await fetch(`${randomPokemon.url}`).then(res => res.json());

  // Fetch color from species endpoint
  const speciesData = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${randomPokemonDetails.id}/`).then(res => res.json());
  const color = speciesData.color?.name || "yellow";

  // Pokémon data with color
  return { ...randomPokemonDetails, color };
}

export async function fetchRandomPokemonsList(nrOfPokemonsToFetch: number): Promise<(Pokemon & { color: string })[]> {
  const pokemons: (Pokemon & { color: string })[] = [];
  for (let i = 0; i < nrOfPokemonsToFetch; i++) {
    const pokemon = await fetchRandomPokemon();
    pokemons.push(pokemon);
  }
  return pokemons;
}



