import { Sequelize } from "sequelize";
import 'dotenv/config';

export const sequelize = new Sequelize(
  process.env.DB_URL,
  {
    logging: false, // ne pas afficher les requete sql en console
    define: {
      underscored: true, // les noms de champs seront en snake_case
      createdAt: "created_at", // mapper les champs timestamps
      updatedAt: "updated_at"
    }
  }
);