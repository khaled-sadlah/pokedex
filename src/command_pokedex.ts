import type { State } from "./state.js";

export async function commandPokedex(state: State): Promise<void> {
  const names = Object.keys(state.pokedex);

  console.log("Your Pokedex:");

  if (names.length === 0) {
    console.log("  (empty)");
    return;
  }

  for (const name of names) {
    console.log(` - ${name}`);
  }
}
