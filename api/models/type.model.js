import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize.client.js";

export class Type extends Model {}

Type.init(
  {
    name: { type: DataTypes.STRING(255), allowNull: false },
    color: { type: DataTypes.STRING(7), allowNull: false }
  },
  {
    sequelize,
    modelName: "Type",
    tableName: "type",
  }
);
