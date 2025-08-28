

export default function SearchBar() {
    return (
      <form action="/pages/search" method="get" className="items-center bg-white mb-6 flex gap-2 w-lg">
        <input
          type="text"
          placeholder="Search Pokémon..."
          className="border px-2 py-1 rounded w-full items-center"
        />
      </form>
    );
}