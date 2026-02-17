import { Cache } from "./pokecache.js";

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
};

export type LocationArea = {
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
  }[];
};

export type Pokemon = {
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  stats: { name: string; value: number }[];
  types: string[];
};


export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache: Cache;

  constructor(cache: Cache) {
    this.cache = cache;
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ?? `${PokeAPI.baseURL}/location-area`;

    const cached = this.cache.get<ShallowLocations>(url);
    if (cached) return cached;

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch locations");
    }

    const data: ShallowLocations = await res.json();
    this.cache.add(url, data);
    return data;
  }

  async fetchLocationArea(areaName: string): Promise<LocationArea> {
    const url = `${PokeAPI.baseURL}/location-area/${areaName}`;

    const cached = this.cache.get<LocationArea>(url);
    if (cached) return cached;

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch location area");
    }

    const data: LocationArea = await res.json();
    this.cache.add(url, data);
    return data;
  }

  async fetchPokemon(name: string): Promise<Pokemon> {
  const url = `${PokeAPI.baseURL}/pokemon/${name}`;

  const cached = this.cache.get<Pokemon>(url);
  if (cached) return cached;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Pokemon not found");
  }

  const data = await res.json();

  const pokemon: Pokemon = {
    name: data.name,
    height: data.height,
    weight: data.weight,
    base_experience: data.base_experience,
    stats: data.stats.map((s: any) => ({
      name: s.stat.name,
      value: s.base_stat,
    })),
    types: data.types.map((t: any) => t.type.name),
  };

  this.cache.add(url, pokemon);
  return pokemon;
}

}
