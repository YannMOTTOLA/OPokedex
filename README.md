
# Opokedex

Ce projet est une API REST développée avec **Node.js**, **Express** et **Sequelize**.
Elle permet de gérer des Pokémons, leurs types, des équipes et des utilisateurs, avec authentification JWT et documentation Swagger intégrée.

---

## Démarrer le projet

### Installation

Clonez le dépôt et installez les dépendances :

```bash
git clone https://github.com/YannMOTTOLA/Opokedex.git
cd Opokedex/api
npm install
```

### Configuration

Créez un fichier `.env` à la racine du dossier `api/` en vous basant sur `.env.example` :

```
PORT=8000
DB_URL=postgres://<user>:<password>@localhost:5432/opokedex
JWT_SECRET=<votre_cle_secrete>
```

### Base de données

Initialisez la base de données avec les migrations et les seeds :

```bash
npm run db:create
npm run db:seed
```

ou en une seule commande :

```bash
npm run db:reset
```

### Lancer le serveur

```bash
npm start
```

Ouvrez [http://localhost:8000](http://localhost:8000) dans votre navigateur.
L’interface de documentation Swagger est disponible à l’adresse :
[http://localhost:8000/api-docs](http://localhost:8000/api-docs)

---

## Scripts disponibles

| Commande            | Description                                    |
| ------------------- | ---------------------------------------------- |
| `npm start`         | Lance le serveur en mode production            |
| `npm run dev`       | Lance le serveur en mode développement (watch) |
| `npm run db:create` | Crée les tables de la base                     |
| `npm run db:seed`   | Ajoute les données initiales                   |
| `npm run db:reset`  | Réinitialise la base (create + seed)           |
| `npm run lint`      | Analyse du code avec ESLint                    |

---

## Structure du projet

* `controllers/` : logique métier (Pokemons, Teams, Types, Auth, etc.)
* `models/` : modèles Sequelize
* `routers/` : routes Express
* `middlewares/` : middlewares de sécurité et de validation
* `migrations/` : scripts de création et d’initialisation de la base
* `schemas/` : validation des données avec Joi
* `errors/` : gestion centralisée des erreurs
* `test/` : tests des endpoints avec REST Client

---

## Technologies utilisées

* **Node.js**
* **Express**
* **Sequelize**
* **PostgreSQL**
* **JWT / Argon2 / Joi / Helmet / CORS**
* **express-jsdoc-swagger**

---

## En savoir plus

Pour plus d’informations :

* [Documentation Express](https://expressjs.com/fr/)
* [Documentation Sequelize](https://sequelize.org/)
* [Documentation Swagger](https://swagger.io/docs/)
