import ErrorTest from "@/app/components/error-test";
import Footer from "@/app/components/footer";
import { LoadingScreen } from "@/app/components/loading-screen";
import MainWrapper from "@/app/components/main-wrapper";
import { PokedexList } from "@/app/components/pokerdex-list";
import { Suspense } from "react";

export default function Pokedex() {
  return (
    <main className="flex flex-col mb-10">
      <MainWrapper title="Pokédex">
        <Suspense fallback={"...Loading"}>
          <PokedexList />
        </Suspense>
      </MainWrapper>
      <ErrorTest />
      <Footer />
    </main>
  );
}
