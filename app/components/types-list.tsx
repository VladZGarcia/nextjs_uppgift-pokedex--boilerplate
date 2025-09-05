"use client";

import Link from "next/link";
import {
  pokemonTypes,
  typeColors,
} from "@/lib/data/pokemonColors";

export default function TypesList() {
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
        {pokemonTypes.map((type) => (
          <Link
            href={`/pages/types/${type.toLowerCase()}`}
            key={type}
            className={`${typeColors[type]} text-white p-8 rounded-lg text-center capitalize cursor-pointer transform hover:scale-105 transition-transform duration-200`}
            style={{ backgroundColor: typeColors[type] }}
          >
            {type}
          </Link>
        ))}
      </div>
    </div>
  );
}
