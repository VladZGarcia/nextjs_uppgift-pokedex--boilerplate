export const pokemonTypes = [
    'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison',
    'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark',
    'steel', 'fairy', 'stellar', 'unknown'
] as const;

export type PokemonType = typeof pokemonTypes[number];

export const typeColors: { [key in PokemonType]: string } = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
    stellar: '#FFC300',
    unknown: '#7D7D7D'
};

export const typeTextColors: { [key in PokemonType]: string } = {
    normal: '#FFFFFF',
    fire: '#FFFFFF',
    water: '#FFFFFF',
    electric: '#000000',
    grass: '#FFFFFF',
    ice: '#000000',
    fighting: '#FFFFFF',
    poison: '#FFFFFF',
    ground: '#000000',
    flying: '#000000',
    psychic: '#FFFFFF',
    bug: '#FFFFFF',
    rock: '#FFFFFF',
    ghost: '#FFFFFF',
    dragon: '#FFFFFF',
    dark: '#FFFFFF',
    steel: '#000000',
    fairy: '#000000',
    stellar: '#000000',
    unknown: '#FFFFFF'
};
