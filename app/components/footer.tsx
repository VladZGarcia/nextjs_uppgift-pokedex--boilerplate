import React from "react";
import Link from "next/link";
import Image from "next/image"


export default async function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto text-center">
              <Link href={"/"} className="flex items-center justify-center gap-4">
              <Image
                  src="/logo.png"
                  alt="Logo"
                  width={100}
                  height={50}
                  className="w-auto"
              />
              <h2 className="text-center text-4xl font-medium text-white [background-clip:text]">Pokedex</h2>
              </Link>
              <h4 className="text-center text-xl --font-jaldi font-light p-2 text-white">Explore the world of Pokémon</h4>
              <div className="flex justify-center gap-4 p-4">
                  <Image
                      src="/Facebook.svg"
                      alt="Footer Image"
                      width={500}
                      height={300}
                      className="w-auto"
                  />
                  <Image
                      src="/Instagram.svg"
                      alt="Footer Image 2"
                      width={500}
                      height={300}
                      className="w-auto"
                  />
              </div>
        <p>&copy; {new Date().getFullYear()} Pokedex. All rights reserved.</p>
      </div>
    </footer>
  );
}