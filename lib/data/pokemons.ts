import { Pokemon, PokemonListItem } from '../interfaces';

export async function fetchPokemonData(offset: number, limit: number): Promise<PokemonListItem[]> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
  const data = await response.json();
  return data.results as PokemonListItem[];
}

export async function fetchPokemons(offset: number, limit: number): Promise<Pokemon[]> {
  const pokemonData = await fetchPokemonData(offset, limit);
  const pokemonDetails = await Promise.all(
    pokemonData.map(async (pokemon) => {
      const details : Pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`).then(res => res.json());
      const species = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${details.id}`).then(res => res.json());
      return { ...details, color: species.color?.name || 'yellow' };
    })
  );
  return pokemonDetails as Pokemon[];
}

export async function fetchRandomPokemon(): Promise<Pokemon & { color: string }> {
  const offsetStart = 1;
  const limit = 1008; // Total number of legit Pokémon in the API
  const pokemonData = await fetchPokemonData(offsetStart, limit); // Fetch all Pokémon

  // Select a random Pokémon without repetition
  const randomizer = createNonRepeatingRandomizer(pokemonData);
  const randomPokemon = randomizer();
  if (!randomPokemon) {
    throw new Error("Failed to get a random pokemon");
  }
  const randomPokemonDetails = await fetch(`${randomPokemon.url}`).then(res => res.json());

  // Fetch color from species endpoint
  const speciesData = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${randomPokemonDetails.id}/`).then(res => res.json());
  const color = speciesData.color?.name || "yellow";
  console.log("Fetched color:", color);

  // Pokémon data with color
  return { ...randomPokemonDetails, color };
}

function createNonRepeatingRandomizer<T>(items: T[]): () => T | undefined {
  let shuffled: T[] = [];
  let index = 0;

  function shuffle(array: T[]) {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  return () => {
    if (index === 0 || index >= shuffled.length) {
      shuffled = shuffle(items);
      index = 0;
    }
    return shuffled[index++];
  };
}

