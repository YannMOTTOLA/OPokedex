import { Router } from "express";
import { typesController } from "../controllers/types.controller.js";
import { isAuthed } from "../middlewares/is-authed.middleware.js";
import { checkId } from "../middlewares/check-id.middleware.js";

export const typeRouter = Router();

/**
 * Modèle Type
 * @typedef {object} Type
 * @property {string} name - Nom du type (ex. "Feu")
 * @property {string} color - Couleur hex du type (ex. "#F08030")
 */

/**
 * Erreur HTTP standard
 * @typedef {object} HTTPError
 * @property {string} error - Message d'erreur
 */

/**
 * GET /type
 * @summary Récupérer tous les types
 * @tags Types
 * @security BearerAuth
 * @return {array<Type>} 200 - Liste des types
 * @return {HTTPError} 401 - Non authentifié
 */
typeRouter.get("/type", isAuthed, typesController.getAll);

/**
 * GET /type/{id}
 * @summary Récupérer un type par son identifiant (avec ses pokemons)
 * @tags Types
 * @security BearerAuth
 * @param {integer} id.path.required - Identifiant du type
 * @return {Type} 200 - Type trouvé
 * @return {HTTPError} 400 - Identifiant invalide
 * @return {HTTPError} 401 - Non authentifié
 * @return {HTTPError} 404 - Type non trouvé
 */
typeRouter.get("/type/:id", isAuthed, checkId, typesController.getById);

