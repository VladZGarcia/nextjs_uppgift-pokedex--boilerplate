import { LoadingScreen } from "@/app/components/loading-screen";
import MainWrapper from "@/app/components/main-wrapper";
import { PokedexList } from "@/app/components/pokerdex-list";
import { Suspense } from "react";


export default function Pokedex() {
    return (
        <MainWrapper title="Pokédex">
            <Suspense fallback= {"...Loading"}>
                <PokedexList />
            </Suspense>
        </MainWrapper>
    );
}