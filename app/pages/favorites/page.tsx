import FeaturedPokemons from "@/app/components/featuredPokemons";
import Footer from "@/app/components/footer";
import { LoadingScreen } from "@/app/components/loadingScreen";
import MainWrapper from "@/app/components/main-wrapper";
import { Suspense } from "react";


export default function Favorites() {
    return (
        <main className="flex flex-col mb-10">
            <MainWrapper title="Favorites">
            <Suspense fallback={<LoadingScreen/>}>
                <div className="flex flex-col items-center p-10 rounded-md min-h-[700px]">
                    <FeaturedPokemons />
                </div>
            </Suspense>
            </MainWrapper>
            <Footer />
        </main>
    );
}