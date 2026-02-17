export async function commandMapBack(state) {
    if (!state.prevLocationsURL) {
        console.log("you're on the first page");
        return;
    }
    const data = await state.pokeapi.fetchLocations(state.prevLocationsURL);
    state.nextLocationsURL = data.next;
    state.prevLocationsURL = data.previous;
    for (const loc of data.results) {
        console.log(loc.name);
    }
}
