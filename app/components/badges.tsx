"use client";
import { useRouter } from "next/navigation";

export default function Badges({ types, color }: { types: string[]; color?: string }) {
  const router = useRouter();

  const handleTypeClick = (e: React.MouseEvent, type: string) => {
    e.preventDefault(); // Prevent default link behavior
    e.stopPropagation(); // Stop event from reaching the card's Link
    router.push(`/pages/types/${type}`);
  };

  return (
    <div className="flex gap-2 mb-2 justify-center">
      {types.map((type) => (
        <button
          key={type}
          onClick={(e) => handleTypeClick(e, type)}
          className={`px-2 py-1 rounded-full bg-yellow-400 text-white border-1 text-xs font-semibold shadow cursor-grabbing`}
          style={{ 
            borderColor: color || "#ffd700",
          }}
        >
          {type}
        </button>
      ))}
    </div>
  );
}
