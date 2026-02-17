import type { State } from "./state.js";

export async function commandCatch(
  state: State,
  pokemonName?: string
): Promise<void> {
  if (!pokemonName) {
    console.log("Please provide a Pokemon name.");
    return;
  }

  console.log(`Throwing a Pokeball at ${pokemonName}...`);

  try {
    const pokemon = await state.pokeapi.fetchPokemon(pokemonName);

    // chance calculation (كل ما زادت base_experience صار أصعب)
    const difficulty = pokemon.base_experience;
    const chance = Math.random() * 100;

    if (chance > difficulty / 2) {
      state.pokedex[pokemon.name] = pokemon;
      console.log(`${pokemon.name} was caught!`);
      console.log("You may now inspect it with the inspect command.");
    } else {
      console.log(`${pokemon.name} escaped!`);
    }

  } catch {
    console.log("Pokemon not found.");
  }
}

