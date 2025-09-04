import { Pokemon } from '@/lib/interfaces';
import PokemonCard from '@/app/components/pokemon-card';
import { fetchPokemonsByType } from '@/lib/data/pokemons';

async function getPokemonsByType(type: string): Promise<Pokemon[]> {
  // First, get the list of Pokemon of this type from the PokeAPI
  const typeResponse = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
  const typeData = await typeResponse.json();
  
  // Get the Pokemon details for each Pokemon of this type
  const pokemonPromises = typeData.pokemon
    .slice(0, 20) // Limit to first 20 Pokemon to avoid too many requests
    .map(async (p: { pokemon: { name: string, url: string } }) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${p.pokemon.name}`);
      const pokemonData = await response.json();
      
      return {
        id: pokemonData.id,
        name: pokemonData.name,
        image: pokemonData.sprites.other['official-artwork'].front_default,
        types: pokemonData.types.map((t: { type: { name: string } }) => t.type.name),
        height: pokemonData.height,
        weight: pokemonData.weight,
        abilities: pokemonData.abilities.map((a: { ability: { name: string } }) => a.ability.name),
        stats: pokemonData.stats.map((s: { base_stat: number, stat: { name: string } }) => ({
          name: s.stat.name,
          value: s.base_stat
        }))
      };
    });

  return Promise.all(pokemonPromises);
}

export default async function TypePage({ params }: { params: { type: string } }) {
  const pokemons = await fetchPokemonsByType((await params).type);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 capitalize">{(await params).type} Type Pokemon</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} color={pokemon.color} />
        ))}
      </div>
    </div>
  );
}
