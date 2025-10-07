import { Pokemon } from "./pokemon.model.js";
import { Type } from "./type.model.js";
import { Team } from "./team.model.js";
import { User } from "./user.model.js";
import { sequelize } from "./sequelize.client.js";

Pokemon.belongsToMany(Type, {
  as:"types",
  through: "pokemon_type",
  foreignKey: "pokemon_id",
  otherKey: "type_id"
});
Type.belongsToMany(Pokemon, {
  as:"pokemons",
  through: "pokemon_type",
  foreignKey: "type_id",
  otherKey: "pokemon_id"
});

Pokemon.belongsToMany(Team, {
  as:"teams",
  through: "team_pokemon",
  foreignKey: "pokemon_id",
  otherKey: "team_id"
});

Team.belongsToMany(Pokemon, {
  as:"pokemons",
  through: "team_pokemon",
  foreignKey: "team_id",
  otherKey: "pokemon_id"
});

User.belongsToMany(Pokemon, {
  as: "votedPokemons",
  through: "user_pokemon_vote",
  foreignKey: "user_id",
  otherKey: "pokemon_id"
});

Pokemon.belongsToMany(User, {
  as: "voters",
  through: "user_pokemon_vote",
  foreignKey: "pokemon_id",
  otherKey: "user_id"
});

User.hasMany(Team, {
  as: "teams",
  foreignKey: { name: "user_id"},
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

Team.belongsTo(User, {
  as: "owner",
  foreignKey: { name: "user_id"},
});

export {
  Pokemon,
  Type,
  Team,
  User,
  sequelize
};

