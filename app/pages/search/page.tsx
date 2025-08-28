import MainWrapper from "@/app/components/main-wrapper";
import SearchBar from "@/app/components/searchBar";
import { Pokemon } from "@/lib/interfaces";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const params = await searchParams;
    const query = params.query || "";
    let searchResults: Pokemon[] = [];

  return (
    <MainWrapper title={`Search: ${query}`}>
      <div className="flex flex-col items-center p-10 rounded-md shadow-md">
        <SearchBar />
        <h1>Search Results for: {query}</h1>
        {/* Render search results here */}
      </div>
    </MainWrapper>
  );
}
