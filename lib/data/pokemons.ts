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
      const details = await fetchPokemonByName(pokemon.name);
      if (!details) return null;
      return details;
    })
  );
  // Filter out any nulls (in case fetchPokemonByName fails)
  return pokemonDetails.filter(Boolean) as Pokemon[];
}

export async function fetchPokemonByName(name: string): Promise<Pokemon | null> {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Pokemon ${name} not found`);
      }
      throw new Error(`Failed to fetch pokemon: ${response.statusText}`);
    }

    const pokemon = await response.json();
    const species = await fetch(`${pokemon.species.url}`).then(res => res.json());
    if (!species.color) return { ...pokemon, color: 'yellow' };
    return { ...pokemon, color: species.color?.name || 'yellow' };
  } catch (error) {
    console.error('Error fetching pokemon:', error);
    return null;
  }
}

export async function fetchPokemonsByType(type: string): Promise<Pokemon[]> {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${type.toLowerCase()}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch pokemon of type ${type}`);
    }

    const data = await response.json();
    console.log("Pokemon of type", type, ":", data.pokemon.length);

    const pokemonDetails = await Promise.all(
      data.pokemon.map(async (p: { pokemon: { name: string } }) => {
        const details = await fetchPokemonByName(p.pokemon.name);
        return details;
      })
    );

    return pokemonDetails.filter((p): p is Pokemon => p !== null);
  } catch (error) {
    console.error('Error fetching pokemon by type:', error);
    return [];
  }
}

export async function fetchRandomPokemon(): Promise<Pokemon & { color: string }> {
  const offsetStart = 0;
  const allPokemon = 1302; 
  const pokemonData = await fetchPokemonListItem(offsetStart, allPokemon); // Fetch all Pokémon

  // Select a random Pokémon without repetition
  const randomizer = createNonRepeatingRandomizer(pokemonData);
  const randomPokemon = randomizer();
  if (!randomPokemon) {
    throw new Error("Failed to get a random pokemon");
  }

  // Fetch detailed data for the selected Pokémon
  const randomPokemonDetails = await fetch(`${randomPokemon.url}`).then(res => res.json());

  // Fetch color from species endpoint
  const speciesData = await fetch(`${randomPokemonDetails.species.url}`).then(res => res.json());
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



