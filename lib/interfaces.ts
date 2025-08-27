export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface Pokemon {
  sprites: {
    front_default: string;
    back_default: string;
    front_shiny: string;
    back_shiny: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  id: number;
  name: string;
  types: PokemonType[];
  stats: PokemonStat[];
  color?: string;
}