import FeaturedPokemons from "@/app/components/featuredPokemons";
import MainWrapper from "@/app/components/main-wrapper";
import { Suspense } from "react";


export default function Favorites() {
    return (
        <MainWrapper title="Favorites">
            <Suspense fallback={<div>Loading...</div>}>
                <FeaturedPokemons />
            </Suspense>
        </MainWrapper>
    );
}