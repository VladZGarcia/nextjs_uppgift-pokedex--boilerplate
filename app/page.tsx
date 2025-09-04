import { Suspense } from "react";
import FeaturedPokemons from "./components/featured-pokemons";
import Footer from "./components/footer";
import RandomPokemon from "./components/random-pokemon";
import SearchBar from "./components/search-bar";
import { LoadingScreen } from "./components/loading-screen";
import ErrorTest from "./components/error-test";

export default function Home() {
  return (
    <main className="flex flex-col">
      <section className="flex flex-col items-center gap-4 bg-gradient-to-br [background-image:linear-gradient(-10deg,_#C97FE4,_#AECDF6)] p-4">
        <h1 className="text-center mt-14 text-8xl font-extrabold text-transparent bg-gradient-to-r from-purple-800 to-blue-800 [background-clip:text]">
          Gotta catch 'em all!
        </h1>
        <p className="text-center text-white text-xl">
          Discover, search and explore the amazing world of Pokémon. Find
          <br /> your favourite and learn about their stats.
        </p>
        <RandomPokemon />
      </section>
      <section className="flex flex-col bg-white items-center p-10 rounded-md shadow-md">
        <SearchBar />
      </section>
      <section className="flex flex-col items-center bg-gradient-to-tl from-blue-50 to-blue-200 p-10 rounded-md shadow-md">
        <h2 className="text-center text-4xl font-jersey font-medium mb-4">
          Featured Pokémon
        </h2>
        <Suspense fallback={<LoadingScreen />}>
          <FeaturedPokemons />
        </Suspense>
      </section>
      <Footer />
    </main>
  );
}
