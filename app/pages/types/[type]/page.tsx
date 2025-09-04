import Footer from "@/app/components/footer";
import MainWrapper from "@/app/components/main-wrapper";
import PokemonTypeList from "@/app/components/pokemon-type-list";
import { fetchPokemonsByType } from "@/lib/data/pokemons";
import { typeColors, PokemonType } from "@/lib/data/pokemonColors";

async function GetPokemonsByType({ params }: { params: { type: string } }) {
  const type = (await params).type.toLowerCase();
  const pokemons = await fetchPokemonsByType(type);

  return <PokemonTypeList pokemons={pokemons} type={type} />;
}

export default async function PokemonsByTypePage({
  params,
}: {
  params: { type: string };
}) {
  const type = (await params).type.toLowerCase();
  const displayType = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <main className="flex flex-col mb-10">
      <MainWrapper title={`${displayType} Type Pokémon`}>
        <GetPokemonsByType params={params} />
      </MainWrapper>
      <Footer />
    </main>
  );
}
