"use client";

export default function PokemonError() {
  return (
    <div className="p-8 bg-red-50 rounded-lg border border-red-200">
      <h3 className="text-xl font-semibold text-red-700 mb-2">
        Failed to Load Pokemon
      </h3>
      <p className="text-red-600">
        There was an error loading the Pokemon data. Please try again later.
      </p>
    </div>
  );
}
