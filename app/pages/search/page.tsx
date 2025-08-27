import { Pokemon } from "@/lib/interfaces";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const params = await searchParams;
    const query = params.query || "";
    let searchResults: Pokemon[] = [];

  return (
    <div>
      <h1>Search Results for: {query}</h1>
      {/* Render search results here */}
    </div>
  );
}
