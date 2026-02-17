import { cleanInput } from "./cleanInput.js";
import type { State } from "./state.js";

export { cleanInput };

export function startREPL(state: State) {
  state.rl.prompt();

  state.rl.on("line", async (line: string) => {
    const words = cleanInput(line);

    if (words.length === 0) {
      state.rl.prompt();
      return;
    }

    const commandName = words[0];
    const command = state.commands[commandName];

    if (!command) {
      console.log("Unknown command");
      state.rl.prompt();
      return;
    }

    try {
      // مهم جداً: await
      await command.callback(state, ...words.slice(1));
    } catch (err) {
      console.log("Error:", err);
    }

    state.rl.prompt();
  });
}
