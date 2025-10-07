import { Router } from "express";
import { pokeController } from "../controllers/pokemon.controller.js";
import { isAuthed } from "../middlewares/is-authed.middleware.js";
import { missingName } from "../middlewares/error.middleware.js";
import { checkId } from "../middlewares/check-id.middleware.js";

export const pokeRouter = Router();

/**
 * Un pokemon
 * @typedef {object} Pokemon
 * @property {integer} id.required - Id du Pokemon
 * @property {string} name.required - Nom du Pokemon
 * @property {integer} hp.required - statistique d'hp du pokemon
 * @property {integer} atk.required - statistique d'attaque du pokemon
 * @property {integer} def.required - statistique de défense du pokemon
 * @property {integer} atk_spe.required - statistique d'attaque spéciale du pokemon
 * @property {integer} def_spe.required - statistique de défense spéciale du pokemon
 * @property {integer} speed.required - statistique de vitesse du pokemon
 * @property {integer} votes.required - nombre de vote pour le pokemon
 */

/**
 * Résultats détaillés de la comparaison (sous-objet)
 * @typedef {object} CompareResults
 * @property {string} hp.required - Comparaison des hp
 * @property {string} atk.required - Comparaison de l'attaque
 * @property {string} def.required - Comparaison de la défense
 * @property {string} atk_spe.required - Comparaison de l'attaque spéciale
 * @property {string} def_spe.required - Comparaison de la défense spéciale
 * @property {string} speed.required - Comparaison de la vitesse
 */

/**
 * Réponse de comparaison de deux pokemons
 * @typedef {object} CompareResponse
 * @property {string} message.required - Libellé général ("Comparaison des stats")
 * @property {CompareResults} results.required - Résultats détaillés par statistique
 */


/**
 * Structure d'erreur standard
 * @typedef {object} HTTPError
 * @property {string} error.required - Message d'erreur
 */

/**
 * Réponse simple avec un message
 * @typedef {object} MessageResponse
 * @property {string} message.required - Message de confirmation
 */

/**
 * Podium des votes
 * @typedef {object} PodiumResponse
 * @property {array<string>} podium.required - Ex: ["Dracaufeu (152)", "Pikachu (141)"]
 */

/**
 * Nombre de votes pour un pokemon (message textuel)
 * @typedef {object} VoteCountMessage
 * @property {string} message.required - Ex: "Pikachu a été voté 42 fois"
 */

/**
 * GET /pokemons
 * @summary Récupérer tous les pokemons
 * @tags Pokemons
 * @security BearerAuth
 * @param {string} include.query - Filtre/option d'inclusion (optionnel)
 * @return {array<Pokemon>} 200 - Succès - liste des pokemons
 * @return {HTTPError} 401 - Non authentifié
 */
pokeRouter.get("/pokemons", isAuthed, pokeController.getAll);

/**
 * GET /pokemons/top
 * @summary Récupérer le podium des 10 pokemons les plus votés
 * @tags Pokemons
 * @return {PodiumResponse} 200 - Succès - podium (top 10)
 */
pokeRouter.get("/pokemons/top", pokeController.getTopVoted);

/**
 * GET /pokemons/name/
 * @summary Gérer l'absence de nom dans la recherche (erreur)
 * @tags Pokemons
 * @return {HTTPError} 400 - Nom manquant dans la requête
 * @example response - 400 - Nom manquant
 * {"error" : "You must enter a pokemon name"}
 */
pokeRouter.get("/pokemons/name/", missingName);

/**
 * GET /pokemons/name/{pokeName}
 * @summary Récupérer un pokemon par son nom
 * @tags Pokemons
 * @param {string} pokeName.path.required - Nom du pokemon (ex. "Pikachu")
 * @return {Pokemon} 200 - Succès - pokemon trouvé
 * @return {HTTPError} 404 - Pokemon non trouvé
 * @example response - 404 - Introuvable
 * { "error" : "Pokemon not found" }
 */
pokeRouter.get("/pokemons/name/:pokeName", pokeController.getByName);

/**
 * GET /pokemons/{id}
 * @summary Récupérer un pokemon par son identifiant
 * @tags Pokemons
 * @security BearerAuth
 * @param {integer} id.path.required - Identifiant numérique du pokemon
 * @return {Pokemon} 200 - Succès - pokemon trouvé
 * @return {HTTPError} 400 - Identifiant invalide
 * @return {HTTPError} 401 - Non authentifié
 * @return {HTTPError} 404 - Pokemon non trouvé
 */
pokeRouter.get("/pokemons/:id", isAuthed, checkId, pokeController.getById);

/**
 * Détail d'une stat comparée
 * @typedef {object} CompareStat
 * @property {string} stat.required - Nom de la statistique (hp|atk|def|atk_spe|def_spe|speed)
 * @property {string} winner.required - Nom du gagnant sur cette stat
 * @property {integer} winnerValue.required - Valeur du gagnant
 * @property {string} loser.required - Nom du perdant sur cette stat
 * @property {integer} loserValue.required - Valeur du perdant
 * @property {integer} delta.required - Écart (winnerValue - loserValue)
 */

/**
 * GET /pokemons/{poke1Id}/{poke2Id}
 * @summary Comparer deux pokemons par leurs identifiants
 * @tags Pokemons
 * @security BearerAuth
 * @param {integer} poke1Id.path.required - Identifiant du premier pokemon
 * @param {integer} poke2Id.path.required - Identifiant du second pokemon
 * @return {CompareResponse} 200 - Résultat de comparaison
 * @return {HTTPError} 401 - Non authentifié
 * @return {HTTPError} 404 - Un des pokemons n'a pas été trouvé
 */
pokeRouter.get("/pokemons/:poke1Id/:poke2Id", isAuthed, pokeController.comparePoke);



/**
 * POST /pokemons/{id}/vote
 * @summary Voter pour un pokemon
 * @tags Pokemons
 * @security BearerAuth
 * @param {integer} id.path.required - Identifiant du pokemon à voter
 * @return {MessageResponse} 200 - Vote enregistré
 * @return {HTTPError} 400 - Requête invalide
 * @return {HTTPError} 401 - Non authentifié
 * @return {HTTPError} 404 - Pokemon non trouvé
 */
pokeRouter.post("/pokemons/:id/vote", isAuthed, pokeController.voteForPokemon);

/**
 * POST /pokemons/{id}/voteNumber
 * @summary Récupérer le nombre de votes pour un pokemon (message textuel)
 * @tags Pokemons
 * @security BearerAuth
 * @param {integer} id.path.required - Identifiant du pokemon
 * @return {VoteCountMessage} 200 - Succès - message avec le nombre de votes
 * @return {HTTPError} 400 - Requête invalide
 * @return {HTTPError} 401 - Non authentifié
 * @return {HTTPError} 404 - Pokemon non trouvé
 */
pokeRouter.post("/pokemons/:id/voteNumber", isAuthed, pokeController.getPokemonVoteNumber);
