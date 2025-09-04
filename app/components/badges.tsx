"use client";
import { useRouter } from "next/navigation";

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
    router.push(`/pages/types/${type.toLowerCase()}`);
  };

  return (
    <div className="flex gap-2 mb-2 justify-center">
      {types.map((type) => (
        <button
          key={type}
          onClick={(e) => handleTypeClick(e, type)}
          className={`
            px-3 py-1.5 
            rounded-full 
            bg-yellow-400 
            text-white 
            border-2 
            text-xs 
            font-bold 
            shadow-md 
            cursor-pointer 
            capitalize
            transition-all 
            duration-300 
            hover:bg-yellow-500 
            hover:shadow-lg 
            hover:scale-105 
            active:scale-95
            focus:outline-none 
            focus:ring-2 
            focus:ring-yellow-500 
            focus:ring-offset-2
          `}
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
