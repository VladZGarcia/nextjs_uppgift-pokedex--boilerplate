import Footer from "@/app/components/footer";
import MainWrapper from "@/app/components/main-wrapper";
import SearchBar from "@/app/components/search-bar";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const params = await searchParams;
    const query = params.query || "";

  return (
    <main className="flex flex-col mb-10">
      <MainWrapper title={query ? `Search result for: "${query}"` : "Search Pokemon"}>
      <div className="flex flex-col items-center p-10 rounded-md min-h-[700px]">
        <SearchBar onSearchPage={true} />
        {/* Render search results here */}
      </div>
      </MainWrapper>
      {/* <ErrorTest /> */}
    <Footer />
    </main>
  );
}
