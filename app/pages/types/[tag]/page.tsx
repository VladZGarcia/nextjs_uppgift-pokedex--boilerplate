import Footer from "@/app/components/footer";
import MainWrapper from "@/app/components/main-wrapper";
import PokemonCard from "@/app/components/pokemonCard";
import { fetchPokemonsByType } from "@/lib/data/pokemons";
import { Pokemon } from "@/lib/interfaces";


async function GetPokemonsByType({
    params,
 }: {
    params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
    const pokemons: Pokemon[] = await fetchPokemonsByType(tag);
    return (
      <ul className="grid gap-x-6 gap-y-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4"
        >
        {pokemons.map((pokemon) => (
            <li key={pokemon.id}>
                <PokemonCard pokemon={pokemon} color={pokemon.color} />
          </li>
        ))}
      </ul>
  )
}

export default async function PokemonsByTypePage({
    params
}: {
    params: Promise<{ tag: string }>;
}) {
    return (
        <main className="flex flex-col mb-10">
        <MainWrapper title={`Type: ${(await params).tag}`}>
            <GetPokemonsByType params={params} />
            </MainWrapper>
            <Footer />
        </main>
    );
}