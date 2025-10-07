import { Router } from "express";
import { teamController } from "../controllers/teams.controller.js";
import { checkId } from "../middlewares/check-id.middleware.js";
import { isAuthed } from "../middlewares/is-authed.middleware.js";

export const teamRouter = Router();

/**
 * Modèle Team (réponses)
 * @typedef {object} Team
 * @property {string} name.required - Nom de la team
 * @property {string} description.required - Description de la team
 * @property {integer} user_id.required - Identifiant du propriétaire
 */

/**
 * Corps de création de team (requête)
 * @typedef {object} CreateTeamRequest
 * @property {string} name.required - Nom de la team
 * @property {string} [description] - Description (optionnel)
 */

/**
 * Corps de mise à jour de team (requête)
 * @typedef {object} UpdateTeamRequest
 * @property {string} [name] - Nouveau nom
 * @property {string} [description] - Nouvelle description
 */

/**
 * Erreur standard (middlewares & HttpError)
 * @typedef {object} HTTPError
 * @property {string} error.required - Message d'erreur
 */

/**
 * Réponse message générique
 * @typedef {object} MessageResponse
 * @property {string} message.required - Message de confirmation
 */

/**
 * Réponse de suppression de team
 * @typedef {object} TeamDeletionResponse
 * @property {string} message.required - Message de confirmation
 * @property {Team} team.required - Team supprimée
 */

/**
 * GET /teams
 * @summary Récupérer toutes les teams de l'utilisateur courant
 * @tags Teams
 * @security BearerAuth
 * @return {array<Team>} 200 - liste des teams
 * @return {HTTPError} 401 - Non authentifié
 */
teamRouter.get("/teams", isAuthed, teamController.getAll);

/**
 * GET /teams/{id}
 * @summary Récupérer une team par son identifiant
 * @tags Teams
 * @security BearerAuth
 * @param {integer} id.path.required - Identifiant de la team
 * @return {Team} 200 - team trouvée
 * @return {HTTPError} 400 - Identifiant invalide
 * @return {HTTPError} 401 - Non authentifié
 * @return {HTTPError} 404 - Team non trouvée
 */
teamRouter.get("/teams/:id", isAuthed, checkId, teamController.getById);

/**
 * DELETE /teams/{id}
 * @summary Supprimer une team par son identifiant
 * @tags Teams
 * @security BearerAuth
 * @param {integer} id.path.required - Identifiant de la team
 * @return {TeamDeletionResponse} 200 - confirmation de suppression
 * @return {HTTPError} 400 - Identifiant invalide
 * @return {HTTPError} 401 - Non authentifié
 * @return {HTTPError} 404 - Team non trouvée
 */
teamRouter.delete("/teams/:id", isAuthed, checkId, teamController.deleteById);

/**
 * POST /teams
 * @summary Créer une nouvelle team
 * @tags Teams
 * @security BearerAuth
 * @param {CreateTeamRequest} request.body.required - Données de la team
 * @return {Team} 201 - Team créée
 * @return {HTTPError} 401 - Non authentifié
 */
teamRouter.post("/teams", isAuthed, teamController.create);

/**
 * PATCH /teams/{id}
 * @summary Mettre à jour une team
 * @tags Teams
 * @security BearerAuth
 * @param {integer} id.path.required - Identifiant de la team
 * @param {UpdateTeamRequest} request.body.required - Données à mettre à jour
 * @return {Team} 200 - Team mise à jour
 * @return {HTTPError} 400 - Identifiant invalide
 * @return {HTTPError} 401 - Non authentifié
 * @return {HTTPError} 404 - Team non trouvée
 */
teamRouter.patch("/teams/:id", isAuthed, checkId, teamController.update);

/**
 * PUT /teams/{teamId}/poke/{pokeId}
 * @summary Ajouter un pokemon à une team
 * @tags Teams
 * @security BearerAuth
 * @param {integer} teamId.path.required - Identifiant de la team
 * @param {integer} pokeId.path.required - Identifiant du pokemon
 * @return 204 - Ajout effectué (No Content)
 * @return {HTTPError} 400 - Requête invalide
 * @return {HTTPError} 401 - Non authentifié
 */
teamRouter.put("/teams/:teamId/poke/:pokeId", isAuthed, teamController.addPokeToTeam);

/**
 * DELETE /teams/{teamId}/poke/{pokeId}
 * @summary Retirer un pokemon d'une team
 * @tags Teams
 * @security BearerAuth
 * @param {integer} teamId.path.required - Identifiant de la team
 * @param {integer} pokeId.path.required - Identifiant du pokemon
 * @return 204 - Suppression effectuée (No Content)
 * @return {HTTPError} 400 - Requête invalide
 * @return {HTTPError} 401 - Non authentifié
 */
teamRouter.delete("/teams/:teamId/poke/:pokeId", isAuthed, teamController.deletePokeToTeam);

