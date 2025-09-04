import { Pokemon } from "@/lib/interfaces";
import Image from "next/image";
import Link from "next/link";
import Badges from "./badges";
import { typeColors, PokemonType } from "@/lib/data/pokemonColors";

interface PokemonCardProps {
  pokemon: Pokemon;
  className?: string;
  color?: string;
}

function getStat(stats: Pokemon["stats"], name: string) {
  return stats.find((s) => s.stat.name === name)?.base_stat ?? "-";
}

export default function PokemonCard({
  pokemon,
  className,
  color,
}: PokemonCardProps) {
  const imageUrl =
    pokemon.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon.sprites?.front_default ||
    null;

  if (!imageUrl) return null;
  return (
    <Link
      href={`/pages/search/${pokemon.name}`}
      className="block group [perspective:1000px]"
    >
      <article
        className={`relative w-72 flex flex-col bg-gradient-to-br from-yellow-100 to-yellow-600 border-4 border-yellow-700 rounded-2xl p-3 font-verdana 
        transform-gpu transition-all duration-300 ease-out hover:[transform:translateY(-8px)_scale(1.05)_rotate(2deg)]
        shadow-[0_10px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]
        before:absolute before:inset-0 before:rounded-xl before:bg-black/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:pointer-events-none
        after:absolute after:inset-0 after:rounded-xl after:bg-gradient-to-br after:from-white/20 after:to-transparent after:pointer-events-none
        ${className}`}
      >
        {/* Card Name */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-extrabold text-gray-800 tracking-wide uppercase drop-shadow">
            {pokemon.name}
          </h2>
          <span className="text-xs font-bold text-gray-600">#{pokemon.id}</span>
        </div>
        {/* Card Image */}
        <div className="relative flex justify-center items-center mb-2">
          {/* Background Circle */}
          <div
            className="absolute w-40 h-40 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:[transform:rotate(12deg)]"
            style={{
              backgroundColor:
                typeColors[pokemon.types[0].type.name as PokemonType] ||
                "#ffd700",
              opacity: 0.7,
              boxShadow:
                "inset 0 4px 8px rgba(255,255,255,0.3), inset 0 -4px 8px rgba(0,0,0,0.2)",
              transform: "perspective(1000px) rotateX(5deg) translateZ(0)",
            }}
          />
          {/* Pokemon Image */}
          <div className="relative z-10 -translate-y-4 transition-transform duration-300 group-hover:-translate-y-6 will-change-transform">
            <Image
              src={imageUrl}
              width={180}
              height={180}
              alt={pokemon.name}
              className="mx-auto h-auto drop-shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-2xl will-change-transform"
              priority
            />
          </div>
        </div>
        {/* Types */}
        <div
          className="relative isolate"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          style={{
            position: "relative",
            zIndex: 50,
          }}
        >
          <Badges types={pokemon.types.map((t) => t.type.name)} color={color} />
        </div>
        {/* Stats */}
        <div className="bg-yellow-50 rounded-lg p-2 border-1 border-yellow-600 relative z-10 transition-all duration-300 group-hover:bg-yellow-100 group-hover:shadow-lg">
          <h3 className="text-base font-bold text-yellow-700 mb-1 transition-colors group-hover:text-yellow-800">
            Stats
          </h3>
          <ul className="text-xs text-gray-700 grid grid-cols-2 gap-x-6">
            <li className="transition-transform group-hover:translate-x-1">
              <span className="font-semibold">HP:</span>{" "}
              {getStat(pokemon.stats, "hp")}
            </li>
            <li className="transition-transform group-hover:translate-x-1">
              <span className="font-semibold">Attack:</span>{" "}
              {getStat(pokemon.stats, "attack")}
            </li>
            <li className="transition-transform group-hover:translate-x-1">
              <span className="font-semibold">Defense:</span>{" "}
              {getStat(pokemon.stats, "defense")}
            </li>
            <li className="transition-transform group-hover:translate-x-1">
              <span className="font-semibold">Speed:</span>{" "}
              {getStat(pokemon.stats, "speed")}
            </li>
          </ul>
        </div>
      </article>
    </Link>
  );
}
