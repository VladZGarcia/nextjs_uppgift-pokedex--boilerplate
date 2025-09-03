import Footer from "@/app/components/footer";
import MainWrapper from "@/app/components/main-wrapper";
import PokemonCard from "@/app/components/pokemonCard";
import { fetchPokemonByName } from "@/lib/data/pokemons";

async function PokemonsByName({
    params,
}: {
        params: Promise<{ name: string }>;
}) {
    const name = await params;
    // Fetch Pokémon data by name
    const pokemon = await fetchPokemonByName(name.name.toLowerCase());
    return (
        <ul className="grid grid-cols-1 max-w-md mx-auto gap-4 mt-8">
            <li key={pokemon?.name}>
                {pokemon && <PokemonCard pokemon={pokemon} color={pokemon?.color} />}
            </li>
        </ul>
    )
}

export default async function PokemonsByNamePage({
    params
}: {
    params: Promise<{ name: string }>;
}) {
    return (
        <main className="flex flex-col mb-10">
            <MainWrapper title={`"${(await params).name}"`}>
            <PokemonsByName params={params} />
            </MainWrapper>
            <Footer />
        </main>
    )
}