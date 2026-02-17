import readline, { type Interface } from "node:readline";

import { getCommands } from "./commands.js";
import { PokeAPI, type Pokemon } from "./pokeapi.js";
import { Cache } from "./pokecache.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
  pokeapi: PokeAPI;
  nextLocationsURL: string | null;
  prevLocationsURL: string | null;
  pokedex: Record<string, Pokemon>;
};

export function initState(): State {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  // cache lifetime (milliseconds)
  const cache = new Cache(5000);

  const state: State = {
    rl,
    commands: {} as Record<string, CLICommand>,
    pokeapi: new PokeAPI(cache),
    nextLocationsURL: null,
    prevLocationsURL: null,
    pokedex: {},
  };

  state.commands = getCommands();

  return state;
}

