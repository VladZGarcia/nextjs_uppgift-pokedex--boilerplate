import Footer from "@/app/components/footer";
import MainWrapper from "@/app/components/main-wrapper";
import PokemonCard from "@/app/components/pokemon-card";
import { fetchPokemonsByType } from "@/lib/data/pokemons";
import { Pokemon } from "@/lib/interfaces";

async function GetPokemonsByType({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const pokemons: Pokemon[] = await fetchPokemonsByType(type.toLowerCase());
  return (
    <ul className="grid gap-x-6 gap-y-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mt-8">
      {pokemons.map((pokemon) => (
        <li key={pokemon.id}>
          <PokemonCard pokemon={pokemon} color={pokemon.color} />
        </li>
      ))}
    </ul>
  );
}

export default async function PokemonsByTypePage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  return (
    <main className="flex flex-col mb-10">
      <MainWrapper title={`Type: ${type}`}>
        <GetPokemonsByType params={params} />
      </MainWrapper>
      <Footer />
    </main>
  );
}
