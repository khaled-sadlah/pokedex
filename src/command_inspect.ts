import type { State } from "./state.js";

export async function commandInspect(state: State, pokemonName?: string): Promise<void> {
  if (!pokemonName) {
    console.log("Please provide a Pokemon name.");
    return;
  }

  const pokemon = state.pokedex[pokemonName];
  if (!pokemon) {
    console.log("you have not caught that pokemon");
    return;
  }

  console.log(`Name: ${pokemon.name}`);
  console.log(`Height: ${pokemon.height}`);
  console.log(`Weight: ${pokemon.weight}`);
  console.log("Stats:");
  for (const s of pokemon.stats) {
    console.log(`  -${s.name}: ${s.value}`);
  }
  console.log("Types:");
  for (const t of pokemon.types) {
    console.log(`  - ${t}`);
  }
}
