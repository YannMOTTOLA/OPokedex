import { Pokemon, User } from "../models/index.js";
import { HttpError, httpStatusCodes } from "../errors/http.errors.js";
import { sequelize } from "../models/index.js";
import { Op } from "sequelize";

export const pokeController = {
    async getAll(req, res) {
        const pokemons = await Pokemon.findAll();
        res.status(httpStatusCodes.OK).json(pokemons);
    },

    async getById(req, res) {
        const id = parseInt(req.params.id);
        const pokemon = await Pokemon.findByPk(id, {
            include: [
                {
                    association: "types",
                    through: { attributes: [] }
                }]
        });

        if (!pokemon) {
            throw new HttpError("pokemon not found", httpStatusCodes.NOT_FOUND);
        }

        res.status(httpStatusCodes.OK).json(pokemon);
    },

    async comparePoke(req, res) {
        const poke1Id = parseInt(req.params.poke1Id);
        const poke2Id = parseInt(req.params.poke2Id);

        if (isNaN(poke1Id) || isNaN(poke2Id) || poke1Id <= 0 || poke2Id <= 0) {
            throw new HttpError("Invalid pokemons ID", httpStatusCodes.BAD_REQUEST);
        }

        const poke1 = await Pokemon.findByPk(poke1Id);
        if (!poke1) {
            throw new HttpError("First pokemon not found", httpStatusCodes.BAD_REQUEST);
        }

        const poke2 = await Pokemon.findByPk(poke2Id);
        if (!poke2) {
            throw new HttpError("Second pokemon not found", httpStatusCodes.BAD_REQUEST);
        }

        const stats = ["hp", "atk", "def", "atk_spe", "def_spe", "speed"];
        const results = {};

        stats.forEach(stat => {
            if (poke1[stat] > poke2[stat]) {
                results[stat] = `${poke1.name} a plus de ${stat} (${poke1[stat]}) que ${poke2.name} (${poke2[stat]})`;
            } else if (poke1[stat] < poke2[stat]) {
                results[stat] = `${poke2.name} a plus de ${stat} (${poke2[stat]}) que ${poke1.name} (${poke1[stat]})`;
            } else {
                results[stat] = `${poke1.name} et ${poke2.name} ont la même valeur de ${stat} (${poke1[stat]})`;
            }
        });

        res.json({
            message: "Comparaison des stats",
            results
        });
    },

    async getByName(req, res) {
        const name = req.params.pokeName;

        const pokemon = await Pokemon.findOne({
            where: {
                name: {
                    [Op.iLike]: name
                }
            }
        })
        if (!pokemon) {
            throw new HttpError("pokemon not found", httpStatusCodes.NOT_FOUND);
        }

        res.status(httpStatusCodes.OK).json(pokemon);
    },

    async voteForPokemon(req, res) {
        const userId = req.userId;
        const pokemonId = parseInt(req.params.id);

        const pokemon = await Pokemon.findByPk(pokemonId);
        if (!pokemon) {
            throw new HttpError("pokemon not found", httpStatusCodes.NOT_FOUND);
        }

        const user = await User.findByPk(userId);

        const alreadyVoted = await user.hasVotedPokemon(pokemonId);
        if (alreadyVoted) {
            throw new HttpError("Vous avez déjà voté pour ce Pokémon.", httpStatusCodes.BAD_REQUEST);
        }

        await user.addVotedPokemon(pokemonId);

        res.status(httpStatusCodes.OK).json({ message: `Vote enregistré pour le pokemon ${pokemon.name} !` });
    },


    async getPokemonVoteNumber(req, res) {
        const pokemonId = parseInt(req.params.id);
        const pokemon = await Pokemon.findByPk(pokemonId);
        if (!pokemon) {
            throw new HttpError("pokemon not found", httpStatusCodes.NOT_FOUND);
        }

        const vote = await pokemon.countVoters()
        res.status(httpStatusCodes.OK).json({
            message: `${pokemon.name} a était voté ${vote} fois`,
        });
    },

    async getTopVoted(req, res) {
        const pokemons = await Pokemon.findAll({
            subQuery: false,
            include: [{
                model: User,
                as: "voters",
                attributes: [],
                through: { attributes: [] },
                required: false
            }],
            attributes: [
                "id",
                "name",
                [sequelize.fn("COUNT", sequelize.col("voters.id")), "voteCount"]
            ],
            group: ["Pokemon.id", "Pokemon.name"],
            order: [[sequelize.literal('"voteCount" DESC')]],
            limit: 10
        });


        res.status(httpStatusCodes.OK).json({
            podium: pokemons.map(p => `${p.name} (${p.get("voteCount")})`)
        });
    }

    // Version SQL BEAUCOUP plus simple, pourquoi s'embéter à faire cette horreur au dessus ?
    //
    // async getTopVoted(req, res) {
    //     const [pokemons] = await sequelize.query(`
    //         SELECT p.id, p.name, COUNT(upv.user_id) AS "voteCount"
    //         FROM pokemon p
    //         LEFT JOIN user_pokemon_vote upv ON p.id = upv.pokemon_id
    //         GROUP BY p.id, p.name
    //         ORDER BY "voteCount" DESC
    //         LIMIT 10
    //     `);

    //     res.status(httpStatusCodes.OK).json({
    //         podium: pokemons.map(p => `${p.name} (${p.voteCount})`)
    //     });
    // }


}