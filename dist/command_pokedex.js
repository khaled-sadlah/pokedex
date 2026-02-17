export async function commandPokedex(state) {
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
