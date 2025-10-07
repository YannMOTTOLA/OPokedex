import Joi from "joi";
import { Pokemon, Team } from "../models/index.js";
import { createTeamSchema, updateTeamSchema } from "../schemas/index.js";
import { HttpError, httpStatusCodes } from "../errors/http.errors.js";

export const teamController = {
    async getAll(req, res) {
        const userId = req.userId;
        const teams = await Team.findAll({
            where: { user_id: userId }
        });
        res.status(httpStatusCodes.OK).json(teams);
    },

    async getById(req, res) {
        const id = parseInt(req.params.id);
        const team = await Team.findByPk(id, {
            include: [
                {
                    association: "pokemons",
                    through: { attributes: [] },
                    include: [
                        {
                            association: "types",
                            through: { attributes: [] },
                        }]
                }]
        });

        if (!team) {
            throw new HttpError("team not found", httpStatusCodes.NOT_FOUND);
        }

        res.status(httpStatusCodes.OK).json(team);
    },

    async create(req, res) {
        const data = Joi.attempt(req.body, createTeamSchema);
        const team = await Team.create({
            ...data,
            user_id: req.userId
        });
        res.status(httpStatusCodes.CREATED).json(team);
    },

    async update(req, res) {
        const id = parseInt(req.params.id);
        if (!await Team.findByPk(id)) {
            throw new HttpError("team not found", httpStatusCodes.NOT_FOUND);
        }
        const data = Joi.attempt(req.body, updateTeamSchema);
        await Team.update(data, { where: { id } });
        const updatedTeam = await Team.findByPk(id);
        res.status(httpStatusCodes.OK).json(updatedTeam);
    },

    async addPokeToTeam(req, res) {
        const teamId = parseInt(req.params.teamId);
        const pokeId = parseInt(req.params.pokeId);

        if (isNaN(teamId) || isNaN(pokeId) || teamId <= 0 || pokeId <= 0) {
            throw new HttpError("Invalid team or pokemon ID", httpStatusCodes.BAD_REQUEST);
        }

        const team = await Team.findByPk(teamId, {
            include: [{ association: "pokemons" }]
        });
        if (!team) {
            throw new HttpError("Team not found", httpStatusCodes.BAD_REQUEST);
        }

        if (team.pokemons.length >= 6) {
            throw new HttpError("Team cannot have more than 6 pokemons !", httpStatusCodes.BAD_REQUEST);
        }

        const poke = await Pokemon.findByPk(pokeId);

        if (!poke) {
            throw new HttpError("Pokemon not found", httpStatusCodes.BAD_REQUEST);
        }
        await team.addPokemon(poke);
        res.status(httpStatusCodes.NO_CONTENT).json();
    },

    async deletePokeToTeam(req, res) {
        const teamId = parseInt(req.params.teamId);
        const pokeId = parseInt(req.params.pokeId);

        if (isNaN(teamId) || isNaN(pokeId) || teamId <= 0 || pokeId <= 0) {
            throw new HttpError("Invalid team or pokemon ID", httpStatusCodes.BAD_REQUEST);
        }

        const team = await Team.findByPk(teamId, {
            include: [{ association: "pokemons" }]
        });
        if (!team) {
            throw new HttpError("Team not found", httpStatusCodes.BAD_REQUEST);
        }

        if (team.pokemons.length === 0) {
            throw new HttpError("Team is already empty !", httpStatusCodes.BAD_REQUEST);
        }

        const poke = await Pokemon.findByPk(pokeId);

        if (!poke) {
            throw new HttpError("Pokemon not found", httpStatusCodes.BAD_REQUEST);
        }
        await team.removePokemon(poke);
        res.status(httpStatusCodes.NO_CONTENT).json();
    },

    async deleteById(req, res) {
        const id = req.params.id;

        const team = await Team.findByPk(id, {
            include: [
                {
                    association: "pokemons",
                    through: { attributes: [] },
                    include: [
                        {
                            association: "types",
                            through: { attributes: [] },
                        }]
                }]
        });

        if (!team) {
            throw new HttpError("Team not found", httpStatusCodes.NOT_FOUND);
        }

        res.status(httpStatusCodes.OK).json({
            message: `La team '${team.name}' vient d'être supprimée.`,
            team: team
        });

        await team.destroy();
    },
}