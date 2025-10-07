// Chargement des variables d'environnement
import "dotenv/config";

// Imports
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { apiRouter } from "./routers/index.js";
import expressJSDocSwagger from "express-jsdoc-swagger";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { xss } from "express-xss-sanitizer";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Creation de l'app Express
const app = express();

expressJSDocSwagger(app)({
  info: {
    version: "1.0.0",
    title: "Opokedex API",
    description: "Copenhague Pokedex API",
    license: {
      name: "BSD",
    },
  },
  baseDir: __dirname,
  filesPattern: "./**/*.js",
  swaggerUIPath: "/api-docs",
});

// Autoriser les requêtes Cross-Origin venu de notre front
app.use(cors()); // * = autorité tous les domaines
app.use(helmet());
app.use(express.json());

app.use(xss());
app.use(/* "/api", */ apiRouter);

app.get("/", (req, res) => res.redirect("/api-docs"));

// Démarrer le serveur
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`🚀 Api is listening on http://localhost:${port}`);
});
