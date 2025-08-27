import { Pokemon } from "@/lib/interfaces";
import Image from "next/image";

interface PokemonCardProps {
  pokemon: Pokemon;
  className?: string;
  color?: string;
}

function getStat(stats: Pokemon["stats"], name: string) {
  return stats.find((s) => s.stat.name === name)?.base_stat ?? "-";
}

export default function PokemonCard({ pokemon, className, color }: PokemonCardProps) {
  return (
    <article
      className={`relative w-80 bg-gradient-to-br from-yellow-100 to-yellow-600 border-4 border-yellow-700 rounded-2xl shadow-xl p-4 font-sans ${className}`}
      style={{ fontFamily: "Verdana, Geneva, Tahoma, sans-serif" }}
    >
      {/* Card Name */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-extrabold text-gray-800 tracking-wide uppercase drop-shadow">
          {pokemon.name}
        </h2>
        <span className="text-sm font-bold text-gray-600">#{pokemon.id}</span>
      </div>
      {/* Card Image */}
      <div className={`flex justify-center items-center bg-white rounded-lg border-2 mb-3 p-2`}
        style={{ 
          backgroundColor: color || "#ffd700",
        borderColor: color || "#ffd700",
       }}>
        <Image
          src={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default}
          width={180}
          height={180}
          alt={pokemon.name}
          className="mx-auto"
        />
      </div>
      {/* Types */}
      <div className="flex gap-2 mb-2 justify-center">
        {pokemon.types.map((typeObj) => (
          <span
            key={typeObj.type.name}
            className={`px-2 py-1 rounded-full bg-yellow-400 text-white border-1 text-xs font-semibold shadow`}
            style={{ 
                    borderColor: color || "#ffd700",
                  }}
          >
            {typeObj.type.name}
          </span>
        ))}
      </div>
      {/* Stats */}
      <div className="bg-yellow-50 rounded-lg p-2 border-1 border-yellow-600">
        <h3 className="text-lg font-bold text-yellow-700 mb-1">Stats</h3>
        <ul className="text-sm text-gray-700 grid grid-cols-2 gap-x-4">
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
  );
}
