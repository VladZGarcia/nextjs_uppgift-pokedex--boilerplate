import Footer from "@/app/components/footer";
import { LoadingScreen } from "@/app/components/loadingScreen";
import MainWrapper from "@/app/components/main-wrapper";
import { PokedexList } from "@/app/components/pokerdex-list";
import { Suspense } from "react";


export default function Types() {
    return (
        <main className="flex flex-col mb-10">
            <MainWrapper title="Types">
            <Suspense fallback={<LoadingScreen/>}>
                <PokedexList />
            </Suspense>
        </MainWrapper>
        <Footer />
        </main>
    );
}