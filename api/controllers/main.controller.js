import { httpStatusCodes } from "../errors/http.errors.js";

export function getWelcomeResponse(_, res) {
  res
    .status(httpStatusCodes.OK)
    .json({
      message: "Welcome to the Pokedex",
      description: "This is the API for the Pokedex application.",
      version: "1.0.0",
      routes: {
        pokemons: "/pokemons",
        types: "/types",
        teams: "/teams",
        apidoc: "/api-docs"
      }
    });
}
