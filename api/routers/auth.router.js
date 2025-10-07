import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { isAuthed } from "../middlewares/is-authed.middleware.js";

export const authRouter = Router();

/**
 * Un utilisateur authentifié
 * @typedef {object} User
 * @property {number} id - Identifiant unique de l'utilisateur
 * @property {string} name - Nom affiché
 * @property {string} role - role de l'utilisateur
 * @property {string} createdAt - Date de création (ISO 8601)
 * @property {string} updatedAt - Date de mise à jour (ISO 8601)
 */

/**
 * Corps de requête d'inscription
 * @typedef {object} RegisterRequest
 * @property {string} name.required - Nom affiché
 * @property {string} password.required - Mot de passe
 */

/**
 * Corps de requête de connexion
 * @typedef {object} LoginRequest
 * @property {string} name.required - Nom affiché
 * @property {string} password.required - Mot de passe
 */

/**
 * Réponse d'authentification
 * @typedef {object} AuthSuccess
 * @property {string} accessToken - Jeton JWT d'accès
 * @property {User} user - Informations utilisateur
 */

/**
 * Erreur HTTP standard
 * @typedef {object} HTTPError
 * @property {string} message - Message d'erreur
 * @property {number} [status] - Code HTTP
 */

/**
 * POST /api/auth/register
 * @summary Inscrire un nouvel utilisateur
 * @tags Auth
 * @param {RegisterRequest} request.body.required - Données d'inscription
 * @return {AuthSuccess} 201 - Utilisateur créé et connecté
 * @return {HTTPError} 400 - Données invalides
 * @return {HTTPError} 409 - E-mail déjà utilisé
 */
authRouter.post("/auth/register", authController.registerUser);

/**
 * POST /api/auth/login
 * @summary Se connecter
 * @tags Auth
 * @param {LoginRequest} request.body.required - Identifiants de connexion
 * @return {AuthSuccess} 200 - Connexion réussie
 * @return {HTTPError} 400 - Données invalides
 * @return {HTTPError} 401 - Identifiants incorrects
 */
authRouter.post("/auth/login", authController.loginUser);

/**
 * GET /api/auth/me
 * @summary Récupérer les informations de l'utilisateur courant
 * @tags Auth
 * @security BearerAuth
 * @return {User} 200 - Informations utilisateur
 * @return {HTTPError} 401 - Non authentifié
 */
authRouter.get("/auth/me", isAuthed, authController.getCurrentUserInfo);
