export async function commandExplore(state, areaName) {
    if (!areaName) {
        console.log("Please provide a location area name.");
        return;
    }
    console.log(`Exploring ${areaName}...`);
    const data = await state.pokeapi.fetchLocationArea(areaName);
    console.log("Found Pokemon:");
    for (const encounter of data.pokemon_encounters) {
        console.log(` - ${encounter.pokemon.name}`);
    }
}
