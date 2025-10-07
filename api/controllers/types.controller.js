import { Pokemon, Team, Type, } from "../models/index.js";
import { HttpError, httpStatusCodes } from "../errors/http.errors.js";

export const typesController = {
    async getAll(req, res) {
        const types = await Type.findAll();
        res.status(httpStatusCodes.OK).json(types);
    },

    async getById(req, res) {
        const id = parseInt(req.params.id);
        const team = await Type.findByPk(id, {
            include: [
                {
                    association: "pokemons",
                    through: { attributes: [] }


                }]
        });

        if (team.length === 0) {
            throw new HttpError("team not found", httpStatusCodes.NOT_FOUND);
        }

        res.status(httpStatusCodes.OK).json(team);
    },
}