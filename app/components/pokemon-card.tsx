import { Pokemon } from "@/lib/interfaces";
import Image from "next/image";
import Link from "next/link";
import Badges from "./badges";

interface PokemonCardProps {
  pokemon: Pokemon;
  className?: string;
  color?: string;
}

function getStat(stats: Pokemon["stats"], name: string) {
  return stats.find((s) => s.stat.name === name)?.base_stat ?? "-";
}

export default function PokemonCard({ pokemon, className, color }: PokemonCardProps) {
  const imageUrl = pokemon.sprites?.other?.["official-artwork"]?.front_default 
    || pokemon.sprites?.front_default 
    || null;

  if (!imageUrl) return null;
  return (
    <Link href={`/pages/search/${pokemon.name}`} className="block">
      <article
        className={`relative w-72 flex flex-col bg-gradient-to-br from-yellow-100 to-yellow-600 border-4 border-yellow-700 rounded-2xl shadow-xl p-3 font-verdana ${className}`}
      >
        {/* Card Name */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-extrabold text-gray-800 tracking-wide uppercase drop-shadow">
          {pokemon.name}
        </h2>
        <span className="text-xs font-bold text-gray-600">#{pokemon.id}</span>
      </div>
      {/* Card Image */}
      <div className={`flex justify-center items-center bg-white rounded-lg border-2 mb-2 p-2`}
        style={{ 
          backgroundColor: color || "#ffd700",
        borderColor: color || "#ffd700",
       }}>
        <Image
          src={imageUrl}
          width={140}
          height={140}
          alt={pokemon.name}
          className="mx-auto h-auto"
        />
      </div>
      {/* Types */}
      <Badges types={pokemon.types.map(t => t.type.name)} color={color} />
      {/* Stats */}
      <div className="bg-yellow-50 rounded-lg p-2 border-1 border-yellow-600">
        <h3 className="text-base font-bold text-yellow-700 mb-1">Stats</h3>
        <ul className="text-xs text-gray-700 grid grid-cols-2 gap-x-6">
          <li>
            <span className="font-semibold">HP:</span> {getStat(pokemon.stats, "hp")}
          </li>
          <li>
            <span className="font-semibold">Attack:</span> {getStat(pokemon.stats, "attack")}
          </li>
          <li>
            <span className="font-semibold">Defense:</span> {getStat(pokemon.stats, "defense")}
          </li>
          <li>
            <span className="font-semibold">Speed:</span> {getStat(pokemon.stats, "speed")}
          </li>
        </ul>
      </div>
      </article>
    </Link>
  );
}
