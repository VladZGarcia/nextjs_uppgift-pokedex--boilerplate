import Link from "next/link";
import Image from "next/image";
import data from "@/lib/pages.json";


export default async function NavMain() {
  return (
    <nav className="breakout p-4 flex items-center justify-between">
          <Link href={"/"} className="flex items-center justify-center gap-4">
              <Image
                  src="/logo.png"
                  alt="Logo"
                  width={100}
                  height={50}
                  className="w-auto"
              />
              <h2 className="text-center text-4xl font-medium text-transparent bg-gradient-to-r from-purple-800 to-blue-800 [background-clip:text]">Pokedex</h2>
              
          </Link>
          <ul className="flex gap-4">
            {data.pages.map((link, index) => (
              <li key={index}>
                    <Link
                        className="p-4 block text-lg uppercase hover:bg-neutral-400 hover:text-neutral-100"
                        href={link.href}
                    >{link.label}
                    </Link>
              </li>
            ))}
          </ul>
    </nav>
  );
}
