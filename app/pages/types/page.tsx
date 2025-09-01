import { LoadingScreen } from "@/app/components/loadingScreen";
import MainWrapper from "@/app/components/main-wrapper";
import { PokedexList } from "@/app/components/pokerdex-list";
import { Suspense } from "react";


export default function Types() {
    return (
        <MainWrapper title="Types">
            <Suspense fallback={<LoadingScreen/>}>
                <PokedexList />
            </Suspense>
        </MainWrapper>
    );
}