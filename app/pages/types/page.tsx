import ErrorTest from "@/app/components/error-test";
import Footer from "@/app/components/footer";
import { LoadingScreen } from "@/app/components/loading-screen";
import MainWrapper from "@/app/components/main-wrapper";
import { PokedexList } from "@/app/components/pokerdex-list";
import TypesList from "@/app/components/types-list";
import { Suspense } from "react";

export default function Types() {
  return (
    <main className="flex flex-col mb-10">
      <MainWrapper title="Browse by Type">
        <Suspense fallback={<LoadingScreen />}>
          <section className="flex flex-col items-center p-2 rounded-md ">
            <TypesList />
          </section>
        </Suspense>
      </MainWrapper>
      {/* <ErrorTest /> */}
      <Footer />
    </main>
  );
}
