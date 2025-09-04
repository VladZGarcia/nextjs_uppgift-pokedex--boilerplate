import { Pokemon } from "@/lib/interfaces";
import Image from "next/image";
import Badges from "./badges";

interface PokemonDetailsProps {
  pokemon: Pokemon;
  color?: string;
}

function getStat(stats: Pokemon["stats"], name: string) {
  return stats.find((s) => s.stat.name === name)?.base_stat ?? "-";
}

export default function PokemonDetails({
  pokemon,
  color,
}: PokemonDetailsProps) {
  const imageUrl =
    pokemon.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon.sprites?.front_default ||
    null;

  if (!imageUrl) return null;

  // Format height from decimetres to meters
  const heightInMeters = (pokemon.height / 10).toFixed(1);
  // Format weight from hectograms to kilograms
  const weightInKg = (pokemon.weight / 10).toFixed(1);

  return (
    <article
      className="relative w-[36rem] mx-auto flex flex-col bg-gradient-to-br from-yellow-100 to-yellow-600 border-4 border-yellow-700 rounded-2xl p-4 font-verdana
      transform-gpu transition-all duration-300 ease-out hover:translate-y-[-8px]
      shadow-[0_10px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]
      before:absolute before:inset-0 before:rounded-xl before:bg-black/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:pointer-events-none
      after:absolute after:inset-0 after:rounded-xl after:bg-gradient-to-br after:from-white/20 after:to-transparent after:pointer-events-none group"
    >
      {/* Card Name */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-3xl font-extrabold text-gray-800 tracking-wide uppercase drop-shadow transition-all duration-300 group-hover:text-gray-900 group-hover:drop-shadow-lg">
          {pokemon.name}
        </h2>
        <span className="text-lg font-bold text-gray-600 transition-colors duration-300 group-hover:text-gray-800">
          #{pokemon.id}
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-4 h-full">
        {/* Left Column */}
        <div className="flex flex-col gap-5 h-full">
          {/* Card Image */}
          <div className="relative flex justify-center items-center mb-2">
            {/* Background Circle */}
            <div
              className="absolute w-52 h-52 rounded-full transition-all duration-300 group-hover:scale-110"
              style={{
                backgroundColor: color || "#ffd700",
                opacity: 0.7,
                boxShadow:
                  "inset 0 4px 8px rgba(255,255,255,0.3), inset 0 -4px 8px rgba(0,0,0,0.2)",
                transform: "perspective(1000px) translateZ(0)",
              }}
            />
            {/* Pokemon Image */}
            <div className="relative z-10 -translate-y-4 transition-transform duration-300 group-hover:-translate-y-6 will-change-transform">
              <Image
                src={imageUrl}
                width={240}
                height={240}
                alt={pokemon.name}
                className="mx-auto h-auto drop-shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-2xl will-change-transform"
                priority
              />
            </div>
          </div>

          {/* Types */}
          <div className="transition-transform duration-300 group-hover:translate-y-[-2px] relative z-50">
            <Badges
              types={pokemon.types.map((t) => t.type.name)}
              color={color}
            />
          </div>

          {/* Stats Section */}
          <div className="flex-1 bg-yellow-50 rounded-lg p-3 border-1 border-yellow-600 transition-all duration-300 group-hover:shadow-lg group-hover:bg-yellow-100">
            <h3 className="text-base font-bold text-yellow-700 mb-2 transition-colors group-hover:text-yellow-800">
              Base Stats
            </h3>
            <div className="space-y-2">
              {[
                "hp",
                "attack",
                "defense",
                "special-attack",
                "special-defense",
                "speed",
              ].map((stat) => (
                <div
                  key={stat}
                  className="flex justify-between items-center text-xs group-hover:translate-x-1 transition-transform duration-300"
                >
                  <span className="font-semibold capitalize w-24">
                    {stat.replace("-", " ")}:
                  </span>
                  <div className="flex-1 mx-2">
                    <div className="w-full bg-yellow-200 rounded-full h-2 transition-all duration-300 group-hover:bg-yellow-300">
                      <div
                        className="bg-yellow-600 h-2 rounded-full transition-all duration-300 group-hover:bg-yellow-700"
                        style={{
                          width: `${Math.min(
                            100,
                            (Number(getStat(pokemon.stats, stat)) / 255) * 100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                  <span className="w-8 text-right">
                    {getStat(pokemon.stats, stat)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col h-full gap-5">
          {/* Physical Characteristics */}
          <div className="flex-none bg-yellow-50 rounded-lg p-3 border-1 border-yellow-600 transition-all duration-300 group-hover:shadow-lg group-hover:bg-yellow-100 group-hover:translate-y-[-2px]">
            <h3 className="text-base font-bold text-yellow-700 mb-2 transition-colors group-hover:text-yellow-800">
              Characteristics
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="p-2 rounded bg-yellow-100/50 transition-all duration-300 group-hover:bg-yellow-200/50 group-hover:translate-y-[-1px]">
                <span className="font-semibold">Height:</span> {heightInMeters}m
              </div>
              <div className="p-2 rounded bg-yellow-100/50 transition-all duration-300 group-hover:bg-yellow-200/50 group-hover:translate-y-[-1px]">
                <span className="font-semibold">Weight:</span> {weightInKg}kg
              </div>
              <div className="p-2 rounded col-span-2 bg-yellow-100/50 transition-all duration-300 group-hover:bg-yellow-200/50 group-hover:translate-y-[-1px]">
                <span className="font-semibold">Base XP:</span>{" "}
                {pokemon.base_experience}
              </div>
            </div>
          </div>

          {/* Abilities Section */}
          <div className="flex-1 bg-yellow-50 rounded-lg p-3 border-1 border-yellow-600 transition-all duration-300 group-hover:shadow-lg group-hover:bg-yellow-100">
            <h3 className="text-base font-bold text-yellow-700 mb-2 transition-colors group-hover:text-yellow-800">
              Abilities
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {pokemon.abilities.map((ability, index) => (
                <div
                  key={ability.ability.name}
                  className="bg-yellow-100 p-2 rounded text-sm flex justify-between items-center transition-all duration-300 hover:bg-yellow-200 hover:shadow-md transform-gpu hover:translate-y-[-2px]"
                  style={{
                    transitionDelay: `${index * 50}ms`,
                  }}
                >
                  <span className="capitalize">
                    {ability.ability.name.replace("-", " ")}
                  </span>
                  {ability.is_hidden && (
                    <span className="text-xs bg-yellow-600 text-white px-2 py-1 rounded transition-colors hover:bg-yellow-700">
                      Hidden
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Moves Preview */}
          <div className="flex-none bg-yellow-50 rounded-lg p-3 border-1 border-yellow-600 transition-all duration-300 group-hover:shadow-lg group-hover:bg-yellow-100">
            <h3 className="text-base font-bold text-yellow-700 mb-2 transition-colors group-hover:text-yellow-800">
              Sample Moves
            </h3>
            <div className="flex flex-wrap gap-2">
              {pokemon.moves.slice(0, 4).map((move, index) => (
                <span
                  key={move.move.name}
                  className="bg-yellow-100 px-2 py-1 rounded text-xs capitalize transition-all duration-300 hover:bg-yellow-200 hover:shadow-sm transform-gpu hover:translate-y-[-1px]"
                  style={{
                    transitionDelay: `${index * 50}ms`,
                  }}
                >
                  {move.move.name.replace("-", " ")}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
