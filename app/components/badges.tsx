"use client";
import { useRouter } from "next/navigation";
import { typeColors, PokemonType } from "@/lib/data/pokemonColors";

export default function Badges({
  types,
  color,
}: {
  types: string[];
  color?: string;
}) {
  const router = useRouter();

  const handleTypeClick = (e: React.MouseEvent, type: string) => {
    e.preventDefault(); // Prevent default link behavior
    e.stopPropagation(); // Stop event from reaching the card's Link

    // Force the click event to stop propagating
    if (e.nativeEvent) {
      e.nativeEvent.stopImmediatePropagation();
    }

    // Add a small delay to ensure the event is handled
    setTimeout(() => {
      router.push(`/pages/types/${type.toLowerCase()}`);
    }, 0);
  };

  return (
    <div
      className="relative flex gap-2 mb-2 justify-center isolate"
      style={{ zIndex: 30 }}
      onClick={(e) => e.stopPropagation()}
    >
      {types.map((type) => {
        const typeColor =
          typeColors[type.toLowerCase() as PokemonType] || color || "#ffd700";
        return (
          <button
            key={type}
            onClick={(e) => handleTypeClick(e, type)}
            type="button"
            className={`
              relative
              px-3 py-1.5 
              rounded-full 
              text-white 
              border 
              text-xs 
              font-bold 
              shadow-md 
              cursor-pointer 
              capitalize
              transition-all 
              duration-300 
              hover:shadow-lg 
              hover:scale-105 
              active:scale-95
              focus:outline-none 
              focus:ring-2 
              focus:ring-offset-2
              z-50
            `}
            style={{
              position: "relative",
              zIndex: 40,
              backgroundColor: typeColor,
              borderColor: typeColor,
              filter: "brightness(1)",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            {type}
          </button>
        );
      })}
    </div>
  );
}
