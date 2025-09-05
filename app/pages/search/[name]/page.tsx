import Footer from "@/app/components/footer";
import MainWrapper from "@/app/components/main-wrapper";
import PokemonDetails from "@/app/components/pokemon-detailed-view";
import { fetchPokemonByName } from "@/lib/data/pokemons";

async function PokemonsByName({
    params,
}: {
        params: Promise<{ name: string }>;
}) {
    const name = await params;
    // Fetch Pokémon data by name
    const pokemon = await fetchPokemonByName(name.name.toLowerCase());
    console.log("Pokemon color:", pokemon?.color);
    return (
        <ul className="grid grid-cols-1 max-w-md mx-auto gap-4 mt-8 mb-10">
            <li key={pokemon?.name}>
                {pokemon && <PokemonDetails pokemon={pokemon} color={pokemon?.color} />}
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
            <MainWrapper title={``}>
            <PokemonsByName params={params} />
            </MainWrapper>
            <Footer />
        </main>
    )
}