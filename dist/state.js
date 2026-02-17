import readline from "node:readline";
import { getCommands } from "./commands.js";
import { PokeAPI } from "./pokeapi.js";
import { Cache } from "./pokecache.js";
export function initState() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });
    // cache lifetime (milliseconds)
    const cache = new Cache(5000);
    const state = {
        rl,
        commands: {},
        pokeapi: new PokeAPI(cache),
        nextLocationsURL: null,
        prevLocationsURL: null,
        pokedex: {},
    };
    state.commands = getCommands();
    return state;
}
