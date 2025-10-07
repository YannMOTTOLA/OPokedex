import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize.client.js";

export class Team extends Model {}

Team.init(
  {
    name: { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: "Team",
    tableName: "team",
  }
);
