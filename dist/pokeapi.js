export class PokeAPI {
    static baseURL = "https://pokeapi.co/api/v2";
    cache;
    constructor(cache) {
        this.cache = cache;
    }
    async fetchLocations(pageURL) {
        const url = pageURL ?? `${PokeAPI.baseURL}/location-area`;
        const cached = this.cache.get(url);
        if (cached)
            return cached;
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error("Failed to fetch locations");
        }
        const data = await res.json();
        this.cache.add(url, data);
        return data;
    }
    async fetchLocationArea(areaName) {
        const url = `${PokeAPI.baseURL}/location-area/${areaName}`;
        const cached = this.cache.get(url);
        if (cached)
            return cached;
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error("Failed to fetch location area");
        }
        const data = await res.json();
        this.cache.add(url, data);
        return data;
    }
    async fetchPokemon(name) {
        const url = `${PokeAPI.baseURL}/pokemon/${name}`;
        const cached = this.cache.get(url);
        if (cached)
            return cached;
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error("Pokemon not found");
        }
        const data = await res.json();
        const pokemon = {
            name: data.name,
            height: data.height,
            weight: data.weight,
            base_experience: data.base_experience,
            stats: data.stats.map((s) => ({
                name: s.stat.name,
                value: s.base_stat,
            })),
            types: data.types.map((t) => t.type.name),
        };
        this.cache.add(url, pokemon);
        return pokemon;
    }
}
